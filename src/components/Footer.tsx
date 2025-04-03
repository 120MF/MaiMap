import { Image } from '@heroui/image';
import { Link } from '@heroui/link';
import { useDisclosure } from '@heroui/modal';
import { Tab, Tabs } from '@heroui/tabs';
import { useLocation, useNavigate } from 'react-router';

import LogoImage from '@/assets/Logo.png';
import About from '@/components/FooterComponents/About';
import RangeSlider from '@/components/FooterComponents/RangeSlider';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import IconBxsUserCircle from '@/components/icons/IconBxsUserCircle';
import IconInfoCircle from '@/components/icons/IconInfoCircle';
import IconMapLocationDot from '@/components/icons/IconMapLocationDot';
import IconStore from '@/components/icons/IconStore';

import type { Key } from 'react';

function Footer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  // 仅获取一级页面路径
  let pathname = location.pathname;
  pathname =
    pathname.split('/').length > 2
      ? pathname.split('/').slice(0, -1).join('/')
      : pathname;

  return (
    <>
      <div className="h-full border-t border-gray-300 flex flex-col items-center justify-between bg-background px-2">
        <div className="flex items-center justify-around w-full gap-2 pt-0 h-md:pt-6">
          <div className="flex items-center">
            <Image alt="Logo" height={38} width={150} src={LogoImage} />
          </div>
          <RangeSlider />
          <div className="flex items-center space-x-2">
            <Link
              className="pl-2 m-0 text-sm"
              color="foreground"
              onPress={onOpen}
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
            selectedKey={pathname === '/signin' ? '/user' : pathname}
            size="md"
            variant="underlined"
            onSelectionChange={(key: Key) => {
              const keyString = String(key);
              if (pathname !== '/signin') navigate(keyString);
              else if (keyString !== '/user') navigate(keyString);
            }}
          >
            {/*<Tab*/}
            {/*  key="/arcades"*/}
            {/*  title={*/}
            {/*    <div className="flex items-center space-x-2">*/}
            {/*      <IconStore />*/}
            {/*      <span>机厅</span>*/}
            {/*    </div>*/}
            {/*  }*/}
            {/*/>*/}
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
