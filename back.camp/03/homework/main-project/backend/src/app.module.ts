///////////////////////////////////////////////////////////////////////////
// NestJS //
import { Module, CacheModule } from '@nestjs/common';

// GraphQL //
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

// TypeORM //
import { TypeOrmModule } from '@nestjs/typeorm';

// Redis //
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

// Config //
import { ConfigModule } from '@nestjs/config';

// Modules //
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/user/user.module';

import { ReviewModule } from './apis/review/review.module';
import { PaymentModule } from './apis/payment/payment.module';

import { BookModule } from './apis/book/book.module';
import { AuthorModule } from './apis/author/author.module';
import { PublisherModule } from './apis/publisher/publisher.module';
import { BookImageModule } from './apis/bookImage/bookImage.module';

import { ProductModule } from './apis/product/product.module';
import { ProductTagModule } from './apis/productTag/productTag.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';

import { FileUploadModule } from './apis/fileUpload/fileUpload.module';

// Entity //

///////////////////////////////////////////////////////////////////////////
@Module({
    imports: [
        ///////////////////////////////////////////////////////////////////////////
        // Enviroment Config //
        // 최상단에 위치
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),

        ///////////////////////////////////////////////////////////////////////////
        // GrapthQL //
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => {
                return { req, res };
            },
            cors: {
                origin: ['http://127.0.0.1:8081', 'http://localhost:8081'],
                credentials: 'include',
                exposedHeaders: ['Authorization', 'Set-Cookie'],
            },
        }),

        ///////////////////////////////////////////////////////////////////////////
        // TypeORM //
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: `${process.env.DEBUG_MYSQL_HOST}`,
            // host: `${process.env.MYSQL_HOST}`,
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [
                __dirname + '/apis/**/*.entity.*', //
            ],

            charset: 'utf8mb4',
            collaction: 'utf8mb4_general_ci',
            synchronize: true,
            logging: true,
        }),

        ///////////////////////////////////////////////////////////////////////////
        // Redis //
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            url: `redis://${process.env.DEBUG_REDIS_HOST}:6379`,
            // url: `redis://${process.env.REDIS_HOST}:6379`,
            isGlobal: true,
        }),

        ///////////////////////////////////////////////////////////////////////////
        // Modules //
        AuthModule,
        UserModule,

        ReviewModule,
        PaymentModule,

        BookModule,
        AuthorModule,
        PublisherModule,
        BookImageModule,

        ProductModule,
        ProductTagModule,
        ProductCategoryModule,

        FileUploadModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
