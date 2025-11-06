"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/i18n";
import AnimatedOrbit from "../ui/animation-orbit";
import AnimatedOrbit2 from "../ui/animation-orbit2";
import AnimatedOrbit3 from "../ui/animation-orbit3";
import Image from "next/image";

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
    title1: "BANNER.TITLE2",
    yellowText: "BANNER.YELLOW_TEXT2",
    titleEnd: "BANNER.TITLE_END2",
    subtitle: "BANNER.SUBTITLE2",
  },
  {
    id: 3,
    title1: "BANNER.TITLE3",
    yellowText: "BANNER.YELLOW_TEXT3",
    titleEnd: "BANNER.TITLE_END3",
    subtitle: "BANNER.SUBTITLE3",
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

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, current]);

  return (
    <section
      className="relative overflow-hidden py-20 md:py-16 h-[582px] md:h-[582px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background:
          current === 2
            ? "linear-gradient(82.59deg, #FFFBEF -11.96%, #FFFFFF 110.73%)"
            : "#FFFCF7",
      }}
    >
      {/* === Full width === */}
      <div className="w-full m-0 p-0">
        <div className="relative">
          {/* === Slides wrapper === */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="min-w-full grid grid-cols-1 md:grid-cols-2 items-center"
                >
                  {/* === Left: Text === */}
                  <div className="relative px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 text-center md:text-left z-10">
                    {/* === Floating Dots (unique per slide) === */}
                    <div className="absolute inset-0 pointer-events-none">
                      <Image
                        src="/assets/svgs/banner-icons.svg"
                        alt="Decoration Dots Bottom"
                        width={60}
                        height={28}
                        className="absolute bottom-[-150px] right-114 opacity-90 floating"
                      />
                      <Image
                        src="/assets/svgs/banner-icons2.svg"
                        alt="Decoration Dots Top"
                        width={40}
                        height={40}
                        className="absolute top-4 left-[12px] opacity-70 floating md:top-32 md:left-0"
                      />
                    </div>

                    {/* === Text === */}
                    <h1 className="text-[24px] sm:text-[32px] md:text-[44px] lg:text-[56px] xl:text-[62px] font-medium text-[#242424] mb-4 leading-tight font-Nunito relative">
                      <span className="block sm:inline">
                        {translate(slide.title1)}
                      </span>{" "}
                      <span className="text-[#F9C416] block sm:inline">
                        {translate(slide.yellowText)}
                      </span>{" "}
                      {slide.secondText && (
                        <span>{translate(slide.secondText)} </span>
                      )}
                      <span className="block sm:inline">
                        {translate(slide.titleEnd)}
                      </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-[#242424] mb-6 font-Nunito">
                      {translate(slide.subtitle)}
                    </p>
                  </div>

                  {/* === Right: Animated Orbit === */}
                  <div
                    className={`flex justify-center md:justify-end items-center relative ${
                      slide.id === 3 ? "overflow-visible" : ""
                    }`}
                  >
                    {/* === Background image for 3rd slide === */}
                    {slide.id === 3 && (
                      <Image
                        src="/assets/svgs/bg-bars.svg"
                        alt="Background Bars"
                        fill
                        className="object-contain object-right opacity-90 pointer-events-none floating"
                      />
                    )}
                    {slide.id === 1 ? (
                      <AnimatedOrbit />
                    ) : slide.id === 2 ? (
                      <AnimatedOrbit2 />
                    ) : (
                      <AnimatedOrbit3 />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === Arrows === */}
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-[#FFF5E0] hover:bg-white p-2 md:p-3 rounded-full shadow"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-[#FFF5E0] hover:bg-white p-2 md:p-3 rounded-full shadow"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* === Dots === */}
          {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index ? "bg-[#F9C416] w-8" : "bg-gray-300/50 w-4"
                }`}
              ></button>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
