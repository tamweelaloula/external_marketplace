"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Formik, Form } from "formik";
import { Button } from "@/components/ui/button";
import ApplyOnlineForm from "@/components/Sections/AppliedOnlineForm";
import ProductDetail from "@/components/Sections/ProductViewSection";
import ProductTabs from "@/components/Sections/TabsSection";
import CustomCarousel from "@/components/shared/CustomCarousel";
import FormikField from "@/components/shared/FormikFieldInput";
import FormikFieldSelect from "@/components/shared/FormikFieldSelect";
import SuccessModal from "@/components/shared/SuccessModal";
import { loanDetails } from "@/lib/schemas";
import { useTranslation } from "@/i18n";
import {
  useGetProductDetailQuery,
  useGetProductImagesQuery,
  useGetRelatedProductsMutation,
} from "@/lib/services/getAllProducts";
import Loader from "@/components/shared/Loader";

export default function DetailPage() {
  const { category } = useParams();
  const merchantId = "373";
  const { translate } = useTranslation();

  // Local states
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showLoanScreen, setShowLoanScreen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const applyFormRef = useRef<HTMLDivElement | null>(null);

  // API Hooks
  const {
    data: productData,
    error: productError,
    isLoading: isProductLoading,
  } = useGetProductDetailQuery({
    merchant_id: merchantId,
    product_id: category as string,
  });

  const {
    data: imagesData,
    error: imagesError,
    isLoading: isImagesLoading,
  } = useGetProductImagesQuery({
    merchantId,
    productId: category as string,
  });

  const [getRelatedProducts, { isLoading: isRelatedLoading }] =
    useGetRelatedProductsMutation();

  // Fetch related products once product is available
  useEffect(() => {
    if (!category || !merchantId) return;
    const productId = Array.isArray(category) ? category[0] : category;

    getRelatedProducts({
      productId,
      productType: productData?.data?.product_type || "VEHICLE",
      merchantId,
    })
      .unwrap()
      .then((res) => setRelatedProducts(res.data?.products || []))
      .catch((err) => console.error("Failed to fetch related products:", err));
  }, [category, merchantId, getRelatedProducts, productData?.data?.product_type]);

  // Unified loading state (single loader for all)
  const isLoading =
    isProductLoading || isImagesLoading || isRelatedLoading;

  // Unified error handling
  const hasError = productError || imagesError;

  // Scroll to Apply form
  const handleScrollToForm = () => {
    setShowApplyForm(true);
    applyFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Loan form submit
  const handleLoanSubmit = () => {
    setShowSuccessModal(true);
  };

  const initialValues = useMemo(() => ({ tenor: "", amount: 0 }), []);

  // Loading UI
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // Error UI
  if (hasError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <div>
          <h1 className="text-lg font-semibold text-red-600">
            {translate("ERROR.FAILED_TO_LOAD")}
          </h1>
          <p className="text-gray-600 mt-2">
            {translate("ERROR.TRY_AGAIN_LATER")}
          </p>
        </div>
      </div>
    );
  }

  const product = productData?.data;

  return (
    <div className="min-h-screen bg-background space-y-12 md:space-y-16 px-4 sm:px-6 lg:px-12">
      {/* Product Detail */}
      <ProductDetail
        productData={product}
        onClick={handleScrollToForm}
        merchantId={merchantId}
        productId={category as string}
        imageData={imagesData}
      />

      {/* Tabs Section */}
      <ProductTabs data={product} />

      {/* Apply Form Section */}
      <div ref={applyFormRef}>
        {showApplyForm && !showLoanScreen && (
          <ApplyOnlineForm onHandleFinalSubmit={() => setShowLoanScreen(true)} />
        )}
      </div>

      {/* Loan Form */}
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
            onSubmit={handleLoanSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <FormikFieldSelect
                    options={["1", "2", "3", "4"]}
                    value="1"
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? translate("BUTTON.SUBMITTING")
                      : translate("BUTTON.APPLY")}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <CustomCarousel
          title="RELATED_PRODUCT"
          category={category as string}
          products={relatedProducts}
        />
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        noClose
        buttonTitle="CONTINUE"
        title={translate("APPLICATION.SUBMITTED")}
        subTitle={translate("APPLICATION.SUBMITTED_SUCCESS_MESSAGE")}
        lowerTitle={translate("APPLICATION.WAIT_APPROVAL")}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
