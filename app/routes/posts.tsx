import React from "react";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";

import { prisma } from "~/utils/db.server";
import { requireUserId } from "~/utils/auth.server";
import { $Enums } from "@prisma/client";

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

  return (
    <>
      <div className="sm:hidden z-10">
        <div className="absolute bottom-14 w-full flex justify-end items-center">
          <Link
            to="/posts/new"
            className="rounded-full w-14 h-14 bg-pink-200 border border-pink-500 mb-4 mr-4 flex justify-center items-center p-2"
          >
            <span className="material-symbols-outlined">edit</span>
          </Link>
        </div>
        <div className="absolute bottom-0 w-full bg-pink-200 border-t border-pink-500">
          <nav className="h-14 flex items-center justify-center">
            <Link to="/posts" className="p-2 flex items-center justify-center">
              <span className="material-symbols-outlined">home</span>
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex bg-pink-200">
        <header className="hidden sm:block h-screen border-pink-500 border-r py-8">
          <div className="h-full w-40 flex flex-col justify-between">
            <nav className="flex flex-col pt-2">
              <Link to="/posts">
                <h1 className="mx-4 pt-2">Postitused</h1>
              </Link>
              {data.role === $Enums.Role.ADMIN ? (
                <Link to="/posts/waitlist">
                  <h1 className="mx-4 pt-2">Ootel</h1>
                </Link>
              ) : (
                ""
              )}
            </nav>
            <div className="">
              <Link
                to="new"
                className="block mx-4 bg-pink-400 cursor-pointer rounded"
              >
                <p className="px-4 py-2 text-center">Loo postitus</p>
              </Link>
            </div>
          </div>
        </header>
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
