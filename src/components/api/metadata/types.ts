export interface ISettingsMetadata {
  title?: string;
  siteTitle?: string;
  description?: string;
  language?: string;
  social?: any;
  webmaster?: any;
  canonical?: string;
  og?: IOg;
  twitter?: ITwitter;
  article?: IArticle;
}

interface ITwitter {
  title?: string;
  description?: string;
  imageUrl?: string;
  username?: string;
  cardType?: string;
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

interface IArticle {
  modifiedTime?: string;
  publishedTime?: string;
}
