import React, { FC } from "react";
import { IPost } from "./types";
import styles from "./PostCard.module.css";
import Button from "../ui/button";

const PostCard: FC<{ post: IPost }> = ({ post }) => {
  const { featuredImage, title, excerpt, slug } = post;
  const getPostLink = (slug: string) => {
    return `/posts/${slug}`;
  };
  return (
    <article className={styles.post}>
      {featuredImage?.sourceUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          srcSet={featuredImage.srcSet}
          src={featuredImage.sourceUrl}
          alt={title}
          className={styles.image}
        />
      )}
      {title && (
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
      )}
      {excerpt && (
        <div
          className={styles.excerpt}
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />
      )}
      <Button type="link" href={getPostLink(slug)} classNames={styles.button}>
        <>Продолжить чтение</>
      </Button>
    </article>
  );
};

export default PostCard;
