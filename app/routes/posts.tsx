import React from "react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";

import { prisma } from "~/utils/db.server";
import { requireUserId } from "~/utils/auth.server";
import { $Enums } from "@prisma/client";
import { MobileSidebar, Sidebar } from "~/components/sidebar";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return json({ role: userData?.role });
};

export default function PostsRoute() {
  const data = useLoaderData<typeof loader>();
  const isAdmin = data.role === $Enums.Role.ADMIN;

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
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
}
