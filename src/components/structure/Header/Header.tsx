import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>Блог по веб-разработке</a>
      </Link>
    </div>
  );
};

export default Header;
