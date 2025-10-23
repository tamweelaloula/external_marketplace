"use client";

import { useRef, useState, useEffect } from "react";
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
import {ProductSkeleton} from "@/components/shared/ProductSkeleton"; // Add skeleton component

export default function DetailPage() {
  const { category } = useParams();
  const merchantId = "246";
  const { translate } = useTranslation();

  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showLoanScreen, setShowLoanScreen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const applyFormRef = useRef<HTMLDivElement | null>(null);

  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [getRelatedProducts, { isLoading: isRelatedLoading }] =
    useGetRelatedProductsMutation();

  // Fetch main product details
  const {
    data: productData,
    error: productError,
    isLoading: isProductLoading,
  } = useGetProductDetailQuery({
    merchant_id: merchantId,
    product_id: category as string,
  });

  // Fetch product images
  const {
    data: imagesData,
    error: imagesError,
    isLoading: isImagesLoading,
  } = useGetProductImagesQuery({
    merchantId,
    productId: category as string,
  });

  // Fetch related products
  useEffect(() => {
    if (category && merchantId) {
      getRelatedProducts({
        productId: category,
        productType: "VEHICLE",
        merchantId,
      })
        .unwrap()
        .then((res) => setRelatedProducts(res.data?.products || []))
        .catch((err) => console.error("Failed to fetch related products:", err));
    }
  }, [category, merchantId, getRelatedProducts]);

  const handleScrollToForm = () => {
    setShowApplyForm(true);
    applyFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoanSubmit = () => {
    setShowSuccessModal(true);
  };

  // Overall loading
  const isLoading = isProductLoading || isImagesLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (productError || imagesError) {
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

  const initialValues = { tenor: "", amount: 0 };

  return (
    <div className="min-h-screen bg-background space-y-12 md:space-y-16 px-4 sm:px-6 lg:px-12">
      {/* Product Details */}
      {isProductLoading ? (
        <ProductSkeleton height="400px" />
      ) : (
        <ProductDetail
          productData={productData?.data}
          onClick={handleScrollToForm}
          merchantId={merchantId}
          productId={category as string}
          imageData={imagesData}
          isImagesLoading={isImagesLoading}
          imagesError={imagesError}
        />
      )}

      {/* Tabs */}
      {isProductLoading ? (
        <ProductSkeleton height="200px" />
      ) : (
        <ProductTabs data={productData?.data} />
      )}

      {/* Apply Form */}
      <div ref={applyFormRef}>
        {showApplyForm && !showLoanScreen && (
          <ApplyOnlineForm
            onHandleFinalSubmit={() => setShowLoanScreen(true)}
          />
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
      {isRelatedLoading ? (
        <ProductSkeleton height="250px" />
      ) : (
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
