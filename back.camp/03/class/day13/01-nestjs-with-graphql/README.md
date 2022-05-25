
## Install
```bash
npx nest new 01-nestjs-with-graphql
yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

## Setting
```typescript
/* app.module.ts */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
        }),
    ],
})
export class AppModule {}
```

## Resolver
> MVC 패턴의 Controller에 해당
>

## 참고 URL
* https://github.com/nestjs/nest/tree/master/sample/23-graphql-code-first
* https://docs.nestjs.com/graphql/quick-start#getting-started-with-graphql--typescript