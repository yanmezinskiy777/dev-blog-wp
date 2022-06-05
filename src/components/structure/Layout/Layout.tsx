import React, { FC } from "react";
import Helmet from "react-helmet";
import { helmetSettingsFromMetadata } from "../../../utils/metadata/metadata";
import useApp from "../../hooks/useApp";
import Header from "../Header";
import { link } from "./constants";
import styles from "./Layout.module.css";

interface ILayout {
  children: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  const { metadata } = useApp();

  const helmetSettings = {
    defaultTitle: metadata.title,
    titleTemplate:
      (process.env.WORDPRESS_PLUGIN_SEO as any) === true
        ? "%s"
        : `%s - ${metadata.title}`,
    ...helmetSettingsFromMetadata(metadata, {
      setTitle: false,
      link,
    }),
  };

  return (
    <div className={styles.container}>
      <Helmet {...(helmetSettings as any)} />
      <Header />
      <main>{children}</main>
      {/* Footer */}
    </div>
  );
};

export default Layout;
