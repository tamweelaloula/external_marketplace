import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface customCard {
  product: Product;
  carousel?: boolean;
}

export default function CustomCard({ product, carousel }: customCard) {
  return (
    <Link
      href={`/categories/${product.category}/details`}
      key={product.id}
      className="bg-white w-[321px] h-[282px] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 cursor-pointer flex flex-col"
    >
      {/* Image Wrapper */}
      <div className="relative w-[281px] h-[180px] mx-auto mb-4 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col px-1">
        <h3 className="text-base font-semibold text-[#242424] truncate">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{product.price}</p>
      </div>
    </Link>
  );
}
