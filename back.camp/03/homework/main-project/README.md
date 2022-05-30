## install

```
yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
yarn add @nestjs/typeorm typeorm@0.2 mysql2
yarn add @nestjs/config
```

## 설정

```typescript
///////////////////////////////////////////////////////////////////////////
// GraphQL //
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";

// TypeORM //
import { TypeOrmModule } from "@nestjs/typeorm";

// Config //
import { ConfigModule } from "@nestjs/config";

///////////////////////////////////////////////////////////////////////////
@Module({
    imports: [
        ///////////////////////////////////////////////////////////////////////////
        // Enviroment Config //
        // 최상단에 위치
        ConfigModule.forRoot({
            envFilePath: ".env",
        }),
        ///////////////////////////////////////////////////////////////////////////
        // Modules //

        ///////////////////////////////////////////////////////////////////////////
        // GrapthQL //
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: "src/commons/graphql/schema.gql",
        }),

        // TypeORM //
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [__dirname + "/apis/**/*.entity.ts"],
            synchronize: true,
            logging: true,
        }),
        ///////////////////////////////////////////////////////////////////////////
    ],
    controllers: [],
    providers: [],
})
```
