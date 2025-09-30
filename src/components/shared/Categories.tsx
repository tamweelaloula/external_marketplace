"use client";

import { useTranslation } from "@/i18n";
import { categories, cn } from "@/lib/utils"; // helper for conditional classes if you use shadcn
import Link from "next/link";
import { ReactSVG } from "react-svg";

const Categories = () => {
  const { translate } = useTranslation();
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#212044] mb-10 decoration-2">
          {translate("CATEGORY_SECTION.TITLE")}
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`categories/${category.path}`}
              className={cn(
                "flex flex-col items-center justify-center cursor-pointer hover:text-[#F9C416]"
              )}
            >
              {/* Circle container around the SVG */}
              <div
                className={cn(
                  "flex items-center justify-center w-25 h-25 rounded-full shadow-md bg-white text-gray-500 transition-colors hover:text-inherit hover:bg-[#FFFCF7]"
                )}
              >
                <ReactSVG
                  src={category.icon}
                  className="w-10 h-10 [&_svg]:w-full [&_svg]:h-full [&_svg]:mx-auto [&_svg]:my-auto"
                />
              </div>
              {/* Text below should not change color */}
              <span className="mt-2 text-sm font-medium text-inherit">
                {translate(`TITLE.${category.label}`)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
