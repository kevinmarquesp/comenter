import LogInWithGoogleButton from "@/components/login-with-google-button";
import GoogleAccountCard from "@/components/google-account-card";
import ThemeTogglerButton from "@/components/theme-toggler-button";
import { createClient } from "@/utils/supabase/server";
import { MessageSquare } from "react-feather";
import CommentForm from "@/components/comment-form";
import CommentsList from "@/components/comments-list";

export default async function Home({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()
  const user = (await supabase.auth.getUser()).data.user

  return (
    <>
      <header className="w-screen sticky top-0 border-b border-default bg-background" >
        <div className="w-full max-w-lg mx-auto text-xl p-2 px-4 flex items-center justify-between">
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
      <main className="w-screen">
        <div className="w-full max-w-lg mx-auto p-12">
          {user && <div className="pb-10 border-b mb-10">
            <CommentForm />
          </div>}
          <CommentsList />
        </div>
      </main>
    </>
  );
}
