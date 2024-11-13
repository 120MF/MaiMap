"use client";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { FaList } from "react-icons/fa6";

function SideBox() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-20">
      {/* 控制按钮 */}
      <Button
        onClick={toggleDrawer}
        className="fixed bottom-[12%] right-4"
        isIconOnly
      >
        <FaList />
      </Button>

      {/* 侧边栏 */}
      <div
        className={`fixed top-1/2 right-0 transform -translate-y-1/2 bg-background shadow-lg w-[60%] h-[60%] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">侧边栏内容</h2>
          <p>这里是侧边栏的内容。</p>
        </div>
      </div>
    </div>
  );
}

export default SideBox;
