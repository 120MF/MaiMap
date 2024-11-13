import React, { ReactNode, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

const bMapBaseUrl =
  "https://map.baidu.com/dir/@12957990.28211534,4826154.198241538,16.83z?querytype=bt&c=167&sn=2";

interface PathButtonProps {
  children: ReactNode;
  endAddress: string;
  startLat: number;
  startLng: number;
}

function PathButton({
  children,
  endAddress,
  startLat,
  startLng,
}: PathButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [pathUrl, setPathUrl] = useState("");
  const key = process.env.NEXT_PUBLIC_QMAP_API_KEY;
  const URL = "https://apis.map.qq.com/ws/geocoder/v1?";

  async function getAddress() {
    setIsLoading(true);
    const data = await (
      await fetch(`${URL}location=${startLat},${startLng}&key=${key}&get_poi=0`)
    ).json();
    const startAddress = data.result.formatted_addresses.standard_address;

    setIsLoading(false);
    setPathUrl(
      `${bMapBaseUrl}\$\$\$\$\$\$${startAddress}\$\$0\$\$\$\$&en=2\$\$\$\$\$\$${endAddress}\$\$&sc=167&ec=167&pn=0&rn=5&version=5&da_src=shareurl`,
    );
  }

  return (
    <>
      <Button
        // @ts-ignore
        showAnchorIcon
        className="ml-auto"
        color="primary"
        variant="bordered"
        onPress={() => {
          onOpen();
          getAddress();
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                选择外部网站
              </ModalHeader>
              <ModalBody className="flex justify-between">
                {isLoading ? (
                  <p>正在加载……</p>
                ) : (
                  <Button
                    isExternal
                    showAnchorIcon
                    as={Link}
                    className="start-0"
                    color="primary"
                    href={pathUrl}
                    variant="solid"
                  >
                    百度地图
                  </Button>
                )}
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default PathButton;
