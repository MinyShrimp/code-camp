import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserAdminRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    private readonly _selector = [
        'user.id',
        'user.name',
        'user.email',
        'user.point',
        'user.loginAt',
        'user.logoutAt',
        'user.isLogin',
        'user.createAt',
        'user.updateAt',
        'user.deleteAt',
    ];

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select(this._selector)
            .withDeleted()
            .orderBy('user.createAt')
            .getMany();
    }

    async findAllName(): Promise<UserEntity[]> {
        const result = await this.userRepository
            .createQueryBuilder('user')
            .select([
                'user.id',
                'CONCAT(user.name, " | ", user.email) as user_name',
            ])
            .orderBy('user.createAt')
            .getRawMany();

        return result.map((value) =>
            this.userRepository.create({
                id: value.user_id,
                name: value.user_name,
            }),
        );
    }

    async findOne(
        userID: string, //
    ): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select([...this._selector, 'user.pwd', 'user.isAdmin'])
            .withDeleted()
            .where('user.id=:id', { id: userID })
            .orderBy('user.createAt')
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ) {
        return await Promise.all(
            IDs.map((id) => {
                return this.userRepository.delete({ id: id });
            }),
        );
    }
}
