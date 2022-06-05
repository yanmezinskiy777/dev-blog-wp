import { IPost } from "../../posts/types";
import { getApolloClient } from "../apolloClient";
import {
  QUERY_ALL_POSTS,
  QUERY_ALL_POSTS_ARCHIVE,
  QUERY_ALL_POSTS_INDEX,
  QUERY_POST_PER_PAGE,
} from "./query";
import { IOptionsGetAllPosts, IPaginatePosts } from "./types";

export function updateUserAvatar(avatar: any) {
  // The URL by default that comes from Gravatar / WordPress is not a secure
  // URL. This ends up redirecting to https, but it gives mixed content warnings
  // as the HTML shows it as http. Replace the url to avoid those warnings
  // and provide a secure URL by default

  return {
    ...avatar,
    url: avatar.url?.replace("http://", "https://"),
  };
}

function normalizationPost(data: any) {
  const post = { ...data };
  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node

  if (post.author) {
    post.author = {
      ...post.author.node,
    };
  }

  // The URL by default that comes from Gravatar / WordPress is not a secure
  // URL. This ends up redirecting to https, but it gives mixed content warnings
  // as the HTML shows it as http. Replace the url to avoid those warnings
  // and provide a secure URL by default

  if (post.author?.avatar) {
    post.author.avatar = updateUserAvatar(post.author.avatar);
  }

  // Clean up the categories to make them more easy to access

  if (post?.featuredImage) {
    post.featuredImage = {
      ...post.featuredImage.node,
    };
  }

  if (post.categories) {
    post.categories = post.categories.edges.map(({ node }: any) => {
      return {
        ...node,
      };
    });
  }
  return post;
}

const allPostsIncludesTypes = {
  all: QUERY_ALL_POSTS,
  archive: QUERY_ALL_POSTS_ARCHIVE,
  index: QUERY_ALL_POSTS_INDEX,
};

async function getAllPosts(options: IOptionsGetAllPosts) {
  const { queryIncludes } = options;
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: allPostsIncludesTypes[queryIncludes],
  });

  const posts = data.data.posts.edges.map(({ node }: any) => node);

  return {
    posts: Array.isArray(posts)
      ? posts.map((post) => normalizationPost(post))
      : [],
  };
}

export async function getPaginatedPosts({
  currentPage = 1,
  options,
}: IPaginatePosts) {
  const { posts }: { posts: IPost[] } = await getAllPosts(options);
  const postsPerPage = await getPostsPerPage();
  const pagesCount = await getPagesCount(posts, postsPerPage);

  let page = Number(currentPage);
  if (typeof page === "undefined" || isNaN(page) || page > pagesCount) {
    page = 1;
  }
  const offset = postsPerPage * (page - 1);
  const sortedPosts = sortStickyPosts(posts);

  return {
    posts: sortedPosts.slice(offset, offset + postsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}

export async function getPostsPerPage() {
  //If POST_PER_PAGE is defined at next.config.js
  if (process.env.POSTS_PER_PAGE) {
    console.warn(
      'You are using the deprecated POST_PER_PAGE variable. Use your WordPress instance instead to set this value ("Settings" > "Reading" > "Blog pages show at most").'
    );
    return Number(process.env.POSTS_PER_PAGE);
  }

  try {
    const apolloClient = getApolloClient();

    const { data } = await apolloClient.query({
      query: QUERY_POST_PER_PAGE,
    });

    return Number(data.allSettings.readingSettingsPostsPerPage);
  } catch (e: any) {
    console.log(`Failed to query post per page data: ${e.message}`);
    throw e;
  }
}

export async function getPagesCount(posts: any, postsPerPage: any) {
  const _postsPerPage = postsPerPage ?? (await getPostsPerPage());
  return Math.ceil(posts.length / _postsPerPage);
}

export function sortStickyPosts(posts: any) {
  return [...posts].sort((post) => (post.isSticky ? -1 : 1));
}
