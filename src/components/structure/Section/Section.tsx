import React, { FC } from "react";
import styles from "./Section.module.css";

interface ISection {
  children: React.ReactNode;
}

const Section: FC<ISection> = ({ children }) => {
  return <section className={styles.Section}>{children}</section>;
};

export default Section;
