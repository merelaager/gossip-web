import { json, LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  });

  if (!post) {
    throw new Error("Postitust ei letiud");
  }

  return json({ post });
};

export default function PostRoute() {
  const data = useLoaderData<typeof loader>();

  const { post } = data;
  return (
    <article className="bg-pink-300 px-4 py-2 border-b border-pink-500">
      <h3 className="font-bold">{post.title}</h3>
      <p>{post.content}</p>
    </article>
  );
}
