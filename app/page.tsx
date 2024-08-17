import LogInWithGoogleButton from "@/components/login-with-google-button";
import GoogleAccountCard from "@/components/google-account-card";
import ThemeTogglerButton from "@/components/theme-toggler-button";
import { createClient } from "@/utils/supabase/server";
import { MessageSquare } from "react-feather";

export default async function Home({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()
  const user = (await supabase.auth.getUser()).data.user

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
          {user ? <GoogleAccountCard /> : <LogInWithGoogleButton isLoading={searchParams?.code ? true : false} />}
        </div>
      </header>
    </>
  );
}
