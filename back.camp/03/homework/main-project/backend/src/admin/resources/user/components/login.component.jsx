import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';

import {
    Container,
    InputGroup,
    Label,
    Submit,
    Input,
} from '../../../styles/base.styled';
import { TransformGraphQLResponse } from '../../../utils/transform-graphql';

const LoginComponent = (props) => {
    const email = useRef('');
    const pwd = useRef('');
    const history = useHistory();

    const sendLogin = async () => {
        if (email.current === '' || pwd.current === '') {
            return false;
        }

        const res = await axios.post('http://127.0.0.1:3000/graphql', {
            query: `mutation { Login( loginInput: { email: "${email.current}", pwd: "${pwd.current}" } ) }`,
        });

        const { data, msg } = TransformGraphQLResponse(res);

        if (!data) {
            console.error(msg);
        } else {
            console.log(res.headers['Set-Cookie']);
            const jwt = data.Login;
            window.localStorage.setItem('access_token', jwt);
            history.push('/admin/resources/UserEntity');
        }
    };

    return (
        <Container>
            <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendLogin();
                        }
                    }}
                    onInput={(v) => {
                        email.current = v.target.value;
                    }}
                ></Input>
            </InputGroup>
            <InputGroup>
                <Label htmlFor="pwd">Pwd</Label>
                <Input
                    type="password"
                    id="pwd"
                    name="pwd"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendLogin();
                        }
                    }}
                    onInput={(v) => {
                        pwd.current = v.target.value;
                    }}
                ></Input>
            </InputGroup>
            <Submit type="button" onClick={sendLogin}>
                {' '}
                Login{' '}
            </Submit>
        </Container>
    );
};

export default LoginComponent;
