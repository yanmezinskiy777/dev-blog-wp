import type { NextPage } from "next";
import { getPaginatedPosts } from "../components/api/posts/posts";
import PostCard from "../components/posts/PostCard";
import { IPost } from "../components/posts/types";
import Layout from "../components/structure/Layout";
import styles from "../styles/Home.module.css";

interface IHome {
  posts: any;
  pagination: any;
}

const Home: NextPage<IHome> = ({ posts, pagination }) => {
  console.log(posts);
  console.log(pagination);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.posts}>
          <ul>
            {posts?.map((post: IPost) => (
              <PostCard key={post.id} post={post} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts({
    currentPage: 1,
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
}

export default Home;
