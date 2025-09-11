import Image from "next/image";
import {
  Card,
  CardFooter,
} from "@/components/ui/card";

type ProductCardProps = {
  image: string;
  title: string;
  price: string;
};

export default function ProductCard({ image, title, price }: ProductCardProps) {
  return (
    <Card className="w-72 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center">
      {/* Image wrapper */}
      <div className="relative w-full h-48 flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain rounded-t-2xl"
        />
      </div>

      <CardFooter className="px-4 pb-3 flex flex-col items-center text-center gap-1 w-full">
        <h3 className="text-sm font-medium text-[#242424] truncate w-full">
          {title}
        </h3>
        <p className="text-xs text-gray-500">{price}</p>
      </CardFooter>
    </Card>
  );
}
