import React, { ReactElement, useState } from 'react';
import { Collapse, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavCollapse(props: {
    id: string;
    title: string;
    items: ReactElement;
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Nav.Link
                onClick={() => setOpen(!open)}
                aria-controls={props.id}
                aria-expanded={open}
                className="sb-sidenav-menu-heading"
            >
                {props.title}
            </Nav.Link>
            <Collapse in={open}>
                <div id={props.id} style={{ marginLeft: '1em' }}>
                    {props.items}
                </div>
            </Collapse>
            <hr></hr>
        </>
    );
}

export function IndexBodySide() {
    return (
        <div id="layoutSidenav_nav">
            <Nav
                className="sb-sidenav accordion sb-sidenav-dark"
                id="sidenavAccordion"
            >
                <div
                    className="sb-sidenav-menu"
                    style={{
                        overflowX: 'hidden',
                        overflowY: 'auto',
                    }}
                >
                    <Nav>
                        <NavCollapse
                            id="core-collapse"
                            title="Core"
                            items={
                                <>
                                    <Nav.Link as={Link} to="/">
                                        Dashboard
                                    </Nav.Link>
                                </>
                            }
                        ></NavCollapse>

                        <NavCollapse
                            id="graphql-collapes"
                            title="Graphql"
                            items={
                                <>
                                    <Nav.Link as={Link} to="#">
                                        Authentication
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="#">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="#">
                                        Register
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="#">
                                        Forgot Password
                                    </Nav.Link>
                                </>
                            }
                        ></NavCollapse>

                        <NavCollapse
                            id="entity-collapes"
                            title="Entities"
                            items={
                                <>
                                    <Nav.Link as={Link} to="/entity/user">
                                        User
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/entity/author">
                                        Author
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/entity/publisher">
                                        Publisher
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/entity/book">
                                        Book
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/entity/book/image">
                                        Book Image
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/entity/product">
                                        Product
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/entity/product/category"
                                    >
                                        Product Category
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/entity/product/tag"
                                    >
                                        Product Tag
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/entity/review">
                                        Review
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/entity/payment">
                                        Payment
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/entity/upload">
                                        Upload File
                                    </Nav.Link>
                                </>
                            }
                        ></NavCollapse>

                        <NavCollapse
                            id="page-collapse"
                            title="Redis"
                            items={<></>}
                        ></NavCollapse>

                        <NavCollapse
                            id="page-collapse"
                            title="Pages"
                            items={
                                <>
                                    <Nav.Link as={Link} to="/401">
                                        401 Page
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/404">
                                        404 Page
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/500">
                                        500 Page
                                    </Nav.Link>
                                </>
                            }
                        ></NavCollapse>
                    </Nav>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Code Camp
                </div>
            </Nav>
        </div>
    );
}
