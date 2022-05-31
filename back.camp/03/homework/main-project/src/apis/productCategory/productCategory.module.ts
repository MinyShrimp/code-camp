import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductCategoryEntity from './entities/productCategory.entity';
import ProductCategoryResolver from './productCategory.resolver';
import ProductCategoryService from './productCategory.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
    controllers: [],
    providers: [ProductCategoryResolver, ProductCategoryService],
})
export default class ProductCategoryModule {}
