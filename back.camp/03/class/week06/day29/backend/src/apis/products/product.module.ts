import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import ProductEntity from "./entities/product.entity";
import ProductTagEntity from "../productsTags/entities/productTag.entity";
import ProductSalesLocationEntity from "../productsSaleslocation/entities/productSaleslocation.entity";

import ProductResolver from "./product.resolver";
import ProductService from "./Product.service";
import { ProductSubscriber } from "./entities/product.subscriber";

@Module({
    imports: [
        // TypeORM Entity를 여기에 Import 해줘야 함
        TypeOrmModule.forFeature([
            ProductEntity, //
            ProductTagEntity,
            ProductSalesLocationEntity, //
        ]),
    ],
    providers: [
        ProductResolver, //
        ProductService,
        ProductSubscriber,
    ],
})
export default class ProductModule {}
