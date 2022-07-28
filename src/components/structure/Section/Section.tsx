import React, { FC } from "react";
import styles from "./Section.module.css";

interface ISection {
  children: React.ReactNode;
  className?: string;
}

const Section: FC<ISection> = ({ children, className }) => {
  return (
    <section className={[styles.Section, className].join(" ")}>
      {children}
    </section>
  );
};

export default Section;
