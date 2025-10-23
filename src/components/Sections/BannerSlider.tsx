"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/i18n";
import AnimatedOrbit from "../ui/animation-orbit";
import AnimatedOrbit2 from "../ui/animation-orbit2";

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
  {
    id: 3,
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
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto slide every 5 seconds (pause on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, current]);

  return (
    <section
      className="relative bg-[#FFFCF7] py-10 sm:py-16 md:py-0 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 w-full mt-12 sm:mt-16 md:mt-18">
        <div className="relative">
          {/* Slider Wrapper */}
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="min-w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 sm:gap-16 lg:gap-20"
                >
                  {/* Left - Text */}
                  <div className="text-center md:text-start max-w-2xl xl:ml-14 px-4 sm:px-0">
                    <h1 className="text-[24px] sm:text-[24px] md:text-[40px] xl:text-[62px] font-medium text-[#242424] mb-4 capitalize font-Nunito leading-tight">
                      <span className="whitespace-nowrap">
                        {translate(slide.title1)}
                      </span>
                      <br />
                      <span className="text-[#F9C416] block sm:inline">
                        {translate(slide.yellowText)}
                      </span>{" "}
                      <span>{translate(slide.secondText)}</span>{" "}
                      <span className="whitespace-nowrap">
                        {translate(slide.titleEnd)}
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg text-[#242424] mb-6 px-4 sm:px-0 md:pr-10 font-Nunito">
                      {translate(slide.subtitle)}
                    </p>
                  </div>

                  {/* Right - Orbit Illustration */}
                  <div className="flex justify-center">
                    {slide.id ===1 ? <AnimatedOrbit />:slide.id ===2 ? <AnimatedOrbit2 />:<AnimatedOrbit />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute left-2 sm:left-4 md:left-0 top-1/2 -translate-y-1/2 z-20 bg-[#FFF5E0] hover:bg-white p-2 md:p-2 rounded-full shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute right-2 sm:right-4 md:right-0 top-1/2 -translate-y-1/2 z-20 bg-[#FFF5E0] hover:bg-white p-2 md:p-2 rounded-full shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-[#F9C416] w-8"
                    : "bg-gray-300/50 w-4"
                }`}
              ></button>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
