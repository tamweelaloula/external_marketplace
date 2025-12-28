"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "@/i18n";

import { Input } from "../ui/input";
import CustomCard from "../ui/custom-card";
import CustomCarousel from "../shared/CustomCarousel";
import FilterDialog from "../shared/FilterDropdown";
import { ProductSkeleton } from "../shared/ProductSkeleton";
import CategoryBanner from "./CategoryBanner";

import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "@/lib/services/getAllProducts";

import { Product } from "@/lib/types";

interface Props {
  title?: string;
  category: string;
  hasFilter?: boolean;
  merchantProducts?: Product[];
  hasBannerInside?: boolean;
}

export default function SingleFeaturedProduct({
  title,
  category,
  hasFilter = false,
  merchantProducts,
  hasBannerInside = false,
}: Props) {
  const { merchant } = useParams<{ merchant: string }>();
  const { translate, language } = useTranslation();

  /** --------------------------
   * State Management
   * -------------------------- */
  const [filters, setFilters] = useState({
    min_price: 100,
    max_price: 500000,
    sort: "newest",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  /** --------------------------
   * Event Handlers
   * -------------------------- */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Automatically show all products when search is cleared
    if (value.trim() === "") {
      setAppliedSearch("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setAppliedSearch(searchTerm.trim());
  };

  /** --------------------------
   * Build API Query Params
   * -------------------------- */
  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page: 1,
      limit: 120,
      min_price: filters.min_price,
      max_price: filters.max_price,
      sort: filters.sort,
    };

    if (category && category !== "all") params.cat_id = String(category);
    if (appliedSearch) params.search = appliedSearch;

    return params;
  }, [category, filters, appliedSearch]);

  /** --------------------------
   * API Calls
   * -------------------------- */
  const skipApi = !!(merchantProducts && merchantProducts.length > 0);
  const { data, isLoading, isFetching, isError } = useGetAllProductsQuery(
    queryParams,
    { skip: skipApi }
  );

  // default fallback to prevent undefined
  const { data: categories = { data: [] }, isLoading: categoriesLoading } =
    useGetCategoriesQuery(null);

  /** --------------------------
   * Data Preparation
   * -------------------------- */
  const categoriesData = data?.data?.categories || {};

  let products =
    merchantProducts && merchantProducts.length > 0
      ? merchantProducts
      : category === "all"
      ? categoriesData
      : categoriesData[category] || [];

  // Apply client-side search filter if merchantProducts provided
  if (merchantProducts && appliedSearch) {
    const lowerSearch = appliedSearch.toLowerCase();
    products = merchantProducts.filter(
      (product) =>
        product.title_en?.toLowerCase().includes(lowerSearch) ||
        product.category?.toLowerCase().includes(lowerSearch)
    );
  }

  /** --------------------------
   * UI States
   * -------------------------- */
  const loading = !skipApi && (isLoading || isFetching);
  const error = !skipApi && isError;
  const isEmpty =
    !loading &&
    !error &&
    ((category === "all" && Object.keys(categoriesData).length === 0) ||
      (category !== "all" && Array.isArray(products) && products.length === 0));

  /** --------------------------
   * Render Helpers
   * -------------------------- */
  const renderHeader = () => (
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
          onKeyDown={handleKeyPress}
          placeholder={translate("CATEGORY_SECTION.SEARCHBAR")}
        />
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );

  const renderError = () => (
    <div className="col-span-full text-center text-red-500">
      Failed to load products.
    </div>
  );

  const renderEmpty = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-gray-500">
      <img
        src="/assets/svgs/no-products.svg"
        alt="No Products Found"
        className="w-32 h-32 mb-4 opacity-80"
      />
      <p className="text-lg font-medium">{translate("NO_PRODUCTS_FOUND")}</p>
    </div>
  );

  const renderProducts = () => {
    if (category === "all") {
      return Object.entries(products).map(([catName, catProducts]) => (
        <div key={catName} className="gap-25 mt-20">
          <CustomCarousel
            title={
              categories?.data?.find(
                (cat: any) => String(cat.CAT_ID) === catName
              )?.[language.code === "en" ? "CAT_NAME" : "CAT_NAME_AR"] ||
              catName
            }
            category={merchant}
            products={catProducts as Product[]}
          />
        </div>
      ));
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {products.map((product: any) => (
          <CustomCard
            key={product.product_id || product.id}
            product={{
              id: product.product_id || product.id,
              category: product.product_type || product.category,
              title_en: product?.[`title_${language.code}`],
              store: "Marketplace",
              price: `${product.price} ${product.currency || ""}`,
              image: product.main_image_url || "/assets/svgs/placeholder.svg",
            }}
            category={category}
            brand
          />
        ))}
      </div>
    );
  };

  /** --------------------------
   * Component Render
   * -------------------------- */
  return (
    <>
      {hasBannerInside && (
        <CategoryBanner
          title={
            category === "all"
              ? "ALL"
              : categories?.data?.find(
                  (cat: any) => String(cat.CAT_ID) === category
                )?.CAT_NAME || category
          }
        />
      )}

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {renderHeader()}
          {loading && renderLoading()}
          {error && renderError()}
          {isEmpty && renderEmpty()}
          {!loading && !error && !isEmpty && renderProducts()}
        </div>
      </section>
    </>
  );
}
