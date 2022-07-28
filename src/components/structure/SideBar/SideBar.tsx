import React, { FC } from "react";
import styles from "./SideBar.module.css";

interface ISideBar {
  children: React.ReactNode;
  title: string;
  isPost: boolean;
}

const SideBar: FC<ISideBar> = ({ children, title, isPost = false }) => {
  const classNames = !isPost
    ? styles.sidebar
    : [styles.sidebar, styles.sidebarPost].join(" ");
  return (
    <div className={classNames}>
      <h3>{title}</h3>
      <hr />
      {children}
    </div>
  );
};

export default SideBar;
