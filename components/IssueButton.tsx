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
import React from "react";

function IssueButton({ arcadeId, children }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="ml-auto"
        color="warning"
        size="sm"
        variant="bordered"
        onPress={onOpen}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                <p className="text-center text-xl">即将前往“问卷星”填写反馈</p>
              </ModalHeader>
              <ModalBody className="flex justify-between">
                <p className="text-center text-md">
                  请记住当前的机厅ID：{arcadeId}
                </p>
                <Button
                  isExternal
                  showAnchorIcon
                  as={Link}
                  color="primary"
                  href="https://www.wjx.cn/vm/YqGhTJ6.aspx#"
                  variant="solid"
                  onPress={onClose}
                >
                  填写问卷
                </Button>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default IssueButton;
