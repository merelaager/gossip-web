import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/utils/auth.server";
import { $Enums } from "@prisma/client";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  });

  if (!post) {
    throw new Error("Postitust ei letiud");
  }

  const userId = await requireUserId(request);
  const userRole = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return json({ role: userRole?.role, post, published: post.published });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const userRole = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!userRole || userRole.role !== $Enums.Role.ADMIN) {
    throw new Error("Õigused puuduvad");
  }

  await prisma.post.update({
    where: { id: params.postId },
    data: { published: true },
  });

  return null;
};

export default function PostRoute() {
  const data = useLoaderData<typeof loader>();

  const buttons = (
    <form method="post" className="py-4 mx-4">
      <button type="submit" className="bg-pink-400 px-4 py-2 rounded">
        Kinnita
      </button>
    </form>
  );

  const { post } = data;
  return (
    <>
      <article className="bg-pink-300 px-4 py-2 border-b border-pink-500">
        <h3 className="font-bold">{post.title}</h3>
        <p>{post.content}</p>
      </article>
      {!data.published && data.role === $Enums.Role.ADMIN ? buttons : ""}
    </>
  );
}
