import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Img_404 from '../../assets/img/error-404-monochrome.svg';
import { Page_Container } from '../styles/styled';

export function Page404() {
    return (
        <Container as={Page_Container}>
            <img className="mb-4 img-error" src={Img_404} alt="404" />
            <p className="lead">
                This requested URL was not found on this server.
            </p>
            <Link to="/admin">Return to Dashboard</Link>
        </Container>
    );
}
