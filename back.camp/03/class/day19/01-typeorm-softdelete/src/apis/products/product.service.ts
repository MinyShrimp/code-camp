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
        createProductInput: CreateProductInput
    ): Promise<ProductEntity> {
        return await this.productRepository.save({
            ...createProductInput,
        });
    }

    async deleteAll(): Promise<void> {
        await this.productRepository.delete({});
    }

    async checkSoldout(productID: string): Promise<void> {
        const product = await this.productRepository.findOne({
            where: { id: productID },
        });
        if (product.isSoldout) {
            // throw new HttpException(
            //     "이미 판매 완료된 상품입니다.",
            //     HttpStatus.UNPROCESSABLE_ENTITY // 422
            // );
            throw new UnprocessableEntityException(
                "이미 판매 완료된 상품입니다."
            );
        }
    }
}
