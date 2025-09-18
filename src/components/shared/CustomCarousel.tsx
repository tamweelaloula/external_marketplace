"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";
import CustomCard from "../ui/custom-card";
import { useTranslation } from "@/i18n";

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
    category: "CARS",
    title: "Amazon.sa",
    store: "Amazon.sa",
    price: "1000 SAR",
    image: "/assets/images/Container.png",
  },
  {
    id: "4",
    category: "CARS",
    title: "Amazon.sa",
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
];

export default function CustomCarousel({ title }: { title: string }) {
  const { translate } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{translate(`TITLE.${title}`)}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth p-12"
      >
        {products.map((product: Product) => (
          <CustomCard key={product.id} product={product} carousel />
        ))}
      </div>
    </div>
  );
}
