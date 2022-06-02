import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProductCategoryEntity from './entities/productCategory.entity';

import ProductCategoryResolver from './productCategory.resolver';
import ProductCategoryService from './productCategory.service';

@Module({
    imports: [
        // TypeORM Entity를 여기에 Import 해줘야 함
        TypeOrmModule.forFeature([
            ProductCategoryEntity, //
        ]),
    ],
    exports: [
        ProductCategoryService, //
    ],
    providers: [
        ProductCategoryResolver, //
        ProductCategoryService,
    ],
})
export default class ProductCategoryModule {}
