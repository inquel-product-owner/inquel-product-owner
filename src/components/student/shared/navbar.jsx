import React, { Component } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import logo from "../../../assets/Iq-labs-01.svg";
import userpic from "../../../assets/user-v1.png";
import { baseUrl, accountsUrl, studentUrl } from "../../../shared/baseUrl";
import { Logout } from "../../shared/handleLogout";
import { connect } from "react-redux";
import store from "../../../redux/store";

const mapStateToProps = (state) => ({
    data: state.user.profile,
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedOut: false };
        this.url = baseUrl + accountsUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    loadProfileData = () => {
        fetch(`${baseUrl + studentUrl}/student/profile/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    store.dispatch({ type: "PROFILE", payload: result.data });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        if (this.props.data === null) {
            this.loadProfileData();
        }
    };

    handleLogout = () => {
        fetch(`${this.url}/logout/`, {
            headers: this.headers,
            method: "POST",
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.clear();
                this.setState({
                    isLoggedOut: true,
                });
                store.dispatch({ type: "PROFILE", payload: null });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        if (this.state.isLoggedOut) {
            return <Redirect to="/student/login" />;
        }
        return (
            <>
                <Logout path="student" />
                <Navbar
                    collapseOnSelect
                    expand="md"
                    variant="light"
                    className="shadow-sm fixed-top bg-white justify-content-center"
                >
                    <div className="row align-items-center w-100">
                        <div className="col-4 pl-0">
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
                        </div>

                        <div className="col-4 d-none d-md-block">
                            <h5 className="primary-text text-center font-weight-bold-600 mb-0 text-truncate">
                                {this.props.name}
                            </h5>
                        </div>

                        <Navbar.Toggle
                            aria-controls="responsive-navbar-nav"
                            className="ml-auto"
                        />

                        <div className="col-md-4 px-0">
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
                                                    this.props.data !== null
                                                        ? this.props.data
                                                              .profile_link &&
                                                          this.props.data
                                                              .profile_link !==
                                                              null
                                                            ? this.props.data
                                                                  .profile_link
                                                            : userpic
                                                        : userpic
                                                }
                                                alt={
                                                    this.props.data !== null
                                                        ? this.props.data
                                                              .username
                                                        : ""
                                                }
                                                className="profile-img-circle mr-1 mb-1"
                                            />{" "}
                                            {this.props.data !== null
                                                ? this.props.data.username
                                                : ""}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                as={Link}
                                                to="/student/profile"
                                            >
                                                <i className="fas fa-user mr-2"></i>{" "}
                                                My Profile
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item
                                                onClick={this.handleLogout}
                                            >
                                                <i className="fas fa-sign-out-alt mr-2"></i>{" "}
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    </div>
                </Navbar>
            </>
        );
    }
}

export default connect(mapStateToProps)(Header);
