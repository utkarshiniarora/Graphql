import { ApolloServer, gql } from "apollo-server";


const typeDefs = gql`
  type Post {
    id: ID!
    author: String!
    content: String!
    likes: Int!
    timestamp: String!
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    likePost(id: ID!): Post!
  }
`;

let posts = [
{
    id: "1",
    author: "ElonMusk",
    content: "Just tested the rocket, works perfectly 🚀",
    likes: 123,
    timestamp: "2023-11-01T12:00:00Z",
  },
  {
    id: "2",
    author: "MichelleObama",
    content: "Community is at the heart of everything 💙",
    likes: 98,
    timestamp: "2023-11-02T15:30:00Z",
  },
  {
    id: "3",
    author: "Satoshi",
    content: "Chancellor on brink of second bailout for banks.",
    likes: 999,
    timestamp: "2009-01-03T18:15:00Z",
  },
];


const resolvers = {
  Query: {
    posts: () => posts,
  },
  Mutation: {
    likePost: (_: any, { id }: { id: string }) => {
      const post = posts.find((p) => p.id === id);
      if (post) post.likes += 1;
      return post;
    },
  },
};


const server = new ApolloServer({ typeDefs, resolvers });


server.listen().then(({ url }) => {
  console.log(` Server ready at ${url}`);
});
