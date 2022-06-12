// Entity //
import { UserResource } from './resources/user/user.resource';

import { ReviewResource } from './resources/review/review.resource';
import { PaymentResource } from './resources/payment/payment.resource';

import { BookResource } from './resources/book/book.resource';
import { AuthorResource } from './resources/author/author.resource';
import { PublisherResource } from './resources/publisher/publisher.resource';
import { BookImageResource } from './resources/book/bookImage.resource';

import { ProductResource } from './resources/product/product.resource';
import { ProductTagResource } from './resources/productTag/productTag.resource';
import { ProductCategoryResource } from './resources/productCategory/productCategory.resource';
import { ProductCategorySearchResource } from './resources/productCategory/productCategorySearch.resource';

export const Resources = [
    UserResource,

    ReviewResource,
    PaymentResource,

    BookResource,
    AuthorResource,
    PublisherResource,
    BookImageResource,

    ProductResource,
    ProductTagResource,
    ProductCategoryResource,
    ProductCategorySearchResource,
];
