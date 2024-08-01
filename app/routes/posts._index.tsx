import { PostCard } from "~/components/post";
import React from "react";
import { json } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({
    posts: await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    }),
  });
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
