import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import ReviewForm from "@/components/DrawerBoxComponents/ReviewForm";
import SignInRedirectModalContent from "@/components/SignInRedirectModalContent";

function NewReviewButton({ session }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="success" size="sm" variant="bordered" onPress={onOpen}>
        新建评论
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {session ? (
            (onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  新建一条评论……
                </ModalHeader>
                <ModalBody className="flex justify-between">
                  <ReviewForm session={session} onClose={onClose} />
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

export default NewReviewButton;
