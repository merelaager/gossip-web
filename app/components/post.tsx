import React from "react";
import { Link, useFetcher } from "react-router";
import { cdnPrefix } from "~/utils/vars";

interface PostProps {
  id: string;
  title: string;
  content: string | null;
  imageId: string | null;
  liked: boolean;
  likeCount: number;
  createdAt: Date;
}

export const PostCard = ({
  id,
  title,
  content,
  imageId,
  liked,
  likeCount,
  createdAt,
}: PostProps) => {
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

  const fetcher = useFetcher();

  return (
    <li className="border-b border-pink-500">
      <div className="px-4">
        <Link to={`/posts/${id}`}>
          <article className="py-2">
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
                <img
                  src={cdnPrefix + imageId}
                  className="max-h-[100px] w-auto"
                />
              </div>
            ) : (
              ""
            )}
          </article>
        </Link>
        <div className="flex mt-2">
          <fetcher.Form method="post" action={`/posts/${id}`}>
            <button
              name="intent"
              type="submit"
              value={liked ? "unliked" : "liked"}
              className="material-symbols-rounded"
              style={{ fontVariationSettings: `'FILL' ${liked ? 1 : 0}` }}
            >
              favorite
            </button>
          </fetcher.Form>
          <span>{likeCount}</span>
        </div>
      </div>
    </li>
  );
};
