/* Product Service */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductPriceEntity } from './entities/productPrice.entity';

@Injectable()
export class ProductPriceService {
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
    ): Promise<boolean> {
        const result = await this.productPriceRepository.restore({
            id: priceID,
        });

        return result.affected ? true : false;
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 전체 삭제 ( Real )
     * @returns ResultMessage
     */
    async deleteAll(): Promise<boolean> {
        const result = await this.productPriceRepository.delete({});
        return result.affected ? true : false;
    }

    /**
     * 전체 삭제 ( Soft )
     * @returns ResultMessage
     */
    async softDeleteAll(): Promise<boolean> {
        const result = await this.productPriceRepository.softDelete({});
        return result.affected ? true : false;
    }

    /**
     * 단일 삭제 ( Real )
     * @param priceID
     * @returns ResultMessage
     */
    async delete(
        priceID: string, //
    ): Promise<boolean> {
        const result = await this.productPriceRepository.delete({
            id: priceID,
        });
        return result.affected ? true : false;
    }

    /**
     * 단일 삭제 ( Soft )
     * @param priceID
     * @returns ResultMessage
     */
    async softDelete(
        priceID: string, //
    ): Promise<boolean> {
        const result = await this.productPriceRepository.softDelete({
            id: priceID,
        });
        return result.affected ? true : false;
    }
}
