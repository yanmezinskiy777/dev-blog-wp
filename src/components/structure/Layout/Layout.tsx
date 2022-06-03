import React, { FC } from "react";
import Helmet from "react-helmet";
import { helmetSettingsFromMetadata } from "../../../utils/metadata/metadata";
import useApp from "../../hooks/useApp";
import styles from "./Layout.module.css";

interface ILayout {
  children: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {

  const { metadata }: any = useApp();
  
  const helmetSettings = {
    defaultTitle: metadata.title,
    titleTemplate:
      (process.env.WORDPRESS_PLUGIN_SEO as any) === true
        ? "%s"
        : `%s - ${metadata.title}`,
    ...helmetSettingsFromMetadata(metadata, {
      setTitle: false,
      link: [
        {
          rel: "alternate",
          type: "application/rss+xml",
          href: "/feed.xml",
        },

        // Favicon sizes and manifest generated via https://favicon.io/

        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
    }),
  };

  return (
    <div className={styles.container}>
      <Helmet {...helmetSettings as any} />
      {/* Navigation */}
      <main>{children}</main>
      {/* Footer */}
    </div>
  );
};

export default Layout;
