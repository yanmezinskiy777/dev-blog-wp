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
}

interface IAuthor {
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

interface ICategories {
  databaseId: number;
  id: string;
  name: string;
  slug: string;
}
