import { GetStaticProps } from "next";
import {
  getAllCategories,
  getCategoryBySlug,
} from "../../components/api/categories/categories";
import { ICategories } from "../../components/api/categories/types";
import {
  getPostsByCategoryId,
  getRecentPosts,
} from "../../components/api/posts/posts";
import usePageMetadata from "../../components/hooks/usePageMetadata";
import { Title } from "../../components/structure";
import { IPost } from "../../components/structure/PostCard/PostCardItem/types";
import Template from "../../components/templates/Template";

interface IPagePosts {
  posts: IPost[];
  category: any;
  recentPosts: IPost[];
  categories: ICategories[];
}

export default function Categories({
  posts,
  category,
  recentPosts,
  categories,
}: IPagePosts) {
  const { name, description, slug } = category;

  const { metadata } = usePageMetadata({
    metadata: {
      ...category,
      description:
        description ||
        category.og?.description ||
        `Постов в категории ${name}: ${posts.length}`,
    },
  });

  return (
    <Template
      posts={posts}
      slug={slug}
      metadata={metadata as any}
      recentPosts={recentPosts}
      categories={categories}
      TitleComponent={<Title title={name} numberOfPosts={posts.length} />}
    />
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category } = await getCategoryBySlug(params?.slug);
  const { posts } = await getPostsByCategoryId({
    categoryId: category.databaseId,
    options: { queryIncludes: "archive" },
  });

  const { posts: recentPosts } = await getRecentPosts(3);

  const { categories } = await getAllCategories();

  return {
    props: {
      recentPosts,
      categories,
      category,
      posts,
    },
    revalidate: 600,
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
