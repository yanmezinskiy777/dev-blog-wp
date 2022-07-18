/**
 * getAllCategories
 */

import { getApolloClient } from "../apolloClient";
import { QUERY_ALL_CATEGORIES } from "./query";

 export async function getAllCategories(){
    const apolloClient = getApolloClient();
  
    const data = await apolloClient.query({
      query: QUERY_ALL_CATEGORIES,
    });
  
    const categories = data?.data.categories.edges.map(({ node = {} }) => node);
  
    return {
      categories,
    };
  }