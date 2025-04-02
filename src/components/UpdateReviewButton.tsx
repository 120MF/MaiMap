import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import IconEdit from "@/components/icons/IconEdit";
import ReviewForm from "@/components/DrawerBoxComponents/ReviewForm";

function UpdateReviewButton({
  session,
  originComment,
  originReviewId,
  originRating,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <IconEdit onClick={onOpen} />
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                编辑一条评论……
              </ModalHeader>
              <ModalBody className="flex justify-between">
                <ReviewForm
                  originComment={originComment}
                  originRating={originRating}
                  originReviewId={originReviewId}
                  session={session}
                  onClose={onClose}
                />
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateReviewButton;
