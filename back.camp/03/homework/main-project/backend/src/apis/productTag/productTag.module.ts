import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductTagEntity } from './entities/productTag.entity';
import { ProductTagAdminController } from './productTag.admin.controller';
import { ProductTagService } from './productTag.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductTagEntity, //
        ]),
    ],
    exports: [
        ProductTagService, //
    ],
    controllers: [
        ProductTagAdminController, //
    ],
    providers: [
        ProductTagService, //
    ],
})
export class ProductTagModule {}
