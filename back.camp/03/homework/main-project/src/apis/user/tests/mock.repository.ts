import { randomUUID } from 'crypto';
import { DateUtil } from '../../../commons/utils/date.util';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { UserEntity } from '../entities/user.entity';

interface IWhere {
    id?: string;
    email?: string;
}

interface IFindInput {
    where: IWhere;
    releations?: Array<string>;
}

export class MockRepository {
    private __users: Array<UserEntity> = [];

    private async __create_default_user(): Promise<UserEntity> {
        const user: UserEntity = new UserEntity();

        user.id = randomUUID();
        user.pwd = '';
        user.name = '';
        user.email = '';
        user.isLogin = false;
        user.loginAt = null;
        user.logoutAt = null;
        user.createAt = DateUtil.getKorDateNow();
        user.updateAt = DateUtil.getKorDateNow();
        user.deleteAt = null;

        this.__users.push(user);

        return user;
    }

    async find(): Promise<Readonly<Array<UserEntity>>> {
        return this.__users;
    }

    async findOne(
        input: IFindInput,
    ): Promise<undefined | Readonly<UserEntity>> {
        if (this.__users.length === 0) {
            return undefined;
        }

        if (input.where.id) {
            return this.__users.filter((v) => v.id === input.where.id)[0];
        }
        if (input.where.email) {
            return this.__users.filter((v) => v.email === input.where.email)[0];
        }
    }

    async save(info: UserEntity): Promise<UserEntity> {
        const user: UserEntity = info.id
            ? await this.findOne({ where: { id: info.id } })
            : await this.__create_default_user();

        user.id = info.id ?? user.id;
        user.pwd = info.pwd ?? user.pwd;
        user.name = info.name ?? user.name;
        user.email = info.email ?? user.email;
        user.isLogin = info.isLogin ?? user.isLogin;
        user.loginAt = info.loginAt ?? user.loginAt;
        user.logoutAt = info.logoutAt ?? user.logoutAt;
        user.createAt = info.createAt ?? user.createAt;
        user.updateAt = info.updateAt ?? user.updateAt;
        user.deleteAt = info.deleteAt ?? user.deleteAt;

        return user;
    }

    async update(input: IWhere, info: UserEntity): Promise<UpdateResult> {
        info.id = input.id;
        await this.save(info);

        return new UpdateResult();
    }

    async restore() {}

    async delete(input: IWhere) {
        const deleteResult = new DeleteResult();

        const user = await this.findOne({ where: { id: input.id } });
        if (user === undefined) {
            deleteResult.affected = 0;
        } else {
            this.__users = this.__users.filter((v) => v.id !== user.id);
            deleteResult.affected = 1;
        }

        return deleteResult;
    }

    async softDelete() {}
}
