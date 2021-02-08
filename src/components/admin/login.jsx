import React, { Component } from "react";
import { Navbar, Spinner, Alert } from "react-bootstrap";
import logo from "../../assets/IQ_Labs_V5.png";
import { Link, Redirect } from "react-router-dom";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl.js";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMsg: "",
            items: [],
            showLoader: false,
            showErrorAlert: false,
            showPassword: false,
        };
    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value });
    };

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            errorMsg: "",
            showLoader: true,
            showErrorAlert: false,
        });
        var url = `${baseUrl}${adminPathUrl}/login/`;
        fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    items: result,
                });
                if (result.sts) {
                    localStorage.clear();
                    localStorage.setItem(
                        "Inquel-Auth",
                        `Token ${result.token}`
                    );
                    localStorage.setItem("Username", result.username);
                    this.setState({
                        showLoader: false,
                    });
                }
                if (!result.sts && result.msg) {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = "Login - Admin | IQLabs";
    };

    render() {
        if (localStorage.getItem("Inquel-Auth")) {
            return <Redirect to="/admin" />;
        }
        return (
            <>
                <Navbar className="secondary-bg py-2 px-4">
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </Navbar.Brand>
                </Navbar>
                <div className="login">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-5">
                                <div className="card shadow py-4">
                                    <div className="card-body ">
                                        <h3 className="primary-text mb-4">
                                            LOGIN
                                        </h3>
                                        <Alert
                                            variant="danger"
                                            show={this.state.showErrorAlert}
                                            onClose={() => {
                                                this.setState({
                                                    showErrorAlert: false,
                                                });
                                            }}
                                            dismissible
                                        >
                                            {this.state.errorMsg}
                                        </Alert>
                                        <form
                                            onSubmit={this.handleSubmit}
                                            autoComplete="off"
                                        >
                                            <div className="form-group">
                                                <label htmlFor="username">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    name="admin_username"
                                                    id="username"
                                                    className="form-control form-shadow form-control-lg"
                                                    onChange={
                                                        this.changeUsername
                                                    }
                                                    value={this.state.username}
                                                    placeholder="Username"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group mb-4">
                                                <label htmlFor="password">
                                                    Password
                                                </label>
                                                <div
                                                    className="input-group form-shadow"
                                                    style={{
                                                        borderRadius: "6px",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <input
                                                        type={
                                                            this.state
                                                                .showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="admin_password"
                                                        id="password"
                                                        className="form-control form-control-lg"
                                                        onChange={
                                                            this.changePassword
                                                        }
                                                        value={
                                                            this.state.password
                                                        }
                                                        placeholder="**********"
                                                        required
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            className="btn btn-link btn-sm bg-white shadow-none"
                                                            type="button"
                                                            id="button-addon2"
                                                            onClick={
                                                                this
                                                                    .showPassword
                                                            }
                                                        >
                                                            {this.state
                                                                .showPassword ? (
                                                                <i className="far fa-eye-slash"></i>
                                                            ) : (
                                                                <i className="far fa-eye"></i>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    {this.state.showLoader ? (
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            className="mr-2"
                                                        />
                                                    ) : (
                                                        <>
                                                            LOGIN{" "}
                                                            <i className="fas fa-sign-in-alt ml-2"></i>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="primary-bg p-4">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="mb-3 mb-md-0 text-white text-center text-md-left">
                                    &copy;2020 Inquel inc. Powered By{" "}
                                    <a
                                        href="https://sachirva.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="secondary-text"
                                    >
                                        Sachirva Technology Solutions
                                    </a>
                                </p>
                            </div>
                            <div className="col-md-6 ">
                                <div className="d-flex justify-content-center justify-content-md-end ">
                                    <Link to="/admin" className="text-white">
                                        <i className="fab fa-facebook-f mr-4"></i>
                                    </Link>
                                    <Link to="/admin" className="text-white">
                                        <i className="fab fa-twitter mr-4"></i>
                                    </Link>
                                    <Link to="/admin" className="text-white">
                                        <i className="fab fa-instagram mr-4"></i>
                                    </Link>
                                    <Link to="/admin" className="text-white">
                                        <i className="fab fa-linkedin-in mr-4"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

export default Login;
