"use client";

import Image from "next/image";

const PromoBanner = () => {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto flex justify-center">
        <Image
          src="/assets/svgs/banner.svg"
          alt="Saudi Day"
          width={1102}          // default size for SSR
          height={380}         // default size for SSR
          className="w-full max-w-7xl h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default PromoBanner;
