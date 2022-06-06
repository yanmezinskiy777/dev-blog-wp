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
}

interface IFeaturedImages{
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
