import usePageMetadata from "../../../components/hooks/usePageMetadata";

import {
  getAllPosts,
  getPagesCount,
  getPaginatedPosts,
  getRecentPosts,
} from "../../../components/api/posts/posts";
import Template from "../../../components/templates/Template";
import { GetStaticProps } from "next";
import { getAllCategories } from "../../../components/api/categories/categories";
import {
  ICategories,
  IPost,
} from "../../../components/structure/PostCard/PostCardItem/types";

interface IPagePosts {
  posts: IPost[];
  pagination: any;
  recentPosts: IPost[];
  categories: ICategories[];
}

export default function Posts({
  posts,
  pagination,
  recentPosts,
  categories,
}: IPagePosts) {
  const title = `Все посты`;
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
      recentPosts={recentPosts}
      categories={categories}
    />
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { posts, pagination } = await getPaginatedPosts({
    currentPage: params && Number(params.page) ? Number(params.page) : 1,
    options: { queryIncludes: "archive" },
  });

  const { posts: recentPosts } = await getRecentPosts(3);

  const { categories } = await getAllCategories();

  return {
    props: {
      recentPosts,
      categories,
      posts,
      pagination: {
        ...pagination,
        basePath: "/posts",
      },
    },
    revalidate: 600,
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
