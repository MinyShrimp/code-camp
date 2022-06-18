import { IColumn } from '../interface';

export interface IAuthorColumn extends IColumn {
    id: string;
    name: string;
    description: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
}

const now = new Date();
export const DummyAuthorColumn: IAuthorColumn = {
    id: '',
    name: '',
    description: '',
    createAt: now,
    updateAt: now,
    deleteAt: now,
};
