import { PostCard } from "~/components/post";
import React from "react";
import { prisma } from "~/utils/db.server";
import { requireUserId } from "~/utils/auth.server";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { shift: true },
  });

  if (!userData) {
    return { posts: [] };
  }

  const posts = await prisma.post.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });

  return { posts };
};

export default function MyPostsRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <ul>
      {data.posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          imageId={post.imageId}
          createdAt={post.createdAt}
        />
      ))}
    </ul>
  );
}
