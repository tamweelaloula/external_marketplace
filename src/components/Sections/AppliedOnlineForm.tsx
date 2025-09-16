"use client";

import { useTranslation } from "@/i18n";
import Image from "next/image";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../shared/FormikFieldInput";
import FormikFieldSelect from "../shared/FormikFieldSelect";
import FormikFieldRadio from "../shared/FormikFieldRadio";

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
    gender: Yup.string(),
    region: Yup.string(),
    city: Yup.string(),
    maritalStatus: Yup.string(),
    dependents: Yup.number().min(0, "Cannot be negative"),
  }),
  // Step 3 validation
  Yup.object({
    employmentType: Yup.string().required("Employment type is required"),
    education: Yup.string().required("Education level is required"),
    pep: Yup.string().required("PEP answer required"),
    beneficiary: Yup.string().required("Beneficiary answer required"),
    relationship: Yup.string().required("Relationship answer required"),
  }),
];

export default function ApplyOnlineForm() {
  const { translate } = useTranslation();
  const [step, setStep] = useState(0);

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
    relationship: "",
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

  const handleSubmit = (values: typeof initialValues) => {
    console.log("values", values);
    if (step < 2) {
      setStep((prev) => prev + 1);
    } else {
      console.log("Final Submit", values);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-gray-800">
          {translate("TITLE.APPLY_ONLINE")}
        </h1>
        <p className="text-gray-500 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa.
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
        {({ isSubmitting }) => (
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
                  <FormikField
                    title="Title"
                    required
                    name="title"
                    type="text"
                    placeholder="Enter your National ID / Iqama Number"
                  />
                  <FormikField
                    title="Nationality"
                    required
                    name="nationality"
                    type="text"
                    placeholder="Enter your National ID / Iqama Number"
                  />
                  <FormikField
                    title="Gender"
                    name="gender"
                    type="text"
                    placeholder="Select of gender"
                  />
                  <FormikField
                    title="Region"
                    name="region"
                    type="text"
                    placeholder="Enter your region"
                  />
                  <FormikField
                    title="City"
                    name="city"
                    type="text"
                    placeholder="Enter your city"
                  />
                  <FormikField
                    title="Martial Status"
                    name="maritalStatus"
                    type="text"
                    placeholder="Enter your martial status"
                  />
                  <FormikField
                    title="Number of dependents"
                    name="dependents"
                    type="text"
                    placeholder="Enter your number of dependents"
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
                    options={["Rental", "Owned"]}
                  />

                  <FormikFieldSelect
                    value="Government"
                    title="Employment Sector"
                    name="employmentSector"
                    options={["Private Sector", "Government"]}
                  />

                  <FormikFieldSelect
                    value="Manager"
                    title="Occupation"
                    name="occupation"
                    options={["Agent Sergeant", "Manager", "Engineer"]}
                  />

                  <FormikField
                    title="Joining Date"
                    name="joiningDate"
                    type="date"
                    placeholder="Enter your joining date"
                  />

                  <FormikFieldRadio
                    title="Are you a politically exposed person, or do you have a
                      relationship with a politically exposed person (PEP)?"
                    name="pep"
                  />

                  <FormikFieldRadio
                    title="Are you the real beneficiary from the finance?"
                    name="beneficiary"
                  />

                  <FormikFieldRadio
                    title="Do you have first-degree relationship with a board member,
                      committee members or senior executives?"
                    name="relationship"
                  />

                  <>
                    <div></div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Financial Details
                    </h3>
                    <div></div>

                    <FormikField
                      title="Food Expenses"
                      name="food"
                      type="number"
                      placeholder="0"
                    />
                    <FormikField
                      title="Housing Expenses"
                      name="housing"
                      type="number"
                      placeholder="0"
                    />

                    <FormikField
                      title="Domestic Expenses"
                      name="domestic"
                      type="number"
                      placeholder="0"
                    />

                    <FormikField
                      title="Education Expenses"
                      name="educationExpenses"
                      type="number"
                      placeholder="0"
                    />

                    <FormikField
                      title="Health Care Expenses"
                      name="healthcare"
                      type="number"
                      placeholder="0"
                    />

                    <FormikField
                      title="Communication and Transportation Expenses"
                      name="transport"
                      type="number"
                      placeholder="0"
                    />

                    <FormikField
                      title="Insurance Expenses"
                      name="insurance"
                      type="number"
                      placeholder="0"
                    />

                    <FormikField
                      title="Any Expected future Expenses"
                      name="future"
                      type="number"
                      placeholder="0"
                    />

                    <FormikField
                      title="Total Expenses"
                      name="total"
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
                  onClick={() => setStep((prev) => Math.min(prev - 1, 3))}
                  className="px-8 py-2 rounded-full border-1 text-gray-700 border-yellow-500 hover:bg-yellow-600 font-medium transition"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition"
              >
                {step < 2 ? "Next" : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
