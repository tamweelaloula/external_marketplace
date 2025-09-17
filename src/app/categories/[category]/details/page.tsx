"use client";

import { useRef, useState } from "react";
import ApplyOnlineForm from "@/components/Sections/AppliedOnlineForm";
import ProductDetail from "@/components/Sections/ProductViewSection";
import ProductTabs from "@/components/Sections/TabsSection";
import CustomCarousel from "@/components/shared/CustomCarousel";
import FormikField from "@/components/shared/FormikFieldInput";
import FormikFieldSelect from "@/components/shared/FormikFieldSelect";
import { Form, Formik } from "formik";

export default function DetailPage() {
  const [show, setShow] = useState(false);
  const [showLoanScreen, setShowLoanScreen] = useState(false);
  const applyFormRef = useRef<HTMLDivElement | null>(null);
  const initialValues = {
    tenor: "",
    amount: 0,
  };
  const handleScrollToForm = () => {
    setShow(true);
    applyFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background py-16 px-32 space-y-16">
      {/* Product Details Section with button */}
      <ProductDetail onClick={handleScrollToForm} />

      {/* Tabs Section */}
      <ProductTabs />

      {/* Apply Online Section */}
      <div ref={applyFormRef}>
        {show && !showLoanScreen && (
          <ApplyOnlineForm
            onHandleFinalSubmit={() => setShowLoanScreen(true)}
          />
        )}
      </div>

      {showLoanScreen && (
        <>
          <div className="text-start mb-10">
            <h1 className="text-2xl font-bold text-gray-800">Loan Details</h1>
            <p className="text-gray-500 mt-2">Kindly enter the loan details</p>
          </div>

          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchemas[step]}
            onSubmit={() => {}}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <FormikFieldSelect
                    value="2"
                    options={["1", "2", "3", "4"]}
                    title="Tenor"
                    name="tenor"
                  />
                  <FormikField
                    type="number"
                    placeholder="500"
                    title="Tenor"
                    name="amount"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
      {/* Related Products Carousel */}
      <CustomCarousel title="RELATED_PRODUCT" />
    </div>
  );
}
