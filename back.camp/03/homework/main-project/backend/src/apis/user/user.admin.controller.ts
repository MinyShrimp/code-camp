import { Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('admin')
export class UserAdminController {
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

    @Post('/user')
    async createUser(
        @Req() req: Request, //
    ) {
        const user = await this.userService.createUser(req.body);
        // res.send(user);
        return user;
    }
}
