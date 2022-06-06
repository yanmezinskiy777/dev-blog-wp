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

interface IMetadata {
  author: IAuthor;
  date: string;
  categories: ICategories[];
  options?: {
    compactCategories: boolean;
  };
}

const Metadata: FC<IMetadata> = ({
  author,
  date,
  categories,
  options = DEFAULT_METADATA_OPTIONS,
}) => {
  const { compactCategories } = options;
  return (
    <ul>
      {author && (
        <li>
          <address>
            {author.avatar && (
              <img
                width={author.avatar.width}
                height={author.avatar.height}
                src={author.avatar.url}
                alt="Author Avatar"
              />
            )}
            <Link href={authorPathByName(author.name)}>
              <a rel="author">{author.name}</a>
            </Link>
          </address>
        </li>
      )}
      {date && (
        <li>
          <time dateTime={date}>{formatDate(date)}</time>
        </li>
      )}
      {Array.isArray(categories) && categories[0] && (
        <li className={styles.metadataCategories}>
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
