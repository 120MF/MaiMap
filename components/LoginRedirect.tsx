"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginRedirect() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex justify-around">请先登录</ModalHeader>
        <ModalBody className="flex justify-between">
          <Button
            fullWidth
            onPress={() => {
              signIn();
            }}
          >
            登录
          </Button>
          <Button
            fullWidth
            onPress={() => {
              router.push("/");
            }}
          >
            回到主页
          </Button>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default LoginRedirect;
