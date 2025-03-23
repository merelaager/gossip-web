import { requireUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { $Enums } from "@prisma/client";
import { MobileSidebar, Sidebar } from "~/components/sidebar";
import React, { useState } from "react";
import { badRequest } from "~/utils/request.server";
import {
  validatePassword,
  validatePasswordConfirmation,
} from "~/utils/validators.server";
import { setUserPassword } from "~/utils/user.server";
import { StatusCodes } from "http-status-codes";
import {
  type ActionFunctionArgs,
  Form,
  type LoaderFunctionArgs,
  useActionData,
  useLoaderData,
} from "react-router";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const password = formData.get("password");
  const passwordConfirmation = formData.get("password-confirmation");

  if (
    typeof password !== "string" ||
    typeof passwordConfirmation !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Vigased vormi andmed",
    });
  }

  const errors = {
    password: validatePassword(password),
    passwordConfirmation: validatePasswordConfirmation(
      password,
      passwordConfirmation,
    ),
  };

  if (Object.values(errors).some(Boolean)) {
    return { errors };
  }

  const res = await setUserPassword({ userId, password });
  if (res) return { status: StatusCodes.OK };
  return { error: "", status: StatusCodes.INTERNAL_SERVER_ERROR };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, username: true },
  });

  return { role: userData?.role, username: userData?.username };
};

export default function AccountRoute() {
  const data = useLoaderData<typeof loader>();
  const isAdmin = data.role === $Enums.Role.ADMIN;

  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState({
    password: actionData?.fields?.password || "",
    passwordConfirmation: actionData?.fields?.passwordConfirmation || "",
  });

  // Updates the form data when an input changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  return (
    <>
      <MobileSidebar isAdmin={isAdmin} />
      <div className="flex bg-pink-200">
        <Sidebar isAdmin={isAdmin} />
        <main className="w-full h-screen overflow-y-scroll">
          <section className="bg-pink-300 mb-14 sm:mb-0">
            <h2 className="text-center font-bold py-2 border-b border-pink-500">
              Merelaagri gossip
            </h2>
            <div className="mx-4 pb-2">
              <div>
                <span>Kasutajanimi: </span>
                <span>{data.username}</span>
              </div>
              <div className="mt-2">
                <p>Muuda salasõna</p>
                <Form method="POST">
                  <div>
                    <label htmlFor="password">Uus salasõna</label>

                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full p-2 rounded-xl my-2 bg-white"
                      required
                    />

                    <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                      {actionData?.errors?.password || ""}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password-confirmation">
                      Salasõna kinnitus
                    </label>

                    <input
                      type="password"
                      id="password-confirmation"
                      name="password-confirmation"
                      className="w-full p-2 rounded-xl my-2 bg-white"
                      required
                    />

                    <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                      {actionData?.errors?.passwordConfirmation || ""}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-pink-400 px-4 py-2 rounded"
                  >
                    Muuda
                  </button>
                </Form>
                {actionData?.status === StatusCodes.OK ? (
                  <span>Salasõna edukalt muudetud!</span>
                ) : null}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
