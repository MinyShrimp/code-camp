/* Product Service */

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import ProductEntity from './entities/product.entity';
import CreateProductInput from './dto/createProduct.input';
import UpdateProductInput from './dto/updateProduct.input';

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

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

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 상품 조회
     * @returns 모든 상품 목록
     */
    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            relations: ['book', 'price', 'productCategory'],
        });
    }

    /**
     * 삭제된 데이터를 포함한 모든 상품 조회
     * @returns 삭제된 데이터를 포함한 모든 상품 목록
     */
    async findAllWithDeleted(): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            relations: ['book', 'price', 'productCategory'],
            withDeleted: true,
        });
    }

    /**
     * 단일 상품 조회
     * @param productID
     * @returns 단일 상품
     */
    async findOne(productID: string): Promise<ProductEntity> {
        return await this.productRepository.findOne({
            where: { id: productID },
            relations: ['book', 'price', 'productCategory'],
        });
    }

    /**
     * 삭제된 데이터를 포함한 단일 상품 조회
     * @param productID
     * @returns 삭제된 데이터를 포함한 단일 상품
     */
    async findOneWithDeleted(productID: string): Promise<ProductEntity> {
        return await this.productRepository.findOne({
            where: { id: productID },
            relations: ['book', 'price', 'productCategory'],
            withDeleted: true,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

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

    ///////////////////////////////////////////////////////////////////
    // 수정 //

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
     * Soft Delete된 상품 되살리기
     * @param productID
     * @returns ResultMessage
     */
    async restore(productID: string): Promise<ResultMessage> {
        const result = await this.productRepository.restore({
            id: productID,
        });

        return new ResultMessage({
            id: productID,
            contents: result.affected
                ? 'Completed Product Restore'
                : 'Failed Product Restore',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 모든 상품 삭제 ( 실제 삭제 )
     * @returns 삭제 성공 여부에 따른 Msg
     */
    async deleteAll(): Promise<ResultMessage> {
        const result = await this.productRepository.delete({});

        return new ResultMessage({
            contents: result.affected
                ? `Completed All Product Delete`
                : `Failed All Product Delete`,
        });
    }

    /**
     * 모든 상품 삭제 ( 삭제 X )
     * @returns 삭제 성공 여부에 따른 Msg
     */
    async softDeleteAll(): Promise<ResultMessage> {
        const result = await this.productRepository.softDelete({});

        return new ResultMessage({
            contents: result.affected
                ? `Completed All Product Delete`
                : `Failed All Product Delete`,
        });
    }

    /**
     * 단일 상품 삭제 ( 삭제 O )
     * @param productID
     * @returns 삭제 성공 여부에 따른 Msg
     */
    async delete(productID: string): Promise<ResultMessage> {
        const result = await this.productRepository.delete({
            id: productID,
        });

        return new ResultMessage({
            id: productID,
            contents: result.affected
                ? `Completed Product Delete`
                : `Failed Product Delete`,
        });
    }

    /**
     * 단일 상품 삭제 ( 삭제 X )
     * @param productID
     * @returns 삭제 성공 여부에 따른 Msg
     */
    async softDelete(productID: string): Promise<ResultMessage> {
        const result = await this.productRepository.softDelete({
            id: productID,
        });

        return new ResultMessage({
            id: productID,
            contents: result.affected
                ? `Completed Product Delete`
                : `Failed Product Delete`,
        });
    }
}
