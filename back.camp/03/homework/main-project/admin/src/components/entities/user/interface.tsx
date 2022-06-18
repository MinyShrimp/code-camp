import { IColumn } from '../interface';

export interface IUserColumn extends IColumn {
    name: string;
    email: string;
    pwd: string;
    point: number;
    isAdmin: boolean;
    loginAt: Date;
    logoutAt: Date;
    isLogin: boolean;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
}

const now = new Date();
export const DummyUserColumn: IUserColumn = {
    id: '',
    name: '',
    email: '',
    pwd: '',
    point: 0,
    isAdmin: true,
    loginAt: now,
    logoutAt: now,
    isLogin: true,
    createAt: now,
    updateAt: now,
    deleteAt: now,
};
