import React, { FC } from 'react'
import styles from "./PostHeader.module.css"

interface IPostHeader {
    children: React.ReactNode
}

const PostHeader: FC<IPostHeader> = ({ children }) => {
  return (
    <header className={styles.PostHeader}>
        {children}
    </header>
  )
}

export default PostHeader