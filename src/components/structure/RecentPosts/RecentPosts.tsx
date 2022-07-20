/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { FC } from "react";
import { formatDate } from "../../../utils/baseUtils";
import { getPostLink } from "../../../utils/posts";
import { IPost } from "../../posts/types";
import styles from "./RecentPosts.module.css";

interface IRecientPost {
  posts: IPost[];
}

const RecentPosts: FC<IRecientPost> = ({ posts }) => {
  return (
    <div className={styles.recent}>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <Link href={`${getPostLink(post.slug)}`}>
                <a>
                  <div className={styles.item}>
                    <div className={styles.image}>
                      {post?.featuredImage?.srcSet ? (
                        <img
                          srcSet={post.featuredImage.srcSet}
                          src={post.featuredImage.sourceUrl}
                          alt={post.title}
                        />
                      ) : (
                        <img src="/images/placeholder.png" alt="post image" />
                      )}
                    </div>
                    <div className={styles.content}>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <p>{post.title}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecentPosts;
