import React, { Component } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo192.png";
import userpic from "../../assets/user.png";

class Header extends Component {
    render() {
        return (
            <Navbar
                collapseOnSelect
                expand="md"
                variant="light"
                className="shadow-sm fixed-top bg-white"
            >
                <Navbar.Brand>
                    <Link to="/">
                        <img src={logo} alt="Logo" width="30" height="30" />
                    </Link>
                </Navbar.Brand>
                <h5 className="mb-0">{this.props.name}</h5>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">
                            <i className="far fa-bell mr-md-3 mr-0 mt-0 mt-md-2"></i>
                        </Nav.Link>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="light"
                                className="bg-white border-0 nav-link"
                                id="dropdown-basic"
                            >
                                <img
                                    src={userpic}
                                    alt="User pic"
                                    width="25"
                                    className="profile-pic mr-1 mb-1"
                                />{" "}
                                Admin
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
