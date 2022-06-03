/* Product Service */

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';
import ProductPriceEntity from './entities/productPrice.entity';

@Injectable()
export default class ProductPriceService {
    constructor(
        @InjectRepository(ProductPriceEntity)
        private readonly productPriceRepository: Repository<ProductPriceEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 가격 생성
     * @param price 가격
     * @returns 생성된 Price Entity
     *
     * To. Product Service - Create
     */
    async create(
        price: number, //
    ): Promise<ProductPriceEntity> {
        return await this.productPriceRepository.save({
            price,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 가격 수정
     * @param priceID 가격 ID
     * @param price   가격
     * @returns 수정된 Price Entity
     *
     * To. Product Service - Update
     */
    async update(
        priceID: string, //
        price: number,
    ): Promise<ProductPriceEntity> {
        return await this.productPriceRepository.save({
            id: priceID,
            price: price,
        });
    }

    /**
     * Soft Delete된 상품 되살리기
     * @param priceID
     */
    async restore(
        priceID: string, //
    ): Promise<ResultMessage> {
        const result = await this.productPriceRepository.restore({
            id: priceID,
        });

        const isSuccess = result ? true : false;
        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? 'Completed All Price Soft Delete'
                : 'Failed All Price Soft Delete',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 전체 삭제 ( 삭제 O )
     * @returns ResultMessage
     */
    async deleteAll(): Promise<ResultMessage> {
        const result = await this.productPriceRepository.delete({});
        const isSuccess = result ? true : false;
        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? 'Completed All Price Delete'
                : 'Failed All Price Delete',
        });
    }

    /**
     * 전체 삭제 ( 삭제 X )
     * @returns ResultMessage
     */
    async softDeleteAll(): Promise<ResultMessage> {
        const result = await this.productPriceRepository.softDelete({});
        const isSuccess = result ? true : false;
        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? 'Completed All Price Soft Delete'
                : 'Failed All Price Soft Delete',
        });
    }

    /**
     * 단일 삭제 ( 삭제 O )
     * @param priceID
     * @returns ResultMessage
     */
    async delete(
        priceID: string, //
    ): Promise<ResultMessage> {
        const result = await this.productPriceRepository.delete({
            id: priceID,
        });

        const isSuccess = result ? true : false;
        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? 'Completed Price Delete'
                : 'Failed Price Delete',
        });
    }

    /**
     * 단일 삭제 ( 삭제 X )
     * @param priceID
     * @returns ResultMessage
     */
    async softDelete(
        priceID: string, //
    ): Promise<ResultMessage> {
        const result = await this.productPriceRepository.softDelete({
            id: priceID,
        });

        const isSuccess = result ? true : false;
        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? 'Completed Price Soft Delete'
                : 'Failed Price Soft Delete',
        });
    }
}
