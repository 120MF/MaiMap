import React, { useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
  useDisclosure,
} from "@nextui-org/react";

const bMapBaseUrl =
  "https://map.baidu.com/dir/@12957990.28211534,4826154.198241538,16.83z?querytype=bt&c=167&sn=2";

function PathButton({ children, endAddress, startLat, startLng }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [pathUrl, setPathUrl] = useState("");

  async function getAddress() {
    setIsLoading(true);
    const startAddress = await (
      await fetch(`/api/QMap/poi?lat=${startLat}&lng=${startLng}`)
    ).json();
    setIsLoading(false);
    setPathUrl(
      `${bMapBaseUrl}\$\$\$\$\$\$${startAddress}\$\$0\$\$\$\$&en=2\$\$\$\$\$\$${endAddress}\$\$&sc=167&ec=167&pn=0&rn=5&version=5&da_src=shareurl`,
    );
  }

  return (
    <>
      <Button
        className="ml-auto"
        variant="bordered"
        showAnchorIcon
        color="primary"
        onPress={() => {
          onOpen();
          getAddress();
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
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
                    href={pathUrl}
                    as={Link}
                    className="start-0"
                    variant="solid"
                    showAnchorIcon
                    isExternal
                    color="primary"
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
