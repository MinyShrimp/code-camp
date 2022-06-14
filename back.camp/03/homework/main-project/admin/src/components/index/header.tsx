import React from 'react';
import { Nav, NavbarBrand, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function IndexHeader() {
    return (
        <Nav
            className="sb-topnav navbar navbar-expand navbar-dark bg-dark"
            style={{ height: '8vh' }}
        >
            <NavbarBrand className="ps-3" as={Link} to="/">
                MainProject Admin Page
            </NavbarBrand>
            <NavLink
                className="me-lg-4 ms-auto"
                style={{ color: 'var(--bs-gray-100)' }}
                as={Link}
                to="/login"
            >
                {' '}
                Logout{' '}
            </NavLink>
        </Nav>
    );
}
