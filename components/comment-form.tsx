"use client"

import { z } from "zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { createClient } from "@/utils/supabase/client"

export default function CommentForm() {
  const supabase = createClient()

  return (
    <form className="space-y-4" onSubmit={async (event) => {
      event.preventDefault()

      const form = new FormData(event.target as HTMLFormElement);

      const fields = z.object({
        author: z
          .string()
          .trim()
          .min(1)
          .max(80),
        comment: z
          .string()
          .trim()
          .min(1),
      }).parse({
        author: form.get("author"),
        comment: form.get("comment"),
      })

      console.log(fields)

      const { error } = await supabase.from("Comments").insert({
        author: fields.author,
        body: fields.comment,
      });

      if (error) {
        console.error(error);
        return;
      }

      window.location.href = "/"
    }}>
      <Textarea id="comment" name="comment" placeholder="Comment" />
      <div className="flex gap-4">
        <Input type="text" id="author" name="author" placeholder="Display name" />
        <Button type="submit">
          Comment!
        </Button>
      </div>
    </form>
  )
}
