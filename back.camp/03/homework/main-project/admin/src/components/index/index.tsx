import React from 'react';
import { IndexHeader } from './header';
import { IndexBody } from './body';

export function Index() {
    console.log(process.env);
    return (
        <>
            <IndexHeader />
            <IndexBody />
        </>
    );
}
