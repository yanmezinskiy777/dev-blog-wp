import React, { FC } from "react";
import { IPost } from "./types";
import styles from "./PostCard.module.css";
import Link from "next/link";

const PostCard: FC<{ post: IPost }> = ({ post }) => {
  console.log(post);
  const { featuredImage, title, excerpt, slug } = post;
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
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
      )}
      {excerpt && (
        <div
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />
      )}
      <Link href={slug}>
         
      </Link>
    </article>
  );
};

export default PostCard;
