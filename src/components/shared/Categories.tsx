"use client";

import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils"; // helper for conditional classes if you use shadcn
import {
  Monitor,
  Camera,
  Car,
  GraduationCap,
  HeartPulse,
  Armchair,
} from "lucide-react";

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const categories: Category[] = [
  { id: "dior", label: "DIOR", icon: <Monitor size={28} /> },
  { id: "electronics", label: "ELECTRONICS", icon: <Camera size={28} /> },
  { id: "cars1", label: "CARS", icon: <Car size={28} /> },
  { id: "education", label: "EDUCATION", icon: <GraduationCap size={28} /> },
  { id: "health", label: "HEALTH", icon: <HeartPulse size={28} /> },
  { id: "furniture", label: "FURNITURE", icon: <Armchair size={28} />, active: true },
];

const Categories = () => {

  const {translate} = useTranslation()
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#212044] mb-10 decoration-2">
          {translate("CATEGORY_SECTION.TITLE")}
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={cn(
                "flex flex-col items-center justify-center w-28 h-28 rounded-full shadow-md cursor-pointer transition",
                category.active
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-white hover:bg-gray-50 text-[#212044]"
              )}
            >
              <div className="mb-2">{category.icon}</div>
              <span
                className={cn(
                  "text-sm font-medium",
                  category.active ? "text-yellow-600" : "text-[#212044]"
                )}
              >
                {translate(`CATEGORY_SECTION.${category.label}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
