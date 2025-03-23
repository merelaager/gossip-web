import { useState } from "react";
import {
  type ActionFunctionArgs,
  data,
  Form,
  type LoaderFunctionArgs,
  redirect,
  useActionData,
} from "react-router";

import { Layout } from "~/components/layout";
import { FormField } from "~/components/form-field";
import { badRequest } from "~/utils/request.server";
import { getUser, login, register } from "~/utils/auth.server";
import { StatusCodes } from "http-status-codes";
import {
  validateInviteCode,
  validatePassword,
  validateUsername,
} from "~/utils/validators.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("_action");
  const username = formData.get("username");
  const password = formData.get("password");
  let inviteCode = formData.get("inviteCode");

  if (
    typeof action !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Vigased vormi andmed",
    });
  }

  if (action === "register" && typeof inviteCode !== "string") {
    return { errors: { inviteCode: "Kood peab olema sõne" } };
  }

  const errors = {
    username: validateUsername(username),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          inviteCode: validateInviteCode((inviteCode as string) || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean)) {
    return { errors };
  }

  switch (action) {
    case "login": {
      return await login({ username, password });
    }

    case "register": {
      inviteCode = inviteCode as string;
      return await register({ username, password, inviteCode });
    }

    default:
      return data(
        { error: `Vigased vormi andmed` },
        { status: StatusCodes.BAD_REQUEST },
      );
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // If there's already a user in the session, redirect to the home page
  return (await getUser(request)) ? redirect("/") : null;
};

export default function Login() {
  const [action, setAction] = useState("login");
  const actionData = useActionData<typeof action>();

  const [formData, setFormData] = useState({
    username: actionData?.fields?.username || "",
    password: actionData?.fields?.password || "",
    inviteCode: actionData?.fields?.inviteCode || "",
  });

  // Updates the form data when an input changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  return (
    <Layout>
      <div className="h-full justify-center items-center flex flex-col gap-y-4">
        <button
          onClick={() => setAction(action == "login" ? "register" : "login")}
          className="absolute top-8 right-8 rounded-xl bg-pink-400 font-semibold px-3 py-2 transition duration-300 ease-in-out hover:bg-pink-500 hover:-translate-y-1"
        >
          {action === "login" ? "Loo konto" : "Logi sisse"}
        </button>
        <h2 className="text-5xl font-extrabold text-pink-200">Go-go-gossip</h2>

        <p className="font-semibold text-slate-300">
          {action === "login" ? "Logi sisse" : "Loo konto"}
        </p>

        <Form method="POST" className="rounded-2xl bg-pink-200 mx-4 p-4">
          <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
            {actionData?.error}
          </div>
          <FormField
            htmlFor="username"
            label="Kasutajanimi"
            value={formData.username}
            onChange={(e) => handleInputChange(e, "username")}
            error={actionData?.errors?.username}
          />

          <FormField
            htmlFor="password"
            type="password"
            label="Salasõna"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            error={actionData?.errors?.password}
          />

          {action === "register" && (
            <FormField
              htmlFor="inviteCode"
              label="Kood"
              onChange={(e) => handleInputChange(e, "inviteCode")}
              value={formData.inviteCode}
              error={actionData?.errors?.inviteCode}
            />
          )}

          <div className="w-full text-center">
            <button
              type="submit"
              name="_action"
              value={action}
              className="rounded-xl mt-2 bg-pink-400 px-3 py-2 font-semibold transition duration-300 ease-in-out hover:bg-pink-500 hover:-translate-y-1"
            >
              {action === "login" ? "Logi sisse" : "Loo konto"}
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}
