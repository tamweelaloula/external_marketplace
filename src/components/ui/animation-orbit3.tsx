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
      <div className="absolute z-10 right-0 bottom-18">
        <Image
          src="/assets/svgs/banner-car.svg"
          alt="Computer"
          width={461}
          height={341}
          className="w-[461px] sm:w-[461px] md:w-[661px] lg:w-[661px] xl:w-[661px]"
        />
      </div>
    </div>
  );
}
