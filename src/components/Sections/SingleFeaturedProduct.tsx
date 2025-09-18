import { useTranslation } from "@/i18n";
import { Input } from "../ui/input";
import { Product } from "@/lib/types";
import CustomCard from "../ui/custom-card";
import CustomCarousel from "../shared/CustomCarousel";
import { categories } from "@/lib/utils";
import FilterDialog from "../shared/FilterDropdown";

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

export default function SingleFeaturedProduct({
  title,
  category,
  hasFilter = false
}: {
  title: string;
  category: string;
  hasFilter?:boolean
}) {
  const { translate } = useTranslation();
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#212044]">
            {translate(`TITLE.${category === "all"? "FEATURED_PRODUCTS" : title}`)}
          </h2>
          <div className="flex">
            {hasFilter && <FilterDialog />}
            <Input
              className="w-70"
              placeholder={translate("CATEGORY_SECTION.SEARCHBAR")}
            />
          </div>

        </div>
        {category === "all" ? categories.map((category)=>{
          return (
            <div key={category.id} className="gap-25 mt-20">
              <CustomCarousel key={category.id} title={category.label}/>
            </div>
          )
        }) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <CustomCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
