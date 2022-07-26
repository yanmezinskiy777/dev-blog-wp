import React, { FC } from "react";
import Categories from "../Categories";
import RecentPosts from "../RecentPosts";
import SideBar from "../SideBar";
import styles from "./Toolbar.module.css";

interface IToolbar {
  recentPosts: any;
  categories: any;
}

const Toolbar: FC<IToolbar> = ({ recentPosts, categories }) => {
  return (
    <div className={styles.toolbar}>
      <SideBar title="Последние посты">
        <RecentPosts posts={recentPosts} />
      </SideBar>
      <SideBar title="Категории">
        <Categories categories={categories} />
      </SideBar>
    </div>
  );
};

export default Toolbar;
