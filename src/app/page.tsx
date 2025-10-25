"use client";
import Categories from "@/components/shared/Categories";
import FeaturedProducts from "@/components/Sections/FeaturedProducts";
import BannerSlider from "@/components/Sections/BannerSlider";
import PromoSlider from "@/components/Sections/PromoSlider";

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <BannerSlider/>
      {/* Other Sections */}
      <Categories />
      <PromoSlider />
      <FeaturedProducts />
    </div>
  );
}
