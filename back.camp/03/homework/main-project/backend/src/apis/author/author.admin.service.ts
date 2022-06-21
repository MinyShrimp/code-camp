import { Injectable } from '@nestjs/common';
import { AuthorAdminRepository } from './entities/author.admin.repository';

@Injectable()
export class AuthorAdminService {
    constructor(
        private readonly authorAdminRepository: AuthorAdminRepository,
    ) {}

    async findAll() {
        return this.authorAdminRepository.findAll();
    }

    async findOne(
        authorID: string, //
    ) {
        return this.authorAdminRepository.findOne(authorID);
    }
}
