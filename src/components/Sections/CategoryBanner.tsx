"use client";

import { useTranslation } from "@/i18n";
import Image from "next/image";

const CategoryBanner = ({
  title,
  hasLogo = false,
}: {
  title: string;
  hasLogo?: boolean;
}) => {
  const { translate, language } = useTranslation();
  const isRTL = language.code === "ar";

  return (
    <section
      className={`relative w-full min-h-[200px] sm:h-[240px] flex items-center justify-center sm:justify-start overflow-hidden ${
        isRTL ? "rtl" : "ltr"
      }`}
      style={{
        background: "linear-gradient(266.85deg, #FFF5D5 1.46%, #FFFFFF 93.12%)",
      }}
    >
      {/* === Decorative Backgrounds === */}
      <Image
        src="/assets/svgs/shape-left.svg"
        alt="Shape"
        width={250}
        height={150}
        className={`absolute top-0 ${
          isRTL ? "left-0 rotate-y-180" : "right-0"
        } w-[180px] sm:w-[250px] h-auto`}
      />

      <Image
        src="/assets/svgs/banner-icons.svg"
        alt="Decoration Dots"
        width={60}
        height={28}
        className={`absolute bottom-4 ${
          isRTL ? "left-4" : "right-4"
        } opacity-90 floating`}
      />

      {/* === Main Content Container (Aligned with page sections) === */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-6 sm:px-8 lg:px-12">
          {/* Logo or Category Icon */}
          {hasLogo ? (
            <Image
              src={`/assets/svgs/naqsh-store.svg`}
              alt="Store Logo"
              width={60}
              height={60}
              className="drop-shadow-[0_4px_39px_rgba(255,245,213,1)]"
            />
          ) : (
            <div
              className="rounded-full w-[80px] sm:w-[100px] h-[80px] sm:h-[100px] flex justify-center items-center bg-white p-3 sm:p-4 shadow-[0_4px_39px_rgba(255,245,213,1)]"
              style={{
                boxShadow: "0px 4px 39px 0px hsba(46, 17%, 100%, 1)",
              }}
            >
              <Image
                src={`/assets/svgs/category-${title}.svg`}
                alt={`${title} Icon`}
                width={58}
                height={58}
                className="object-contain"
              />
            </div>
          )}

          {/* Text */}
          <div
            className={`text-center sm:text-start ${
              isRTL ? "sm:text-right" : ""
            }`}
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 leading-tight">
              {title === "ALL" ? translate(`TITLE.${title}`) : title}
            </h2>
            {!hasLogo && (
              <p className="text-sm sm:text-lg text-[#242424] font-Nunito mt-2">
                {translate(`TITLE.${title.toUpperCase()}_CAT_SUBTITLE`)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
