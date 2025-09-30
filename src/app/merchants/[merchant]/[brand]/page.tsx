'use client'
import CategoryBanner from "@/components/Sections/CategoryBanner";
import SingleFeaturedProduct from "@/components/Sections/SingleFeaturedProduct";

export default function BrandDetails() {
  return (
    <div className="min-h-screen bg-background py-18">
      <CategoryBanner title="jarir" hasLogo />
      <SingleFeaturedProduct title="IPHONESMARTPHONE" category="smartphones" />
    </div>
  );
}
