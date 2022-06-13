import React from 'react';
import MainNav from 'components/MainNav';

function MainPage() {
    return (
        <>
            <MainNav></MainNav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav
                        className="sb-sidenav accordion sb-sidenav-dark"
                        id="sidenavAccordion"
                    >
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">
                                    Core
                                </div>
                                <a className="nav-link" href="index.html">
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-tachometer-alt"></i>
                                    </div>
                                    Dashboard
                                </a>
                                <div className="sb-sidenav-menu-heading">
                                    Interface
                                </div>
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseLayouts"
                                    aria-expanded="false"
                                    aria-controls="collapseLayouts"
                                >
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-columns"></i>
                                    </div>
                                    Layouts
                                    <div className="sb-sidenav-collapse-arrow">
                                        <i className="fas fa-angle-down"></i>
                                    </div>
                                </a>
                                <div
                                    className="collapse"
                                    id="collapseLayouts"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion"
                                >
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <a
                                            className="nav-link"
                                            href="layout-static.html"
                                        >
                                            Static Navigation
                                        </a>
                                        <a
                                            className="nav-link"
                                            href="layout-sidenav-light.html"
                                        >
                                            Light Sidenav
                                        </a>
                                    </nav>
                                </div>
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapsePages"
                                    aria-expanded="false"
                                    aria-controls="collapsePages"
                                >
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-book-open"></i>
                                    </div>
                                    Pages
                                    <div className="sb-sidenav-collapse-arrow">
                                        <i className="fas fa-angle-down"></i>
                                    </div>
                                </a>
                                <div
                                    className="collapse"
                                    id="collapsePages"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#sidenavAccordion"
                                >
                                    <nav
                                        className="sb-sidenav-menu-nested nav accordion"
                                        id="sidenavAccordionPages"
                                    >
                                        <a
                                            className="nav-link collapsed"
                                            href="#"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#pagesCollapseAuth"
                                            aria-expanded="false"
                                            aria-controls="pagesCollapseAuth"
                                        >
                                            Authentication
                                            <div className="sb-sidenav-collapse-arrow">
                                                <i className="fas fa-angle-down"></i>
                                            </div>
                                        </a>
                                        <div
                                            className="collapse"
                                            id="pagesCollapseAuth"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#sidenavAccordionPages"
                                        >
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a
                                                    className="nav-link"
                                                    href="login.html"
                                                >
                                                    Login
                                                </a>
                                                <a
                                                    className="nav-link"
                                                    href="register.html"
                                                >
                                                    Register
                                                </a>
                                                <a
                                                    className="nav-link"
                                                    href="password.html"
                                                >
                                                    Forgot Password
                                                </a>
                                            </nav>
                                        </div>
                                        <a
                                            className="nav-link collapsed"
                                            href="#"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#pagesCollapseError"
                                            aria-expanded="false"
                                            aria-controls="pagesCollapseError"
                                        >
                                            Error
                                            <div className="sb-sidenav-collapse-arrow">
                                                <i className="fas fa-angle-down"></i>
                                            </div>
                                        </a>
                                        <div
                                            className="collapse"
                                            id="pagesCollapseError"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#sidenavAccordionPages"
                                        >
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a
                                                    className="nav-link"
                                                    href="401.html"
                                                >
                                                    401 Page
                                                </a>
                                                <a
                                                    className="nav-link"
                                                    href="404.html"
                                                >
                                                    404 Page
                                                </a>
                                                <a
                                                    className="nav-link"
                                                    href="500.html"
                                                >
                                                    500 Page
                                                </a>
                                            </nav>
                                        </div>
                                    </nav>
                                </div>
                                <div className="sb-sidenav-menu-heading">
                                    Addons
                                </div>
                                <a className="nav-link" href="charts.html">
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-chart-area"></i>
                                    </div>
                                    Charts
                                </a>
                                <a className="nav-link" href="tables.html">
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-table"></i>
                                    </div>
                                    Tables
                                </a>
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            <div className="small">Logged in as:</div>
                            Start Bootstrap
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Dashboard</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">
                                    Dashboard
                                </li>
                            </ol>
                            <div className="row">
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-body">
                                            Primary Card
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a
                                                className="small text-white stretched-link"
                                                href="#"
                                            >
                                                View Details
                                            </a>
                                            <div className="small text-white">
                                                <i className="fas fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-warning text-white mb-4">
                                        <div className="card-body">
                                            Warning Card
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a
                                                className="small text-white stretched-link"
                                                href="#"
                                            >
                                                View Details
                                            </a>
                                            <div className="small text-white">
                                                <i className="fas fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-success text-white mb-4">
                                        <div className="card-body">
                                            Success Card
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a
                                                className="small text-white stretched-link"
                                                href="#"
                                            >
                                                View Details
                                            </a>
                                            <div className="small text-white">
                                                <i className="fas fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-danger text-white mb-4">
                                        <div className="card-body">
                                            Danger Card
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a
                                                className="small text-white stretched-link"
                                                href="#"
                                            >
                                                View Details
                                            </a>
                                            <div className="small text-white">
                                                <i className="fas fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-chart-area me-1"></i>
                                            Area Chart Example
                                        </div>
                                        <div className="card-body">
                                            <canvas
                                                id="myAreaChart"
                                                width="100%"
                                                height="40"
                                            ></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-chart-bar me-1"></i>
                                            Bar Chart Example
                                        </div>
                                        <div className="card-body">
                                            <canvas
                                                id="myBarChart"
                                                width="100%"
                                                height="40"
                                            ></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">
                                    Copyright &copy; Your Website 2022
                                </div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default MainPage;
