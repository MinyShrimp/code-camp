import { sendGraphQL } from '../sendGraphQL';
import { LogicHeader } from '../header';
import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export function LogicLogoutIndex() {
    const navi = useNavigate();

    const submit = async () => {
        const token = localStorage.getItem('access_token');
        if (token === null) {
            return;
        }

        const { data, message } = await sendGraphQL({
            query: `mutation { Logout { id, msg } }`,
            header: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (data) {
            localStorage.removeItem('access_token');
            navi('/admin/entity/user');
        } else {
        }
    };

    const getLoginUser = async () => {
        const token = localStorage.getItem('access_token');
        if (token === null) {
            return;
        }

        const { data, message } = await sendGraphQL({
            query: `query { fetchLoginUser { id, name, email, point } }`,
            header: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (data) {
            console.log(data.fetchLoginUser);
        } else {
        }
    };

    useEffect(() => {
        getLoginUser();
    }, []);

    return (
        <>
            <LogicHeader entityName="Logout" />
            <div>
                <Button onClick={submit}>Logout</Button>
            </div>
        </>
    );
}

// import { LogicFactory } from '../logic_factory';

// export const LogicLogoutIndex = LogicFactory.createIndex({
//     name: 'Logout',
// });
