import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useSession } from "next-auth/react";

import NewReviewForm from "@/components/NewReviewForm";
import SignInRedirectModalContent from "@/components/SignInRedirectModalContent";

function NewReviewButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();

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
                  <NewReviewForm session={session} onClose={onClose} />
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
