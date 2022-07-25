import Link from "next/link";
import { Helmet } from "react-helmet";

import styles from "../styles/404.module.css";
import { Layout, Section } from "../components/structure";

export default function Custom404() {
  return (
    <Layout>
      <Helmet>
        <title>404 | Страница не найдена</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Section>
        <div className={styles.error}>
          <h1>Страница не найдена 404</h1>
          <span>Страница которую вы ищите не найдена!</span>
          <p>
            <Link href="/">
              <a>Вернуться обратно</a>
            </Link>
          </p>
        </div>
      </Section>
    </Layout>
  );
}

// Next.js method to ensure a static page gets rendered
export async function getStaticProps() {
  return {
    props: {},
  };
}
