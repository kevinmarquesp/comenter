"use client"

import { LogIn } from "react-feather";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";

export default function SignInWithGoogleButton() {
  const supabase = createClient();

  return (
    <Button className="flex items-center gap-3" onClick={() => {
      signIn();

      async function signIn() {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
        })

        if (error) {
          console.error(error)
        }
      }
    }}>
      <LogIn className="size-4" />
      Log In
    </Button>
  )
}
