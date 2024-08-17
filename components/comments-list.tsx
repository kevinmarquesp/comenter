"use client"

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CommentsList() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [comments, setComments] = useState<any | null>(null)

  useEffect(() => {
    if (user || comments) {
      return;
    }

    fetchAllData();

    async function fetchAllData() {
      const userResult = (await supabase.auth.getUser()).data.user;
      const commentsResult = await supabase.from("Comments").select()

      setUser(userResult);
      setComments(commentsResult);
    }
  })

  if (!user || !comments || !comments.data) {
    return (
      <></>
    );
  }

  console.log(comments)

  return (
    <ul className="space-y-3">
      {comments.data.map(({
        author,
        body,
        created_at,
      }: {
        author: string
        body: string
        created_at: string
        updated_at: string
      }, key: number) => {
        return (
          <li key={key}>
            <Card>
              <CardHeader>
                <CardTitle>{author}</CardTitle>
                <CardDescription>{created_at}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{body}</p>
              </CardContent>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
