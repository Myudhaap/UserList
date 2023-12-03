import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/type-defs.js";
import { resolvers } from "./schema/resolvers.js";

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => console.log(`Server ready at: ${url}`));
