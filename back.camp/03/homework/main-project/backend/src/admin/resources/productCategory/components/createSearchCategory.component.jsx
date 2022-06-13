import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';
import { TransformGraphQLResponse } from '../../../utils/transform-graphql';

const CreateSearchCategoryComponent = (props) => {
    const isMount = useRef(true);
    const history = useHistory();

    await(async () => {
        const jwt = window.localStorage.getItem('access_token');
        if (!jwt) {
            return;
        }

        const res = await axios.post(
            'http://localhost:3000/graphql',
            {
                query: 'mutation { createCategorySearch { isSuccess, msg, status } }',
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
            history.push('/admin/resources/ProductCategorySearchEntity');
        }
    })();

    return <></>;
};

export default CreateSearchCategoryComponent;
