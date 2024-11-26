"use client";

import Image from "next/image";
import { Link } from "@nextui-org/link";
import { useDisclosure } from "@nextui-org/modal";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useRouter, usePathname } from "next/navigation";

import IconInfoCircle from "@/components/icons/IconInfoCircle";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import RangeSlider from "@/components/RangeSlider";
import About from "@/components/About";
import IconMapLocationDot from "@/components/icons/IconMapLocationDot";
import IconStore from "@/components/icons/IconStore";
import IconBxsUserCircle from "@/components/icons/IconBxsUserCircle";

function Footer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  let pathname = usePathname();

  pathname =
    pathname.split("/").length > 2
      ? pathname.split("/").slice(0, -1).join("/")
      : pathname;

  return (
    <>
      <div className="h-full border-t border-gray-300 flex flex-col items-center justify-between bg-background px-2">
        <div className="flex items-center justify-around w-full gap-2 pt-0 h-md:pt-6">
          <div className="flex items-center">
            <Image
              alt="Logo"
              height={80}
              quality={80}
              src="/Logo.png"
              width={150}
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
        <div className="flex w-full">
          <Tabs
            fullWidth
            aria-label="pages"
            selectedKey={pathname === "/signin" ? "/user" : pathname}
            size="md"
            variant="underlined"
            onSelectionChange={(key: string) => {
              if (pathname !== "/signin") router.push(key);
              else if (key !== "/user") router.push(key);
            }}
          >
            <Tab
              key="/arcades"
              title={
                <div className="flex items-center space-x-2">
                  <IconStore />
                  <span>机厅</span>
                </div>
              }
            />
            <Tab
              key="/"
              title={
                <div className="flex items-center space-x-2">
                  <IconMapLocationDot />
                  <span>地图</span>
                </div>
              }
            />
            <Tab
              key="/user"
              title={
                <div className="flex items-center space-x-2">
                  <IconBxsUserCircle />
                  <span>用户</span>
                </div>
              }
            />
          </Tabs>
        </div>
      </div>
      <About isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default Footer;
