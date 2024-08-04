import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import { requireUserId } from "~/utils/auth.server";
import { badRequest, internalServerError } from "~/utils/request.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { shift: true },
  });

  if (!userData?.shift) {
    return internalServerError({
      error: "User shift not found.",
    });
  }

  const form = await request.formData();
  const title = form.get("title");
  const content = form.get("content");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof content !== "string" || typeof title !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  if (title.length == 0 || content.length == 0) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form fields cannot be empty.",
    });
  }

  const fields = { title, content };

  const post = await prisma.post.create({
    data: { ...fields, authorId: userId, shift: userData.shift },
  });
  return redirect(`/posts/${post.id}`);
};

export default function NewPostRoute() {
  const borderStyle = "border-2 rounded";
  return (
    <div className="border-b border-pink-500 py-2 px-4">
      <p>Loo postitus</p>
      <form method="post" className="flex flex-col gap-2">
        <div>
          <label htmlFor="title">Pealkiri:</label>
          <input type="text" name="title" className={borderStyle + " block"} />
        </div>
        <div>
          <label htmlFor="content">Sisu:</label>
          <textarea name="content" className={borderStyle + " block w-full"} />
        </div>
        <div>
          <button
            type="submit"
            className="button text-center px-4 py-2 bg-pink-400 rounded"
          >
            Postita
          </button>
        </div>
      </form>
    </div>
  );
}
