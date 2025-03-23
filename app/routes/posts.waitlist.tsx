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

  const posts = await prisma.post.findMany({
    where: { shift: userData.shift, published: false, hidden: false },
    orderBy: { createdAt: "desc" },
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
          createdAt={post.createdAt}
        />
      ))}
    </ul>
  );
}
