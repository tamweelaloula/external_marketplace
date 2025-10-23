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
  // Secure prefix for Oracle images
  const ORACLE_BASE = "https://objectstorage.me-jeddah-1.oraclecloud.com";
  const ORACLE_PREFIX =
    "https://objectstorage.me-jeddah-1.oraclecloud.com/p/mOM5RvlT_VjI6teUwXZJUh_MZonbB-aKjea--R1EwZycTOWpi8x6WkO5WSG1m9X7/n/axx0kq2zujnb/b/merchant-uat/o";
  const ORACLE_OLD_PREFIX =
    "https://objectstorage.me-jeddah-1.oraclecloud.com/n/axx0kq2zujnb/b/merchant-uat/o";
  
  // Replace old Oracle URL with the new one
  const imageUrl =
    product?.image && product.image.startsWith(ORACLE_BASE)
      ? product.image.replace(ORACLE_OLD_PREFIX, ORACLE_PREFIX)
      : product?.image || "/assets/svgs/placeholder.svg";
      
  return (
    <Link
      href={
        category === "jarir"
          ? `/merchants/${category}/smartphones`
          : `/categories/${product.id}/details`
      }
      key={product.id}
      className="bg-white w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 cursor-pointer flex flex-col"
    >
      {/* Image Wrapper */}
      <div className="relative w-full aspect-[16/9] mb-4 rounded overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.title_en}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col px-1">
        <h3 className="text-base font-semibold text-[#242424] truncate">
          {product.title_en}
        </h3>
        {brand && <p className="text-sm text-gray-600 mt-1">{product.price}</p>}
      </div>
    </Link>
  );
}
