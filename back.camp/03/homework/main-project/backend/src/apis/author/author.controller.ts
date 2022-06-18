import { Controller, Get, Param } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('admin')
export class AuthorController {
    constructor(
        private readonly authorService: AuthorService, //
    ) {}

    @Get('/authors')
    getAuthors() {
        return this.authorService.findAll();
    }

    @Get('/author/:id')
    getUser(
        @Param('id') userID: string, //
    ) {
        return this.authorService.findOne(userID);
    }
}
