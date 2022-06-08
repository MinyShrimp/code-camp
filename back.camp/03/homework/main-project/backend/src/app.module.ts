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

// AdminBro //
// import adminBro from 'adminjs';
// import { Database, Resource } from '@adminjs/typeorm';
// import { AdminModule } from '@adminjs/nestjs';

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
import { ProductPriceModule } from './apis/productPrice/productPrice.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductCategorySearchModule } from './apis/productCategorySearch/productCategorySearch.module';

// Entity //
// import { UserEntity } from './apis/user/entities/user.entity';

// import { BookEntity } from './apis/book/entities/book.entity';
// import { AuthorEntity } from './apis/author/entities/author.entity';
// import { BookImageEntity } from './apis/bookImage/entities/bookImage.entity';
// import { PublisherEntity } from './apis/publisher/entities/publisher.entity';

// import { ReviewEntity } from './apis/review/entities/review.entity';
// import { PaymentEntity } from './apis/payment/entities/payment.entity';

// import { ProductEntity } from './apis/product/entities/product.entity';
// import { ProductTagEntity } from './apis/productTag/entities/productTag.entity';
// import { ProductPriceEntity } from './apis/productPrice/entities/productPrice.entity';
// import { ProductCategoryEntity } from './apis/productCategory/entities/productCategory.entity';
// import { ProductCategorySearchEntity } from './apis/productCategorySearch/entities/productCategorySearch.entity';

///////////////////////////////////////////////////////////////////////////
// adminBro.registerAdapter({ Database, Resource });
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
        // AdminBro //
        // AdminModule,
        // AdminModule.createAdmin({
        //     adminJsOptions: {
        //         resources: [
        //             UserEntity,

        //             ReviewEntity,
        //             PaymentEntity,

        //             BookEntity,
        //             AuthorEntity,
        //             PublisherEntity,
        //             BookImageEntity,

        //             ProductEntity,
        //             ProductTagEntity,
        //             ProductPriceEntity,
        //             ProductCategoryEntity,
        //             ProductCategorySearchEntity,
        //         ],
        //         rootPath: '/admin',
        //     },
        //     auth: {

        //     }
        // }),

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
