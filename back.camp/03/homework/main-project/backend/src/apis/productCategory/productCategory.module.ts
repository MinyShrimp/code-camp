import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAdminStrategy } from '../../commons/auth/jwt-admin.strategy';

import { ProductCategoryEntity } from './entities/productCategory.entity';
import { ProductCategoryAdminController } from './productCategory.admin.controller';

import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';

@Module({
    imports: [
        // TypeORM Entity를 여기에 Import 해줘야 함
        TypeOrmModule.forFeature([
            ProductCategoryEntity, //
        ]),
    ],
    exports: [
        // To. Product Category Search
        ProductCategoryService, //
    ],
    controllers: [
        ProductCategoryAdminController, //
    ],
    providers: [
        ProductCategoryResolver, //
        ProductCategoryService,
        JwtAdminStrategy,
    ],
})
export class ProductCategoryModule {}
