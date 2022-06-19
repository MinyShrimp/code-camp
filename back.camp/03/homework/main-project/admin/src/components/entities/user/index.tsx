import React from 'react';
import { EntityFactory } from '../entity_factory';
import { IUserColumn, DummyUserColumn } from './interface';

// prettier-ignore
export const UserIndex = EntityFactory.getEntity<IUserColumn>({
    name: "User",
    dummyData: DummyUserColumn,
    list: {
        column: [
            'id', 'name', 'email', 'point',
            'loginAt', 'logoutAt', 'isLogin',
            'createAt', 'updateAt', 'deleteAt'
        ],
        url: "/admin/users"
    },
    show: {
        column: [
            'id', 'name', 'email', 
            'pwd', 'point', 'isAdmin', 
            'loginAt', 'logoutAt', 'isLogin',
            'createAt', 'updateAt', 'deleteAt',
        ],
        url: "/admin/user"
    },
    edit: {
        column: [
            'name', 'email', 'pwd'
        ],
        url: "/admin/user",
        default: {
            name: "", email: "", pwd: ""
        }
    },
    update: {
        column: [
            'name', 'email', 'pwd', 'point', 
            'isLogin', 'isAdmin'
        ],
        url: "/admin/user",
        default: {
            name: "", email: "", pwd: "", point: 0, 
            isLogin: false, isAdmin: false
        }
    }
});
