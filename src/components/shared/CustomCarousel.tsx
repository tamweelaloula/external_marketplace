"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";
import CustomCard from "../ui/custom-card";
import { useTranslation } from "@/i18n";

export default function CustomCarousel({
  title,
  products = [],
  category,
}: {
  title: string;
  products?: Product[];
  category?: string;
}) {
  const { language, translate } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isEnglish = language.code === "en";

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };
   
  const ScrollButton = ({
    onClick,
    icon: Icon,
  }: {
    onClick: () => void;
    icon: React.ElementType;
  }) => (
    <button
      onClick={onClick}
      className="p-2 rounded-full border hover:bg-gray-100 transition"
    >
      <Icon className="w-5 h-5" />
    </button>
  );

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <ScrollButton
            onClick={() => handleScroll(isEnglish ? "left" : "right")}
            icon={isEnglish ? ChevronLeft : ChevronRight}
          />
          <ScrollButton
            onClick={() => handleScroll(isEnglish ? "right" : "left")}
            icon={isEnglish ? ChevronRight : ChevronLeft}
          />
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 pb-4"
      >
        {products.length > 0 ? (
          products.map((product: Product) => (
            <div key={product.id} className="flex-shrink-0 w-[280px]">
              <CustomCard
                product={{
                  id: product.product_id ?? "",
                  category: product.product_type ?? "",
                  title_en: product.title_en,
                  store: "Marketplace",
                  price: `${product.price} ${product.currency}`,
                  image:
                    product.main_image_url ?? "/assets/svgs/placeholder.svg",
                }}
                carousel
                category={category}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">{translate("NO_PRODUCTS_FOUND")}</p>
        )}
      </div>
    </div>
  );
}
