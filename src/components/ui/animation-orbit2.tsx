"use client";

import Image from "next/image";

export default function AnimatedOrbit2() {
  return (
    <div
      className="
        relative 
        w-full 
        h-[350px]   /* mobile */
        sm:h-[400px] 
        md:h-[450px] 
        lg:h-[500px] /* laptop */
        xl:h-[600px] /* big screens */
        flex items-center justify-center 
        overflow-hidden
      "
    >
      {/* Computer */}
      <div className="relative z-10">
        <Image
          src="/assets/svgs/cart-promo.svg"
          alt="Computer"
          width={461}
          height={341}
          className="w-[261px] sm:w-[461px] md:w-[461px] lg:w-[461px] xl:w-[461px]"
        />
      </div>
    </div>
  );
}
