import * as Yup from "yup";

export const loanDetails = Yup.object({
  tenor: Yup.number().required("Tenor is required"),
  amount: Yup.number().required("Amount is required"),
});

export const validationSchemas = (translate: any) => [
  // Step 1 validation
  Yup.object({
    nationalId: Yup.string()
      .matches(/^[0-9]+$/, translate("VALIDATION.ONLY_NUMBERS"))
      .min(10, translate("VALIDATION.MUST_BE_10_DIGITS"))
      .required(translate("VALIDATION.NATIONAL_ID_REQUIRED")),
    dob: Yup.date().required(translate("VALIDATION.DOB_REQUIRED")),
    phone: Yup.string()
      .matches(/^966[0-9]{8,10}$/, translate("VALIDATION.PHONE_FORMAT"))
      .required(translate("VALIDATION.PHONE_REQUIRED")),
    email: Yup.string().email(translate("VALIDATION.INVALID_EMAIL")).nullable(),
  }),

  // Step 2 validation
  Yup.object({
    title: Yup.string().required(translate("VALIDATION.TITLE_REQUIRED")),
    nationality: Yup.string().required(translate("VALIDATION.NATIONALITY_REQUIRED")),
    gender: Yup.string().required(translate("VALIDATION.GENDER_REQUIRED")),
    region: Yup.string().required(translate("VALIDATION.REGION_REQUIRED")),
    city: Yup.string().required(translate("VALIDATION.CITY_REQUIRED")),
    maritalStatus: Yup.string().required(translate("VALIDATION.MARITAL_STATUS_REQUIRED")),
    dependents: Yup.number()
      .min(0, translate("VALIDATION.NEGATIVE_NOT_ALLOWED"))
      .required(translate("VALIDATION.DEPENDENTS_REQUIRED")),
  }),

  // Step 3 validation
  Yup.object({
    employmentType: Yup.string().required(translate("VALIDATION.EMPLOYMENT_TYPE_REQUIRED")),
    education: Yup.string().required(translate("VALIDATION.EDUCATION_REQUIRED")),
    residentStatus: Yup.string().required(translate("VALIDATION.RESIDENT_STATUS_REQUIRED")),
    employmentSector: Yup.string().required(translate("VALIDATION.EMPLOYMENT_SECTOR_REQUIRED")),
    occupation: Yup.string().required(translate("VALIDATION.OCCUPATION_REQUIRED")),
    joiningDate: Yup.date().required(translate("VALIDATION.JOINING_DATE_REQUIRED")),
    pep: Yup.string().required(translate("VALIDATION.PEP_REQUIRED")),
    beneficiary: Yup.string().required(translate("VALIDATION.BENEFICIARY_REQUIRED")),
    beneficiaryName: Yup.string().when("beneficiary", {
      is: "no",
      then: (schema) => schema.required(translate("VALIDATION.BENEFICIARY_NAME_REQUIRED")),
      otherwise: (schema) => schema.notRequired(),
    }),
    relationship: Yup.string().required(translate("VALIDATION.RELATIONSHIP_REQUIRED")),
    relationshipPosition: Yup.string().when("relationship", {
      is: "yes",
      then: (schema) => schema.required(translate("VALIDATION.RELATIONSHIP_POSITION_REQUIRED")),
      otherwise: (schema) => schema.notRequired(),
    }),
    food: Yup.string().required(translate("VALIDATION.FOOD_REQUIRED")),
    housing: Yup.string().required(translate("VALIDATION.HOUSING_REQUIRED")),
    domestic: Yup.string().required(translate("VALIDATION.DOMESTIC_REQUIRED")),
    educationExpenses: Yup.string().required(translate("VALIDATION.EDUCATION_EXPENSES_REQUIRED")),
    healthcare: Yup.string().required(translate("VALIDATION.HEALTHCARE_REQUIRED")),
    transport: Yup.string().required(translate("VALIDATION.TRANSPORT_REQUIRED")),
    insurance: Yup.string().required(translate("VALIDATION.INSURANCE_REQUIRED")),
    future: Yup.string().required(translate("VALIDATION.FUTURE_REQUIRED")),
    total: Yup.string().required(translate("VALIDATION.TOTAL_REQUIRED")),
  }),
];