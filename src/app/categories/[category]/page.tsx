"use client";

import { useParams } from "next/navigation";
import CategoryBanner from "@/components/Sections/CategoryBanner";
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
      <CategoryBanner title={category === "all" ? "ALL" : title} />
      <SingleFeaturedProduct
        title={title}
        category={category}
        hasFilter
      />
    </div>
  );
}
