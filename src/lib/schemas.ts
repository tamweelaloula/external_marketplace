import * as Yup from "yup";

export const loanDetails = Yup.object({
  tenor: Yup.number().required("Tenor is required"),
  amount: Yup.number().required("Amount is required"),
});

export const validationSchemas = [
  // Step 1 validation
  Yup.object({
    nationalId: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers allowed")
      .min(10, "Must be 10 digits")
      .required("National ID is required"),
    dob: Yup.date().required("Date of birth is required"),
    phone: Yup.string()
      .matches(/^966[0-9]{8,10}$/, "Must start with 966 and be 11–13 digits")
      .required("Phone is required"),
    email: Yup.string().email("Invalid email").nullable(),
  }),
  // Step 2 validation
  Yup.object({
    title: Yup.string().required("Title is required"),
    nationality: Yup.string().required("Nationality is required"),
    gender: Yup.string().required("Gender is required"),
    region: Yup.string().required("Region is required"),
    city: Yup.string().required("City is required"),
    maritalStatus: Yup.string().required("Marital status is required"),
    dependents: Yup.number()
      .min(0, "Cannot be negative")
      .required("Dependents required"),
  }),
  // Step 3 validation
  Yup.object({
    employmentType: Yup.string().required("Employment type is required"),
    education: Yup.string().required("Education level is required"),
    residentStatus: Yup.string().required("Resident status is required"),
    employmentSector: Yup.string().required("Employment sector is required"),
    occupation: Yup.string().required("Occupation is required"),
    joiningDate: Yup.date().required("Joining date is required"),
    pep: Yup.string().required("PEP answer required"),
    beneficiary: Yup.string().required("Beneficiary answer required"),
    beneficiaryName: Yup.string().when("beneficiary", {
      is: "no",
      then: (schema) => schema.required("Beneficiary name required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    relationship: Yup.string().required("Relationship answer required"),
    relationshipPosition: Yup.string().when("relationship", {
      is: "yes",
      then: (schema) => schema.required("Relationship position is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    food: Yup.string().required("Food Expenses is required"),
    housing: Yup.string().required("Housing Expenses is required"),
    domestic: Yup.string().required("Domestic Expenses is required"),
    educationExpenses: Yup.string().required("Education Expenses is required"),
    healthcare: Yup.string().required("Health Care Expenses is required"),
    transport: Yup.string().required(
      "Communication and Transportation Expenses is required"
    ),
    insurance: Yup.string().required("Insurance Expenses is required"),
    future: Yup.string().required("Any Expected future Expenses is required"),
    total: Yup.string().required("Total Expenses is required"),
  }),
];
