import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import SignInRedirectModalContent from "@/components/SignInRedirectModalContent";
import { useMap } from "@/stores/useMap";

function EditArcadeButton({ session, children }) {
  const setIsEdting = useMap((state) => state.setIsEditing);
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
          {session ? (
            (onClose) => (
              <>
                <ModalHeader className="flex flex-col">
                  <p className="text-center text-xl">您即将进行机厅信息编辑</p>
                </ModalHeader>
                <ModalBody className="flex justify-between">
                  <p className="text-center text-md">
                    在编辑前，请确认你的信息真实有效，避免误导其他用户。
                  </p>
                  <p className="text-center text-md text-red-500 underline">
                    若你恶意输入无效信息，平台将永久封禁你的账号。（仅在测试期间可以任意编辑信息）
                  </p>
                  <Button
                    color="warning"
                    variant="solid"
                    onPress={() => {
                      onClose();
                      setIsEdting(true);
                    }}
                  >
                    了解并开始编辑信息
                  </Button>
                </ModalBody>
                <ModalFooter />
              </>
            )
          ) : (
            <SignInRedirectModalContent />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditArcadeButton;
