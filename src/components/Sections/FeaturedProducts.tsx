"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/i18n";
import { Product } from "@/lib/types";
import CustomCard from "../ui/custom-card";
import Link from "next/link";

// Products Data
const products: Product[] = Array.from({ length: 11 }, (_, i) => ({
  id: `${i + 1}`,
  category: i % 4 === 0 ? "ELECTRONICS" : i % 3 === 0 ? "HEALTH" : "CARS",
  title:
    i % 3 === 0 ? "Massage World" : i % 2 === 0 ? "Calvin Klein" : "Amazon.sa",
  store: "Amazon.sa",
  price: "1000 SAR",
  image: "/assets/images/Container.png",
}));

// Categories
const categories = ["CARS", "ELECTRONICS", "EDUCATION", "HEALTH", "FURNITURE"];

const FeaturedProducts = () => {
  const { translate } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Memoized filtering for better performance
  const filteredProducts = useMemo(
    () => products.filter((product) => product.category === activeCategory),
    [activeCategory]
  );

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
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 py-12">
            {filteredProducts.map((product) => (
              <div key={product.id} className="min-w-0">
                <CustomCard product={product} />
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
