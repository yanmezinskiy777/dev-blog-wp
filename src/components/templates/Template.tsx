import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { helmetSettingsFromMetadata } from "../../utils/metadata/metadata";
import { ISettingsMetadata } from "../api/metadata/types";
import useApp from "../hooks/useApp";
import { IPost } from "../posts/types";
import Layout from "../structure/Layout";
import { IPagination } from "../structure/Pagination/Pagination";
import styles from "../../styles/Home.module.css";
import Section from "../structure/Section";
import PostCard from "../posts/PostCard";
import Paginataion from "../structure/Pagination";

interface ITemplate {
  title: string;
  posts: IPost[];
  slug: string;
  pagination: IPagination;
  metadata: ISettingsMetadata;
}

const Template: FC<ITemplate> = ({
  title,
  posts,
  slug,
  pagination,
  metadata,
}) => {
  const { metadata: siteMetadata } = useApp();

  if (Boolean(process.env.WORDPRESS_PLUGIN_SEO) !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og!.title = metadata.title;
    metadata.twitter!.title = metadata.title;
  }

  const helmetStteings = helmetSettingsFromMetadata(metadata, {});
  return (
    <Layout>
      <Helmet {...(helmetStteings as any)} />
      <Section>
        <div className={styles.container}>
          <div className={styles.posts}>
            {posts?.map((post: IPost) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className={styles.toolbar}>
            <div>Good Posts</div>
            <div>Categories</div>
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

export default Template;
