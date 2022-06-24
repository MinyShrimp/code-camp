import { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { BatteryAlert } from '@material-ui/icons';
import { Button, Input, Typography } from '@material-ui/core';

import { LogicHeader } from '../header';
import {
    CardBody,
    CardFooter,
    CardStyle,
    Container,
    InputGroup,
    Label,
} from './style';
import { sendGraphQL } from '../sendGraphQL';
import { useNavigate } from 'react-router-dom';

export function LogicLoginIndex() {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('');
    const navi = useNavigate();

    const input = useRef<{ email: string; pwd: string }>({
        email: '',
        pwd: '',
    });

    const submit = async () => {
        try {
            const { data, message } = await sendGraphQL({
                query: `mutation { Login( loginInput: { email: "${input.current.email}", pwd: "${input.current.pwd}" } ) }`,
            });

            if (data) {
                localStorage.setItem('access_token', data['Login']);
                navi('/admin/entity/user');
            } else {
                setShowAlert(true);
                setAlertMsg(message as string);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <LogicHeader entityName="Login" />
            <Container>
                <CardStyle>
                    <Typography
                        variant="h3"
                        className="mb-3"
                        style={{ textAlign: 'center' }}
                    >
                        {' '}
                        Login{' '}
                    </Typography>
                    <CardBody>
                        {showAlert ? (
                            <Alert
                                variant="warning"
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <BatteryAlert />
                                {alertMsg}
                            </Alert>
                        ) : (
                            <></>
                        )}

                        <InputGroup>
                            <Label htmlFor="email">
                                <Typography>Email</Typography>
                            </Label>
                            <Input
                                style={{ width: '100%' }}
                                id="email"
                                name="email"
                                type="email"
                                onChange={(e) => {
                                    input.current.email = e.target.value;
                                }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="pwd">
                                <Typography>Password</Typography>
                            </Label>
                            <Input
                                style={{ width: '100%' }}
                                id="pwd"
                                name="pwd"
                                type="password"
                                onChange={(e) => {
                                    input.current.pwd = e.target.value;
                                }}
                            />
                        </InputGroup>
                        <CardFooter>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={submit}
                            >
                                Submit
                            </Button>
                        </CardFooter>
                    </CardBody>
                </CardStyle>
            </Container>
        </>
    );
}

// import { LogicFactory } from '../logic_factory';

// export const LogicLoginIndex = LogicFactory.createIndex({
//     name: 'Login',
// });
