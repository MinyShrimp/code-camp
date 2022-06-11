// Entity //
import { UserResource } from './resources/user.resource';

import { ReviewResource } from './resources/review.resource';
import { PaymentResource } from './resources/payment.resource';

import { BookResource } from './resources/book.resource';
import { AuthorResource } from './resources/author.resource';
import { PublisherResource } from './resources/publisher.resource';
import { BookImageResource } from './resources/bookImage.resource';

import { ProductResource } from './resources/product.resource';
import { ProductTagResource } from './resources/productTag.resource';
import { ProductCategoryResource } from './resources/productCategory.resource';
import { ProductCategorySearchResource } from './resources/productCategorySearch.resource';

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
