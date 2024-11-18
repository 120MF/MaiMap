"use client";

import Image from "next/image";
import { Link } from "@nextui-org/link";
import { useDisclosure } from "@nextui-org/modal";

import IconInfoCircle from "@/components/icons/IconInfoCircle";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import RangeSlider from "@/components/RangeSlider";
import About from "@/components/About";

function Footer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        className={`h-full border-t border-gray-300 flex items-center justify-between px-2 py-2 bg-background`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center">
          <Image
            alt="Logo"
            height={60}
            quality={80}
            src="/Logo.png"
            width={130}
          />
        </div>
        <RangeSlider />
        <div className="flex items-center space-x-2">
          <Link
            className="pl-2 m-0 text-sm"
            color="foreground"
            onClick={onOpen}
          >
            <IconInfoCircle height="20px" width="20px" />
          </Link>
          <div className="border-l h-[20px] border-gray-300 pl-2 m-0">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
      <About isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default Footer;
