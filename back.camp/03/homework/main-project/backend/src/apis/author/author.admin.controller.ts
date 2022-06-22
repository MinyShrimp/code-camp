import { Controller, Get, Param } from '@nestjs/common';
import { AuthorAdminService } from './author.admin.service';

@Controller('admin')
export class AuthorAdminController {
    constructor(private readonly authorAdminService: AuthorAdminService) {}

    @Get('/authors')
    getAuthors() {
        return this.authorAdminService.findAll();
    }

    @Get('/author/names')
    getAuthorNames() {
        return this.authorAdminService.findAllNames();
    }

    @Get('/author/:id')
    getAuthor(
        @Param('id') userID: string, //
    ) {
        return this.authorAdminService.findOne(userID);
    }
}
