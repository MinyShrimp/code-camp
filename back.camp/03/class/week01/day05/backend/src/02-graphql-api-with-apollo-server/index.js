import { ApolloServer, gql } from "apollo-server";

const port = 3000;

// The GraphQL schema
const typeDefs = gql`
    type Query {
        hello: String
        world: String
    },
`;

// API
const resolvers = {
    Query: {
        hello: () => "world",
        world: () => "hello"
    },
};

const server = new ApolloServer({
    typeDefs,   // GraphQL Schema
    resolvers,  // API
});

server.listen(port).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
