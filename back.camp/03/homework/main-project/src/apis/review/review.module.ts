import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewEntity } from './entities/review.entity';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ReviewEntity, //
        ]),
    ],
    providers: [
        ReviewResolver, //
        ReviewService,
    ],
})
export class ReviewModule {}
