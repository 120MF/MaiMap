"use client";

import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <Button
      fullWidth
      onPress={() => {
        signOut({ redirectTo: "/" });
      }}
    >
      登出
    </Button>
  );
}

export default SignOutButton;
