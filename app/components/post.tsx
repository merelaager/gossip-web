import React from "react";
import { Link } from "react-router";

interface PostProps {
  id: string;
  title: string;
  content: string | null;
  imageId: string | null;
  createdAt: Date;
}

export const PostCard = ({
  id,
  title,
  content,
  imageId,
  createdAt,
}: PostProps) => {
  const date = new Date(createdAt);
  const localisedDate = date.toLocaleDateString("et-EE", {
    year: "2-digit",
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
            <span
              className="ml-2 text-pink-200 text-xs"
              suppressHydrationWarning={true} // needed due to the potential client-server timezone mismatch
            >
              {localisedDate} @ {localisedTime}
            </span>
          </div>
          <p className="line-clamp-5 whitespace-pre-wrap">{content}</p>
          {imageId ? (
            <div className="flex overflow-hidden">
              <img src={`/img/${imageId}`} className="max-h-[100px] w-auto" />
            </div>
          ) : (
            ""
          )}
        </article>
      </Link>
    </li>
  );
};
