import { createServer } from "http";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { typeDefs } from "./schema";
import { POSTS, getPage, like, makeNewPost } from "./mockData";

const resolvers = {
  Query: {
    posts: (_: any, { page, limit }: { page: number; limit: number }) => getPage(page, limit),
  },
  Mutation: {
    likePost: (_: any, { id }: { id: string }) => like(id),
  },
  Subscription: {
    newPost: {
      subscribe: (_: any, __: any, { pubsub }: any) => pubsub.asyncIterator("NEW_POST"),
      resolve: (payload: any) => payload,
    },
  },
};

async function main() {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const httpServer = createServer();
  const apollo = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(apollo, {
    listen: { port: 4000 },
    context: async () => ({})
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const clients = new Set<any>();
  useServer({ schema, onConnect: (ctx) => { clients.add(ctx); } }, wsServer);

  httpServer.listen(4001, () => {
    console.log("WS server on ws://localhost:4001/graphql");
  });

 
  setInterval(() => {
    const post = makeNewPost();
  
  }, 15000);

  console.log(`HTTP (queries/mutations): ${url}`);
}

main().catch(console.error);
