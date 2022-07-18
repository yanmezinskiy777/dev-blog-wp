import { ISettingsMetadata } from "../../components/api/metadata/types";
import { IArticle, IOg, IPost } from "../../components/posts/types";
import { removeExtraSpaces } from "../baseUtils";
import { IOptions, IOptionsConstruct, ISettings } from "./types";

export function helmetSettingsFromMetadata(
  metadata: ISettingsMetadata,
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

export function constructPageMetadata(
  defaultMetadata: IPost,
  pageMetadata: Partial<IPost>,
  options: IOptionsConstruct
) {
  const { router, homepage = "" } = options;
  const { asPath } = router;

  const url = `${homepage}${asPath}`;
  const pathname = new URL(url).pathname;
  const canonical = pageMetadata.canonical || `${homepage}${pathname}`;

  const metadata: Partial<IPost> = {
    description: "",
    imageUrl: "",
    imageSecureUrl: "",
    title: "",
    type: "",
    language: "",
    canonical: canonical,
    twitter: {
      title: "",
    },
  };

  const og: IOg = {
    description: "",
    imageUrl: "",
    imageHeight: 0,
    imageSecureUrl: "",
    imageWidth: 0,
    title: "",
    type: "",
    language: "",
    canonical: "",
    url: "",
  };

  const article: IArticle = {
    author: "",
    modifiedTime: "",
    publishedTime: "",
    publisher: "",
  };

  // Static Properties
  // Loop through top level metadata properties that rely on a non-object value
  const staticProperties = ["description", "language", "title"];

  staticProperties.forEach((property: string) => {
    const value: any = pageMetadata[property as keyof IPost]
      ? pageMetadata[property as keyof IPost]
      : defaultMetadata[property as keyof IPost];
    if (value) {
      metadata[property as keyof IPost] = value;
    }
  });

  // Open Graph Properties
  // Loop through Open Graph properties that rely on a non-object value

  if (pageMetadata.og) {
    const ogProperties: Array<keyof IOg> = [
      "description",
      "imageUrl",
      "imageHeight",
      "imageSecureUrl",
      "imageWidth",
      "title",
      "type",
    ];

    //TODO: FIX ERROR OG
    // ogProperties.forEach((property: string) => {
    //   let pageOg, defaultOg, pageStatic, defaultStatic;
    //   if (property) {
    //     if (pageMetadata.og.hasOwnProperty(property)) {
    //       if (pageMetadata.og[property as keyof IOg]) {
    //         pageOg = pageMetadata.og[property as keyof IOg];
    //         defaultOg = defaultMetadata.og[property as keyof IOg];
    //       }
    //     } else if (pageMetadata.hasOwnProperty(property)) {
    //       if (pageMetadata[property as keyof IPost]) {
    //         pageStatic = pageMetadata[property as keyof IPost];
    //         defaultStatic = defaultMetadata[property as keyof IPost];
    //       }
    //     }
    //     const value: any = pageOg || pageStatic || defaultOg || defaultStatic;
    //     type TOg = keyof IOg & keyof IPost;
    //     if (value) {
    //       og[property as Partial<TOg>] = value;
    //     }
    //   }
    // });
  }
  // Article Properties
  // Loop through article properties that rely on a non-object value

  if (pageMetadata && pageMetadata.hasOwnProperty("og") && pageMetadata.og!.type === "article" && pageMetadata.article) {
    const articleProperties: string[] = [
      "author",
      "modifiedTime",
      "publishedTime",
      "publisher",
    ];

    articleProperties.forEach((property: string) => {
      const value: any = pageMetadata.article![property as keyof IArticle];
      article[property as keyof IArticle] = value;
    });
  }

  return { ...metadata, og, article };
}
