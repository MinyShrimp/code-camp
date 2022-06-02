import { OmitType } from '@nestjs/graphql';
import ProductCategorySearchEntity from '../entities/productCategorySearch.entity';

export default class CreateProductCategorySearchDto extends OmitType(
    ProductCategorySearchEntity,
    ['id'],
) {}
