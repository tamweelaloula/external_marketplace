import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { convertToHijri, formatDateToDDMMYYYY, normalizeDob } from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const nafathApi = createApi({
  reducerPath: "nafathApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    nafathVerification: builder.mutation({
      query: ({ nationalId, deviceId, merchantId }) => ({
        url: "/auth/validate-id",
        method: "POST",
        body: {
          iqamaId: nationalId,
          merchantId,
          deviceId,
        },
      }),
    }),

    getNafathStatus: builder.mutation({
      query: ({ nationalId, merchantData, sessionId }) => ({
        url: "/auth/get-status",
        method: "POST",
        body: {
          iqamaId: nationalId,
          transId: merchantData?.transId,
          code: merchantData?.random,
          merchantId: merchantData?.merchantId,
          sessionId,
          sessionToken: merchantData?.sessionToken,
        },
      }),
    }),

    validatePhone: builder.mutation({
      query: ({ values, merchantData }) => ({
        url: "/auth/validate-tahqoq-info",
        method: "POST",
        body: {
          iqamaId: values?.nationalId,
          phone: values?.phone,
          sessionId: merchantData?.sessionId,
          merchantId: merchantData?.merchantId,
          sessionToken: merchantData?.sessionToken,
          deviceType: "desktop",
        },
      }),
    }),

    userWebId: builder.mutation({
      query: ({ nationalId, merchantData }) => ({
        url: "/auth/get-user-id",
        method: "POST",
        body: {
          userId: nationalId,
          sessionId: merchantData?.sessionId,
          sessionToken: merchantData?.sessionToken,
          deviceType: "desktop",
          merchantId: merchantData?.merchantId,
        },
      }),
    }),

    userRegister: builder.mutation({
      query: ({ values, merchantData, deviceId }) => {
        const dob = normalizeDob(values?.dob);

        return {
          url: "/auth/register",
          method: "POST",
          body: {
            iqamaId: values?.nationalId,
            phone: values?.phone,
            email: values?.email,

            dobHijri: dob ? convertToHijri(dob) : null,
            dobGeorgian: dob ? formatDateToDDMMYYYY(dob) : null,

            sessionId: merchantData?.sessionId,
            sessionToken: merchantData?.sessionToken,
            transId: merchantData?.transId,
            deviceId,
            deviceType: "desktop",
            source: "MARKETPLACE",
            merchantId: merchantData?.merchantId,
          },
        };
      },
    }),

    submitPersonalDetails: builder.mutation({
      query: ({ values, merchantData, id }) => ({
        url: "/app/update-general-info",
        method: "POST",
        body: {
          id,
          iqamaId: values?.nationalId,
          titleId: values?.title,
          gender: values?.gender,
          nationalityId: values?.nationality,
          maritalStatus: values?.maritalStatus,
          dependants: values?.dependents,
          city: values?.city,
          region: values?.region,

          merchantId: merchantData?.merchantId || 554,
          sessionToken: merchantData?.sessionToken,
          sessionId: merchantData?.sessionId,

          deviceType: "desktop",
        },
      }),
    }),

    submitEligibilityDetails: builder.mutation({
  query: ({ values, merchantData, id }) => {
    const payload: any = {
      id: Number(id),

      sessionId: merchantData?.sessionId,
      sessionToken: merchantData?.sessionToken,
      merchantId: Number(merchantData?.merchantId),
      deviceType: "desktop",

      employmentType: Number(values.employmentType),
      educationLevel: Number(values.education),
      residentStatus: Number(values.residentStatus),
      employmentSector: Number(values.employmentSector),
      occupationId: Number(values.occupation),

      joiningDate: formatDateToDDMMYYYY(values.joiningDate),

      totalExpenses: Number(values.total),
      foodExpenses: Number(values.food),
      housingExpenses: Number(values.housing),
      domesticWorkers: Number(values.domestic),
      educationExpenses: Number(values.educationExpenses),
      healthcareExpenses: Number(values.healthcare),
      commTransExpenses: Number(values.transport),
      insuranceExpenses: Number(values.insurance),
      futureExpenses: Number(values.future),

      pep: values.pep === "Y",
      beneficiary: values.beneficiary === "Y",
      relatedPartyBoolean: values.relationship === "Y",
    };

    // beneficiaryName required when beneficiary === false
    if (payload.beneficiary === false) {
      payload.beneficiaryName = values.beneficiaryName;
    }

    // partyId required when relatedPartyBoolean === true
    if (payload.relatedPartyBoolean === true) {
      payload.partyId = Number(values.relationshipPosition);
    }

    return {
      url: "/app/update-eligibility",
      method: "POST",
      body: payload,
    };
  },
}),
    submitApplication: builder.mutation({
      query: (args) => {
        if (!args) {
          throw new Error("submitApplication called with null args");
        }

        const {
          values,
          merchantData,
          id,
          product: data,
          categoryId,
          assetId,
        } = args;
        console.log("submitApplication args:", data?.vehicle?.model_year);
        if (!merchantData.sessionId) {
          throw new Error("sessionId is missing in submitApplication");
        }

        const isVehicle = categoryId === "1218";

        const payload: any = {
          id,
          idNumber: values?.nationalId,
          idType: values?.nationalId?.slice(0, 1) == "1" ? "NID" : "Q", //if starts with 1 then NID, if 2 then
          source: "MARKETPLACE",
          sessionId: merchantData?.sessionId,
          sessionToken: merchantData?.sessionToken,
          deviceType: "desktop",
          merchantId: merchantData?.merchantId,
          merchantCategoryId: Number(categoryId),
          details: {
            productId: isVehicle ? 217 : 330,
            subproductId: isVehicle ? 250 : 367,
            applStatus: "D",
            tenure: values?.tenure,
            request_amount: isVehicle ? values?.requestedAmount : undefined,
            lat: values?.lat || "",
            long: values?.long || "",
            assetId: isVehicle ? values?.assetId : undefined,
            assetModelYear: isVehicle ? data?.vehicle?.model_year : undefined,
            colorId: isVehicle ? data?.vehicle?.color : undefined,
            assetPrice: isVehicle ? data?.price : undefined,
            ballonPayment: isVehicle ? values?.ballonPayment : undefined
          }
        }


        // Non-vehicle flow
        if (!isVehicle) {
          payload.details.request_amount = values?.requestedAmount;
        }

        // Vehicle flow
        if (isVehicle) {
          Object.assign(payload.details, {
            assetId,
            colorId: data?.vehicle?.color,
            assetModelYear: data?.vehicle?.model_year,
            assetPrice: data?.price,
            downPayment: values?.requestedAmount,
            ballonPayment: values?.ballonPayment,
          });
        }

        return {
          url: "/app/submit-application",
          method: "POST",
          body: payload, // no JSON.stringify
        };
      },
    }),
    sendIvr: builder.mutation<any, string>({
      query: (appId) => ({
        url: `/app/verify-ivr-approval/${appId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useNafathVerificationMutation,
  useGetNafathStatusMutation,
  useValidatePhoneMutation,
  useUserRegisterMutation,
  useSubmitPersonalDetailsMutation,
  useUserWebIdMutation,
  useSubmitEligibilityDetailsMutation,
  useSubmitApplicationMutation,
  useSendIvrMutation,
} = nafathApi;
