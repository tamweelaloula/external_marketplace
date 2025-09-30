"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";
import CustomCard from "../ui/custom-card";
import { useTranslation } from "@/i18n";

// Temporary demo products (move this out to a data file if reused often)
const products: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  category: "CARS",
  title: "Amazon.sa",
  store: "Amazon.sa",
  price: "1000 SAR",
  image: `/assets/images/${i == 0 ? "iphone" : i == 1 ? "micro" : "acer"}.png`,
}));

export default function CustomCarousel({
  title,
  category,
}: {
  title: string;
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
        <h2 className="text-xl font-semibold">{translate(`TITLE.${title}`)}</h2>
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
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[280px]">
            <CustomCard product={product} carousel category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}
