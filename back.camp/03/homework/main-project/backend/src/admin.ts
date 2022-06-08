import AdminBro from 'admin-bro';
import * as AdminBroExpress from '@admin-bro/express';
import { Database, Resource } from '@admin-bro/typeorm';
import { validate } from 'class-validator';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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

async function runAdmin() {
    const app = await NestFactory.create(AppModule);

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

    await app.listen(3001);
}

runAdmin();
