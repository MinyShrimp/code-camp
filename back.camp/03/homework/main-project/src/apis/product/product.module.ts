import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProductEntity from './entities/product.entity';
import ProductPriceEntity from '../productPrice/entities/productPrice.entity';

import ProductResolver from './product.resolver';
import ProductService from './product.service';

@Module({
    imports: [
        // TypeORM Entity를 여기에 Import 해줘야 함
        TypeOrmModule.forFeature([
            ProductEntity, //
            ProductPriceEntity,
        ]),
    ],
    providers: [
        ProductResolver, //
        ProductService,
    ],
})
export default class ProductModule {}
