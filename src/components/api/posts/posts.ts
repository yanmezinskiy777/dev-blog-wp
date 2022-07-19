import { IPost } from "../../posts/types";
import { getApolloClient } from "../apolloClient";
import {
  QUERY_ALL_POSTS,
  QUERY_ALL_POSTS_ARCHIVE,
  QUERY_ALL_POSTS_INDEX,
  QUERY_POSTS_BY_CATEGORY_ID,
  QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
  QUERY_POSTS_BY_CATEGORY_ID_INDEX,
  QUERY_POST_BY_SLUG,
  QUERY_POST_PER_PAGE,
  QUERY_POST_SEO_BY_SLUG,
} from "./query";
import {
  IGetPostsByCategoryId,
  IOptionsGetAllPosts,
  IPaginatePosts,
} from "./types";

const postsByCategoryIdIncludesTypes = {
  all: QUERY_POSTS_BY_CATEGORY_ID,
  archive: QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
  index: QUERY_POSTS_BY_CATEGORY_ID_INDEX,
};

export async function getPostsByCategoryId({
  categoryId,
  options,
}: IGetPostsByCategoryId) {
  const { queryIncludes = "index" } = options;

  const apolloClient = getApolloClient();

  let postData;

  try {
    postData = await apolloClient.query({
      query: postsByCategoryIdIncludesTypes[queryIncludes],
      variables: {
        categoryId,
      },
    });
  } catch (e: any) {
    console.log(
      `[posts][getPostsByCategoryId] Failed to query post data: ${e.message}`
    );
    throw e;
  }

  const posts = postData?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map((post) => normalizationPost(post)),
  };
}

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

export async function getAllPosts(options: IOptionsGetAllPosts) {
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

export async function getRecentPosts(count: number = 3) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: allPostsIncludesTypes["all"],
  });
  const posts = data.data.posts.edges
    .map(({ node }: any) => node)
    .splice(0, count);
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

export async function getPagesCount(posts: any, postsPerPage?: any) {
  const _postsPerPage = postsPerPage ?? (await getPostsPerPage());
  return Math.ceil(posts.length / _postsPerPage);
}

export function sortStickyPosts(posts: any) {
  return [...posts].sort((post) => (post.isSticky ? -1 : 1));
}

export async function getPostBySlug(slug?: string | string[]) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT as any).host;

  let postData;
  let seoData;

  try {
    postData = await apolloClient.query({
      query: QUERY_POST_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e: any) {
    console.log(
      `[posts][getPostBySlug] Failed to query post data: ${e.message}`
    );
    throw e;
  }

  const post = [postData?.data.post].map((post) => normalizationPost(post))[0];

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (Boolean(process.env.WORDPRESS_PLUGIN_SEO) === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_POST_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e: any) {
      console.log(
        `[posts][getPostBySlug] Failed to query SEO plugin: ${e.message}`
      );
      console.log(
        "Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js."
      );
      throw e;
    }

    const { seo = {} } = seoData?.data?.post || {};

    post.metaTitle = seo.title;
    post.metaDescription = seo.metaDesc;
    post.readingTime = seo.readingTime;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      post.canonical = seo.canonical;
    }

    post.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    post.article = {
      author: post.og.author,
      modifiedTime: post.og.modifiedTime,
      publishedTime: post.og.publishedTime,
      publisher: post.og.publisher,
    };

    post.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    post.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    post,
  };
}
