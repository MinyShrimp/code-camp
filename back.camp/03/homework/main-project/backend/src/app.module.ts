///////////////////////////////////////////////////////////////////////////
// NestJS //
import { Module } from '@nestjs/common';

// GraphQL //
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

// TypeORM //
import { TypeOrmModule } from '@nestjs/typeorm';

// Config //
import { ConfigModule } from '@nestjs/config';

// Modules //
import { UserModule } from './apis/user/user.module';

import { ReviewModule } from './apis/review/review.module';
import { PaymentModule } from './apis/payment/payment.module';

import { BookModule } from './apis/book/book.module';
import { AuthorModule } from './apis/author/author.module';
import { PublisherModule } from './apis/publisher/publisher.module';
import { BookImageModule } from './apis/bookImage/bookImage.module';

import { ProductModule } from './apis/product/product.module';
import { ProductTagModule } from './apis/productTag/productTag.module';
import { ProductPriceModule } from './apis/productPrice/productPrice.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductCategorySearchModule } from './apis/productCategorySearch/productCategorySearch.module';
import { AuthModule } from './apis/auth/auth.module';

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
        }),

        ///////////////////////////////////////////////////////////////////////////
        // TypeORM //
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'db',
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'],
            charset: 'utf8mb4',
            synchronize: true,
            logging: true,
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
        ProductPriceModule,
        ProductCategoryModule,
        ProductCategorySearchModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}