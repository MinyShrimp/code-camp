/* Product Service */

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ProductEntity from './entities/product.entity';
import CreateProductInput from './dto/createProduct.input';
import UpdateProductInput from './dto/updateProduct.input';

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    /**
     * 전체 상품 조회
     * @returns 모든 상품 목록
     */
    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({});
    }

    /**
     * 단일 상품 조회
     * @param productID
     * @returns 단일 상품
     */
    async findOne(productID: string): Promise<ProductEntity> {
        return await this.productRepository.findOne({
            id: productID,
        });
    }

    /**
     * 상품 생성
     * @param createProductInput
     * @returns 생성된 상품 정보
     */
    async create(
        createProductInput: CreateProductInput,
    ): Promise<ProductEntity> {
        return await this.productRepository.save({
            ...createProductInput,
        });
    }

    /**
     * 상품 정보 수정
     * @param productID
     * @param updateProductInput
     * @returns 수정된 상품 정보
     */
    async update(
        productID: string,
        updateProductInput: UpdateProductInput,
    ): Promise<ProductEntity> {
        // Repository.save() 에 id 값을 넣어주면, 수정이 된다
        // id 값을 넣어주지 않으면, 추가가 된다.
        const product = await this.findOne(productID);
        const newProduct = {
            ...product,
            id: productID,
            ...updateProductInput,
        };

        return await this.productRepository.save(newProduct);
    }

    /**
     * 모든 상품 삭제
     */
    async deleteAll(): Promise<void> {
        await this.productRepository.delete({});
    }

    /**
     * 재고 소진 체크
     * @param productID
     */
    async checkSoldout(productID: string): Promise<void> {
        const product = await this.productRepository.findOne({
            where: { id: productID },
        });
        if (product.stock_count <= 0) {
            throw new UnprocessableEntityException(
                '이미 판매 완료된 상품입니다.',
            );
        }
    }
}
