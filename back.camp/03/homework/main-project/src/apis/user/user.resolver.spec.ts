import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserCheckService } from './userCheck.service';

describe('UserResolver', () => {
    let resolver: UserResolver;

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

        resolver = module.get<UserResolver>(UserResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
