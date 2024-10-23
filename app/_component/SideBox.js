"use client";

import React, { useState } from "react";

function SideBox() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  return (
    <div className="relative top-1/2 -translate-y-1/2 z-10">
      <div className="relative flex items-center">
        <div
          className={`relative w-64 h-64 bg-blue-300 transition-transform duration-300 ${
            isBoxOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          盒子内容
        </div>
        <button
          onClick={() => setIsBoxOpen((state) => !state)}
          className={`absolute h-10 w-8 bg-blue-500 text-white transition-transform duration-300 ${
            isBoxOpen ? "translate-x-64" : "left-0"
          }`}
        >
          {isBoxOpen ? "Close" : "Open"}
        </button>
      </div>
    </div>
  );
}

export default SideBox;
