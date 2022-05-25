# DAY 13

## GraphQL
> Code-First, Schema-First
### Schema-First
typeDefs를 직접 하나하나 작성하는 방식
```typescript
const typeDefs = gql`
    type BoardReturn {
        number:   Int
        writer:   String
        title:    String
        contents: String
    }

    type Query {
        fetchBoards: [BoardReturn]
    }
`;

const resolvers = {
    Query: {
        fetchBoards: (_, args) => {
            return [
                { number: 1, writer: "", title: "", contents: "" },
                { number: 1, writer: "", title: "", contents: "" },
                { number: 1, writer: "", title: "", contents: "" },
                { number: 1, writer: "", title: "", contents: "" },
            ]
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(3000);
```

### Code-First
typeDefs를 작성하지 않고 Decorator를 통해 DI방식으로 자동으로 작성해주는 형태

## MySQL, TypeORM

## Nest.js
