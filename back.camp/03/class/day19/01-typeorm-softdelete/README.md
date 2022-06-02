## Install

```bash
npx nest new 01-typeorm-softdelete
yarn add @nestjs/typeorm typeorm@0.2 mysql2
yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
yarn add class-validator class-transformer
```

## Setting

```typescript
/* app.module.ts */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "test",
            entities: [],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
```

```typescript
/* main.ts */
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
```

## 참고 URL

-   https://github.com/nestjs/nest/tree/master/sample/05-sql-typeorm
-   https://docs.nestjs.com/techniques/database
-   https://docs.nestjs.com/recipes/sql-typeorm#sql-typeorm
