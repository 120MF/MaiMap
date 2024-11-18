"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function Loading() {
  const [drink, setDrink] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDrink(false);
    }, 2900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full flex items-center backdrop-blur">
      <Image
        alt="loading"
        className={`${drink ? "animate-bounce" : "animate-appearance-in"}`}
        height={500}
        quality={80}
        src={`${drink ? "/loading-0.png" : "/loading-1.png"}`}
        width={230}
      />
      <h2 className="text-xl antialiased font-bold text-stone-700 animate-pulse">
        地图展开中……
      </h2>
    </div>
  );
}

export default Loading;
