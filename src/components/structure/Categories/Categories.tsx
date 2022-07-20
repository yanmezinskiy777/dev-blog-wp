import Link from 'next/link';
import React, { FC } from 'react';
import { categoryPathBySlug } from '../../../utils/categories';
import { ICategories } from '../PostCard/PostCardItem/types';
import styles from './Categories.module.css';

interface ICategoriesProps {
  categories: ICategories[];
}

const Categories: FC<ICategoriesProps> = ({ categories }) => {
  return (
    <ul className={styles.categories}>
      {categories &&
        categories.map((category) => (
          <li className={styles.category} key={category.id}>
            <Link href={`${categoryPathBySlug(category.slug)}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Categories;
