import React, { Component } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import logo from "../../../assets/Iq-labs-01.svg";
import userpic from "../../../assets/user-v1.png";
import { baseUrl, adminPathUrl } from "../../../shared/baseUrl";
import { AdminLogout } from "../../common/modal/idleLogoutModal";
import { connect } from "react-redux";
import storeDispatch from "../../../redux/dispatch";
import { PROFILE, RESET_STATE } from "../../../redux/action";

const mapStateToProps = (state) => ({
    profile: state.user.profile,
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedOut: false };
        this.url = baseUrl + adminPathUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    loadProfileData = () => {
        fetch(`${baseUrl + adminPathUrl}/profile/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    storeDispatch(
                        PROFILE,
                        Object.entries(result.data).length !== 0
                            ? result.data
                            : { username: "inquel_admin" }
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        if (
            this.props.profile &&
            Object.keys(this.props.profile).length === 0
        ) {
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
                storeDispatch(RESET_STATE);

                this.setState({
                    isLoggedOut: true,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        if (this.state.isLoggedOut) {
            return <Redirect to="/admin/login" />;
        }
        return (
            <>
                <AdminLogout path="admin" />
                <Navbar
                    variant="light"
                    className="shadow-sm fixed-top bg-white justify-content-center"
                >
                    <div className="row align-items-center justify-content-between w-100">
                        <div className="col-md-3 col-6 pl-0">
                            <Navbar.Brand className="d-flex align-items-center mr-0">
                                <button
                                    className="btn btn-outline-secondary btn-sm border-0 shadow-none d-block d-md-none mr-1"
                                    onClick={this.props.togglenav}
                                >
                                    <i className="fas fa-bars"></i>
                                </button>
                                <Link to="/">
                                    <img src={logo} alt="Logo" />
                                </Link>
                            </Navbar.Brand>
                        </div>

                        <div className="col-6 d-none d-md-block">
                            <h5 className="text-center primary-text font-weight-bold-600 mb-0 text-truncate">
                                {this.props.name}
                            </h5>
                        </div>

                        <div className="col-md-3 col-6 d-flex justify-content-end pr-0">
                            <Nav>
                                <Nav.Link href="/">
                                    <i className="far fa-bell mr-2 mt-2"></i>
                                </Nav.Link>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="light"
                                        className="bg-white border-0 nav-link shadow-none"
                                        id="dropdown-basic"
                                    >
                                        <img
                                            src={
                                                this.props.profile &&
                                                Object.keys(this.props.profile)
                                                    .length !== 0
                                                    ? this.props.profile
                                                          .profile_link &&
                                                      this.props.profile
                                                          .profile_link !== null
                                                        ? this.props.profile
                                                              .profile_link
                                                        : userpic
                                                    : userpic
                                            }
                                            alt={
                                                this.props.profile &&
                                                Object.keys(this.props.profile)
                                                    .length !== 0
                                                    ? this.props.profile
                                                          .username
                                                    : ""
                                            }
                                            className="profile-img-circle mr-1"
                                        />{" "}
                                        <span className="d-none d-md-inline">
                                            {this.props.profile &&
                                            Object.keys(this.props.profile)
                                                .length !== 0
                                                ? this.props.profile.username
                                                : ""}
                                        </span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="dropdown-menu-down">
                                        <Dropdown.Header className="d-block d-md-none font-weight-bold-600 text-center">
                                            Hi,{" "}
                                            <span className="primary-text">
                                                {this.props.profile &&
                                                Object.keys(this.props.profile)
                                                    .length !== 0
                                                    ? this.props.profile
                                                          .username
                                                    : ""}
                                            </span>
                                        </Dropdown.Header>
                                        <Dropdown.Item
                                            onClick={this.handleLogout}
                                        >
                                            <i className="fas fa-sign-out-alt mr-2"></i>{" "}
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </div>
                    </div>
                </Navbar>
            </>
        );
    }
}

export default connect(mapStateToProps)(Header);
