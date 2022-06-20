import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { BookModule } from '../book/book.module';
import { ProductTagModule } from '../productTag/productTag.module';
import { ProductCategorySearchModule } from '../productCategorySearch/productCategorySearch.module';

import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductCheckService } from './productCheck.service';
import { ProductAdminController } from './product.admin.contoller';

@Module({
    imports: [
        // TypeORM Entity를 여기에 Import 해줘야 함
        TypeOrmModule.forFeature([
            ProductEntity, //
        ]),
        ElasticsearchModule.register({
            node: `http://elasticsearch:9200`,
            // node: `http://localhost:9200`,
        }),
        // ProductPriceService를 사용해주기 위해 import
        BookModule,
        ProductTagModule,
        ProductCategorySearchModule,
    ],
    exports: [
        ProductService, //
        ProductCheckService,
    ],
    controllers: [
        ProductAdminController, //
    ],
    providers: [
        ProductResolver, //
        ProductRepository,
        ProductService,
        ProductCheckService,
    ],
})
export class ProductModule {}
