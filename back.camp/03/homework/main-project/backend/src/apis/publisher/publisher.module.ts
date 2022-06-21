import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherAdminRepository } from './entities/publisher.admin.repository';

import { PublisherEntity } from './entities/publisher.entity';
import { PublisherAdminContoller } from './publisher.admin.contoller';
import { PublisherAdminService } from './publisher.admin.service';
import { PublisherResolver } from './publisher.resolver';
import { PublisherService } from './publisher.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PublisherEntity, //
        ]),
    ],
    exports: [PublisherService],
    controllers: [PublisherAdminContoller],
    providers: [
        PublisherResolver, //
        PublisherService,

        PublisherAdminRepository,
        PublisherAdminService,
    ],
})
export class PublisherModule {}
