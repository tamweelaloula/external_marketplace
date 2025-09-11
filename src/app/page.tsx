"use client";

import { useGetPokemonByNameQuery } from "@/lib/services/pokemon";
import Header from "@/components/shared/Header";
import { useTranslation } from "@/i18n";
import { useLayoutEffect } from "react";
import Categories from "@/components/shared/Categories";
import FeaturedProducts from "@/components/Sections/FeaturedProducts";
import PromoBanner from "@/components/shared/PromoBanner";
import Footer from "@/components/Sections/Footer";
const heroBanner = "/assets/svgs/hero-banner.png";

export default function Home() {
  const { data, error, isLoading } = useGetPokemonByNameQuery("pikachu");
  const { language, translate } = useTranslation();

  useLayoutEffect(() => {
    document.dir = language?.dir;
  }, [language?.dir]);

  return (
    <div className="min-h-screen bg-background">
      <Header onLogin={() => console.log("loged in")} />
      {/* Hero Section */}
      <section
        className="py-16  bg-cover bg-center  bg-no-repeat flex items-center relative"
        style={{ backgroundImage: `url("${heroBanner}")` }}
      >
        {/* <div className="w-[50px] md:w-[68px] h-[18px] md:h-[27px] bg-[#F9C416] absolute top-24 lg:top-32"></div> */}
        <img
          src={"/assets/svgs/banner-icons.svg"}
          alt="Banner Icon"
          className="absolute top-24 animate-bounce duration-1000 md:top-32 end-2 md:end-0"
        />
        <img
          src={"/assets/svgs/banner-icons.svg"}
          alt="Banner Icon"
          className="absolute  animate-bounce duration-1000 bottom-5 start-2 md:start-36"
        />
        <img
          src={"/assets/svgs/banner-icons.svg"}
          alt="Banner Icon"
          className="absolute hidden xl:block top-1/2 start-0 transform rotate-90 animate-bounce duration-1000"
        />
        <img
          src={"/assets/svgs/full-banner-icon.svg"}
          alt="Banner Icon"
          className="absolute hidden lg:block bottom-5 end-5 transform rotate-90 animate-bounce duration-1000"
        />
        <div className="container mx-auto px-8 w-full mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-20 md:justify-center justify-items-center">
            <div className="text-center md:text-start max-w-[600px]  xl:ml-14">
              <h1 className="text-2xl sm:text-4xl md:text-4xl xl:text-7xl font-medium text-[#242424] mb-4 capitalize font-Nunito">
                {translate("BANNER.TITLE1")}
                <span className="mt-2 text-primary">
                  {" "}
                  {translate("BANNER.TAMWEEL_ALOULA")}
                </span>{" "}
                {translate("BANNER.TITLE_END")}
              </h1>
              <p className="text-md text-[#242424] mb-6 md:pr-10 px-4 md:px-0 font-Nunito">
                {translate("BANNER.SUBTITLE")}
              </p>
            </div>
            <div>
              <img src={"/assets/svgs/hero-image.svg"} alt="Hero image" />
            </div>
          </div>
        </div>
      </section>
      <Categories/>
      <PromoBanner/>
      <FeaturedProducts/>
      <Footer/>
    </div>
  );
}
