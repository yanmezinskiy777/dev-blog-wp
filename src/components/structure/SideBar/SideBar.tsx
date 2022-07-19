import React, { FC } from 'react'
import styles from "./SideBar.module.css"

interface ISideBar {
    children: React.ReactNode,
    title: string;
}

const SideBar: FC<ISideBar> = ({ children, title }) => {
  return (
    <div className={styles.sidebar}>
        <h3>{title}</h3>
        <hr />
        {children}
    </div> 
  )
}

export default SideBar