import { prisma } from "~/utils/db.server";
import { requireUserId } from "~/utils/auth.server";
import { $Enums } from "@prisma/client";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  redirect,
  useFetcher,
  useLoaderData,
} from "react-router";
import { cdnPrefix } from "~/utils/vars";

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

  return { role: userRole?.role, post, published: post.published };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const userRole = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!userRole) {
    console.error("Permissions issue:", userId)
    throw new Error("Õigused puuduvad");
  }

  const form = await request.formData();

  const postId = params.postId;
  if (!postId) {
    throw new Error("Postitust ei letiud");
  }

  switch (form.get("intent")) {
    case "approve":
      if (userRole.role !== $Enums.Role.ADMIN) {
        throw new Error("Õigused puuduvad");
      }
      await prisma.post.update({
        where: { id: params.postId },
        data: { published: true, approverId: userId },
      });
      return redirect("/posts");
    case "delete":
      if (userRole.role !== $Enums.Role.ADMIN) {
        throw new Error("Õigused puuduvad");
      }
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
        {!data.published && (
          <button
            name="intent"
            type="submit"
            value="approve"
            className="bg-pink-400 px-4 py-2 rounded mr-4 hover:cursor-pointer"
          >
            Kinnita
          </button>
        )}
        <button
          name="intent"
          type="submit"
          value="delete"
          className="bg-pink-400 px-4 py-2 rounded hover:cursor-pointer"
        >
          Kustuta
        </button>
      </form>
    </>
  );

  const { post } = data;
  const likeCount = post._count.likes ?? 0;
  const liked = post.likes.length !== 0;

  const fetcher = useFetcher();

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
          <img
            src={cdnPrefix + post.imageId}
            className="max-h-[300px] m-auto"
          />
        ) : (
          ""
        )}
        <div className="flex mt-2">
          <fetcher.Form method="post">
            <button
              name="intent"
              type="submit"
              value={liked ? "unliked" : "liked"}
              className="material-symbols-rounded"
              style={{ fontVariationSettings: `'FILL' ${liked ? 1 : 0}` }}
            >
              favorite
            </button>
          </fetcher.Form>
          <span>{likeCount}</span>
        </div>
      </article>
      {data.role === $Enums.Role.ADMIN && buttons}
    </>
  );
}
