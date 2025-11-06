import { useTranslation } from "@/i18n";
import Link from "next/link";

interface CategoriesProps {
  categories: {
    CAT_ID: string;
    CAT_NAME: string;
    CAT_NAME_AR: string;
    STATUS: string;
  }[];
}

const Categories = ({ categories }: CategoriesProps) => {
  const { translate, language } = useTranslation();

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#212044] mb-10">
          {translate("CATEGORY_SECTION.TITLE")}
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <Link
              href={`/categories/${
                category.CAT_ID == "97889466" ? "all" : category.CAT_ID
              }`}
              key={category.CAT_ID}
              className="group flex flex-col items-center cursor-pointer transition-all duration-300"
            >
              <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-[0_0_25px_0_hsla(196,68%,15%,0.08)] transition-all duration-300 group-hover:bg-[#FFF9E9] group-hover:text-[#F9C416]">
                <img
                  src={`/assets/svgs/category-${
                    category.CAT_NAME === "Others" ? "all" : category.CAT_NAME
                  }.svg`}
                  alt={category.CAT_NAME}
                  className="w-10 h-10 transition-all duration-300 group-hover:brightness-110"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "/assets/svgs/category-default.svg")
                  }
                />
              </div>
              <span className="mt-2 text-sm font-medium text-[#212044] transition-colors duration-300 group-hover:text-[#F9C416]">
                {language.code === "ar"
                  ? category.CAT_NAME_AR
                  : category.CAT_NAME}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
