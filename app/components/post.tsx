import { Link } from "@remix-run/react";
import React from "react";

interface PostProps {
  id: string;
  title: string;
  content: string;
}

export const PostCard = ({ id, title, content }: PostProps) => {
  return (
    <li className="border-b border-pink-500">
      <Link to={id}>
        <article className="px-4 py-2">
          <h3 className="font-bold">{title}</h3>
          <p className="line-clamp-5">{content}</p>
        </article>
      </Link>
    </li>
  );
};
