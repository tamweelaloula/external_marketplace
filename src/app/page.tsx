"use client";

import { useGetPokemonByNameQuery } from "@/lib/services/pokemon";
import { useTranslation } from "@/i18n";
import Categories from "@/components/shared/Categories";
import FeaturedProducts from "@/components/Sections/FeaturedProducts";
import PromoBanner from "@/components/shared/PromoBanner";
import AnimatedOrbit from "@/components/ui/animation-orbit";

const heroBanner = "/assets/svgs/hero-banner.png";

export default function Home() {
  const { data, error, isLoading } = useGetPokemonByNameQuery("pikachu");
  const { translate } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative flex items-center bg-no-repeat bg-cover bg-center py-12 sm:py-16 md:py-0 bg-[#FFFCF7]"
        // style={{ backgroundImage: `url("${heroBanner}")` }}
      >
        {/* Floating Banner Icons */}
        <img
          src={"/assets/svgs/banner-icons.svg"}
          alt="Banner Icon"
          className="absolute top-16 sm:top-24 md:top-32 end-2 md:end-4 w-10 sm:w-12 floating"
        />
        <img
          src={"/assets/svgs/banner-icons.svg"}
          alt="Banner Icon"
          className="absolute bottom-4 start-2 sm:start-10 md:start-36 w-10 sm:w-12 floating"
        />
        <img
          src={"/assets/svgs/banner-icons.svg"}
          alt="Banner Icon"
          className="absolute hidden xl:block top-1/2 start-0 w-12 transform rotate-90 floating"
        />
        <img
          src={"/assets/svgs/full-banner-icon.svg"}
          alt="Banner Icon"
          className="absolute hidden lg:block bottom-5 end-5 w-16 transform rotate-90 floating"
        />

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 w-full mt-12 sm:mt-16 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 sm:gap-16 lg:gap-20">
            {/* Left Text Section */}
            <div className="text-center md:text-start max-w-2xl xl:ml-14">
              <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-7xl font-medium text-[#242424] mb-4 capitalize font-Nunito leading-tight">
                <span className="whitespace-nowrap">{translate("BANNER.TITLE1")}</span><br/>
                <span className="text-[#F9C416] block sm:inline">
                  {translate("BANNER.TAMWEEL_ALOULA")}
                </span>{" "}
                <span>{translate("BANNER.TITLE_END")}</span>
              </h1>
              <p className="text-base sm:text-lg text-[#242424] mb-6 px-4 sm:px-0 md:pr-10 font-Nunito">
                {translate("BANNER.SUBTITLE")}
              </p>
            </div>

            {/* Right Animated Orbit */}
            <div className="flex justify-center">
              <AnimatedOrbit />
              {/* Fallback static image */}
              {/* <img src={"/assets/svgs/hero-image.svg"} alt="Hero image" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <Categories />
      <PromoBanner />
      <FeaturedProducts />
    </div>
  );
}
