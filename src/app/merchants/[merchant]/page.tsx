"use client";

import { useParams } from "next/navigation";
import CategoryBanner from "@/components/Sections/CategoryBanner";
import SingleFeaturedProduct from "@/components/Sections/SingleFeaturedProduct";
import { useGetProductByIdQuery } from "@/lib/services/getAllProducts";
import Loader from "@/components/shared/Loader";

export default function MerchantDetailPage() {
  const { merchant } = useParams<{ merchant: string }>();

  // Fetch merchant products
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductByIdQuery(merchant);
  
  // Extract merchant product info safely
  const categories = productData?.data?.categories || {};
  const merchantProducts: any[] = Object.values(categories).flat(); // now it's an array

  const currentMerchant = merchantProducts.find(
    (item: any) => String(item.merchant_id) === String(merchant)
  );

  const merchantName = currentMerchant?.merchant_name || "Unknown Merchant";
  const productType = merchantProducts?.[0]?.product_type || "";

  // Skeleton UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-16 space-y-12">
        {/* Banner Skeleton */}
        <Loader />
      </div>
    );
  }

  // Error state
  if (isError || !merchantProducts.length) {
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Product not found.
      </div>
    );
  }

  // Main UI
  return (
    <div className="min-h-screen bg-background py-16 space-y-12">
      <CategoryBanner title={merchantName} hasLogo />

      <SingleFeaturedProduct
        merchantProducts={merchantProducts}
        title={productType}
        category={productType}
      />
    </div>
  );
}
