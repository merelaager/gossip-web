import React from "react";
import { Link } from "react-router";
import { $Enums } from "@prisma/client";

interface SidebarProps {
  role: $Enums.Role;
}

interface SidebarEntryProps {
  link: string;
  icon: string;
  title: string;
}

const SidebarEntry = ({ link, icon, title }: SidebarEntryProps) => {
  return (
    <Link to={link} className="flex items-center hover:bg-pink-300 py-1">
      <span
        className="material-symbols-rounded mx-2"
        style={{ fontSize: "1.2rem" }}
      >
        {icon}
      </span>
      <span>{title}</span>
    </Link>
  );
};

export const Sidebar = ({ role }: SidebarProps) => {
  const isAdmin = role === $Enums.Role.ADMIN;
  const isAnon = role === $Enums.Role.READER;

  return (
    <header className="hidden sm:block h-screen border-pink-500 border-r py-8">
      <div className="h-full w-40 flex flex-col justify-between">
        <nav className="flex flex-col pt-2">
          <SidebarEntry link="/posts" icon="chat_bubble" title="Kumu" />
          <SidebarEntry link="/posts/liked" icon="favorite" title="Kõva kumu" />
          {!isAnon && <SidebarEntry link="/posts/my" icon="3p" title="Minu" />}
          {isAdmin && (
            <SidebarEntry
              link="/posts/waitlist"
              icon="pending_actions"
              title="Ootel"
            />
          )}
          <SidebarEntry link="/account" icon="account_circle" title="Konto" />
        </nav>
        {!isAnon && (
          <div className="">
            <Link
              to="/posts/new"
              className="block mx-4 bg-pink-400 cursor-pointer rounded"
            >
              <p className="px-4 py-2 text-center">Loo postitus</p>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export const MobileSidebar = ({ role }: SidebarProps) => {
  const isAdmin = role === $Enums.Role.ADMIN;
  const isAnon = role === $Enums.Role.READER;

  return (
    <div className="sm:hidden z-10">
      {!isAnon && (
        <div className="absolute right-0 bottom-14">
          <Link
            to="/posts/new"
            className="rounded-full w-14 h-14 bg-pink-200 border border-pink-500 mb-4 mr-4 flex justify-center items-center p-2"
          >
            <span className="material-symbols-rounded">edit</span>
          </Link>
        </div>
      )}
      <div className="absolute bottom-0 w-full bg-pink-200 border-t border-pink-500">
        <nav className="h-14 flex items-center justify-center gap-4">
          <Link to="/posts" className="p-2 flex items-center justify-center">
            <span className="material-symbols-rounded">chat_bubble</span>
          </Link>
          <Link
            to="/posts/liked"
            className="p-2 flex items-center justify-center"
          >
            <span className="material-symbols-rounded">favorite</span>
          </Link>
          {!isAnon && (
            <Link
              to="/posts/my"
              className="p-2 flex items-center justify-center"
            >
              <span className="material-symbols-rounded">3p</span>
            </Link>
          )}
          {isAdmin ? (
            <Link
              to="/posts/waitlist"
              className="p-2 flex items-center justify-center"
            >
              <span className="material-symbols-rounded">pending_actions</span>
            </Link>
          ) : (
            ""
          )}
          <Link to="/account" className="p-2 flex items-center justify-center">
            <span className="material-symbols-rounded">account_circle</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};
