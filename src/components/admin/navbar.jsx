import React, { Component } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import logo from "../../assets/IQ_Labs_V1.png";
import userpic from "../../assets/user.png";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedOut: false };
    }

    handleLogout = () => {
        localStorage.removeItem("Inquel-Auth");
        this.setState({
            isLoggedOut: true,
        });
    };

    render() {
        if (this.state.isLoggedOut) {
            return <Redirect to="/login" />;
        }
        return (
            <Navbar
                collapseOnSelect
                expand="md"
                variant="light"
                className="shadow-sm fixed-top bg-white"
            >
                <Navbar.Brand className="d-flex mr-0">
                    <button
                        className="btn btn-outline-secondary btn-sm d-block d-md-none mr-2"
                        onClick={this.props.togglenav}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <Link to="/">
                        <img src={logo} alt="Logo" width="40" height="40" />
                    </Link>
                </Navbar.Brand>
                <div className="mx-auto">
                    <h5 className="mb-0">{this.props.name}</h5>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    style={{ flexGrow: "0" }}
                >
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
                                <Dropdown.Item onClick={this.handleLogout}>
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
