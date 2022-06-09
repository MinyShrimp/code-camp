import { UserEntity } from '../../apis/user/entities/user.entity';
import { Resource } from '../interfaces/resource.interface';

export const UserResource: Resource = {
    resource: UserEntity,
    options: {
        listProperties: [
            'id',
            'name',
            'email',
            'loginAt',
            'logoutAt',
            'isLogin',
            'updateAt',
        ],
        editProperties: [
            'name',
            'email',
            'loginAt',
            'logoutAt',
            'isLogin',
            'deleteAt',
        ],
        showProperties: [
            'id',
            'name',
            'email',
            'loginAt',
            'logoutAt',
            'isLogin',
            'createAt',
            'updateAt',
            'deleteAt',
        ],
    },
};
