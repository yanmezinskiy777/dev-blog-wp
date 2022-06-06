import React, { FC } from "react";
import { IPost } from "./types";
import styles from "./PostCard.module.css";
import Button from "../ui/button";
import Metadata from "../metadata";
import { getPostLink } from "../../utils/posts";

const PostCard: FC<{ post: IPost }> = ({ post }) => {
  const { featuredImage, title, excerpt, slug, author, date, categories } =
    post;

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
      <Metadata author={author} date={date} categories={categories} />
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
