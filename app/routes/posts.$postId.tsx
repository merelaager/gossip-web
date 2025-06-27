import { prisma } from "~/utils/db.server";
import { requireUserId } from "~/utils/auth.server";
import { $Enums } from "@prisma/client";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const userRole = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  const post = await prisma.post.findUnique({
    where: { id: params.postId },
    include: {
      _count: {
        select: { likes: true },
      },
      likes: {
        where: {
          userId: userId,
        },
      },
    },
  });

  if (!post) {
    throw new Error("Postitust ei letiud");
  }

  console.log(post);

  return { role: userRole?.role, post, published: post.published };
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
  console.log(form);

  const postId = params.postId;
  if (!postId) {
    throw new Error("Postitust ei letiud");
  }

  switch (form.get("intent")) {
    case "approve":
      await prisma.post.update({
        where: { id: params.postId },
        data: { published: true, approverId: userId },
      });
      return redirect("/posts");
    case "delete":
      await prisma.post.update({
        where: { id: params.postId },
        data: { hidden: true },
      });
      return redirect("/posts");
    case "liked":
      await prisma.postLike.create({
        data: { postId, userId },
      });
      break;
    case "unliked":
      await prisma.postLike.delete({
        where: { postId_userId: { postId, userId } },
      });
      break;
  }

  return null;
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
  const likeCount = post._count.likes ?? 0;
  const userLiked = post.likes.length !== 0;
  const fillState = `'FILL' ${userLiked ? 1 : 0}`;

  return (
    <>
      {!data.published ? (
        <div className="bg-pink-400 px-4 py-2 text-pink-800">
          <em>Postitus on ootel. Admin peab selle kinnitama.</em>
        </div>
      ) : null}
      <article className="bg-pink-300 px-4 py-2 border-b border-pink-500">
        <h3 className="font-bold">{post.title}</h3>
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.imageId ? (
          <img src={`/img/${post.imageId}`} className="max-h-[300px] m-auto" />
        ) : (
          ""
        )}
        <div className="flex mt-2">
          <form method="post">
            <button
              name="intent"
              type="submit"
              value={userLiked ? "unliked" : "liked"}
              className="material-symbols-outlined"
              style={{ fontVariationSettings: fillState }}
            >
              favorite
            </button>
          </form>
          <span>{likeCount}</span>
        </div>
      </article>
      {!data.published && data.role === $Enums.Role.ADMIN ? buttons : ""}
    </>
  );
}
