import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
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

  const form = await request.formData();

  switch (form.get("intent")) {
    case "approve":
      await prisma.post.update({
        where: { id: params.postId },
        data: { published: true },
      });
      break;
    case "delete":
      await prisma.post.update({
        where: { id: params.postId },
        data: { hidden: true },
      });
      break;
  }

  return redirect("/posts");
};

export default function PostRoute() {
  const data = useLoaderData<typeof loader>();

  const buttons = (
    <>
      <form method="post" className="py-4 mx-4">
        <button
          name="intent"
          type="submit"
          value="approve"
          className="bg-pink-400 px-4 py-2 rounded mr-4"
        >
          Kinnita
        </button>
        <button
          name="intent"
          type="submit"
          value="delete"
          className="bg-pink-400 px-4 py-2 rounded"
        >
          Kustuta
        </button>
      </form>
    </>
  );

  const { post } = data;
  return (
    <>
      <article className="bg-pink-300 px-4 py-2 border-b border-pink-500">
        <h3 className="font-bold">{post.title}</h3>
        <p className="whitespace-pre-wrap">{post.content}</p>
      </article>
      {!data.published && data.role === $Enums.Role.ADMIN ? buttons : ""}
    </>
  );
}
