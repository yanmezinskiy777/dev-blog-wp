import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { helmetSettingsFromMetadata } from '../../utils/metadata/metadata';
import { ISettingsMetadata } from '../api/metadata/types';
import useApp from '../hooks/useApp';
import { IPost } from '../structure/PostCard/PostCardItem/types';
import Layout from '../structure/Layout';
import { IPagination } from '../structure/Pagination/Pagination';
import styles from '../../styles/Home.module.css';
import Section from '../structure/Section';
import { PostCard } from '../structure/';
import Paginataion from '../structure/Pagination';
import Toolbar from '../structure/Toolbar';
import Container from '../structure/Container';

interface ITemplate {
  TitleComponent?: JSX.Element;
  title?: string;
  posts: IPost[];
  slug: string;
  pagination?: IPagination;
  metadata: ISettingsMetadata;
  recentPosts: any;
  categories: any;
}

const Template: FC<ITemplate> = ({
  title,
  posts,
  slug,
  pagination,
  metadata,
  recentPosts,
  categories,
  TitleComponent = undefined,
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
        {TitleComponent && TitleComponent}
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

export default Template;
