import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

  const URI = import.meta.env.MODE === "production" ? import.meta.env.VITE_PROD_URI : "http://localhost:4000/graphql"


  const httpLink = new HttpLink({
    uri: URI,
  })

  const cache = new InMemoryCache({
    addTypename: false
  });

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: cache,
  link: httpLink,
})