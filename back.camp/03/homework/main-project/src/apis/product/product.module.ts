import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProductEntity from './entities/product.entity';

import ProductResolver from './product.resolver';
import ProductService from './product.service';

import ProductPriceModule from '../productPrice/productPrice.module';

@Module({
    imports: [
        // TypeORM Entity를 여기에 Import 해줘야 함
        TypeOrmModule.forFeature([
            ProductEntity, //
        ]),
        // ProductPriceService를 사용해주기 위해 import
        ProductPriceModule,
    ],
    providers: [
        ProductResolver, //
        ProductService,
    ],
})
export default class ProductModule {}
