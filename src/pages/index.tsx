import type { NextPage } from "next";
import { getPaginatedPosts } from "../components/api/posts/posts";
import PostCard from "../components/posts/PostCard";
import { ICategories, IPost } from "../components/posts/types";
import Layout from "../components/structure/Layout";
import Section from "../components/structure/Section";
import Paginataion from "../components/structure/Pagination";
import styles from "../styles/Home.module.css";
import { getAllCategories } from "../components/api/categories/categories";
import Categories from "../components/structure/Categories";

interface IHome {
  posts: any;
  pagination: any;
  categories: ICategories[];
}

const Home: NextPage<IHome> = ({ posts, pagination, categories }) => {
  console.log(posts);
  console.log(pagination);
  console.log(categories);
  return (
    <Layout>
      <Section>
        <div className={styles.container}>
          <div className={styles.posts}>
            {posts?.map((post: IPost) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className={styles.toolbar}>
            <div>Good Posts</div>
            <Categories categories={categories} />
          </div>
        </div>
        {pagination && (
          <Paginataion
            addCanonical={false}
            currentPage={pagination?.currentPage}
            pagesCount={pagination?.pagesCount}
            basePath={pagination?.basePath}
          />
        )}
      </Section>
    </Layout>
  );
};

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts({
    currentPage: 1,
    options: { queryIncludes: "archive" },
  });

  const { categories } = await getAllCategories();

  return {
    props: {
      categories,
      posts,
      pagination: {
        ...pagination,
        basePath: "/posts",
      },
    },
  };
}

export default Home;
