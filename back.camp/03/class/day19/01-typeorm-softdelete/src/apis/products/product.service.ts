import {
    HttpException,
    HttpStatus,
    Injectable,
    UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import CreateProductInput from "./dto/createProduct.input";
import UpdateProductInput from "./dto/updateProduct.input";
import ProductEntity from "./entities/product.entity";

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) {}

    async checkSoldout(productID: string): Promise<void> {
        const product = await this.productRepository.findOne({
            where: { id: productID },
        });

        if (product.isSoldout) {
            throw new UnprocessableEntityException("이미 판매 완료된 상품입니다.");
        }
    }

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({});
    }

    async findOne(productID: string): Promise<ProductEntity> {
        return await this.productRepository.findOne({
            where: { id: productID },
        });
    }

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

    async create(
        createProductInput: CreateProductInput //
    ): Promise<ProductEntity> {
        return await this.productRepository.save({
            ...createProductInput,
        });
    }

    async deleteAll(): Promise<void> {
        await this.productRepository.delete({});
    }

    async delete(productID: string): Promise<Boolean> {
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
