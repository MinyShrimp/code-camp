import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProductCategoryModule from '../productCategory/productCategory.module';

import ProductCategorySearchEntity from './entities/productCategorySearch.entity';
import ProductCategorySearchResolver from './productCategorySearch.resolver';
import ProductCategorySearchService from './productCategorySearch.service';

@Module({
    imports: [
        // TypeORM Entity를 여기에 Import 해줘야 함
        TypeOrmModule.forFeature([
            ProductCategorySearchEntity, //
        ]),
        ProductCategoryModule,
    ],
    exports: [
        ProductCategorySearchService, //
    ],
    providers: [
        ProductCategorySearchResolver, //
        ProductCategorySearchService,
    ],
})
export default class ProductCategorySearchModule {}
