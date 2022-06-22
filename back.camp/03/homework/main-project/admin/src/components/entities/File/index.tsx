import React from 'react';
import { EntityFactory } from '../entity_factory';
import { DummyFileColumn, IFileColumn } from './interface';

// prettier-ignore
export const FileIndex = EntityFactory.getEntity<IFileColumn>({
    name: 'File',
    dummyData: DummyFileColumn,
    list: {
        column: ['id', 'name', 'path', 'url', 'createAt'],
        url: '/admin/files',
    },
    show: {
        column: ['id', 'name', 'path', 'url', 'createAt', 'deleteAt'],
        url: '/admin/file',
    },
});
