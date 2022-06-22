import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewAdminRepository } from './entities/review.admin.repository';

import { ReviewEntity } from './entities/review.entity';
import { ReviewAdminController } from './review.admin.controller';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ReviewEntity, //
        ]),
    ],
    controllers: [
        ReviewAdminController, //
    ],
    providers: [
        ReviewResolver, //
        ReviewService,
        ReviewAdminRepository,
    ],
})
export class ReviewModule {}
