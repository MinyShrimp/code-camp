import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserCheckService } from './userCheck.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ///////////////////////////////////////////////////////////////////////////
                // TypeORM //
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'root',
                    password: 'root',
                    database: 'MainProjectTest',
                    entities: [UserEntity],
                    charset: 'utf8mb4',
                    synchronize: true,
                    logging: true,
                }),

                TypeOrmModule.forFeature([
                    UserEntity, //
                ]),
            ],
            providers: [
                UserResolver, //
                UserService,
                UserCheckService,
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', async () => {
        expect(
            await service.Signup({
                name: '김회민',
                email: 'ksk7584@gmail.com',
                pwd: 'qwer1234!',
            }),
        ).toEqual({});
    });
});
