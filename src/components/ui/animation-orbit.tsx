"use client";

import Image from "next/image";

export default function AnimatedOrbit() {
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
      {/* Background behind Computer */}
      <Image
        src="/assets/svgs/animation-home/background.svg"
        alt="Background"
        width={600}
        height={600}
        className="absolute w-[250px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] object-contain z-0"
      />

      {/* Computer */}
      <div className="relative z-10">
        <Image
          src="/assets/svgs/animation-home/computer.svg"
          alt="Computer"
          width={150}
          height={150}
          className="w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] xl:w-[250px]"
        />
      </div>

      {/* Orbiting / floating icons */}
        <Image
        src="/assets/svgs/animation-home/cart.svg"
        alt="Cart"
        width={80}
        height={80}
        className="
            absolute left-[15%] top-[20%] 
            w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] 
            animate-[float_6s_ease-in-out_infinite,orbit_20s_linear_infinite]
            hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(255,200,0,0.8)] 
            transition-transform
        "
        />
      <Image
        src="/assets/svgs/animation-home/box.svg"
        alt="Box"
        width={80}
        height={80}
        className="floating-delay absolute bottom-[15%] left-[25%] w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] z-20"
      />
      <Image
        src="/assets/svgs/animation-home/percent.svg"
        alt="Percent"
        width={80}
        height={80}
        className="floating absolute top-[10%] right-[20%] w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] z-20"
      />
      <Image
        src="/assets/svgs/animation-home/message.svg"
        alt="Message"
        width={80}
        height={80}
        className="floating-delay absolute bottom-[20%] right-[15%] w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] z-20"
      />
      <Image
        src="/assets/svgs/animation-home/coin.svg"
        alt="Coin"
        width={80}
        height={80}
        className="floating absolute top-[40%] right-[5%] w-[45px] sm:w-[55px] md:w-[65px] lg:w-[75px] z-20"
      />
      <Image
        src="/assets/svgs/animation-home/map.svg"
        alt="Map"
        width={80}
        height={80}
        className="floating-delay absolute top-[50%] left-[5%] w-[45px] sm:w-[55px] md:w-[65px] lg:w-[75px] z-20"
      />
    </div>
  );
}
