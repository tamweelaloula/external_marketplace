"use client";

import Categories from "@/components/shared/Categories";
import FeaturedProducts from "@/components/Sections/FeaturedProducts";
import BannerSlider from "@/components/Sections/BannerSlider";
import PromoSlider from "@/components/Sections/PromoSlider";
import { useGetCategoriesQuery } from "@/lib/services/getAllProducts";
import Loader from "@/components/shared/Loader";

export default function Home() {
  const { data, isLoading } = useGetCategoriesQuery(null);
  const categories = data?.data || [];
  
  return (
    <div className="min-h-screen bg-background">
      <BannerSlider />

      {/* Categories Section */}
      {isLoading ? (
        <div className="py-16 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <Categories categories={categories} />
          <PromoSlider />
          <FeaturedProducts categories={categories} />
        </>
      )}
    </div>
  );
}
