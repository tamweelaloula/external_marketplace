"use client";

import { useTranslation } from "@/i18n";
import { Input } from "../ui/input";
import CustomCard from "../ui/custom-card";
import CustomCarousel from "../shared/CustomCarousel";
import FilterDialog from "../shared/FilterDropdown";
import { useParams } from "next/navigation";
import { ProductSkeleton } from "../shared/ProductSkeleton";
import { useGetAllProductsQuery } from "@/lib/services/getAllProducts";
import { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import CategoryBanner from "./CategoryBanner";

export default function SingleFeaturedProduct({
  title,
  category,
  hasFilter = false,
  merchantProducts,
  hasBannerInside = false,
}: {
  title: string;
  category: string;
  hasFilter?: boolean;
  merchantProducts?: Product[];
  hasBannerInside?: boolean
}) {
  const { merchant } = useParams<{ merchant: string }>();
  const { translate } = useTranslation();

  const [filters, setFilters] = useState({
    min_price: 100,
    max_price: 115000,
    sort: "newest",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState(""); // Only changes on Enter

  // Handle search input + Enter press
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setAppliedSearch(searchTerm.trim());
    }
  };

  // Build query params dynamically for API
  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page: 1,
      limit: 120,
      min_price: filters.min_price,
      max_price: filters.max_price,
      sort: filters.sort as "newest" | "price_high" | "price_low",
    };

    if (category && category !== "all") {
      params.cat_id = String(category);
    }

    if (appliedSearch) {
      params.search = appliedSearch;
    }

    return params;
  }, [category, filters, appliedSearch]);

  // Skip API call if merchantProducts provided
  const shouldSkip = !!merchantProducts && merchantProducts.length > 0;
  const { data, isLoading, isFetching, isError } = useGetAllProductsQuery(queryParams, {
    skip: shouldSkip,
  });

  // Use prop data or API data
  const categoriesData = data?.data?.categories || {};

  let products =
    merchantProducts && merchantProducts.length > 0
      ? merchantProducts
      : category === "all"
      ? categoriesData
      : categoriesData[category] || [];

  // Client-side search filter for merchantProducts
  if (merchantProducts && merchantProducts.length > 0 && appliedSearch) {
    const lowerSearch = appliedSearch.toLowerCase();
    products = merchantProducts.filter(
      (product) =>
        product.title_en?.toLowerCase().includes(lowerSearch) ||
        product.category?.toLowerCase().includes(lowerSearch)
    );
  }

  const loading = !shouldSkip && (isLoading || isFetching);
  const error = !shouldSkip && isError;
  const empty =
    !loading &&
    !error &&
    ((category === "all" && Object.keys(categoriesData).length === 0) ||
      (category !== "all" && Array.isArray(products) && products.length === 0));
  
  return (
    <>
    {hasBannerInside && <CategoryBanner title={category === "all" ? "ALL" : title} />}
    <section className="py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#212044]">
            {translate(
              `TITLE.${
                category === "all"
                  ? merchant === "jarir"
                    ? "JARIR_PRODUCT"
                    : "FEATURED_PRODUCTS"
                  : "FEATURED_PRODUCTS"
              }`
            )}
          </h2>

          <div className="flex items-center gap-2">
            {hasFilter && category === "1218" && (
              <FilterDialog onApply={setFilters} />
            )}
            <Input
              className="w-72"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress} // Trigger API or filter on Enter
              placeholder={translate("CATEGORY_SECTION.SEARCHBAR")}
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="col-span-full text-center text-red-500">
            Failed to load products.
          </div>
        )}

        {/* Empty */}
        {empty && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-gray-500">
            <img
              src="/assets/svgs/no-products.svg"
              alt="No Products Found"
              className="w-32 h-32 mb-4 opacity-80"
            />
            <p className="text-lg font-medium">{translate("NO_PRODUCTS_FOUND")}</p>
          </div>
        )}

        {/* Products */}
        {!loading && !error && !empty && (
          <>
            {category === "all" ? (
              Object.entries(products).map(([catName, catProducts]) => (
                <div key={catName} className="gap-25 mt-20">
                  <CustomCarousel
                    title={catName.toUpperCase()}
                    category={merchant}
                    products={catProducts as Product[]}
                  />
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {products.map((product: any) => (
                  <CustomCard
                    key={product.product_id || product.id}
                    product={{
                      id: product.product_id || product.id,
                      category: product.product_type || product.category,
                      title_en: product.title_en,
                      store: "Marketplace",
                      price: `${product.price} ${product.currency || ""}`,
                      image:
                        product.main_image_url ||
                        "/assets/svgs/placeholder.svg",
                    }}
                    category={category}
                    brand
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
    </>
  );
}
