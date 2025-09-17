"use client";

import { useTranslation } from "@/i18n";
import Image from "next/image";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../shared/FormikFieldInput";
import FormikFieldSelect from "../shared/FormikFieldSelect";
import FormikFieldRadio from "../shared/FormikFieldRadio";
import NafathVerificationModal from "../shared/CustomModal";
import SuccessModal from "../shared/SuccessModal";

const validationSchemas = [
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

export default function ApplyOnlineForm({onHandleFinalSubmit}:{onHandleFinalSubmit:()=>void}) {
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
    if(step === 0){
      setShowModal(true)
      return
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
          Kindly fill out the form below to continue
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
            {translate("APPLIED_ONLINE.STEP1TITLE")}
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
            {translate("APPLIED_ONLINE.STEP2TITLE")}
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
            {translate("APPLIED_ONLINE.STEP3TITLE")}
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
                <>
                  <FormikField
                    title="National ID / Iqama Number"
                    name="nationalId"
                    required
                    type="text"
                    placeholder="Enter your National ID / Iqama Number"
                  />
                  <FormikField
                    title="Date of Birth"
                    name="dob"
                    required
                    type="date"
                    placeholder="Enter your National ID / Iqama Number"
                  />
                  <FormikField
                    title="Phone number"
                    name="phone"
                    required
                    type="tel"
                    placeholder="9665XXXXXXXX"
                  />
                  <FormikField
                    title="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                </>
              ) : step === 1 ? (
                <>
                  <FormikFieldSelect
                    title="Title"
                    name="title"
                    value="MR"
                    required
                    options={["MR", "Mrs"]}
                  />

                  <FormikFieldSelect
                    title="Nationality"
                    name="nationality"
                    value="Pakistani"
                    required
                    options={["Saudi", "Pakistani"]}
                  />

                  <FormikFieldSelect
                    title="Gender"
                    name="gender"
                    value="Male"
                    required
                    options={["Male", "Female"]}
                  />

                  <FormikFieldSelect
                    title="Region"
                    name="region"
                    value="Middle east"
                    required
                    options={["Middle east"]}
                  />

                  <FormikFieldSelect
                    title="City"
                    name="city"
                    value="Middle east"
                    required
                    options={["Riyadh"]}
                  />

                  <FormikFieldSelect
                    title="Martial Status"
                    name="maritalStatus"
                    value="Single"
                    required
                    options={["Single", "Married"]}
                  />

                  <FormikFieldSelect
                    title="Number of dependents"
                    name="dependents"
                    value="1"
                    required
                    options={["0", "1", "2", "3"]}
                  />
                </>
              ) : step === 2 ? (
                <>
                  <FormikFieldSelect
                    value="Military"
                    title="Employment type"
                    required
                    name="employmentType"
                    options={["Military", "Government", "Private Sector"]}
                  />
                  <FormikFieldSelect
                    value="Masters Degree"
                    title="Education Level"
                    required
                    name="education"
                    options={["Masters Degree", "Bachelors", "Diploma"]}
                  />

                  <FormikFieldSelect
                    value="Rental"
                    title="Resident Status"
                    name="residentStatus"
                    required
                    options={["Rental", "Owned"]}
                  />

                  <FormikFieldSelect
                    value="Government"
                    title="Employment Sector"
                    required
                    name="employmentSector"
                    options={["Private Sector", "Government"]}
                  />

                  <FormikFieldSelect
                    value="Manager"
                    title="Occupation"
                    required
                    name="occupation"
                    options={["Agent Sergeant", "Manager", "Engineer"]}
                  />

                  <FormikField
                    title="Joining Date"
                    name="joiningDate"
                    required
                    type="date"
                    placeholder="Enter your joining date"
                  />

                  <FormikFieldRadio
                    title="Are you a politically exposed person, or do you have a
                    relationship with a politically exposed person (PEP)?"
                    name="pep"
                    value="no"
                    required
                  />
                  <div></div>
                  <FormikFieldRadio
                    title="Are you the real beneficiary from the finance?"
                    name="beneficiary"
                    value="no"
                    required
                  />
                  <div>
                    <FormikField
                      title="Real Beneficiary name"
                      name="beneficiaryName"
                      disabled={values.beneficiary !== "no"}
                      type="text"
                      required={values.beneficiary === "no"}
                      placeholder=" Beneficiary name"
                    />
                  </div>

                  <FormikFieldRadio
                    title="Do you have first-degree relationship with a board member,
                      committee members or senior executives?"
                    name="relationship"
                    value="no"
                    required
                  />

                  <FormikFieldSelect
                    value="Grandparents"
                    title="Position"
                    name="relationshipPosition"
                    disabled={values.relationship !== "yes"}
                    required={values.relationship === "yes"}
                    options={["Grandparents", "Father", "Friend"]}
                  />

                  <>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Financial Details
                    </h3>
                    <div></div>

                    <FormikField
                      title="Food Expenses"
                      name="food"
                      required
                      type="number"
                      placeholder="0"
                    />
                    <FormikField
                      title="Housing Expenses"
                      name="housing"
                      required
                      type="number"
                      placeholder="0"
                    />

                    <FormikField
                      title="Domestic Expenses"
                      name="domestic"
                      type="number"
                      required
                      placeholder="0"
                    />

                    <FormikField
                      title="Education Expenses"
                      name="educationExpenses"
                      type="number"
                      required
                      placeholder="0"
                    />

                    <FormikField
                      title="Health Care Expenses"
                      name="healthcare"
                      type="number"
                      required
                      placeholder="0"
                    />

                    <FormikField
                      title="Communication and Transportation Expenses"
                      name="transport"
                      type="number"
                      required
                      placeholder="0"
                    />

                    <FormikField
                      title="Insurance Expenses"
                      name="insurance"
                      type="number"
                      required
                      placeholder="0"
                    />

                    <FormikField
                      title="Any Expected future Expenses"
                      name="future"
                      required
                      type="number"
                      placeholder="0"
                    />

                    <FormikField
                      title="Total Expenses"
                      name="total"
                      required
                      type="number"
                      placeholder="0"
                    />
                  </>
                </>
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
                    setStep((prev) => Math.min(prev - 1, 3))
                    setShowModal(false)
                  }}
                  className="px-8 py-2 rounded-full border-1 text-gray-700 border-yellow-500 hover:bg-yellow-600 font-medium transition"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition"
              >
                {step < 2 ? "Next" : "Submit"}
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
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onHandleFinalSubmit()
        }}
      />
    </div>
  );
}
