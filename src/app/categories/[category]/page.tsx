"use client";

import { useParams } from "next/navigation";
import { categories } from "@/lib/utils";
import SingleFeaturedProduct from "@/components/Sections/SingleFeaturedProduct";

export default function CategoryDetailPage() {
  const { category } = useParams<{ category: string }>();

  return (
    <div className="min-h-screen bg-background py-16">
      {/* Hero Section */}
      <SingleFeaturedProduct
        category={category}
        hasFilter
        hasBannerInside
      />
    </div>
  );
}
