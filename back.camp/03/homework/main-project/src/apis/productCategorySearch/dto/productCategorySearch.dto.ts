import { OmitType } from '@nestjs/graphql';
import { ProductCategorySearchEntity } from '../entities/productCategorySearch.entity';

export class ProductCategorySearchDto extends OmitType(
    ProductCategorySearchEntity,
    ['id'],
) {}
