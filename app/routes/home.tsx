import { type LoaderFunctionArgs, redirect } from "react-router";

import { requireUserId } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  return redirect("/posts");
};

export default function Home() {
  return <h2>Home Page</h2>;
}
