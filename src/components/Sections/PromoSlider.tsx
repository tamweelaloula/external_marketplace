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
      id: 2,
      image: "/assets/svgs/promo-lady.svg",
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
    <div className="relative w-full max-w-[1000px] mx-auto overflow-hidden py-7 px-4 sm:px-6 lg:px-12">
      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-smooth scrollbar-hide w-full snap-x snap-mandatory"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full flex flex-col md:flex-row items-center justify-between bg-[#F9C41614] rounded-tl-[100px] rounded-br-[100px] snap-center px-4 sm:px-6 md:px-10 lg:px-12 pb-10 md:pb-0"
          >
            {/* Image Section */}
            <div
              className={`flex-1 flex mb-6 md:mb-0 ${
                slide.image.includes("car")
                  ? "items-end justify-center md:justify-start"
                  : "justify-center md:justify-center"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`max-h-[200px] sm:max-h-[250px] md:max-h-[300px] object-contain ${
                  slide.image.includes("car") ? "md:-ml-10" : ""
                }`}
              />
            </div>

            {/* Text Section */}
            <div className="flex-1 text-center md:text-left px-2 sm:px-4 md:px-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                {slide.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600">
                {slide.description}
              </p>
              <Button className="mt-5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-full">
                {slide.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      {/* <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? "w-20 md:w-52 sm:w-20 h-1 bg-[#F9C416]"
                : "w-16 md:w-38 sm:w-20 h-1 bg-gray-400/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
}
