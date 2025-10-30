"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n";

export default function HeroSlider() {
  const { translate } = useTranslation();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/assets/svgs/promo-lady.svg",
      title: translate("TITLE.PROMOTITLE"),
      description: translate("TITLE.PROMOSUBTITLE"),
      buttonText: translate("TITLE.PROMOBUTTON"),
    },
    {
      id: 2,
      image: "/assets/svgs/promo-car.svg",
      title: translate("TITLE.PROMOTITLE"),
      description: translate("TITLE.PROMOSUBTITLE"),
      buttonText: translate("TITLE.PROMOBUTTON"),
    },
    {
      id: 3,
      image: "/assets/svgs/banner-car.svg",
      title: translate("TITLE.PROMOTITLE"),
      description: translate("TITLE.PROMOSUBTITLE"),
      buttonText: translate("TITLE.PROMOBUTTON"),
    },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const { scrollLeft, offsetWidth } = slider;
      const index = Math.round(scrollLeft / offsetWidth);
      setCurrent(index);
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
      setCurrent(index);
    }
  };

  return (
  <div className="relative w-full max-w-[1117px] mx-auto overflow-hidden py-5 px-3 sm:px-6 lg:px-10">
    {/* Slider */}
    <div
      ref={sliderRef}
      className="flex overflow-x-auto scroll-smooth scrollbar-hide w-full snap-x snap-mandatory mb-6 sm:mb-8"
    >
      {slides.map((slide) => {
        const isRightEdge = slide.id === 3;
        const isLeftEdge = slide.id === 2;
        const isReversed = slide.id === 3;

        return (
          <div
            key={slide.id}
            className={`min-w-full flex flex-row items-center justify-between bg-[#F9C41614]
              rounded-tl-[40px] rounded-br-[40px] snap-center
              h-[180px] sm:h-[260px] md:h-[320px] lg:h-[372px]
              opacity-100
              sm:px-6 md:px-10 lg:px-12
              ${isReversed ? "flex-row-reverse" : ""}
            `}
          >
            {/* Image Section */}
            <div
              className={`flex-1 flex items-center h-full ${
                isRightEdge
                  ? "justify-end md:pr-0"
                  : isLeftEdge
                  ? "justify-start md:pl-0"
                  : "justify-center"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`object-contain h-full w-auto
                  ${
                    isRightEdge
                      ? "md:mr-[-46px]"
                      : isLeftEdge
                      ? "md:ml-[-46px]"
                      : ""
                  }
                `}
              />
            </div>

            {/* Text Section */}
            <div
              className={`flex-1 text-center sm:text-left ${
                isReversed ? "sm:text-right ml-3" : "mr-3"
              }`}
            >
              <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                {slide.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">
                {slide.description}
              </p>
              <Button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-full text-xs sm:text-sm md:text-base px-4 py-2 sm:px-6 sm:py-3 transition-all duration-300">
                {slide.buttonText}
              </Button>
            </div>
          </div>
        );
      })}
    </div>

    {/* Progress Indicators */}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 flex gap-2">
      {slides.map((_, idx) => (
        <button
          key={idx}
          onClick={() => goToSlide(idx)}
          className={`transition-all duration-300 rounded-full ${
            idx === current
              ? "w-10 sm:w-14 md:w-24 h-1 bg-[#F9C416]"
              : "w-6 sm:w-10 md:w-16 h-1 bg-gray-400/40"
          }`}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  </div>
);
}
