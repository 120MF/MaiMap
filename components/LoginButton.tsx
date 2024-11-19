"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import IconBxUserCircle from "@/components/icons/IconBxUserCircle";
import LoginForm from "@/components/LoginForm";

function LoginButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        className="absolute bottom-[20%] right-[1%]"
        color="primary"
        onPress={onOpen}
      >
        <IconBxUserCircle />
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-around">登录</ModalHeader>
              <ModalBody className="flex justify-between">
                <LoginForm />
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginButton;
