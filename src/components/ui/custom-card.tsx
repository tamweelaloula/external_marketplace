import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface customCard {
  product: Product,
  carousel?: boolean
}
export default function CustomCard({ product, carousel }: customCard) {
  return (
    <Link
      href={`/categories/${product.category}/details`}
      key={product.id}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition p-4 cursor-pointer"
    >
      <div className={`relative ${carousel ? "w-[150px] sm:h-28" : "w-full sm:h-48"} h-44 mb-4 flex items-center justify-center`}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain rounded-md"
        />
      </div>
      <h3 className="text-sm font-medium text-[#242424] truncate">
        {product.title}
      </h3>
      <p className="text-xs text-gray-500">{product.price}</p>
    </Link>
  );
}
