// import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
// import { randomInt } from 'crypto';
import { ResultMessage } from '../../../commons/dto/ResultMessage.dto';

import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';
import { UserCheckService } from '../userCheck.service';
import { MockRepository } from './mock.repository';

describe('UserService', () => {
    let service: UserService;

    // const __random_name = () => {
    //     let result = '';
    //     for (let i = 0; i < 10; i++) {
    //         const r = randomInt(0, 26);
    //         result += String.fromCharCode(r + 97);
    //     }
    //     return result;
    // };

    // const __many_create = async () => {
    //     for (let i = 0; i < 100; i++) {
    //         const randomName = __random_name();
    //         const createData = {
    //             name: randomName,
    //             pwd: 'qwer1234!',
    //             email: `${randomName}@gmail.com`,
    //         };
    //         await service.Signup(createData);
    //     }
    // };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserCheckService,
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useClass: MockRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('Signup', async () => {
        const createData = {
            name: '김회민',
            pwd: 'qwer1234!',
            email: 'ksk7584@gmail.com',
        };

        const createUserSpy = jest.spyOn(service, 'Signup');
        const findUserSpy = jest.spyOn(service, 'findOneByID');

        const createResult = await service.Signup(createData);
        const findResult = await service.findOneByID(createResult.id);

        expect(createUserSpy).toHaveBeenCalledWith(createData);
        expect(findUserSpy).toHaveBeenCalledWith(createResult.id);

        expect(findResult).toEqual(createResult);
        await expect(async () => {
            await service.Signup(createData);
        }).rejects.toThrowError('이미 존재하는 이메일입니다.');
    });

    it('Login and Logout', async () => {
        const createData = {
            name: '김회민',
            pwd: 'qwer1234!',
            email: 'ksk7584@gmail.com',
        };

        const loginData = {
            email: 'ksk7584@gmail.com',
            pwd: 'qwer1234!',
        };

        // Spys
        const createUserSpy = jest.spyOn(service, 'Signup');
        const loginUserSpy = jest.spyOn(service, 'Login');
        const logoutUserSpy = jest.spyOn(service, 'Logout');
        const findUserSpy = jest.spyOn(service, 'findOneByID');

        // Call Service Function
        const createResult = await service.Signup(createData);
        const loginResult = await service.Login(loginData);
        const findResult = await service.findOneByID(loginResult.id);

        // Spy - Call Function Param Check
        expect(createUserSpy).toHaveBeenCalledWith(createData);
        expect(loginUserSpy).toHaveBeenCalledWith(loginData);
        expect(findUserSpy).toHaveBeenCalledWith(loginResult.id);

        // Service - Login Check
        expect(loginResult).toEqual(findResult);
        await expect(async () => {
            await service.Login(loginData);
        }).rejects.toThrowError('이미 로그인된 유저입니다.');

        expect(loginResult.loginAt).not.toBe(null);
        expect(loginResult.logoutAt).toBe(null);
        expect(loginResult.isLogin).toEqual(true);

        // Call Service Function - Logout
        const logoutResult = await service.Logout(loginResult.id);

        // Spy - Call Logout Param Check
        expect(logoutUserSpy).toHaveBeenCalledWith(loginResult.id);

        // Service - Logout Check
        expect(logoutResult).toEqual(
            new ResultMessage({
                id: createResult.id,
                isSuccess: true,
                contents: 'Completed Logout',
            }),
        );
        await expect(async () => {
            await service.Logout(loginResult.id);
        }).rejects.toThrowError('이미 로그아웃된 유저입니다.');

        expect(findResult.loginAt).not.toBe(null);
        expect(findResult.logoutAt).not.toBe(null);
        expect(findResult.isLogin).toEqual(false);
    });

    it('Delete', async () => {
        const createData = {
            name: '김회민',
            pwd: 'qwer1234!',
            email: 'ksk7584@gmail.com',
        };

        const createResult = await service.Signup(createData);
        const deleteResult = await service.delete(createResult.id);
        expect(deleteResult).toEqual(
            new ResultMessage({
                id: createResult.id,
                isSuccess: true,
                contents: 'Completed User Delete',
            }),
        );
        const findResult = await service.findOneByID(createResult.id);
        expect(findResult).toEqual(undefined);
    });

    it('Soft Delete', async () => {});
});
