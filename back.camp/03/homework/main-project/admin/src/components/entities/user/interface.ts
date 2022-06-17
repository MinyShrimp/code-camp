import { IColumn } from '../interface';

export interface IUserColumn extends IColumn {
    name: string;
    email: string;
    point: number;
    loginAt: string;
    logoutAt: string;
    isLogin: boolean;
    createAt: string;
    updateAt: string;
}
