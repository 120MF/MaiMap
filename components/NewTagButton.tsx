"use client";

import { Chip } from "@nextui-org/chip";

import IconAddFill from "@/components/icons/IconAddFill";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastProps } from "react-toastify/dist/types";
import { useTheme } from "next-themes";

import SignInRedirectModalContent from "@/components/SignInRedirectModalContent";
import { toastStyle } from "@/lib/toastStyle";
import { useTags } from "@/stores/useTags";

function NewTagButton({ session, store_id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tag, setTag] = useState("");
  const [onSubmit, setOnSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { theme } = useTheme();

  const fetch_currentTags = useTags((state) => state.fetch_currentTags);

  useEffect(() => {
    async function postTag() {
      const value = { user_id: session.user.id, name: tag, store_id: store_id };
      const res = await fetch("/api/tags/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (res.status === 200) {
        toast("新增标签成功", {
          ...(toastStyle as ToastProps),
          theme: theme,
          type: "success",
        });
        fetch_currentTags(store_id);
      } else {
        toast("新增标签失败", {
          ...(toastStyle as ToastProps),
          theme: theme,
          type: "error",
        });
      }
    }
    if (onSubmit) {
      setIsLoading(true);
      if (tag.length > 5 || tag.length <= 0) {
        setError(true);
      } else {
        postTag();

        setError(false);
      }
      setIsLoading(false);
    }
  }, [onSubmit]);

  return (
    <>
      <Chip onClick={onOpen}>
        <IconAddFill />
      </Chip>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {session ? (
            <>
              <ModalHeader className="flex flex-col gap-1">
                为机厅增加一个标签……
              </ModalHeader>
              <ModalBody className="flex flex-row gap-4 justify-between">
                <Input
                  errorMessage="请输入"
                  isInvalid={error}
                  label="标签名"
                  size="sm"
                  value={tag}
                  variant="bordered"
                  onValueChange={setTag}
                />
                <Button
                  size="lg"
                  onPress={() => {
                    setOnSubmit(true);
                  }}
                  isLoading={isLoading}
                >
                  新建
                </Button>
              </ModalBody>
              <ModalFooter>
                <p className="opacity-40">您可输入：小于5字符的机厅别名</p>
              </ModalFooter>
            </>
          ) : (
            <SignInRedirectModalContent />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewTagButton;
