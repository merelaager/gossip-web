import { Link } from "@remix-run/react";
import React from "react";

interface SidebarProps {
  isAdmin: boolean;
}

export const Sidebar = ({ isAdmin }: SidebarProps) => {
  return (
    <header className="hidden sm:block h-screen border-pink-500 border-r py-8">
      <div className="h-full w-40 flex flex-col justify-between">
        <nav className="flex flex-col pt-2">
          <Link to="/posts">
            <h1 className="mx-4 pt-2">Postitused</h1>
          </Link>
          <Link to="/posts/my">
            <span className="mx-4 pt-2">Minu postitused</span>
          </Link>
          <Link to="/account">
            <span className="mx-4 pt-2">Minu konto</span>
          </Link>
          {isAdmin ? (
            <Link to="/posts/waitlist">
              <span className="mx-4 pt-2">Ootel</span>
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
  );
};

export const MobileSidebar = ({ isAdmin }: SidebarProps) => {
  return (
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
        <nav className="h-14 flex items-center justify-center gap-4">
          <Link to="/account" className="p-2 flex items-center justify-center">
            <span className="material-symbols-outlined">settings</span>
          </Link>
          <Link to="/posts/my" className="p-2 flex items-center justify-center">
            <span className="material-symbols-outlined">person</span>
          </Link>
          <Link to="/posts" className="p-2 flex items-center justify-center">
            <span className="material-symbols-outlined">home</span>
          </Link>
          {isAdmin ? (
            <Link
              to="/posts/waitlist"
              className="p-2 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">pending_actions</span>
            </Link>
          ) : (
            ""
          )}
        </nav>
      </div>
    </div>
  );
};
