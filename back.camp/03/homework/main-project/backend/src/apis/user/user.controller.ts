import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('admin')
export class UserController {
    constructor(
        private readonly userService: UserService, //
    ) {}

    @Get('/users')
    getUsers() {
        return this.userService.findAllWithDeleted();
    }

    @Get('/user/:id')
    getUser(
        @Param('id') userID: string, //
    ) {
        return this.userService.findOneByID(userID);
    }
}
