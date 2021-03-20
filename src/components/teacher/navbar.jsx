import React, { Component } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import logo from "../../assets/IQ_Labs_V5.png";
import userpic from "../../assets/user-v1.png";
import { baseUrl, accountsUrl, teacherUrl } from "../../shared/baseUrl";
import { Logout } from "../sharedComponents/handleLogout";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], isLoggedOut: false };
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        fetch(`${this.url}/teacher/profile/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        data: result.data,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleLogout = () => {
        var url = baseUrl + accountsUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        fetch(`${url}/logout/`, {
            headers: headers,
            method: "POST",
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.clear();
                this.setState({
                    isLoggedOut: true,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        if (this.state.isLoggedOut) {
            return <Redirect to="/teacher/login" />;
        }
        return (
            <>
                <Logout path="teacher" />
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
                            <img src={logo} alt="Logo" />
                        </Link>
                    </Navbar.Brand>
                    <div className="mx-auto">
                        <h5 className="mb-0 primary-text font-weight-bold">
                            {this.props.name}
                        </h5>
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
                                    className="bg-white border-0 nav-link shadow-none"
                                    id="dropdown-basic"
                                >
                                    <img
                                        src={
                                            this.state.data.length !== 0
                                                ? this.state.data
                                                      .profile_link !== null
                                                    ? this.state.data
                                                          .profile_link
                                                    : userpic
                                                : userpic
                                        }
                                        alt="User pic"
                                        width="25"
                                        className="profile-pic mr-1 mb-1"
                                    />{" "}
                                    {this.state.data.length !== 0
                                        ? this.state.data.username
                                        : ""}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        as={Link}
                                        to="/teacher/profile"
                                    >
                                        <i className="fas fa-user mr-2"></i> My
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={this.handleLogout}>
                                        <i className="fas fa-sign-out-alt mr-2"></i>{" "}
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

export default Header;
