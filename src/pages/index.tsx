import type { NextPage } from "next";
import {
  getPaginatedPosts,
  getRecentPosts,
} from "../components/api/posts/posts";
import PostCard from "../components/posts/PostCard";
import { ICategories, IPost } from "../components/posts/types";
import Layout from "../components/structure/Layout";
import Section from "../components/structure/Section";
import Paginataion from "../components/structure/Pagination";
import styles from "../styles/Home.module.css";
import { getAllCategories } from "../components/api/categories/categories";
import Categories from "../components/structure/Categories";
import RecentPosts from "../components/structure/RecentPosts";
import SideBar from "../components/structure/SideBar";

interface IHome {
  posts: any;
  pagination: any;
  categories: ICategories[];
  recentPosts: any;
}

const Home: NextPage<IHome> = ({
  posts,
  pagination,
  categories,
  recentPosts,
}) => {
  console.log(posts);
  console.log(pagination);
  console.log(categories);
  console.log(recentPosts);
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
            <SideBar title="Последние посты">
              <RecentPosts posts={recentPosts} />
            </SideBar>
            <SideBar title="Категории">
              <Categories categories={categories} />
            </SideBar>
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
