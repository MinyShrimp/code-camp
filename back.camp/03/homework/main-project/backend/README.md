## install

```
yarn add @nestjs/config
yarn add @nestjs/typeorm typeorm@0.2 mysql2
yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
yarn add class-validator class-transformer

yarn add bcryptjs
yarn add @types/bcryptjs --dev

yarn add @nestjs/jwt passport-jwt @nestjs/passport passport
yarn add @types/passport-jwt --dev

yarn add passport-google-oauth20 passport-kakao passport-naver
yarn add @types/passport-naver @types/passport-kakao @types/passport-google-oauth20 --dev

yarn add express-session express-formidable
# yarn add admin-bro @admin-bro/express @admin-bro/typeorm
yarn add adminjs @adminjs/typeorm @adminjs/express

yarn add axios
yarn add @types/axios --dev

# yarn add react react-dom styled-components

yarn add nodemon --dev
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

### Day 19

-   [x] 상품 테이블에 데이터를 추가할 때 서로 관계가 있는 테이블에도 데이터가 추가된다.
-   [x] 상품 테이블의 데이터를 조회할 때 서로 관계가 있는 테이블의 데이터도 조회된다.
-   [x] `deleteProduct` API를 플레이그라운드로 요청할 수 있다.
-   [x] `fetchProductsWithDeleted` API를 플레이그라운드로 요청할 수 있다.
-   [x] `restoreProduct` API를 플레이그라운드로 요청할 수 있다.

### Day 20

-   [x] N:M 관계를 가진 테이블에서 데이터를 등록하는 API를 요청할 수 있다.
-   [x] N:M 관계를 가진 테이블에서 데이터를 조회하는 API를 요청할 수 있다.
-   [x] user 테이블에 데이터를 추가하는 API를 요청할 수 있다.
    -   [x] 이미 존재하는 회원이라면 `ConflictException` 에러가 반환된다.
-   [x] user 테이블에 데이터를 삭제하는 API를 요청할 수 있다.
-   [x] user 테이블에 데이터를 조회하는 API를 요청할 수 있다.
    -   [x] 조회할 때 비밀번호는 포함되지 않는다.
-   [x] user 테이블에 데이터를 수정하는 API를 요청할 수 있다.

### Day 21

-   [x] playground로 로그인 API를 요청할 수 있다.
    -   [x] 로그인이 완료되면 `accessToken` 을 받는다.
    -   [x] 검증되지 않은 회원일 경우 Guard에서 에러를 반환한다.
-   [x] playground로 `updateUserPwd` API를 요청할 수 있다.
-   [x] playground로 `fetchLoginUser` API를 요청할 수 있다.
-   [x] playground로 `deleteLoginUser` API를 요청할 수 있다.

### Day 23

-   [x] 플레이그라운드로 로그인 API를 요청하면, Access token과 Refresh token을 얻는다.
-   [x] 플레이그라운드로, Refresh token을 통해 Access token을 재발급해주는 API를 요청할 수 있다.
-   [x] 구글 로그인 버튼을 클릭하면 `http://localhost:3000/login/google` 로 API를 요청한다.

### Day 24

-   [x] **payment.html** 화면에서 버튼을 눌러 `createPayment` API를 요청할 수 있다.
-   [x] `createPayment` API가 요청되면 payment 테이블에 결제 정보가 저장된다.

### Day 25

-   [x] createPayment에 유효하지 않은 imp_uid를 넘겨줄 경우 `UnprocessableEntityException` 에러를 반환한다.
-   [x] createPayment에 이미 결제 테이블에 추가된 imp_uid를 넘겨줄 경우 `ConflictException` 에러를 반환한다.
-   [x] `iamport.service.ts` 파일에 로직이 분리되어있다.
-   [x] 플레이그라운드에서 `cancelPayment` API를 요청해 결제를 취소할 수 있다.
