import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorEntity } from './entities/author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorAdminController } from './author.admin.controller';
import { AuthorService } from './author.service';

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
    ],
})
export class AuthorModule {}
