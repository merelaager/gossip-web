import { Link } from "@remix-run/react";
import React from "react";

interface PostProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const PostCard = ({ id, title, content, createdAt }: PostProps) => {
  const date = new Date(createdAt);
  const localisedDate = date.toLocaleDateString("et-EE", {
    // year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  const localisedTime = date.toLocaleTimeString("et-EE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <li className="border-b border-pink-500">
      <Link to={`/posts/${id}`}>
        <article className="px-4 py-2">
          <div className="flex items-center">
            <h3 className="font-bold">{title}</h3>
            <span className="ml-2 text-pink-200 text-xs">
              {localisedDate} @ {localisedTime}
            </span>
          </div>
          <p className="line-clamp-5 whitespace-pre-wrap">{content}</p>
        </article>
      </Link>
    </li>
  );
};
