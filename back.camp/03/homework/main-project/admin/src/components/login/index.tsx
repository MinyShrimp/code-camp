import React, { useRef } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Page_Container } from '../styles/styled';

export function LoginPage() {
    const id = useRef('');
    const pwd = useRef('');
    const navigate = useNavigate();

    const Login = () => {
        console.log(process.env);
        navigate('/', { replace: true });
    };

    return (
        <Container as={Page_Container} style={{ height: '100vh' }}>
            <Card
                style={{
                    width: '30rem',
                    padding: '1rem',
                    boxShadow: '0px 0px 30px 0px var(--bs-primary)',
                }}
            >
                <Card.Body>
                    <div style={{ textAlign: 'center' }}>
                        <h2 className="mb-3 mt-3">Login</h2>
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="id"> ID </Form.Label>
                        <Form.Control
                            type="id"
                            id="id"
                            onChange={(e) => {
                                id.current = e.target.value;
                            }}
                        ></Form.Control>
                    </div>

                    <div className="mb-3">
                        <Form.Label htmlFor="pwd"> Password </Form.Label>
                        <Form.Control
                            type="password"
                            id="pwd"
                            onChange={(e) => {
                                pwd.current = e.target.value;
                            }}
                        ></Form.Control>
                    </div>

                    <div>
                        <Button variant="primary" onClick={Login}>
                            Submit
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
