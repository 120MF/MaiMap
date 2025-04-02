import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignInRedirectModalContent() {
  const router = useRouter();

  return (
    <>
      <ModalHeader className="flex justify-around">
        你必须先登录才能进行此操作……
      </ModalHeader>
      <ModalBody className="flex justify-between">
        <Button
          fullWidth
          color="primary"
          onPress={() => {
            signIn();
          }}
        >
          登录
        </Button>
        <Button
          fullWidth
          color="secondary"
          onPress={() => {
            router.push("/");
          }}
        >
          回到主页
        </Button>
      </ModalBody>
      <ModalFooter />
    </>
  );
}

export default SignInRedirectModalContent;
