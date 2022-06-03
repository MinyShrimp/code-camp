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
import BookModule from './apis/book/book.module';
import ProductModule from './apis/product/product.module';
import ProductTagModule from './apis/productTag/productTag.module';
import ProductPriceModule from './apis/productPrice/productPrice.module';
import ProductCategoryModule from './apis/productCategory/productCategory.module';
import ProductCategorySearchModule from './apis/productCategorySearch/productCategorySearch.module';
import UserModule from './apis/user/user.module';

///////////////////////////////////////////////////////////////////////////

@Module({
    imports: [
        ///////////////////////////////////////////////////////////////////////////
        // Enviroment Config //
        // 최상단에 위치
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),

        ///////////////////////////////////////////////////////////////////////////
        // GrapthQL //
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
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
        UserModule,

        BookModule,

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
