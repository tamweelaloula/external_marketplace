"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "@/i18n";
import Link from "next/link";

interface merchantDetails {
  id: string;
  name: string;
}

interface productData {
  description_en: any;
  description_ar: any;
  title_en: string;
  title_ar: string;
  price: number;
  productId: string;
  currency: string;
  merchant: merchantDetails;
}

interface ProductDetailProps {
  onClick: () => void;
  merchantId: string;
  productId: string;
  imageData?: any;
  isImagesLoading?: boolean;
  imagesError?: any;
  productData?: productData;
}

// 🔒 Oracle Cloud secure link config
const ORACLE_BASE = "https://objectstorage.me-jeddah-1.oraclecloud.com";
const ORACLE_PREFIX =
  "https://objectstorage.me-jeddah-1.oraclecloud.com/p/mOM5RvlT_VjI6teUwXZJUh_MZonbB-aKjea--R1EwZycTOWpi8x6WkO5WSG1m9X7/n/axx0kq2zujnb/b/merchant-uat/o";
const ORACLE_OLD_PREFIX =
  "https://objectstorage.me-jeddah-1.oraclecloud.com/n/axx0kq2zujnb/b/merchant-uat/o";

// ✅ Helper to replace old Oracle URLs with secure ones
const replaceOracleUrl = (url: string) => {
  if (url?.startsWith(ORACLE_BASE)) {
    return url.replace(ORACLE_OLD_PREFIX, ORACLE_PREFIX);
  }
  return url || "/assets/svgs/placeholder.svg";
};

export default function ProductDetail(props: ProductDetailProps) {
  const { translate, language } = useTranslation();
  const [current, setCurrent] = useState(0);

  const { imageData, isImagesLoading, imagesError, onClick, productData } =
    props;

  const images = useMemo(() => {
    if (imageData?.data?.length) {
      return imageData.data.map((img: any) => replaceOracleUrl(img.url));
    }
    return [
      "/assets/svgs/placeholder.svg",
      "/assets/svgs/placeholder.svg",
      "/assets/svgs/placeholder.svg",
    ];
  }, [imageData]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  if (isImagesLoading)
    return (
      <p className="text-center py-10 text-gray-500">
        Loading product images...
      </p>
    );

  if (imagesError)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load product images.
      </p>
    );

  return (
    <section className="w-full py-8 px-4 md:px-6 lg:px-12 bg-background mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Carousel */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-lg overflow-hidden">
              <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-[300px]">
                <Image
                  src={images[current]}
                  alt={`Product Image ${current + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                  className="object-cover rounded-lg"
                  priority
                />
              </div>

              {/* Arrows */}
              <button
                onClick={prevSlide}
                aria-label="Previous"
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next"
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Progress indicators */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                {images.map((_: string, idx: number) => (
                  <div
                    key={idx}
                    className={`transition-all duration-200 rounded-full ${
                      idx === current
                        ? "w-20 md:w-52 sm:w-20 h-1 bg-white"
                        : "w-16 md:w-38 sm:w-20 h-1 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {images.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    index === current
                      ? "border-yellow-400 scale-105"
                      : "border-transparent"
                  }`}
                >
                  <div className="relative w-full h-24 sm:h-28 md:h-32 lg:h-36">
                    <Image
                      src={img}
                      alt={`thumb ${index}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col gap-5 md:mt-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
              {productData?.[`title_${language.code}`] ?? ""}
            </h2>

            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl">
              {productData?.[`description_${language.code}`] ?? ""}
            </p>

            <span className="text-lg md:text-2xl font-bold text-gray-900">
              {productData?.currency} {productData?.price ?? "0"}
            </span>

            {/* Store Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/svgs/naqsh-store.svg"
                  alt="Store Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <Link
                href={`/merchants/${productData?.merchant.id}`}
                className="font-medium text-gray-800 hover:underline"
              >
                {productData?.merchant.name}
              </Link>
            </div>

            {/* CTA */}
            <div>
              <Button
                onClick={onClick}
                variant="outline"
                className="bg-[#F9C416] hover:bg-[#ffd342] border-none text-[#212044] font-semibold py-3 px-6 rounded-full w-full sm:w-auto"
              >
                {translate("BUTTON.APPLY")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
