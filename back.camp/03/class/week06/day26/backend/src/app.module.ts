import { CacheModule, Module } from "@nestjs/common";
///////////////////////////////////////////////////////////////////////////
// GraphQL //
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";

// TypeORM //
import { TypeOrmModule } from "@nestjs/typeorm";

// Redis //
import type { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";

// Config //
import { ConfigModule } from "@nestjs/config";

// Module //
import BoardsModule from "./apis/boards/boards.module";
import ProductModule from "./apis/products/product.module";
import ProductCategoryModule from "./apis/productsCategory/productCategory.module";
import UserModule from "./apis/users/users.module";
import AuthModule from "./apis/auth/auth.module";
import { PointTransactionModule } from "./apis/pointTransaction/pointTransaction.module";
import { PaymentMoudle } from "./apis/payment/payment.module";
import { FileModule } from "./apis/fileLoader/file.module";

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
            context: ({ req, res }) => {
                return { req, res };
            },
        }),

        ///////////////////////////////////////////////////////////////////////////
        // TypeORM //
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [__dirname + "/apis/**/*.entity.*"],
            synchronize: true,
            logging: true,
        }),

        ///////////////////////////////////////////////////////////////////////////
        // Redis //
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            url: "redis://localhost:6379",
            isGlobal: true,
        }),

        ///////////////////////////////////////////////////////////////////////////
        // Modules //
        BoardsModule,
        ProductModule,
        ProductCategoryModule,

        UserModule,
        AuthModule,

        PointTransactionModule,
        PaymentMoudle,

        FileModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
