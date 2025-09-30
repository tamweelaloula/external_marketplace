"use client";
import CategoryBanner from "@/components/Sections/CategoryBanner";
import SingleFeaturedProduct from "@/components/Sections/SingleFeaturedProduct";
import { notFound, useParams } from "next/navigation";

export default function MerchantDetailPage() {
  const { merchant } = useParams<{ merchant: string }>();
  if(merchant !== "jarir" && merchant !== "naqsh"){
    notFound()
  }
  return (
    <div className="min-h-screen bg-background py-18">
      <CategoryBanner title={merchant} hasLogo />
      <SingleFeaturedProduct title="CARS" category="all" />
    </div>
  );
}
