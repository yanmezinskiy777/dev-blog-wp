/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { FC } from "react";
import { formatDate } from "../../utils/baseUtils";
import { categoryPathBySlug } from "../../utils/categories";
import { authorPathByName } from "../../utils/users";
import { IAuthor, ICategories } from "../posts/types";
import styles from "./Metadata.module.css";

const DEFAULT_METADATA_OPTIONS = {
  compactCategories: true,
};

export interface IMetadata {
  author: IAuthor;
  date: string;
  categories: ICategories[];
  type: "center" | "left";
  options?: {
    compactCategories: boolean;
  };
}

const Metadata: FC<IMetadata> = ({
  author,
  date,
  categories,
  options = DEFAULT_METADATA_OPTIONS,
  type = "center",
}) => {
  const { compactCategories } = options;
  const metaDataClass = type === "center" ? [styles.metadata, styles.center] : [styles.metadata, styles.left];
  return (
    <ul className={metaDataClass.join(" ")}>
      {author && (
        <li className={styles.avatar}>
          <address>
            {author.avatar && (
              <img
                width={author.avatar.width}
                height={author.avatar.height}
                src={author.avatar.url}
                alt="Author Avatar"
                className={styles.ava}
              />
            )}
            <Link href={authorPathByName(author.name)}>
              <a rel="author" className={styles.username}>
                {author.name}
              </a>
            </Link>
          </address>
        </li>
      )}
      {date && (
        <li className={styles.date}>
          <time dateTime={date}>{formatDate(date)}</time>
        </li>
      )}
      {Array.isArray(categories) && categories[0] && (
        <li className={styles.categories}>
          {compactCategories && (
            <p title={categories.map(({ name }) => name).join(", ")}>
              <Link href={categoryPathBySlug(categories[0].slug)}>
                <a>{categories[0].name}</a>
              </Link>
              {categories.length > 1 && " and more"}
            </p>
          )}
          {!compactCategories && (
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.slug}>
                    <Link href={categoryPathBySlug(category.slug)}>
                      <a>{category.name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      )}
    </ul>
  );
};

export default Metadata;
