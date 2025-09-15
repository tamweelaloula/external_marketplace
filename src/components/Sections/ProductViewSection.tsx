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
    <section className="w-full py-10 px-4 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left - Carousel */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-lg overflow-hidden">
              {/* Main image - responsive heights */}
              <div className="relative w-full h-64 md:h-[328px] lg:h-[328px]">
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

              {/* Right arrow - fixed position */}
              <button
                onClick={nextSlide}
                aria-label="Next"
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Progress indicators (small bars) */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-200 rounded-full ${
                      idx === current
                        ? "w-10 md:w-12 h-1 bg-white"
                        : "w-8 md:w-10 h-1 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto py-1">
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
                  <div className="relative w-20 md:w-28 h-14 md:h-20">
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
          <div className="flex flex-col gap-5 md:pl-6">
            <h2 className="text-lg md:text-3xl font-semibold text-gray-900">
              Mercedes-Benz, C Class
            </h2>

            <p className="text-sm md:text-base text-gray-600 max-w-xl">
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
              <Link href={"/merchants/naqsh"} className="font-medium text-gray-800">Naqsh Store</Link>
            </div>

            {/* CTA */}
            <div>
              <Button
                onClick={onClick}
                variant="outline"
                className="bg-[#F9C416] hover:bg-[#ffd342] border-none text-[#212044] font-semibold py-3 px-6 rounded-full"
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
