import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import { requireUserId } from "~/utils/auth.server";
import { $Enums } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { PostCard } from "~/components/post";
import React from "react";

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
    where: { shift: userData.shift, published: false },
    orderBy: { createdAt: "desc" },
  });

  return json({ posts });
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
          createdAt={post.createdAt}
        />
      ))}
    </ul>
  );
}
