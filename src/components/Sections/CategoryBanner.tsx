"use client";

import { useTranslation } from "@/i18n";
import Image from "next/image";

const CategoryBanner = ({ title, hasLogo = false }: { title: string, hasLogo?: boolean }) => {
  const { translate } = useTranslation();
  return (
    <section className="relative w-full h-[312px] flex items-center justify-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-md overflow-hidden">
      {/* Background decorative images */}
      <Image
        src="/assets/svgs/shape-right.svg"
        alt="Decoration Left"
        width={150}
        height={150}
        className="absolute bottom-0 left-0 opacity-80"
      />
      <Image
        src="/assets/svgs/shape-left.svg"
        alt="Decoration Right"
        width={150}
        height={150}
        className="absolute top-0 right-0 opacity-80"
      />
      <Image
        src="/assets/svgs/banner-icons2.svg"
        alt="Decoration Dots Left"
        width={40}
        height={40}
        className="absolute top-4 left-4 opacity-70 animate-bounce duration-1000 md:top-32 end-2 md:end-0"
      />
      <Image
        src="/assets/svgs/banner-icons.svg"
        alt="Decoration Dots Right"
        width={40}
        height={40}
        className="absolute bottom-4 right-4 opacity-70 animate-bounce duration-1000 md:top-32 end-2 md:end-0"
      />

      <div className="flex flex-col items-center justify-center text-center">
        {/* Logo */}
        {hasLogo && <Image
          src="/assets/svgs/demo-logo.svg"
          alt="Decoration Dots Right"
          width={40}
          height={40}
        />}
        
        {/* Title */}
        <h2 className="mt-2 text-[48px] font-semibold text-gray-800 font-[700]">
          {translate(`TITLE.${title}`)}
        </h2>
      </div>

    </section>
  );
};

export default CategoryBanner;
