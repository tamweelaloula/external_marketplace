import { useTranslation } from "@/i18n";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface customCard {
  product: Product;
  brand?: boolean;
  category?: string;
  carousel?: boolean;
}

export default function CustomCard({
  product,
  brand,
  category,
  carousel,
}: customCard) {
  const { language } = useTranslation();
      
  return (
    <Link
      href={
        category === "jarir"
          ? `/merchants/${category}/smartphones`
          : `/categories/${product.id}/details`
      }
      key={product.id}
      className="bg-white w-full rounded-lg duration-300 p-5 cursor-pointer flex flex-col shadow-[0_0_25px_0_hsla(196,68%,15%,0.08)]"
    >
      {/* Image Wrapper */}
      <div className="relative w-full aspect-[16/9] mb-4 rounded overflow-hidden">
        <Image
          src={product?.image}
          alt={product[`title_${language.code}`] || "Product Image"}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col px-1">
        <h3 className="text-base font-semibold text-[#242424] truncate">
          {product[`title_${language.code}`] || product.title_en}
        </h3>
        {brand && <p className="text-sm text-gray-600 mt-1">{product.price}</p>}
      </div>
    </Link>
  );
}
