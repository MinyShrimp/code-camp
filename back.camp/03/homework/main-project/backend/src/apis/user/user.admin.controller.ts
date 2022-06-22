import { Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserAdminRepository } from './entities/user.admin.repository';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('admin')
export class UserAdminController {
    constructor(
        private readonly userService: UserService, //
        private readonly userAdminRepository: UserAdminRepository,
    ) {}

    @Get('/users')
    getUsers(): Promise<UserEntity[]> {
        return this.userAdminRepository.findAll();
    }

    @Get('/user/:id')
    getUser(
        @Param('id') userID: string, //
    ): Promise<UserEntity> {
        return this.userAdminRepository.findOne(userID);
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
