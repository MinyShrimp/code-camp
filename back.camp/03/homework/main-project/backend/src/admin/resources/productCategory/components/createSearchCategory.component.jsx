import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';
import { TransformGraphQLResponse } from '../../../utils/transform-graphql';

const CreateSearchCategoryComponent = (props) => {
    const isMount = useRef(true);
    const history = useHistory();

    useEffect(() => {
        isMount.current = true;

        (async () => {
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
            }
        })();

        history.push('/admin/resources/ProductCategorySearchEntity');
        return () => {
            isMount.current = false;
        };
    }, []);

    return <></>;
};

export default CreateSearchCategoryComponent;
