"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n";
import { Input } from "@/components/ui/input"
import { Product } from "@/lib/types";
import CustomCard from "../ui/custom-card";
import Link from "next/link";

const products: Product[] = [
  {
    id: "1",
    category: "CARS",
    title: "Amazon.sa",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
  {
    id: "2",
    category: "CARS",
    title: "Amazon.sa",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
  {
    id: "3",
    category: "ELECTRONICS",
    title: "Calvin Klein",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
  {
    id: "4",
    category: "HEALTH",
    title: "Massage World",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
    {
    id: "5",
    category: "CARS",
    title: "Amazon.sa",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
    {
    id: "6",
    category: "CARS",
    title: "Amazon.sa",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
    {
    id: "7",
    category: "CARS",
    title: "Amazon.sa",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
    {
    id: "8",
    category: "CARS",
    title: "Amazon.sa",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
    {
    id: "9",
    category: "CARS",
    title: "Amazon.sa",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
    {
    id: "10",
    category: "CARS",
    title: "Amazon.sa",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
   {
    id: "11",
    category: "CARS",
    title: "Amazon.sa",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
  // ➝ Add more products here
];

const categories = ["CARS", "ELECTRONICS", "EDUCATION", "HEALTH", "FURNITURE"];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("CARS");
  const { translate } = useTranslation();

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#212044]">
            {translate("TITLE.FEATURED_PRODUCTS")}
          </h2>
          <Link href={"/categories/all"} className="text-sm font-medium text-primary hover:underline self-start sm:self-auto">
            {translate("TITLE.SHOW_ALL")}
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium pb-1 transition ${
                activeCategory === cat
                  ? "text-[#F9C416] border-b-2 border-[#F9C416]"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {translate(`TITLE.${cat}`)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <CustomCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
