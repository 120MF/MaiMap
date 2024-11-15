import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import NewReviewForm from "@/components/NewReviewForm";

function NewReviewButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" color="success" variant="bordered" onPress={onOpen}>
        新建评论
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                新建一条评论……
              </ModalHeader>
              <ModalBody className="flex justify-between">
                <NewReviewForm onClose={onClose} />
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewReviewButton;
