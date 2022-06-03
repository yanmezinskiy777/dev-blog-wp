export interface IMetadata {
  description: string;
  language: string;
  title: string;
  canonical: string;
  og?: IOg;
  twitter?: ITwitter;
  article?: IArticle;
  siteTitle: string;
}

export interface IOptions {
  link?: ILink[];
  meta?: IMeta[];
  setTitle?: boolean;
}

interface ITwitter {
  title?: string;
  description?: string;
  imageUrl?: string;
  username?: string;
  cardType?: string;
}

interface IArticle {
  modifiedTime?: string;
  publishedTime?: string;
}

interface IOg {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  imageSecureUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: string;
  siteTitle?: string;
}

interface ILink {
  rel?: string;
  href?: string;
  type?: string;
  sizes?: string;
}

export interface ISettings {
  title?: string;
  link?: ILink[];
  meta?: IMeta[];
  htmlAttributes: {
    lang: string;
  };
}

interface IMeta {
  name?: string;
  content?: string | number;
  property?: string;
}
