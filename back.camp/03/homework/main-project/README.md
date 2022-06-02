## install

```
yarn add @nestjs/config
yarn add @nestjs/typeorm typeorm@0.2 mysql2
yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
yarn add class-validator class-transformer
```

## 설정

```typescript
///////////////////////////////////////////////////////////////////////////
// NestJS //
import { Module } from "@nestjs/common";

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
            entities: [__dirname + "/apis/**/*.entity.ts"],
            synchronize: true,
            logging: true,
        }),
        ///////////////////////////////////////////////////////////////////////////
        // Modules //
    ],
    controllers: [],
    providers: [],
})
```

```typescript
/* main.ts */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
```

## 날짜 경과도

### Day 16

-   [x] 설계한 ERD 테이블이 모두 각각의 entity 파일로 만들어졌다.
-   [x] 테이블 간의 관계(1 : 1, 1 : N, N : M)가 typeorm으로 정의되어 있다.
-   [x] erdcloud로 작성한 ERD와 DBeaver의 엔티티 관계도가 일치한다.

### Day 17

-   [x] docker로 서버를 띄웠을 때, 오류 없이 실행이 된다.
-   [x] product 테이블에 데이터를 추가하는 API를 플레이그라운드로 요청할 수 있다.
-   [x] product 테이블에 데이터를 업데이트하는 API를 플레이그라운드로 요청할 수 있다.
-   [x] product 테이블에 데이터를 모두 조회하는 API를 플레이그라운드로 요청할 수 있다.
-   [x] product 테이블에 데이터를 개별 조회하는 API를 플레이그라운드로 요청할 수 있다.
-   [x] `UnprocessableEntityException` 을 사용해 에러처리를 했다.