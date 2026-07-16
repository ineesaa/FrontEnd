"use client";

import { signOut } from "next-auth/react";
import { Button, type ButtonProps } from "@/components/ui/button";

export function SignOutButton(props: Omit<ButtonProps, "onClick">) {
  return (
    <Button
      variant="secondary"
      onClick={() => signOut({ callbackUrl: "/" })}
      {...props}
    >
      Sign out
    </Button>
  );
}
