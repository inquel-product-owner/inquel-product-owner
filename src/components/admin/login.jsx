import React, { Component } from "react";
import { Navbar, Spinner, Alert } from "react-bootstrap";
import logo from "../../assets/Iq-labs-01.svg";
import { Link, Redirect } from "react-router-dom";
import { baseUrl, adminPathUrl, accountsUrl } from "../../shared/baseUrl.js";
import storeDispatch from "../../redux/dispatch";
import { RESET_STATE } from "../../redux/action";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",

            errorMsg: "",
            showLoader: false,
            showErrorAlert: false,
            showPassword: false,
        };
        this.url = baseUrl + adminPathUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    setLocalStorage = (data) => {
        localStorage.clear();
        storeDispatch(RESET_STATE);

        localStorage.setItem("Inquel-Auth", `Token ${data.token}`);

        this.setState({
            showLoader: false,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            errorMsg: "",
            showLoader: true,
            showErrorAlert: false,
        });

        fetch(`${this.url}/login/`, {
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
                if (result.sts === true) {
                    if (localStorage.getItem("Authorization")) {
                        fetch(`${baseUrl + accountsUrl}/logout/`, {
                            headers: this.headers,
                            method: "POST",
                        })
                            .then((res) => res.json())
                            .then((results) => {
                                if (results.sts === true) {
                                    this.setLocalStorage(result);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                this.setState({
                                    errorMsg: "Something went wrong!",
                                    showErrorAlert: true,
                                    showLoader: false,
                                });
                            });
                    } else {
                        this.setLocalStorage(result);
                    }
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    showLoader: false,
                });
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
                <Navbar className="secondary-bg py-2 px-4 sticky-top">
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </Navbar.Brand>
                </Navbar>
                <div className="login-reg-section">
                    <div className="container py-5">
                        <div className="row justify-content-center align-items-center w-100">
                            <div className="col-lg-4 col-md-6 px-0">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h4 className="primary-text mb-4">
                                            ADMIN LOGIN
                                        </h4>
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
                                                    name="username"
                                                    id="username"
                                                    className="form-control form-shadow form-control-lg"
                                                    onChange={this.handleInput}
                                                    value={this.state.username}
                                                    placeholder="Username"
                                                    autoFocus
                                                    required
                                                />
                                            </div>
                                            <div className="form-group mb-4">
                                                <label htmlFor="password">
                                                    Password
                                                </label>
                                                <div
                                                    className="input-group form-shadow overflow-hidden"
                                                    style={{
                                                        borderRadius: "6px",
                                                    }}
                                                >
                                                    <input
                                                        type={
                                                            this.state
                                                                .showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="password"
                                                        id="password"
                                                        className="form-control form-control-lg"
                                                        onChange={
                                                            this.handleInput
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
                                                    className="btn btn-primary btn-block shadow-none"
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
                    <footer className="primary-bg py-4">
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
                                        <Link
                                            to="/admin"
                                            className="text-white"
                                        >
                                            <i className="fab fa-facebook-f mr-4"></i>
                                        </Link>
                                        <Link
                                            to="/admin"
                                            className="text-white"
                                        >
                                            <i className="fab fa-twitter mr-4"></i>
                                        </Link>
                                        <Link
                                            to="/admin"
                                            className="text-white"
                                        >
                                            <i className="fab fa-instagram mr-4"></i>
                                        </Link>
                                        <Link
                                            to="/admin"
                                            className="text-white"
                                        >
                                            <i className="fab fa-linkedin-in mr-4"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </>
        );
    }
}

export default AdminLogin;
