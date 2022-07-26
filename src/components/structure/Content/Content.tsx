import React, { FC } from "react";
import styles from "./Content.module.css";

interface IContent {
  children: React.ReactNode;
}

const Content: FC<IContent> = ({ children }) => {
  return <div className={styles.Content}>{children}</div>;
};

export default Content;
