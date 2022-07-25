/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import React from "react";
import { Helmet } from "react-helmet";
import {
  getAllPosts,
  getPostBySlug,
  getRecentPosts,
} from "../../components/api/posts/posts";
import useApp from "../../components/hooks/useApp";
import Metadata from "../../components/structure/Metadata";
import {
  ICategories,
  IPost,
} from "../../components/structure/PostCard/PostCardItem/types";
import Content from "../../components/structure/Content";
import Layout from "../../components/structure/Layout";
import PostHeader from "../../components/structure/PostHeader";
import Section from "../../components/structure/Section";
import { helmetSettingsFromMetadata } from "../../utils/metadata/metadata";
import usePageMetadata from "../../components/hooks/usePageMetadata";
import styles from "./Posts.module.css";
import { getAllCategories } from "../../components/api/categories/categories";
import Container from "../../components/structure/Container";
import Toolbar from "../../components/structure/Toolbar";

interface IPostPage {
  post: IPost;
  recentPosts: IPost[];
  categories: ICategories[];
}

const Posts = ({ post, recentPosts, categories: allCategories }: IPostPage) => {
  const {
    title,
    metaTitle,
    description,
    content,
    date,
    author,
    categories,
    //modified,
    featuredImage,
    //isSticky = false,
  } = post;

  const { metadata: siteMetadata } = useApp();

  //post.og.imageUrl = `${homepage}${socialImage}`;
  post.og.imageSecureUrl = post.og.imageUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle,
      description: description || post.og?.description || `Читать ешё ${title}`,
    },
  });

  if (Boolean(process.env.WORDPRESS_PLUGIN_SEO) !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter!.title = metadata.title;
  }

  const helmetStteings = helmetSettingsFromMetadata(metadata, {});

  return (
    <Layout>
      <Helmet {...(helmetStteings as any)} />
      <Section>
        <Container>
          <article className={styles.postBody}>
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
              <Metadata
                author={author}
                date={date}
                categories={categories}
                type="left"
              />
              {title && (
                <h1
                  className={styles.title}
                  dangerouslySetInnerHTML={{
                    __html: title,
                  }}
                />
              )}
            </PostHeader>
            <Content>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </Content>
          </article>
          <div>
            <Toolbar recentPosts={recentPosts} categories={allCategories} />
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const { post } = await getPostBySlug(params.slug);

  const { posts: recentPosts } = await getRecentPosts(3);

  const { categories } = await getAllCategories();

  return {
    props: {
      recentPosts,
      categories,
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
