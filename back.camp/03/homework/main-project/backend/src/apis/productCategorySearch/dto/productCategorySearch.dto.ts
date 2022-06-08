import { OmitType, PickType } from '@nestjs/graphql';
import { ProductCategorySearchEntity } from '../entities/productCategorySearch.entity';

export class ProductCategorySearchDto extends PickType(
    ProductCategorySearchEntity,
    ['name', 'c1', 'c2', 'c3', 'c4'],
) {}
