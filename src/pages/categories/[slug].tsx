import { GetStaticProps } from "next";
import {
  getAllCategories,
  getCategoryBySlug,
} from "../../components/api/categories/categories";
import { ICategories } from "../../components/api/categories/types";
import { getPostsByCategoryId } from "../../components/api/posts/posts";
import usePageMetadata from "../../components/hooks/usePageMetadata";
import Template from "../../components/templates/Template";

interface IPagePosts {
  posts: any;
  category: any;
}

export default function Categories({ posts, category }: IPagePosts) {
  const { name, description, slug } = category;

  const { metadata } = usePageMetadata({
    metadata: {
      ...category,
      description:
        description ||
        category.og?.description ||
        `Read ${posts.length} posts from ${name}`,
    },
  });

  return <Template posts={posts} slug={slug} metadata={metadata as any} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category } = await getCategoryBySlug(params?.slug);

  const { posts } = await getPostsByCategoryId({
    categoryId: category.databaseId,
    options: { queryIncludes: "archive" },
  });

  return {
    props: {
      category,
      posts,
    },
  };
};

export const getStaticPaths = async () => {
  const { categories }: { categories: ICategories[] } =
    await getAllCategories();

  const paths = categories.map((category) => {
    const { slug } = category;
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
