import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorEntity } from './entities/author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorAdminController } from './author.admin.controller';
import { AuthorService } from './author.service';
import { AuthorAdminRepository } from './entities/author.admin.repository';
import { AuthorAdminService } from './author.admin.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AuthorEntity, //
        ]),
    ],
    exports: [AuthorService],
    controllers: [AuthorAdminController],
    providers: [
        AuthorResolver, //
        AuthorService,

        AuthorAdminService,
        AuthorAdminRepository,
    ],
})
export class AuthorModule {}
