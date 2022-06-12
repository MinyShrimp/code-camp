import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';

import {
    LoginCompo,
    InputGroup,
    Label,
    Submit,
    Input,
} from '../styles/user.styled';
import { TransformGraphQLResponse } from '../../../utils/transform-graphql';

const LoginComponent = (props) => {
    const email = useRef('');
    const pwd = useRef('');
    const history = useHistory();

    const sendLogin = async () => {
        if (email === '' || pwd === '') {
            return false;
        }

        const res = await axios.post('http://localhost:3000/graphql', {
            query: `mutation { Login( loginInput: { email: "${email.current}", pwd: "${pwd.current}" } ) }`,
        });

        const { data, msg } = TransformGraphQLResponse(res);

        if (!data) {
            console.error(msg);
        } else {
            const jwt = data.Login;
            window.localStorage.setItem('access_token', jwt);
            history.push('/admin/resources/UserEntity');
        }
    };

    return (
        <LoginCompo>
            <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendSignup();
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
                            sendSignup();
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
        </LoginCompo>
    );
};

export default LoginComponent;
