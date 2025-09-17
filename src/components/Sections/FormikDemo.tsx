"use client";

import { useTranslation } from "@/i18n";
import Image from "next/image";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
    pep: Yup.string().required("PEP answer required"),
    beneficiary: Yup.string().required("Beneficiary answer required"),
    relationship: Yup.string().required("Relationship answer required"),
  }),
];

export default function ApplyOnlineForm2() {
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

  const handleSubmit = async (values: typeof initialValues, { setSubmitting, validateForm, setTouched }: any) => {
    const errors = await validateForm();

    if (Object.keys(errors).length === 0) {
      // ✅ No errors, move to next step
      if (step < 2) {
        setStep((prev) => prev + 1);
      } else {
        console.log("Final Submit", values);
      }
    } else {
      // ❌ Show validation errors
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* Formik */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[step]}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {step === 0 && (
              <>
                <div>
                  <label className="block text-sm mb-1">National ID *</label>
                  <Field
                    name="nationalId"
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <ErrorMessage
                    name="nationalId"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Date of Birth *</label>
                  <Field
                    name="dob"
                    type="date"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Phone *</label>
                  <Field
                    name="phone"
                    type="tel"
                    placeholder="9665XXXXXXXX"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm mb-1">Title *</label>
                  <Field name="title" type="text" className="w-full border rounded-md px-3 py-2" />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-xs" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Nationality *</label>
                  <Field name="nationality" type="text" className="w-full border rounded-md px-3 py-2" />
                  <ErrorMessage name="nationality" component="div" className="text-red-500 text-xs" />
                </div>
                {/* Repeat for gender, region, city, maritalStatus, dependents */}
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm mb-1">Employment Type *</label>
                  <Field as="select" name="employmentType" className="w-full border rounded-md px-3 py-2">
                    <option value="">Select</option>
                    <option>Military</option>
                    <option>Government</option>
                    <option>Private</option>
                  </Field>
                  <ErrorMessage name="employmentType" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Radio (PEP) */}
                <div className="col-span-2">
                  <label className="block text-sm mb-2">
                    Politically exposed person?
                  </label>
                  <div className="flex gap-4">
                    <label>
                      <Field type="radio" name="pep" value="yes" /> Yes
                    </label>
                    <label>
                      <Field type="radio" name="pep" value="no" /> No
                    </label>
                  </div>
                  <ErrorMessage name="pep" component="div" className="text-red-500 text-xs" />
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="col-span-2 flex justify-end gap-4">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="px-6 py-2 border rounded-md"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-yellow-500 text-white rounded-md"
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
