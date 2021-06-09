import React from "react";
import logo from "../../../assets/Iq-labs-01.svg";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function AccountNavbar() {
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            variant="light"
            className="shadow-sm secondary-bg"
        >
            <Navbar.Brand>
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
                id="responsive-navbar-nav"
                style={{ flexGrow: "0" }}
                className="ml-auto"
            >
                <Nav className="align-items-lg-center">
                    <Nav.Link as={Link} to="/" className="mr-2">
                        Features
                    </Nav.Link>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="light"
                            className="secondary-bg border-0 nav-link shadow-none mr-2"
                            id="dropdown-basic"
                        >
                            Study Guide
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu-down">
                            <Dropdown.Item as={Link} to="">
                                Link one
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Nav.Link as={Link} to="/" className="mr-2">
                        Leader Board
                    </Nav.Link>
                    <Nav.Link as={Link} to="/" className="mr-2">
                        Buy a Course
                    </Nav.Link>
                    <Nav.Link as={Link} to="/student/login" className="mr-2">
                        Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/student/register">
                        <button className="btn btn-primary btn-sm">
                            Sign Up
                        </button>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/">
                        <button className="btn btn-primary btn-sm">
                            <i className="fas fa-cart-plus"></i>
                        </button>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AccountNavbar;
