import { prisma } from "~/utils/db.server";
import { requireUserId } from "~/utils/auth.server";
import { $Enums } from "@prisma/client";
import { PostCard } from "~/components/post";
import React from "react";
import { type LoaderFunctionArgs, redirect, useLoaderData } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, shift: true },
  });

  if (!userData || userData.role !== $Enums.Role.ADMIN) {
    throw redirect(`/`);
  }

  const rawPosts = await prisma.post.findMany({
    where: { shift: userData.shift, published: false, hidden: false },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { likes: true },
      },
      likes: { where: { userId } },
    },
  });

  const posts = rawPosts.map((post) => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      imageId: post.imageId,
      liked: post.likes.length > 0,
      likeCount: post._count.likes ?? 0,
      createdAt: post.createdAt,
    };
  });

  return { posts };
};

export default function ApprovePostRoute() {
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
          liked={post.liked}
          likeCount={post.likeCount}
          createdAt={post.createdAt}
        />
      ))}
    </ul>
  );
}
