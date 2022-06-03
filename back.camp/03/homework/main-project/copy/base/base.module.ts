import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import BaseEntity from './entities/base.entity';
import BaseResolver from './base.resolver';
import BaseService from './base.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BaseEntity, //
        ]),
    ],
    providers: [
        BaseResolver, //
        BaseService,
    ],
})
export default class BaseModule {}
