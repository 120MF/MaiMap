"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex items-center justify-around backdrop-blur bg-blue-100">
      <Image
        alt="loading"
        className=""
        height={400}
        quality={80}
        src="/error-salt.png"
        width={200}
      />
      <div>
        <h2 className="text-xl antialiased font-bold text-stone-700">
          出错了，
        </h2>
        <h2 className="text-xl antialiased font-bold text-stone-700">
          请尝试刷新页面！
        </h2>
        <div>
          <button
            className="text-blue-500 underline pr-1"
            onClick={() => reset()}
          >
            重试
          </button>
          <a
            className="text-blue-500 pl-1 border-l-1 border-stone-500 underline"
            href="https://gitee.com/moonfeather/MaiMap#%E8%AE%A9maimap%E5%8F%98%E5%BE%97%E6%9B%B4%E5%A5%BD"
            rel="noreferrer"
            target="_blank"
          >
            反馈
          </a>
        </div>
      </div>
    </div>
  );
}
