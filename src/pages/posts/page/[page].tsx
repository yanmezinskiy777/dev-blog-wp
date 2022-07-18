import usePageMetadata from "../../../components/hooks/usePageMetadata";

import {
  getAllPosts,
  getPagesCount,
  getPaginatedPosts,
} from "../../../components/api/posts/posts";
import Template from "../../../components/templates/Template";
import { GetStaticProps } from "next";

interface IPagePosts {
  posts: any;
  pagination: any;
}

export default function Posts({ posts, pagination }: IPagePosts) {
  const title = `All Posts`;
  const slug = "posts";

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: `Page ${pagination.currentPage}`,
    },
  });

  return (
    <Template
      title={title}
      posts={posts}
      slug={slug}
      pagination={pagination}
      metadata={metadata as any}
    />
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { posts, pagination } = await getPaginatedPosts({
    currentPage: params && Number(params.page) ? Number(params.page) : 1,
    options: { queryIncludes: "archive" },
  });
  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: "/posts",
      },
    },
  };
};

export const getStaticPaths = async () => {
  const { posts } = await getAllPosts({
    queryIncludes: "index",
  });
  const pagesCount = await getPagesCount(posts);
  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { params: { page: String(i + 1) } };
  });
  return {
    paths,
    fallback: false,
  };
};
