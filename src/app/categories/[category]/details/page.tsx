"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import ApplyOnlineForm from "@/components/Sections/AppliedOnlineForm";
import ProductDetail from "@/components/Sections/ProductViewSection";
import ProductTabs from "@/components/Sections/TabsSection";
import CustomCarousel from "@/components/shared/CustomCarousel";
import SuccessModal from "@/components/shared/SuccessModal";
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
          <ApplyOnlineForm product={product} merchantId={productData?.data?.merchant?.id} />
        )}
      </div>   

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
