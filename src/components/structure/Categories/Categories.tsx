import Link from "next/link";
import React, { FC } from "react";
import { categoryPathBySlug } from "../../../utils/categories";
import { ICategories } from "../../posts/types";
import styles from "./Categories.module.css";

interface ICategoriesProps {
  categories: ICategories[];
}

const Categories: FC<ICategoriesProps> = ({ categories }) => {
  return (
    <div className={styles.categories}>
      <h3>Категории</h3>
      <hr />
      <ul>
        {categories &&
          categories.map((category) => (
            <li className={styles.category} key={category.id}>
              <Link href={`${categoryPathBySlug(category.slug)}`}>
                <a>{category.name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
