import React from 'react';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';
import { TransformGraphQLResponse } from '../../../utils/transform-graphql';

const RestoreTokenComponent = (props) => {
    (async () => {
        const res = await axios.post('http://localhost:3000/graphql', {
            query: `mutation { restoreToken }`,
        });

        const { data, msg } = TransformGraphQLResponse(res);

        if (!data) {
            console.error(msg);
        } else {
            const jwt = data.restoreToken;
            window.localStorage.setItem('access_token', jwt);
            history.push('/admin/resources/UserEntity');
        }
    })();

    return <></>;
};

export default RestoreTokenComponent;
