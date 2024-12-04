import SignInForm from "@/components/SignInForm";

export default function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="h-screen w-full flex flex-col items-center backdrop-blur">
      {/*@ts-ignore*/}
      <SignInForm props={props} />
    </div>
  );
}
