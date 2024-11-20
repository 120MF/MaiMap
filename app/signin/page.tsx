import Image from "next/image";

import SignInForm from "@/components/SignInForm";

export default function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="h-screen w-full flex flex-col items-center backdrop-blur">
      <Image
        alt="saltislookingatyou"
        className="-mb-5"
        height={250}
        src="/error-salt.png"
        width={250}
      />
      {/*@ts-ignore*/}
      <SignInForm props={props} />
    </div>
  );
}
