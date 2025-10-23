"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/i18n";
import CustomCard from "../ui/custom-card";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/lib/services/getAllProducts";
import { ProductSkeleton } from "../shared/ProductSkeleton";

// Categories (map to API product_type)
const categories = [
  "VEHICLE",
  "ELECTRONICS",
  "SCHOOL",
  "HEALTH",
  "FURNITURE",
];

const FeaturedProducts = () => {
  const { translate } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Fetch products for the selected category
  const { data, isFetching, isError } = useGetAllProductsQuery({
    page: 1,
    limit: 12,
    product_type: activeCategory,
  });

  // Extract products list safely
  const products = useMemo(() => {
    if (!data?.data?.categories) return [];
    return Object.values(data.data.categories).flat();
  }, [data]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#212044]">
            {translate("TITLE.FEATURED_PRODUCTS")}
          </h2>
          <Link
            href="/categories/all"
            className="text-sm font-medium text-primary hover:underline self-start sm:self-auto"
          >
            {translate("TITLE.SHOW_ALL")}
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-medium pb-1 transition ${
                  isActive
                    ? "text-[#F9C416] border-b-2 border-[#F9C416]"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {translate(`TITLE.${cat}`)}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 py-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-500 py-12">
            {translate("TITLE.FAILED_TO_LOAD")}
          </p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 py-12">
            {products.map((product: any) => (
              <div key={product.product_id} className="min-w-0">
                <CustomCard
                  product={{
                    id: product.product_id,
                    category: product.product_type,
                    title_en: product.title_en,
                    store: "Marketplace",
                    price: `${product.price} ${product.currency}`,
                    image:
                      product.main_image_url ?? "/assets/svgs/placeholder.svg",
                  }}
                  brand
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">
            {translate("TITLE.NO_PRODUCTS_FOUND")}
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
