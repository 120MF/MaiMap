import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastProps } from "react-toastify/dist/types";
import { useTheme } from "next-themes";

import IconBxsXCircle from "@/components/icons/IconBxsXCircle";
import { toastStyle } from "@/lib/toastStyle";
import SignInRedirectModalContent from "@/components/SignInRedirectModalContent";
import { useTags } from "@/stores/useTags";

function DeleteButton({ tagId, arcadeId, name, session }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { theme } = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);
  const fetch_currentTag = useTags((state) => state.fetch_currentTags);

  useEffect(() => {
    async function deleteTag() {
      const res = await fetch("/api/tags/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagId),
      });
      const data = await res.json();

      if (res.status !== 200) {
        toast.error(`删除Tag失败！${data}`, {
          ...(toastStyle as ToastProps),
          type: "error",
          theme: theme,
        });
      } else {
        toast.success("删除Tag成功！", {
          ...(toastStyle as ToastProps),
          type: "success",
          theme: theme,
        });
        fetch_currentTag(arcadeId);
      }
    }
    if (isDeleting) {
      deleteTag();
      setIsDeleting(false);
    }
  }, [isDeleting]);

  return (
    <>
      <Button
        isIconOnly
        className="p-0 m-0"
        radius="full"
        size="sm"
        variant="light"
        onPress={onOpen}
      >
        <IconBxsXCircle />
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {session ? (
            (onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  即将删除一个Tag
                </ModalHeader>
                <ModalBody className="flex justify-between">
                  <p className="text-center text-red-400 font-bold">
                    确认要删除Tag：“{name}” 吗？
                  </p>
                  <div className="flex flex-row items-center justify-around">
                    <Button
                      className="p-2 w-32"
                      color="primary"
                      onPress={onClose}
                    >
                      取消
                    </Button>
                    <Button
                      className="p-2 w-32"
                      color="danger"
                      isLoading={isDeleting}
                      onPress={() => {
                        setIsDeleting(true);
                      }}
                    >
                      确认
                    </Button>
                  </div>
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

function ArcadeTag({ tag, session, arcadeId }) {
  return (
    <Chip
      color="secondary"
      endContent={
        <DeleteButton
          arcadeId={arcadeId}
          name={tag.name}
          session={session}
          tagId={tag._id}
        />
      }
      variant="dot"
    >
      {tag.name}
    </Chip>
  );
}

export default ArcadeTag;
