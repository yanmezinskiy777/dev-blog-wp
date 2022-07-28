import React, { FC } from "react";
import Categories from "../Categories";
import { IPost } from "../PostCard/PostCardItem/types";
import RecentPosts from "../RecentPosts";
import SideBar from "../SideBar";
import styles from "./Toolbar.module.css";

interface IToolbar {
  recentPosts: IPost[];
  categories: any;
  isPost?: boolean;
}

const Toolbar: FC<IToolbar> = ({ recentPosts, categories, isPost = false }) => {
  return (
    <div className={styles.toolbar}>
      <SideBar title="Последние посты" isPost={isPost}>
        <RecentPosts posts={recentPosts} />
      </SideBar>
      <SideBar title="Категории" isPost={isPost}>
        <Categories categories={categories} />
      </SideBar>
    </div>
  );
};

export default Toolbar;
