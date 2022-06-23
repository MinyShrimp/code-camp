import { FindManyOptions, FindOneOptions } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class MockUserRepository {
    private users: Array<Partial<UserEntity>> = [];

    find(options?: FindManyOptions<UserEntity>) {
        const users = this.users.filter(
            (user) => user.id === options.where['id'],
        );
        return users;
    }

    findOne(options?: FindOneOptions<UserEntity>) {
        const users = options.where['id']
            ? this.users.filter((user) => user.id === options.where['id'])
            : this.users.filter(
                  (user) => user.email === options.where['email'],
              );
        if (users.length) return users[0];
        return undefined;
    }

    save(user: Partial<UserEntity>) {
        this.users.push(user);
        return user;
    }

    update(user: Partial<UserEntity>) {}

    restore() {}

    delete() {}

    softDelete() {}
}
