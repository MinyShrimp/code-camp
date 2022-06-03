import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProductTagEntity from './entities/productTag.entity';
import ProductTagService from './productTag.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductTagEntity, //
        ]),
    ],
    exports: [
        ProductTagService, //
    ],
    providers: [
        ProductTagService, //
    ],
})
export default class ProductTagModule {}
