## Install

```bash
npx nest new 01-typeorm-softdelete
yarn add @nestjs/typeorm typeorm@0.2 mysql2
yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
yarn add class-validator class-transformer
yarn add bcrypt
yarn add @types/bcrypt -D
yarn add @nestjs/jwt passport-jwt @nestjs/passport passport @types/passport-jwt
yarn add passport-google-oauth20 @types/passport-google-oauth20
yarn add graphql-upload

yarn add @google-cloud/bigquery

yarn add @nestjs/elasticsearch @elastic/elasticsearch
```

## Setting

```typescript
/* app.module.ts */
import { Module } from "@nestjs/common";
///////////////////////////////////////////////////////////////////////////
// GraphQL //
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";

// TypeORM //
import { TypeOrmModule } from "@nestjs/typeorm";

// Config //
import { ConfigModule } from "@nestjs/config";

// Module //

///////////////////////////////////////////////////////////////////////////

@Module({
    imports: [
        ///////////////////////////////////////////////////////////////////////////
        // Enviroment Config //
        // 최상단에 위치
        ConfigModule.forRoot({
            envFilePath: ".env",
            isGlobal: true,
        }),

        ///////////////////////////////////////////////////////////////////////////
        // GrapthQL //
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: "src/commons/graphql/schema.gql",
        }),

        ///////////////////////////////////////////////////////////////////////////
        // TypeORM //
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [__dirname + "/apis/**/*.entity.*"],
            synchronize: true,
            logging: true,
        }),

        ///////////////////////////////////////////////////////////////////////////
        // Modules //
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
```

```typescript
/* main.ts */
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import HttpExceptionFilter from "./commons/filter/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    ///////////////////////////////////////////////////////////////////////////
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    ///////////////////////////////////////////////////////////////////////////
    await app.listen(3000);
}
bootstrap();
```

## 참고 URL

-   https://github.com/nestjs/nest/tree/master/sample/05-sql-typeorm
-   https://docs.nestjs.com/techniques/database
-   https://docs.nestjs.com/recipes/sql-typeorm#sql-typeorm
