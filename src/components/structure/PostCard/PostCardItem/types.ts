export interface IPost {
  author: IAuthor;
  categories: ICategories[];
  databaseId: string;
  date: string;
  excerpt: string;
  id: string;
  isSticky: boolean;
  postId: number;
  slug: string;
  title: string;
  featuredImage: IFeaturedImages;
  content: string;
  metaTitle: string;
  description: string;
  canonical: string;
  language: string;
  imageUrl: string;
  imageSecureUrl: string;
  type: string;
  modified: string;
  twitter:{
    title: string;
  }
  article: IArticle;
  og: IOg;
}

export interface IArticle {
  author: string;
  modifiedTime: string;
  publishedTime: string;
  publisher: string;
}

export interface IOg {
  imageUrl: string;
  imageSecureUrl: string;
  imageWidth: number;
  imageHeight: number;
  description: string;
  title: string;
  type: string;
  language: string;
  canonical: string;
  url: string;
}
interface IFeaturedImages {
  sourceUrl: string;
  srcSet: string;
}

export interface IAuthor {
  id: string;
  name: string;
  slug: string;
  avatar: IAvatar;
}

interface IAvatar {
  height: number;
  url: string;
  width: number;
}

export interface ICategories {
  databaseId: number;
  id: string;
  name: string;
  slug: string;
}
