export interface IPaginatePosts {
  currentPage: number;
  options: IOptionsGetAllPosts;
}

export interface IOptionsGetAllPosts {
  queryIncludes: "archive" | "index" | "all";
}

export interface IGetPostsByCategoryId {
  categoryId: string;
  options: {
    queryIncludes: "index" | "all" | "archive";
  };
}
