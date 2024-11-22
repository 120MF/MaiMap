"use client";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { useEffect } from "react";

import SignInRedirectModalContent from "@/components/SignInRedirectModalContent";

function SignInRedirect() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
      <ModalContent>
        <SignInRedirectModalContent />
      </ModalContent>
    </Modal>
  );
}

export default SignInRedirect;
