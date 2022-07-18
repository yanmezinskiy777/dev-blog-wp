import React, { FC } from "react";
import { ICategories } from "../../posts/types";
import styles from "./Categories.module.css"

interface ICategoriesProps {
  categories: ICategories[];
}

const Categories: FC<ICategoriesProps> = ({ categories }) => {
  return (
    <ul className={styles.categories}>
      {categories &&
        categories.map((category) => (
          <li className={styles.category} key={category.id}>{category.name}</li>
        ))}
    </ul>
  );
};

export default Categories;
