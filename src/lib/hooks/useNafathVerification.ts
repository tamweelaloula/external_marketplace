import { useContext, useCallback, useState } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { useUserIdentifiers } from "@/lib/hooks/useUserIdentifiers";
import { FormContext } from "@/lib/contexts/ApplyContext";

import {
  useNafathVerificationMutation,
  useGetNafathStatusMutation,
  useValidatePhoneMutation,
  useUserRegisterMutation,
  useSubmitPersonalDetailsMutation,
  useSubmitEligibilityDetailsMutation,
  useSubmitApplicationMutation,
  useSendIvrMutation,
  useUserWebIdMutation,
} from "@/lib/services/nafathApi";
import { useTranslation } from "@/i18n";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type NafathStatus = "EXPIRED" | "WAITING" | "REJECTED" | "COMPLETED";

interface InitiateArgs {
  formValues: { nationalId: string };
  merchantId: string;
}

interface CommonUserArgs {
  nationalId: string;
  phone: string;
  email: string;
  dob: string;
}

/* -------------------------------------------------------------------------- */
/*                                    Hook                                    */
/* -------------------------------------------------------------------------- */

export const useNafathVerification = () => {
  const { translate } = useTranslation();
  const { deviceId } = useUserIdentifiers();
  const { toast } = useToast();

  const {
    merchantData,
    setMerchantData,
    setStep,
    sessionId,
    setSessionId,
    setShowNafathModal,
  } = useContext(FormContext);

  const [nafathVerified, setNafathVerified] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [idbUsrId, setIdbUsrId] = useState("");

  /* ------------------------------- Mutations ------------------------------- */

  const [initiateNafath, { isLoading: verificationLoading }] =
    useNafathVerificationMutation();

  const [checkStatus, { isLoading: statusLoading }] =
    useGetNafathStatusMutation();

  const [validatePhone, { isLoading: phoneVerificationLoading }] =
    useValidatePhoneMutation();

  const [registerUser] = useUserRegisterMutation();
  const [submitPersonalDetails] = useSubmitPersonalDetailsMutation();
  const [submitEligibilityDetails] = useSubmitEligibilityDetailsMutation();
  const [submitApplication] = useSubmitApplicationMutation();
  const [sendIvr] = useSendIvrMutation();
  const [userWebId] = useUserWebIdMutation();

  /* -------------------------------------------------------------------------- */
  /*                                  Helpers                                   */
  /* -------------------------------------------------------------------------- */

  const handleError = useCallback(
    (message: string) => {
      setVerificationError(message);
      toast({ title: message, type: "destructive" });
    },
    [toast]
  );

  /* -------------------------------------------------------------------------- */
  /*                             Initiate Nafath                                */
  /* -------------------------------------------------------------------------- */

  const initiateNafathVerification = useCallback(
    async ({ formValues, merchantId }: InitiateArgs) => {
      try {
        const res = await initiateNafath({
          nationalId: formValues.nationalId,
          merchantId,
          deviceId,
        }).unwrap();

        setMerchantData(res);
        setSessionId(res.sessionId);

        return { success: true, data: res };
      } catch (err: any) {
        const apiData = err?.data;

        if (err?.status === 409 && apiData?.isUserRegistered) {
          const webId = await userWebId({
            nationalId: formValues.nationalId,
            merchantData: { ...apiData, merchantId },
            sessionId,
          }).unwrap();

          setIdbUsrId(webId?.data?.idbUsrId);
          setMerchantData(apiData);
          setSessionId(apiData.sessionId);
          toast({ title: translate("VALIDATION.ALREADY_REGISTERED"), type: "success" });
          return { success: false, isUserRegistered: true, data: apiData };
        }

        handleError(apiData?.error?.message || "Verification failed");
        return { success: false };
      }
    },
    [deviceId, initiateNafath, userWebId, sessionId, handleError]
  );

  /* -------------------------------------------------------------------------- */
  /*                              Check Nafath Status                            */
  /* -------------------------------------------------------------------------- */

  const checkNafathStatus = useCallback(
    async ({ nationalId, phone, email, dob }: CommonUserArgs) => {
      try {
        const res = await checkStatus({
          nationalId,
          merchantData,
          sessionId,
        }).unwrap();

        switch (res.status as NafathStatus) {
          case "WAITING":
            toast({ title: "Waiting for Nafath approval" });
            break;

          case "REJECTED":
          case "EXPIRED":
            handleError("Verification expired or rejected");
            break;

          case "COMPLETED":
            setNafathVerified(true);
            await verifyPhone({ nationalId, phone, email, dob });
            break;
        }

        return { success: true };
      } catch {
        handleError("Failed to check Nafath status");
        return { success: false };
      }
    },
    [checkStatus, merchantData, sessionId, handleError]
  );

  /* -------------------------------------------------------------------------- */
  /*                               Verify Phone                                 */
  /* -------------------------------------------------------------------------- */

  const verifyPhone = useCallback(
    async ({ nationalId, phone, email, dob }: CommonUserArgs) => {
      try {
        const res = await validatePhone({
          values: { nationalId, phone },
          merchantData,
          sessionId,
        }).unwrap();

        if (!res?.isOwner) {
          handleError("Phone number does not belong to user");
          return { success: false };
        }

        setShowNafathModal(false);
        setStep(1);

        await registerGeneralInfo({ nationalId, phone, email, dob });

        const webId = await userWebId({
          nationalId,
          merchantData: res,
          sessionId,
        }).unwrap();

        setIdbUsrId(webId?.data?.idbUsrId);
        return { success: true };
      } catch {
        handleError("Phone verification failed");
        return { success: false };
      }
    },
    [validatePhone, merchantData, sessionId, handleError]
  );

  /* -------------------------------------------------------------------------- */
  /*                               Registration                                 */
  /* -------------------------------------------------------------------------- */

  const registerGeneralInfo = async (args: CommonUserArgs) => {
    try {
      const res = await registerUser({
        values: args,
        merchantData,
        deviceId,
        sessionId,
        src: "MARKETPLACE",
      }).unwrap();

      return { success: true, data: res?.data };
    } catch {
      handleError("Registration failed");
      return { success: false };
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                            Submit Form Steps                                */
  /* -------------------------------------------------------------------------- */

  const handleSubmitPersonalInfo = async ({ formValues }: { formValues: any }) =>
    submitPersonalDetails({
      values: formValues,
      merchantData,
      id: idbUsrId,
    }).unwrap();

  const handleSubmitEligibilityDetails = async ({
    formValues,
    merchantId,
  }: {
    formValues: any;
    merchantId: string;
  }) =>
    submitEligibilityDetails({
      values: formValues,
      merchantData: { ...merchantData, merchantId },
      id: idbUsrId,
    }).unwrap();

  const handleSubmitApplication = async ({
    formValues,
    product,
    merchantId,
  }: {
    formValues: any;
    product: any;
    merchantId: string;
  }) =>
    submitApplication({
      values: formValues,
      merchantData: { ...merchantData, merchantId },
      product,
      id: idbUsrId,
      categoryId: "1218",
      assetId: "0",
    }).unwrap();

  const handleSendIvr = async (appId: string) =>
    sendIvr(appId).unwrap();

  /* -------------------------------------------------------------------------- */
  /*                                   Reset                                    */
  /* -------------------------------------------------------------------------- */

  const resetVerification = () => {
    setVerificationError(null);
    setNafathVerified(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Return                                   */
  /* -------------------------------------------------------------------------- */

  return {
    verificationLoading,
    statusLoading,
    phoneVerificationLoading,

    verificationError,
    nafathVerified,

    initiateNafathVerification,
    checkNafathStatus,
    verifyPhone,
    registerGeneralInfo,
    resetVerification,

    handleSubmitPersonalInfo,
    handleSubmitEligibilityDetails,
    handleSubmitApplication,
    handleSendIvr,

    verificationCode: merchantData?.random,
    isVerificationComplete: nafathVerified,
  };
};
