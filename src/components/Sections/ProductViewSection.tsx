"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "@/i18n";
import Link from "next/link";

const images = [
  "/assets/images/car.png",
  "/assets/images/car2.png",
  "/assets/images/car3.png",
];

export default function ProductDetail({ onClick }: { onClick: () => void }) {
  const { translate } = useTranslation();
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-8 px-4 md:px-6 lg:px-12 bg-background mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Carousel */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-lg overflow-hidden">
              {/* Main image - responsive heights */}
              <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-[380px]">
                <Image
                  src={images[current]}
                  alt={`Car ${current + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                  className="object-cover rounded-lg"
                  priority
                />
              </div>

              {/* Left arrow */}
              <button
                onClick={prevSlide}
                aria-label="Previous"
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Right arrow */}
              <button
                onClick={nextSlide}
                aria-label="Next"
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Progress indicators */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-200 rounded-full ${
                      idx === current
                        ? "w-10 md:w-12 h-1 bg-white"
                        : "w-6 md:w-8 h-1 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto py-1 scrollbar-hide">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    index === current
                      ? "border-yellow-400 scale-105"
                      : "border-transparent"
                  }`}
                  aria-label={`Thumbnail ${index + 1}`}
                >
                  <div className="relative w-20 sm:w-24 md:w-28 h-14 sm:h-16 md:h-20">
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
          <div className="flex flex-col gap-5">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
              Mercedes-Benz, C Class
            </h2>

            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes.
            </p>

            <span className="text-lg md:text-2xl font-bold text-gray-900">
              SAR 300
            </span>

            {/* Store Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/svgs/demo-logo.svg"
                  alt="Store Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <Link
                href={"/merchants/naqsh"}
                className="font-medium text-gray-800 hover:underline"
              >
                Naqsh Store
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
