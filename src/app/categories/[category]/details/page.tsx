"use client";

import { useRef, useState } from "react";
import ApplyOnlineForm from "@/components/Sections/AppliedOnlineForm";
import ProductDetail from "@/components/Sections/ProductViewSection";
import ProductTabs from "@/components/Sections/TabsSection";
import CustomCarousel from "@/components/shared/CustomCarousel";
import FormikField from "@/components/shared/FormikFieldInput";
import FormikFieldSelect from "@/components/shared/FormikFieldSelect";
import { Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n";
import SuccessModal from "@/components/shared/SuccessModal";
import { loanDetails } from "@/lib/schemas";

export default function DetailPage() {
  const [show, setShow] = useState(false);
  const [showLoanScreen, setShowLoanScreen] = useState(false);
  const { translate } = useTranslation();
  const [showApplicationSuccessModal, setShowApplicationSuccessModal] =
    useState(false);
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
    <div className="min-h-screen bg-background space-y-12 md:space-y-16 px-4 sm:px-6 lg:px-12">
      {/* Product Details Section with button */}
      <ProductDetail onClick={handleScrollToForm} />

      {/* Tabs Section */}
      <ProductTabs />

      {/* Apply Online Section */}
      <div ref={applyFormRef}>
        {show && !showLoanScreen && (
          <ApplyOnlineForm onHandleFinalSubmit={() => setShowLoanScreen(true)} />
        )}
      </div>

      {showLoanScreen && (
        <>
          <div className="text-start mb-8 md:mb-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {translate("LOAN.DETAILS")}
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2">
              {translate("LOAN.ENTER_DETAILS")}
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={loanDetails}
            onSubmit={() => {
              setShowApplicationSuccessModal(true);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <FormikFieldSelect
                    value="2"
                    options={["1", "2", "3", "4"]}
                    title={translate("LOAN.TENOR")}
                    name="tenor"
                    required
                  />
                  <FormikField
                    type="number"
                    placeholder="500"
                    title={translate("LOAN.AMOUNT")}
                    required
                    name="amount"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    className="rounded-full w-full sm:w-auto px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                    type="submit"
                  >
                    {translate("BUTTON.APPLY")}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}

      {/* Related Products Carousel */}
      <CustomCarousel title="RELATED_PRODUCT" />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showApplicationSuccessModal}
        noClose
        buttonTitle="CONTINUE"
        title={translate("APPLICATION.SUBMITTED")}
        subTitle={translate("APPLICATION.SUBMITTED_SUCCESS_MESSAGE")}
        lowerTitle={translate("APPLICATION.WAIT_APPROVAL")}
        onClose={() => {
          setShowApplicationSuccessModal(false);
        }}
      />
    </div>
  );
}
