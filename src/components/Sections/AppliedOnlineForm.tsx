"use client";

import { useTranslation } from "@/i18n";
import Image from "next/image";
import { useState } from "react";
import { Formik, Form } from "formik";
import NafathVerificationModal from "../shared/CustomModal";
import SuccessModal from "../shared/SuccessModal";
import BasicInfoForm from "./Forms/BasicInfoForm";
import AddressDetailForm from "./Forms/AddressDetailForm";
import NafathVarificationForm from "./Forms/NafathVerificationForm";
import { validationSchemas } from "@/lib/schemas";

export default function ApplyOnlineForm({
  onHandleFinalSubmit,
}: {
  onHandleFinalSubmit: () => void;
}) {
  const { translate } = useTranslation();
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const initialValues = {
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
    food: "",
    housing: "",
    domestic: "",
    educationExpenses: "",
    healthcare: "",
    transport: "",
    insurance: "",
    future: "",
    total: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, validateForm, setTouched }: any
  ) => {
    const errors = await validateForm();
    if (step === 0) {
      setShowModal(true);
      return;
    }
    if (Object.keys(errors).length === 0) {
      if (step < 2) {
        setStep((prev) => prev + 1);
      } else {
        console.log("Final Submit", values);
        setShowSuccessModal(true);
      }
    } else {
      setTouched(
        Object.keys(errors).reduce((acc: any, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-gray-800">
          {translate("TITLE.APPLY_ONLINE")}
        </h1>
        <p className="text-gray-500 mt-2">
          {translate("TITLE.FILL_FORM")}
        </p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between mb-12">
        {/* Step 1 */}
        <div className="flex-1 flex flex-col items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full`}
          >
            <Image
              src={`/assets/svgs/${
                step >= 1 ? "checked-step" : "done-step"
              }.svg`}
              alt="Steps"
              width={50}
              height={50}
            />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700 whitespace-nowrap">
            {translate("APPLIED_ONLINE.GENERAL_INFO")}
          </p>
        </div>

        <div className="flex-2 rounded-lg h-[8px] bg-gray-200 relative mb-5">
          <div
            className="absolute left-0 rounded-lg top-0 h-[8px] bg-yellow-500 transition-all duration-300"
            style={{ width: step >= 2 ? "100%" : "0%" }}
          />
        </div>

        {/* Step 2 */}
        <div className="flex-1 flex flex-col items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full`}
          >
            <Image
              src={`/assets/svgs/${
                step >= 2 ? "checked-step" : "done-step"
              }.svg`}
              alt="Steps"
              width={50}
              height={50}
            />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700 whitespace-nowrap">
            {translate("APPLIED_ONLINE.PERSONAL_DETAILS")}
          </p>
        </div>

        <div className="flex-2 rounded-lg h-[8px] bg-gray-200 relative mb-5">
          <div
            className="absolute left-0 rounded-lg top-0 h-[8px] bg-yellow-500 transition-all duration-300"
            style={{ width: step >= 3 ? "100%" : "0%" }}
          />
        </div>

        {/* Step 3 */}
        <div className="flex-1 flex flex-col items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full`}
          >
            <Image
              src={`/assets/svgs/${
                step >= 3 ? "checked-step" : "done-step"
              }.svg`}
              alt="Steps"
              width={50}
              height={50}
            />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700 whitespace-nowrap">
            {translate("APPLIED_ONLINE.ELIGIBILITY")}
          </p>
        </div>
      </div>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[step]}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {step === 0 ? (
                <BasicInfoForm />
              ) : step === 1 ? (
                <AddressDetailForm />
              ) : step === 2 ? (
                <NafathVarificationForm values={values} />
              ) : (
                ""
              )}
            </div>

            {/* Button */}
            <div className="flex justify-end gap-4">
              {step >= 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep((prev) => Math.min(prev - 1, 3));
                    setShowModal(false);
                  }}
                  className="px-8 py-2 rounded-full border-1 text-gray-700 border-yellow-500 hover:bg-yellow-600 font-medium transition"
                >
                  {translate("BUTTON.BACK")}
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition"
              >
                {step < 2 ? translate("BUTTON.NEXT") : translate("BUTTON.SUBMIT")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <NafathVerificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onNextStep={() => setStep((prev) => prev + 1)}
      />
      <SuccessModal
        title={translate("ACCOUNT.CREATED_SUCCESS")}
        subTitle={translate("ACCOUNT.CREATED_SUCCESS_MESSAGE")}
        lowerTitle={translate("ACCOUNT.PROCEED_NEXT")}
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onHandleFinalSubmit();
        }}
      />
    </div>
  );
}
