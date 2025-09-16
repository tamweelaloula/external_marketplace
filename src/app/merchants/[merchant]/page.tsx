"use client";
import CategoryBanner from "@/components/Sections/CategoryBanner";
import SingleFeaturedProduct from "@/components/Sections/SingleFeaturedProduct";
import CustomCard from "@/components/ui/custom-card";
import { useTranslation } from "@/i18n";
import { Product } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

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
    image: "/assets/images/demo.png",
  },
];

export default function MerchantDetailPage() {
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
    <div className="min-h-screen bg-background py-18">
      <CategoryBanner title="STORE" hasLogo />
      <SingleFeaturedProduct title="CARS" category="all" />
    </div>
  );
}
