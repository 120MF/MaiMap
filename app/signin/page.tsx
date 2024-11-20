import Image from "next/image";
import { signIn, auth, providerMap } from "@/auth";

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
      <SignInForm />
    </div>
    // <div className="flex flex-col gap-2">
    //   <form
    //     action={async (formData) => {
    //       "use server";
    //       try {
    //         await signIn("credentials", formData);
    //       } catch (error) {
    //         throw error;
    //       }
    //     }}
    //   >
    //     <label htmlFor="email">
    //       Email
    //       <input id="email" name="email" />
    //     </label>
    //     <label htmlFor="password">
    //       Password
    //       <input id="password" name="password" />
    //     </label>
    //     <input type="submit" value="Sign In" />
    //   </form>
    //   {Object.values(providerMap).map((provider) => (
    //     <form
    //       key={provider.name}
    //       action={async () => {
    //         "use server";
    //         try {
    //           await signIn(provider.id, {
    //             redirectTo: props.searchParams?.callbackUrl ?? "",
    //           });
    //         } catch (error) {
    //           throw error;
    //         }
    //       }}
    //     >
    //       <button type="submit">
    //         <span>Sign in with {provider.name}</span>
    //       </button>
    //     </form>
    //   ))}
    // </div>
  );
}
