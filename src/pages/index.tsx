import type { NextPage } from "next";
import {
  getPaginatedPosts,
  getRecentPosts,
} from "../components/api/posts/posts";
import { PostCard } from "../components/structure/";
import {
  ICategories,
  IPost,
} from "../components/structure/PostCard/PostCardItem/types";
import Layout from "../components/structure/Layout";
import Section from "../components/structure/Section";
import Paginataion from "../components/structure/Pagination";
import styles from "../styles/Home.module.css";
import { getAllCategories } from "../components/api/categories/categories";
import Toolbar from "../components/structure/Toolbar";
import Container from "../components/structure/Container";

interface IHome {
  posts: IPost[];
  pagination: any;
  categories: ICategories[];
  recentPosts: IPost[];
}

const Home: NextPage<IHome> = ({
  posts,
  pagination,
  categories,
  recentPosts,
}) => {
  return (
    <Layout>
      <Section>
        <Container>
          <div className={styles.posts}>
            {posts?.map((post: IPost) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div>
            <Toolbar recentPosts={recentPosts} categories={categories} />
          </div>
        </Container>
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
  };
}

export default Home;
