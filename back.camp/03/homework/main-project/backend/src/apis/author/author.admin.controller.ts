import { Controller, Get, Param } from '@nestjs/common';
import { AuthorAdminService } from './author.admin.service';

@Controller('admin')
export class AuthorAdminController {
    constructor(private readonly authorAdminService: AuthorAdminService) {}

    @Get('/authors')
    getAuthors() {
        return this.authorAdminService.findAll();
    }

    @Get('/author/:id')
    getUser(
        @Param('id') userID: string, //
    ) {
        return this.authorAdminService.findOne(userID);
    }
}
