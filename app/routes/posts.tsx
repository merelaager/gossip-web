import React from "react";

import { prisma } from "~/utils/db.server";
import { requireUserId } from "~/utils/auth.server";
import { MobileSidebar, Sidebar } from "~/components/sidebar";
import { type LoaderFunctionArgs, Outlet, useLoaderData } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const userData = (await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  }))!;

  return { role: userData?.role };
};

export default function PostsRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <MobileSidebar role={data.role} />
      <div className="flex bg-pink-200">
        <Sidebar role={data.role} />
        <main className="w-full h-screen overflow-y-scroll">
          <section className="bg-pink-300 mb-14 sm:mb-0">
            <h2 className="text-center font-bold py-2 border-b border-pink-500">
              Merelaagri gossip
            </h2>
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
}
