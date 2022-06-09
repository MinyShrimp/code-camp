import AdminBro from 'admin-bro';
import * as AdminBroExpress from '@admin-bro/express';
import { Database, Resource } from '@admin-bro/typeorm';
import { validate } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { AdminModule } from './admin.module';

// Entity //
import { UserEntity } from './apis/user/entities/user.entity';

import { BookEntity } from './apis/book/entities/book.entity';
import { AuthorEntity } from './apis/author/entities/author.entity';
import { BookImageEntity } from './apis/bookImage/entities/bookImage.entity';
import { PublisherEntity } from './apis/publisher/entities/publisher.entity';

import { ReviewEntity } from './apis/review/entities/review.entity';
import { PaymentEntity } from './apis/payment/entities/payment.entity';

import { ProductEntity } from './apis/product/entities/product.entity';
import { ProductTagEntity } from './apis/productTag/entities/productTag.entity';
import { ProductPriceEntity } from './apis/productPrice/entities/productPrice.entity';
import { ProductCategoryEntity } from './apis/productCategory/entities/productCategory.entity';
import { ProductCategorySearchEntity } from './apis/productCategorySearch/entities/productCategorySearch.entity';
import { createConnection } from 'typeorm';

async function runAdmin() {
    const app = await NestFactory.create(AdminModule);

    const mysqlDB = await createConnection({
        type: 'mysql',
        host: 'db',
        port: 3306,
        username: "root",
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [__dirname + '/apis/**/*.entity.*'],
        charset: 'utf8mb4',
        synchronize: true,
        logging: true,
    });

    Database.isAdapterFor(mysqlDB);
    Resource.validate = validate;
    AdminBro.registerAdapter({ Database, Resource });

    const adminBro = new AdminBro({
        resources: [
            UserEntity,

            ReviewEntity,
            PaymentEntity,

            BookEntity,
            AuthorEntity,
            PublisherEntity,
            BookImageEntity,

            ProductEntity,
            ProductTagEntity,
            ProductPriceEntity,
            ProductCategoryEntity,
            ProductCategorySearchEntity,
        ],
        rootPath: '/admin',
    });

    // @ts-ignore
    const router = AdminBroExpress.buildRouter(adminBro);

    app.use(adminBro.options.rootPath, router);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(3001);
}

runAdmin();
