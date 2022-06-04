import React, { FC } from "react";
import { IPost } from "./types";

const PostCard: FC<{ post: IPost }> = ({ post }) => {
  console.log(post);
  return <li>PostCard</li>;
};

export default PostCard;
