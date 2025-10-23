"use client";

import { useParams } from "next/navigation";
import CategoryBanner from "@/components/Sections/CategoryBanner";
import SingleFeaturedProduct from "@/components/Sections/SingleFeaturedProduct";
import { useGetProductByIdQuery } from "@/lib/services/getAllProducts";
import Skeleton from "@/components/shared/Skeleton";

export default function MerchantDetailPage() {
  const { merchant } = useParams<{ merchant: string }>();

  // Fetch merchant products
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductByIdQuery(merchant);

  // Extract merchant product info safely
  const merchantProducts = productData?.data?.products || [];
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
        <div className="max-w-6xl mx-auto">
          <Skeleton height="120px" />
        </div>

        {/* Featured Products Skeleton */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="280px" />
          ))}
        </div>
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
