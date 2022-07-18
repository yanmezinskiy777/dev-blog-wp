import { FC } from "react";
import Helmet from "react-helmet";
import { IPost } from "../../components/posts/types";
import { getPostLink } from "../posts";

interface IArticleJson {
  post: IPost;
  siteTitle: string;
}

const ArticleJsonLd: FC<IArticleJson> = ({ post, siteTitle }) => {
  const homepage = process.env.HOME_PAGE;
  const faviconPath = "/favicon.ico";
  const {
    title,
    slug,
    excerpt,
    date,
    author,
    categories,
    modified,
    featuredImage,
  } = post;
  const path = getPostLink(slug);
  const datePublished = !!date && new Date(date);
  const dateModified = !!modified && new Date(modified);

  /** TODO - As image is a recommended field would be interesting to have a
   * default image in case there is no featuredImage comming from WP,
   * like the open graph social image
   * */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${homepage}${path}`,
    },
    headline: title,
    image: [featuredImage?.sourceUrl],
    datePublished: datePublished ? datePublished.toISOString() : "",
    dateModified: dateModified
      ? dateModified.toISOString()
      : datePublished && datePublished.toISOString(),
    description: excerpt,
    keywords: [categories.map(({ name }) => `${name}`).join(", ")],
    copyrightYear: datePublished ? datePublished.getFullYear() : "",
    author: {
      "@type": "Person",
      name: author?.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteTitle,
      logo: {
        "@type": "ImageObject",
        url: `${homepage}${faviconPath}`,
      },
    },
  };

  return (
    <>
      <Helmet encodeSpecialCharacters={false}>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
    </>
  );
};

export default ArticleJsonLd;

export function WebsiteJsonLd({ siteTitle = '' }) {
  const homepage = process.env.HOME_PAGE;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    url: homepage,
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${homepage}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}