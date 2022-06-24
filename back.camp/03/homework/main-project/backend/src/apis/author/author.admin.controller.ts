import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { AuthorAdminRepository } from './entities/author.admin.repository';

@Controller('admin')
export class AuthorAdminController {
    constructor(
        private readonly authorRepository: AuthorAdminRepository, //
    ) {}

    @Get('/authors')
    getAuthors() {
        return this.authorRepository.findAll();
    }

    @Get('/author/names')
    getAuthorNames() {
        return this.authorRepository.findAllNames();
    }

    @Get('/author/:id')
    getAuthor(
        @Param('id') userID: string, //
    ) {
        return this.authorRepository.findOne(userID);
    }

    @Delete('/authors')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ) {
        await this.authorRepository.bulkDelete(IDs);
        return 'delete ok';
    }
}
