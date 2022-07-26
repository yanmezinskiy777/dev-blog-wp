import React, { FC } from "react";
import styles from "./Title.module.css";

interface ITitle {
  title: string;
  numberOfPosts: number;
}

const Title: FC<ITitle> = ({ title, numberOfPosts }) => {
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
      <p>
        Постов в категории: <b>{numberOfPosts}</b>
      </p>
    </div>
  );
};

export default Title;
