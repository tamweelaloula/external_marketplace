"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/i18n";
import AnimatedOrbit from "../ui/animation-orbit";

const slides = [
  {
    id: 1,
    title1: "BANNER.TITLE1",
    yellowText: "BANNER.YELLOW_TEXT",
    secondText: "BANNER.SECOND_TEXT",
    titleEnd: "BANNER.TITLE_END",
    subtitle: "BANNER.SUBTITLE",
  },
  {
    id: 2,
    title1: "BANNER.TITLE1",
    yellowText: "BANNER.YELLOW_TEXT",
    secondText: "BANNER.SECOND_TEXT",
    titleEnd: "BANNER.TITLE_END",
    subtitle: "BANNER.SUBTITLE",
  },
];

export default function BannerSlider() {
  const { translate } = useTranslation();
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-[#FFFCF7] py-10 sm:py-16 md:py-0">
      <div className="relative container mx-auto px-4 w-full mt-12 sm:mt-16 md:mt-18">
        {/* Slider wrapper */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 sm:gap-16 lg:gap-20">
            {/* Left - Text */}
            <div className="text-center md:text-start max-w-2xl xl:ml-14">
              <h1 className="text-[24px] sm:text-[24px] md:text-[40px] xl:text-[62px] font-medium text-[#242424] mb-4 capitalize font-Nunito leading-tight">
                <span className="whitespace-nowrap">
                  {translate(slides[current].title1)}
                </span>
                <br />
                <span className="text-[#F9C416] block sm:inline">
                  {translate(slides[current].yellowText)}
                </span>{" "}
                <span>{translate(slides[current].secondText)}</span>{" "}
                <span className="whitespace-nowrap">
                  {translate(slides[current].titleEnd)}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#242424] mb-6 px-4 sm:px-0 md:pr-10 font-Nunito">
                {translate(slides[current].subtitle)}
              </p>
            </div>

            {/* Right - Orbit/Illustration */}
            <div className="flex justify-center">
              <AnimatedOrbit />
            </div>
          </div>

          {/* Left arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-20 bg-[#FFF5E0] hover:bg-white p-1 md:p-1 rounded-full shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-20 bg-[#FFF5E0] hover:bg-white p-1 md:p-1 rounded-full shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
