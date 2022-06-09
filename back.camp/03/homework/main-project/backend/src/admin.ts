import AdminBro from 'admin-bro';
import { createConnection } from 'typeorm';
import { validate } from 'class-validator';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as AdminBroExpress from '@admin-bro/express';
import { Database, Resource } from '@admin-bro/typeorm';

import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { AdminModule } from './admin/admin.module';

// Entity //
import { UserResource } from './admin/resources/user.resource';

import { ReviewResource } from './admin/resources/review.resource';
import { PaymentResource } from './admin/resources/payment.resource';

import { BookResource } from './admin/resources/book.resource';
import { AuthorResource } from './admin/resources/author.resource';
import { PublisherResource } from './admin/resources/publisher.resource';
import { BookImageResource } from './admin/resources/bookImage.resource';

import { ProductResource } from './admin/resources/product.resource';
import { ProductTagResource } from './admin/resources/productTag.resource';
import { ProductCategoryResource } from './admin/resources/productCategory.resource';
import { ProductCategorySearchResource } from './admin/resources/productCategorySearch.resource';

async function runAdmin() {
    const app = await NestFactory.create(AdminModule);

    await createConnection({
        type: 'mysql',
        host: 'db',
        port: 3306,
        username: "root",
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [__dirname + '/apis/**/*.entity.*'],
        charset: 'utf8mb4',
        synchronize: false,
        logging: true,
    });

    Resource.validate = validate;
    AdminBro.registerAdapter({ Database, Resource });

    const adminBro = new AdminBro({
        resources: [
            UserResource,

            ReviewResource,
            PaymentResource,

            BookResource,
            AuthorResource,
            PublisherResource,
            BookImageResource,

            ProductResource,
            ProductTagResource,
            ProductCategoryResource,
            ProductCategorySearchResource,
        ],
        rootPath: '/admin',
        branding: {
            companyName: "CodeCamp"
        }
    });

    // @ts-ignore
    const router = AdminBroExpress.buildRouter(adminBro);

    app.use(adminBro.options.rootPath, router);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(3001);
}

runAdmin();
