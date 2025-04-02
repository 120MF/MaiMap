"use client";

import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";

function SignOutButton({ buttonProps }) {
  return (
    <Button
      {...buttonProps}
      onPress={() => {
        signOut({ redirectTo: "/" });
      }}
    >
      登出
    </Button>
  );
}

export default SignOutButton;
