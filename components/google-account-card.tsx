"use client"

import { createClient } from "@/utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"
import { LogOut } from "react-feather";
import Image from "next/image";

export default function GoogleAccountCard() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (user) {
      return;
    }

    fetchUser();

    async function fetchUser() {
      const result = (await supabase.auth.getUser()).data.user;

      setUser(result);
    }
  })

  if (!user) {
    return (
      <></>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="size-8 dark:border-2 dark:hover:border-zinc-300 rounded-full overflow-clip">
        <Image
          width={120}
          height={120}
          alt="Profile picture"
          src={user.user_metadata.avatar_url}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="me-2">
        <DropdownMenuLabel className="pe-8">
          <h2 className="text-zinc-500">
            {user.user_metadata.full_name}
          </h2>
          <h3 className="text-zinc-400 dark:text-zinc-600 font-normal text-sm">
            {user.user_metadata.email}
          </h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 flex gap-3 items-center px-5 cursor-pointer" onClick={() => {
          signOut();

          async function signOut() {
            const { error } = await supabase.auth.signOut();

            if (error) {
              console.error(error);
            }

            window.location.href = "/";
          }
        }}>
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
