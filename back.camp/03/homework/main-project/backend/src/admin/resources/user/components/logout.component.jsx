import React from 'react';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';
import { TransformGraphQLResponse } from '../../../utils/transform-graphql';

const LogoutComponent = (props) => {
    const history = useHistory();

    await(async () => {
        const jwt = window.localStorage.getItem('access_token');
        if (!jwt) {
            return;
        }

        const res = await axios.post(
            'http://localhost:3000/graphql',
            {
                query: 'mutation { Logout { id, isSuccess, msg, status } }',
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        const { data, msg } = TransformGraphQLResponse(res);

        if (!data) {
            console.error(msg);
        } else {
            window.localStorage.removeItem('access_token');
            history.push('/admin/resources/UserEntity');
        }
    })();

    return <></>;
};

export default LogoutComponent;
