"use client"

import { LogIn } from "react-feather";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignInWithGoogleButton({
  isLoading,
}: {
  isLoading?: boolean
}) {
  const searchParams = useSearchParams()

  const supabase = createClient();

  useEffect(() => {
    const loginCode = searchParams.get("code");

    if (loginCode) {
      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    }
  })

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
      {isLoading ?
        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div> : <LogIn className="size-4" />}
      Log In
    </Button>
  )
}
