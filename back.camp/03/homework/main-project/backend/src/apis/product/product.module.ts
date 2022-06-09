import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductTagModule } from '../productTag/productTag.module';
import { ProductCategorySearchModule } from '../productCategorySearch/productCategorySearch.module';

import { ProductEntity } from './entities/product.entity';

import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { BookModule } from '../book/book.module';

@Module({
    imports: [
        // TypeORM Entity를 여기에 Import 해줘야 함
        TypeOrmModule.forFeature([
            ProductEntity, //
        ]),
        // ProductPriceService를 사용해주기 위해 import
        BookModule,
        ProductTagModule,
        ProductCategorySearchModule,
    ],
    exports: [ProductService],
    providers: [
        ProductResolver, //
        ProductService,
    ],
})
export class ProductModule {}
