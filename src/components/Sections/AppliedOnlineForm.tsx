"use client";

import { useContext, useState, useCallback } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useTranslation } from "@/i18n";

import { validationSchemas } from "@/lib/schemas";
import { FormContext } from "@/lib/contexts/ApplyContext";
import { useNafathVerification } from "@/lib/hooks/useNafathVerification";
import { useToast } from "@/lib/hooks/use-toast";

import NafathVerificationModal from "../shared/CustomModal";
import SuccessModal from "../shared/SuccessModal";
import IvrModal from "../shared/IvrModal";

import BasicInfoForm from "./Forms/BasicInfoForm";
import AddressDetailForm from "./Forms/AddressDetailForm";
import NafathVerificationForm from "./Forms/NafathVerificationForm";
import LoanDetails from "./Forms/LoanDetails";

const checked = "/assets/svgs/checked-step.svg";
const done = "/assets/svgs/done-step.svg";
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

interface ApplyOnlineFormProps {
  merchantId: string;
  product: any;
}

interface FormValues {
  nationalId: string;
  dob: string;
  phone: string;
  email: string;
  title: string;
  nationality: string;
  gender: string;
  region: string;
  city: string;
  maritalStatus: string;
  dependents: string;
  employmentType: string;
  education: string;
  residentStatus: string;
  employmentSector: string;
  occupation: string;
  joiningDate: string;
  pep: string;
  beneficiary: string;
  beneficiaryName: string;
  relationship: string;
  relationshipPosition: string;
  food: number;
  housing: number;
  domestic: number;
  educationExpenses: number;
  healthcare: number;
  transport: number;
  insurance: number;
  future: number;
  tenure: number;
  ballonAmount: number;
  requestedAmount: number;
  total: number;
}

/* -------------------------------------------------------------------------- */
/*                               Initial Values                               */
/* -------------------------------------------------------------------------- */

const INITIAL_VALUES: FormValues = {
  nationalId: "",
  dob: "",
  phone: "",
  email: "",
  title: "",
  nationality: "",
  gender: "",
  region: "",
  city: "",
  maritalStatus: "",
  dependents: "",
  employmentType: "",
  education: "",
  residentStatus: "",
  employmentSector: "",
  occupation: "",
  joiningDate: "",
  pep: "",
  beneficiary: "",
  beneficiaryName: "",
  relationship: "",
  relationshipPosition: "",
  food: 0,
  housing: 0,
  domestic: 0,
  educationExpenses: 0,
  healthcare: 0,
  transport: 0,
  insurance: 0,
  future: 0,
  tenure: 0,
  ballonAmount: 0,
  requestedAmount: 0,
  total: 0,
};

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export default function ApplyOnlineForm({
  merchantId,
  product,
}: ApplyOnlineFormProps) {
  const { translate } = useTranslation();
  const { toast } = useToast();

  const [successModal, setSuccessModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [ivrModal, setIvrModal] = useState(false);

  const showError = (message: string) =>
    toast({ title: message, type: "destructive" });

  const showSuccess = (message: string) =>
    toast({ title: message, type: "success" });

  const showInfo = (message: string) => toast({ title: message });

  const {
    formData,
    updateForm,
    step,
    setStep,
    setApplId,
    applId,
    showNafathModal,
    setShowNafathModal,
  } = useContext(FormContext);

  const {
    verificationLoading,
    statusLoading,
    initiateNafathVerification,
    checkNafathStatus,
    handleSubmitPersonalInfo,
    handleSubmitEligibilityDetails,
    handleSubmitApplication,
    handleSendIvr,
    nafathVerified,
  } = useNafathVerification();

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const handleStepZero = useCallback(
    async (values: FormValues) => {
      updateForm(values);

      // toast({ title: translate("VALIDATION.INITIATING") });

      const res = await initiateNafathVerification({
        formValues: values,
        merchantId,
      });

      if (res?.success) {
        toast({
          title: translate("VALIDATION.REQUEST_SENT"),
          description: translate("VALIDATION.APPROVE_FROM_APP"),
        });

        setVerificationCode(res.data?.random);
        setShowNafathModal(true);
        return;
      }
      console.log("User Registration Check Response:", res);
      if (res?.isUserRegistered) {
        const redirectStep = res?.data?.redirect === "PERSONAL_INFO" ? 1 : 3;

        setStep(redirectStep);
      }
    },
    [initiateNafathVerification, merchantId]
  );

  const handleSubmitByStep = async (values: FormValues) => {
    switch (step) {
      case 0:
        await handleStepZero(values);
        break;

      case 1:
        await handleSubmitPersonalInfo({ formValues: values });
        showSuccess(translate("FORM.PERSONAL_INFO_SAVED"));
        setStep(2);
        break;

      case 2: {
        const res = await handleSubmitEligibilityDetails({
          formValues: values,
          merchantId,
        });

        if (!res?.success) {
          toast({
            title: translate("COMMON.GENERIC_ERROR"),
            type: "destructive",
          });
          return;
        }
        showSuccess(translate("ELIGIBILITY.SUCCESS"));
        updateForm(values);
        setSuccessModal(true);
        setStep(3);
        break;
      }

      case 3: {
        try {
          
          const res = await handleSubmitApplication({
            formValues: values,
            product,
            merchantId,
          });

          console.log("Application Submission Response:", res);

          if (res?.success) {
            showSuccess(translate("VALIDATION.SUBMITTED_SUCCESS"));
            setApplId(res.data.applId);
            setIvrModal(true);
          } else {
            showError(translate("VALIDATION.SUBMITTED_FAILED"));
          }
        } catch (error) {
          if((error as any)?.data?.message)
            showSuccess(
              (error as any)?.data?.message || translate("COMMON.GENERIC_ERROR")
            );
          else 
            showError(translate("COMMON.GENERIC_ERROR"));
        }
        break;
      }
    }
  };

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    const { setSubmitting, validateForm, setTouched } = helpers;

    const errors = await validateForm();
    if (Object.keys(errors).length) {
      showError(translate("COMMON.FIX_FORM_ERRORS"));

      setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      setSubmitting(false);
      return;
    }

    await handleSubmitByStep(values);
    setSubmitting(false);
  };

  const handleNafathNext = async () => {
    toast({ title: translate("VALIDATION.CHECKING_STATUS") });

    const res = await checkNafathStatus({
      nationalId: formData.nationalId,
      phone: formData.phone,
      email: formData.email,
      dob: formData.dob,
    });

    if (res.success && nafathVerified) {
      showSuccess(translate("VALIDATION.VERIFIED"));
      setShowNafathModal(false);
      setStep((s) => s + 1);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                    UI                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Header translate={translate} step={step} />

      {step <= 2 && <Steps step={step} />}

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchemas(translate)[step]}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {step === 0 && <BasicInfoForm />}
              {step === 1 && <AddressDetailForm />}
              {step === 2 && <NafathVerificationForm values={values} />}
              {step > 2 && <LoanDetails />}
            </div>

            <Actions
              step={step}
              isSubmitting={isSubmitting}
              verificationLoading={verificationLoading}
              translate={translate}
              onBack={() => {
                setStep((s) => s - 1);
                setShowNafathModal(false);
              }}
            />
          </Form>
        )}
      </Formik>

      <NafathVerificationModal
        isOpen={showNafathModal}
        code={verificationCode}
        isLoading={statusLoading}
        isVerificationComplete={nafathVerified}
        onClose={() => setShowNafathModal(false)}
        onNextStep={handleNafathNext}
      />

      <SuccessModal
        isOpen={successModal}
        title={translate("ACCOUNT.CREATED_SUCCESS")}
        subTitle={translate("ACCOUNT.CREATED_SUCCESS_MESSAGE")}
        lowerTitle={translate("ACCOUNT.PROCEED_NEXT")}
        onClose={() => setSuccessModal(false)}
      />

      <IvrModal
        isOpen={ivrModal}
        onClose={() => setIvrModal(false)}
        sendIvr={async () => {
          const res = await handleSendIvr(applId);
          console.log("IVR Response:", res);
          if (res?.success) {
            showSuccess(translate("IVR.SENT_SUCCESS"));
            setIvrModal(false);
          } else {
            showError(translate("IVR.SENT_FAILED"));
          }
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Helper Components                              */
/* -------------------------------------------------------------------------- */

const Header = ({
  translate,
  step,
}: {
  translate: (k: string) => string;
  step: number;
}) => {
  const isLoanStep = step > 2;

  return (
    <div className="text-center mb-10">
      <h1 className="text-2xl font-bold text-gray-800">
        {translate(isLoanStep ? "LOAN.DETAILS" : "TITLE.APPLY_ONLINE")}
      </h1>
      <p className="text-gray-500 mt-2">
        {translate(isLoanStep ? "LOAN.ENTER_DETAILS" : "TITLE.FILL_FORM")}
      </p>
    </div>
  );
};

const Actions = ({
  step,
  isSubmitting,
  verificationLoading,
  translate,
  onBack,
}: {
  step: number;
  isSubmitting: boolean;
  verificationLoading: boolean;
  translate: (k: string) => string;
  onBack: () => void;
}) => (
  <div className="flex justify-end gap-4">
    {step > 0 && (
      <button
        type="button"
        onClick={onBack}
        className="px-8 py-2 rounded-full border border-yellow-500"
      >
        {translate("BUTTON.BACK")}
      </button>
    )}

    <button
      type="submit"
      disabled={isSubmitting || verificationLoading}
      className="px-8 py-2 rounded-full bg-yellow-500"
    >
      {step < 2 ? translate("BUTTON.NEXT") : translate("BUTTON.SUBMIT")}
    </button>
  </div>
);

function Steps({ step }: { step: number }) {
  return (
    <div className="flex min-w-0 items-center justify-between mb-12 md:container mx-auto gap-2 md:gap-6">
      {/* Step 1 */}
      <img
        className="w-[26px] md:w-[50px] h-[26px] md:h-[50px]"
        src={step >= 1 ? checked : done}
        alt="Steps"
      />
      <div className="flex-grow rounded-lg h-[3px] md:h-[8px] bg-gray-200 relative ">
        <div
          className="absolute start-0 rounded-lg top-0  h-[3px] md:h-[8px] bg-primary transition-all duration-300"
          style={{ width: step >= 1 ? "100%" : "0%" }}
        />
      </div>

      {/* Step 2 */}

      <img
        src={step >= 2 ? checked : done}
        alt="Steps"
        className="w-[26px] md:w-[50px] h-[26px] md:h-[50px]"
      />

      <div className="flex-grow rounded-lg h-[3px] md:h-[8px] bg-gray-200 relative ">
        <div
          className="absolute start-0 rounded-lg top-0  h-[3px] md:h-[8px] bg-primary transition-all duration-300"
          style={{ width: step >= 2 ? "100%" : "0%" }}
        />
      </div>

      {/* Step 3 */}
      <img
        src={step >= 3 ? checked : done}
        alt="Steps"
        className="w-[26px] md:w-[50px] h-[26px] md:h-[50px]"
      />
    </div>
  );
}
