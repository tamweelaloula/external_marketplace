"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n";

interface Product {
  id: string;
  category: string;
  title: string;
  store: string;
  price: string;
  image: string;
}

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
            {translate("CATEGORY_SECTION.FEATURED_PRODUCTS")}
          </h2>
          <button className="text-sm font-medium text-primary hover:underline self-start sm:self-auto">
            {translate("CATEGORY_SECTION.SHOW_ALL")}
          </button>
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
              {translate(`CATEGORY_SECTION.${cat}`)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition p-4 cursor-pointer"
            >
              <div className="relative w-full h-44 sm:h-48 mb-4 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <h3 className="text-sm font-medium text-[#242424] truncate">
                {product.title}
              </h3>
              <p className="text-xs text-gray-500">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
