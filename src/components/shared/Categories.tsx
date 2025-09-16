"use client";

import { useTranslation } from "@/i18n";
import { categories, cn } from "@/lib/utils"; // helper for conditional classes if you use shadcn
import Link from "next/link";

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
              className={cn(
                "flex flex-col bg-white hover:bg-gray-50 text-[#212044] items-center justify-center w-28 h-28 rounded-full shadow-md cursor-pointer transition hover:text-[#F9C416]"
              )}
              href={`categories/${category.path}`}
              // onClick={() => console.log(`Clicked on ${category.label}`)}
            >
              <div className="mb-2">{<category.icon />}</div>
              <span className={cn("text-sm font-medium text-inherit")}>
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
