import { IColumn } from '../interface';

export interface IAuthorColumn extends IColumn {
    name: string;
    description: string;
    createAt: string;
}
