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

  const rawPosts = await prisma.post.findMany({
    where: {
      likes: { some: { userId } },
      hidden: false,
      published: true,
    },
    include: {
      _count: {
        select: { likes: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const posts = rawPosts.map((post) => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      imageId: post.imageId,
      liked: true,
      likeCount: post._count.likes ?? 0,
      createdAt: post.createdAt,
    };
  });

  return { posts };
};

export default function LikedPostsRoute() {
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
