import {
    HttpException,
    HttpStatus,
    Injectable,
    UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import ProductEntity from "./entities/product.entity";
import ProductSalesLocationEntity from "../productsSaleslocation/entities/productSaleslocation.entity";

import CreateProductInput from "./dto/createProduct.input";
import UpdateProductInput from "./dto/updateProduct.input";

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(ProductSalesLocationEntity)
        private readonly productSalesLocationRepository: Repository<ProductSalesLocationEntity>
    ) {}

    // 판매완료 체크
    async checkSoldout(productID: string): Promise<void> {
        const product = await this.productRepository.findOne({
            where: { id: productID },
        });

        if (product.isSoldout) {
            throw new UnprocessableEntityException("이미 판매 완료된 상품입니다.");
        }
    }

    // GET 모든 상품
    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({});
    }

    // GET 단일 상품
    async findOne(productID: string): Promise<ProductEntity> {
        return await this.productRepository.findOne({
            where: { id: productID },
        });
    }

    // POST 상품 생성
    async create(
        createProductInput: CreateProductInput //
    ): Promise<ProductEntity> {
        const { productSaleslocation, productCategoryId, ...product } = createProductInput;

        const location = await this.productSalesLocationRepository.save({
            ...productSaleslocation,
        });

        return await this.productRepository.save({
            ...product,
            productSaleslocation: location,
            productCategory: { id: productCategoryId },
        });
    }

    // PATCH 상품 수정
    async update(
        productID: string,
        updateProductInput: UpdateProductInput
    ): Promise<ProductEntity> {
        // Repository.save() 에 id 값을 넣어주면, 수정이 된다
        // id 값을 넣어주지 않으면, 추가가 된다.
        // return await this.productRepository.save({
        //     id: productID,
        //     ...updateProductInput,
        // });

        const product = await this.findOne(productID);
        const newProduct = {
            ...product,
            id: productID,
            ...updateProductInput,
        };

        return await this.productRepository.save(newProduct);
    }

    // DELETE 상품 전체 삭제
    async deleteAll(): Promise<boolean> {
        const result = await this.productRepository.delete({});
        return result.affected ? true : false;
    }

    // DELETE 단일 상품 삭제
    async delete(productID: string): Promise<boolean> {
        /**
         * 1. 실제 삭제
         */
        // const result = await this.productRepository.delete({ id: productID });

        /**
         * 2. Soft Delete (직접 구현) - isDeleted
         * .save()는 객체를 Return 받음
         * .update()는 수정 결과를 Return 받음
         */
        // const result = await this.productRepository.update({ id: productID }, { isDeleted: true });

        /**
         * 3. Soft Delete (직접 구현) - deletedAt
         */
        // const result = await this.productRepository.update({ id: productID }, { deletedAt: new Date() });

        /**
         * 4. Soft Delete (TypeORM) - softRemove
         * ID로만 삭제 가능
         */
        // const result = await this.productRepository.softRemove({ id: productID });

        /**
         * 5. Soft Delete (TypeORM) - softDelete
         * 다른 조건으로도 삭제 가능
         */
        const result = await this.productRepository.softDelete({ id: productID });
        return result.affected ? true : false;
    }
}
