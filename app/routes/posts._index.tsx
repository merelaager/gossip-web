import { PostCard } from "~/components/post";
import React from "react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { shift: true },
  });

  if (!userData) {
    return json({ posts: [] });
  }

  const posts = await prisma.post.findMany({
    where: { shift: userData.shift, published: true, hidden: false },
    orderBy: { createdAt: "desc" },
  });

  return json({ posts });
};

export default function PostsIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <ul>
      {data.posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
        />
      ))}
    </ul>
  );
}
