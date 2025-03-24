import { PostCard } from "~/components/post";
import React from "react";
import { prisma } from "~/utils/db.server";
import { requireUserId } from "~/utils/auth.server";
import { Link, type LoaderFunctionArgs, useLoaderData } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { shift: true },
  });

  if (!userData) {
    return { posts: [], currentPage: 1, totalPages: 1 };
  }

  const url = new URL(request.url);
  // Default to the first page for an incorrect or a missing page parameter.
  let pageNumber = parseInt(url.searchParams.get("page") ?? "NaN", 10);
  if (!pageNumber || pageNumber < 1) {
    pageNumber = 1;
  }

  const postsPerPage = 15;

  const publishedPostCount = await prisma.post.count({
    where: { shift: userData.shift, published: true, hidden: false },
  });
  const totalPages = Math.ceil(publishedPostCount / postsPerPage);

  const posts = await prisma.post.findMany({
    where: { shift: userData.shift, published: true, hidden: false },
    orderBy: { createdAt: "desc" },
    skip: postsPerPage * (pageNumber - 1),
    take: postsPerPage,
  });

  return { posts, currentPage: pageNumber, totalPages };
};

const PaginationButton = ({
  children,
  isActive = false,
}: {
  children: React.ReactNode;
  isActive?: boolean;
}) => {
  const className = "px-2 py-1" + (isActive ? " bg-pink-400" : "");
  return <li className={className}>{children}</li>;
};

export default function PostsIndexRoute() {
  const data = useLoaderData<typeof loader>();

  const { currentPage, totalPages } = data;
  const numberPadding = 2;
  const pageNumbersNav = [
    <PaginationButton key={1} isActive={currentPage === 1}>
      <Link to="?page=1">1</Link>
    </PaginationButton>,
  ];

  const lowerPage = currentPage - numberPadding;
  const upperPage = currentPage + numberPadding;

  if (lowerPage > 2)
    pageNumbersNav.push(<PaginationButton key="before">…</PaginationButton>);
  for (let i = lowerPage; i < upperPage + 1; ++i) {
    if (i <= 1 || i >= totalPages) continue;
    pageNumbersNav.push(
      <PaginationButton key={i} isActive={currentPage === i}>
        <Link to={`?page=${i}`}>{i}</Link>
      </PaginationButton>,
    );
  }
  if (upperPage < totalPages - 1)
    pageNumbersNav.push(<PaginationButton key="after">…</PaginationButton>);
  if (totalPages != 1)
    pageNumbersNav.push(
      <PaginationButton key={totalPages} isActive={currentPage === totalPages}>
        <Link to={`?page=${totalPages}`}>{totalPages}</Link>
      </PaginationButton>,
    );

  return (
    <>
      <ul>
        {data.posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            imageId={post.imageId}
            createdAt={post.createdAt}
          />
        ))}
      </ul>
      <div>
        <ol className="flex justify-center">{pageNumbersNav}</ol>
      </div>
    </>
  );
}
