/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import React from "react";
import { getAllPosts, getPostBySlug } from "../../components/api/posts/posts";
import Metadata from "../../components/metadata";
import { IPost } from "../../components/posts/types";
import Content from "../../components/structure/Content";
import Layout from "../../components/structure/Layout";
import PostHeader from "../../components/structure/PostHeader";
import Section from "../../components/structure/Section";
import styles from "./Posts.module.css";
interface IPostPage {
  post: IPost;
}

const Posts = ({ post }: IPostPage) => {
  const {
    title,
    //metaTitle,
    //description,
    content,
    date,
    author,
    categories,
    //modified,
    featuredImage,
    isSticky = false,
  } = post;
  console.log(post);
  return (
    <Layout>
      <PostHeader>
        {featuredImage?.sourceUrl && (
          <div className={styles.imageContainer}>
            <img
              srcSet={featuredImage.srcSet}
              src={featuredImage.sourceUrl}
              alt={title}
              className={styles.image}
            />
          </div>
        )}
        {title && (
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        )}
        <Metadata author={author} date={date} categories={categories} />
      </PostHeader>

      <Content>
        <Section>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </Section>
      </Content>
    </Layout>
  );
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
