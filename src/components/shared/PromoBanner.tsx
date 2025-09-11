"use client";

import Image from "next/image";

const PromoBanner = () => {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto flex justify-center">
        <Image
          src="/assets/images/promotion.png"
          alt="Saudi Day"
          width={800}          // default size for SSR
          height={300}         // default size for SSR
          className="w-full max-w-6xl h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default PromoBanner;
