"use client";

import ThemeTogglerButton from "@/components/theme-toggler-button";
import { MessageSquare } from "react-feather";

export default function Home() {
  return (
    <>
      <header className="w-screen sticky top-0 border-b border-default">
        <div className="container mx-auto text-xl p-2 px-4 flex items-center justify-between">
          <div className="flex gap-4">
            <a target="_blank" href="https://github.com/kevinmarquesp" className="flex items-center gap-2">
              <MessageSquare />
              <h1 className="font-black">
                Comenter
              </h1>
            </a>
            <ThemeTogglerButton />
          </div>
        </div>
      </header>
    </>
  );
}
