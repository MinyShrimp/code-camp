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

const SignupComponent = (props) => {
    const info = useRef({
        email: '',
        name: '',
        pwd: '',
    });
    const history = useHistory();

    const sendSignup = async () => {
        if (
            info.current.name === '' ||
            info.current.email === '' ||
            info.current.pwd === ''
        ) {
            return false;
        }

        const res = await axios.post('http://localhost:3000/graphql', {
            query: `mutation { createUser( signupInput: { name: "${info.current.name}", email: "${info.current.email}", pwd: "${info.current.pwd}" } ) { id } }`,
        });

        const { data, msg } = TransformGraphQLResponse(res);

        if (!data) {
            console.error(msg);
        } else {
            history.push('/admin/resources/UserEntity');
        }
    };

    return (
        <Container>
            <InputGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendSignup();
                        }
                    }}
                    onInput={(v) => {
                        info.current.name = v.target.value;
                    }}
                ></Input>
            </InputGroup>
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
                        info.current.email = v.target.value;
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
                        info.current.pwd = v.target.value;
                    }}
                ></Input>
            </InputGroup>
            <Submit type="button" onClick={sendSignup}>
                {' '}
                Sign Up{' '}
            </Submit>
        </Container>
    );
};

export default SignupComponent;
