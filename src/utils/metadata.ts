import { removeExtraSpaces } from "./baseUtils";
import { IMetadata, IOptions, ISettings } from "./types";

export function helmetSettingsFromMetadata(
  metadata: IMetadata,
  options: IOptions
) {
  const { link = [], meta = [], setTitle = true } = options;

  const sanitizedDescription = removeExtraSpaces(metadata.description);

  const settings: ISettings = {
    htmlAttributes: {
      lang: metadata.language,
    },
  };

  if (setTitle) {
    settings.title = metadata.title;
  }

  settings.link = [
    ...link,
    {
      rel: "canonical",
      href: metadata.canonical,
    },
  ].filter(({ href }) => !!href);

  settings.meta = [
    ...meta,
    {
      name: "description",
      content: sanitizedDescription,
    },
    {
      property: "og:title",
      content: metadata.og?.title || metadata.title,
    },
    {
      property: "og:description",
      content: metadata.og?.description || sanitizedDescription,
    },
    {
      property: "og:url",
      content: metadata.og?.url,
    },
    {
      property: "og:image",
      content: metadata.og?.imageUrl,
    },
    {
      property: "og:image:secure_url",
      content: metadata.og?.imageSecureUrl,
    },
    {
      property: "og:image:width",
      content: metadata.og?.imageWidth,
    },
    {
      property: "og:image:height",
      content: metadata.og?.imageHeight,
    },
    {
      property: "og:type",
      content: metadata.og?.type || "website",
    },
    {
      property: "og:site_name",
      content: metadata.siteTitle,
    },
    {
      property: "twitter:title",
      content: metadata.twitter?.title || metadata.og?.title || metadata.title,
    },
    {
      property: "twitter:description",
      content:
        metadata.twitter?.description ||
        metadata.og?.description ||
        sanitizedDescription,
    },
    {
      property: "twitter:image",
      content: metadata.twitter?.imageUrl || metadata.og?.imageUrl,
    },
    {
      property: "twitter:site",
      content: metadata.twitter?.username && `@${metadata.twitter.username}`,
    },
    {
      property: "twitter:card",
      content: metadata.twitter?.cardType,
    },
    {
      property: "article:modified_time",
      content: metadata.article?.modifiedTime,
    },
    {
      property: "article:published_time",
      content: metadata.article?.publishedTime,
    },
  ].filter(({ content }) => !!content);

  return settings;
}
