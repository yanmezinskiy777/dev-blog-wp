import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { getAllPosts, getPostBySlug } from "../../components/api/posts/posts";
import { IPost } from "../../components/posts/types";

interface IPostPage {
  post: IPost;
}

const Posts = ({ post }: IPostPage) => {
  console.log(post);
  return <div>Posts</div>;
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const { post } = await getPostBySlug(params.slug);
  return {
    props: {
      post,
    },
  };
};

export async function getStaticPaths() {
  const { posts } = await getAllPosts({
    queryIncludes: "index",
  });
  const paths = posts
    .filter(({ slug }) => typeof slug === "string")
    .map(({ slug }) => {
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
}

export default Posts;
