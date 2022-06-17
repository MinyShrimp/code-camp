import { IColumn } from '../interface';

export interface IUserColumn extends IColumn {
    name: string;
    email: string;
    point: number;
    loginAt: Date;
    logoutAt: Date;
    isLogin: boolean;
    createAt: Date;
    updateAt: Date;
}
