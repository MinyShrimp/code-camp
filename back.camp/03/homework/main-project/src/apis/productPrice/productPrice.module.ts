import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductPriceEntity } from './entities/productPrice.entity';
import { ProductPriceService } from './productPrice.service';

@Module({
    imports: [
        // TypeORM Entity를 여기에 Import 해줘야 함
        TypeOrmModule.forFeature([
            ProductPriceEntity, //
        ]),
    ],
    exports: [
        // To Product Module
        ProductPriceService,
    ],
    providers: [
        ProductPriceService, //
    ],
})
export class ProductPriceModule {}
