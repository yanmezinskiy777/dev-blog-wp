export interface IPaginatePosts {
  currentPage: number;
  options: IOptionsGetAllPosts
}

export interface IOptionsGetAllPosts{
  queryIncludes: "archive" | "index" | "all";
}
