"use client";

import { useParams } from "next/navigation";
import { categories } from "@/lib/utils";
import SingleFeaturedProduct from "@/components/Sections/SingleFeaturedProduct";

export default function CategoryDetailPage() {
  const { category } = useParams<{ category: string }>();
  // Find the category label
  const categoryData = categories.find((c) => c.id === category);
  const title = categoryData ? categoryData.label : "Unknown Category";

  return (
    <div className="min-h-screen bg-background py-16">
      {/* Hero Section */}
      <SingleFeaturedProduct
        title={title}
        category={category}
        hasFilter
        hasBannerInside
      />
    </div>
  );
}
