import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { MESSAGES } from '../../commons/message/Message.enum';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductCheckService {
    constructor() {}

    /**
     * 재고 소진 체크
     * @param product
     */
    checkSoldout(
        product: ProductEntity, //
    ): void {
        if (product.stock_count <= 0) {
            throw new UnprocessableEntityException(
                MESSAGES.PRODUCT_SOLD_OUT, //
            );
        }
    }

    /**
     * 상품 존재 검사
     * @param product
     * @returns 존재 여부
     *
     *  - 없으면 UnprocessableEntityException
     */
    checkValidProduct(
        product: ProductEntity, //
    ): void {
        if (product === undefined) {
            throw new UnprocessableEntityException(
                MESSAGES.PRODUCT_FIND_ONE_FAILED,
            );
        }
    }
}
