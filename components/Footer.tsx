"use client";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Image from "next/image";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useTheme } from "next-themes";

import RangeSlider from "@/components/RangeSlider";
import version from "@/lib/version";

function Footer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { theme } = useTheme();

  return (
    <>
      <div
        className={`h-full border-t border-gray-300 flex items-center justify-between px-2 py-2 bg-background`}
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
            className="border-l border-gray-300 pl-2 m-0 text-sm"
            underline={"hover"}
            onClick={onOpen}
          >
            关于
          </Link>
          <Link
            className="border-l border-gray-300 pl-2 m-0 text-sm"
            href="https://gitee.com/moonfeather/MaiMap/issues/new"
            rel="noopener noreferrer"
            target="_blank"
            underline={"hover"}
          >
            反馈
          </Link>
        </div>
      </div>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <Image
                  alt="Logo"
                  height={70}
                  quality={80}
                  src="/Logo.png"
                  width={150}
                />
              </ModalHeader>
              <ModalBody>
                <p>
                  MaiMap由一群街机音游爱好者构建，希望你能使用它发现、讨论、邂逅身边的每一台街机！
                </p>
                <p>
                  你可以从右下角访问我们的开源仓库，提出宝贵的建议，为开源项目做贡献！
                </p>
              </ModalBody>
              <ModalFooter className="flex items-center justify-between px-4 py-2">
                <p className="text-stone-500 text-sm">
                  Version {version} {process.env.NEXT_PUBLIC_BUILD_FROM} build
                </p>
                <div className="flex items-center space-x-2">
                  <a
                    className="m-0 p-0 -my-2"
                    href="https://gitee.com/moonfeather/MaiMap"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      className="w-6 h-6"
                      version="1.1"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="surface1">
                        <path
                          d="M 12 0 C 18.628906 0 24 5.371094 24 12 C 24 18.628906 18.628906 24 12 24 C 5.371094 24 0 18.628906 0 12 C 0 5.371094 5.371094 0 12 0 Z M 18.074219 5.332031 L 9.777344 5.332031 C 7.324219 5.332031 5.332031 7.324219 5.332031 9.777344 L 5.332031 18.074219 C 5.332031 18.402344 5.597656 18.667969 5.925781 18.667969 L 14.667969 18.667969 C 16.875 18.667969 18.667969 16.875 18.667969 14.667969 L 18.667969 11.257812 C 18.667969 10.933594 18.402344 10.667969 18.074219 10.667969 L 11.257812 10.667969 C 10.933594 10.667969 10.667969 10.933594 10.667969 11.257812 L 10.667969 12.742188 C 10.664062 13.050781 10.90625 13.308594 11.210938 13.332031 L 15.40625 13.332031 C 15.71875 13.332031 15.972656 13.574219 16 13.878906 L 16 14.222656 C 16 15.203125 15.203125 16 14.222656 16 L 8.59375 16 C 8.265625 16 8 15.734375 8 15.40625 L 8 9.777344 C 8 8.820312 8.757812 8.039062 9.703125 8 L 18.074219 8 C 18.398438 8 18.664062 7.734375 18.664062 7.40625 L 18.667969 5.925781 C 18.667969 5.597656 18.402344 5.332031 18.074219 5.332031 Z M 18.074219 5.332031 "
                          style={{
                            stroke: "none",
                            fillRule: "evenodd",
                            fill: "rgb(78.039217%, 11.372549%, 13.725491%)",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                    </svg>
                  </a>
                  <a
                    className="m-0 p-0 -my-2"
                    href="https://github.com/MoonBite666/MaiMap"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.75-1.025 2.75-1.025.544 1.376.201 2.393.099 2.646.64.699 1.028 1.591 1.028 2.682 0 3.842-2.337 4.687-4.563 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.135 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Footer;
