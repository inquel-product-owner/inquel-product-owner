import React from "react";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import { baseUrl, accountsUrl } from "../shared/baseUrl.js";
import Loading from "./sharedComponents/loader";
import logo from "../assets/IQ_Labs_V5.png";

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            validToken: true,
            page_loading: true,
            showPassword: false,
            showConfirmPassword: false,
            redirectLogin: false,
        };
        this.authToken = this.props.match.params.authToken;
        this.url = baseUrl + accountsUrl;
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }

    componentDidMount = () => {
        document.title = "Forgot password | IQLabs";

        fetch(
            `${this.url}/resetpassword/?reset_password_token=${this.authToken}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        validToken: true,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        validToken: false,
                        page_loading: false,
                    });
                }
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handlePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });
        if (!this.state.password || !this.state.confirmPassword) {
            this.setState({
                errorMsg: "All the fields are required",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errorMsg: "Password doesn't match",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            fetch(`${this.url}/resetpassword/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    password: this.state.password,
                    confirm_password: this.state.confirmPassword,
                    reset_password_token: this.authToken,
                }),
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.sts === true) {
                        this.setState({
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                        });
                        setTimeout(() => {
                            this.setState({
                                redirectLogin: true,
                            });
                        }, 3000);
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
                });
        }
    };

    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    showConfirmPassword = () => {
        this.setState({
            showConfirmPassword: !this.state.showConfirmPassword,
        });
    };

    render() {
        if (this.state.redirectLogin) {
            return <Redirect to="/" />;
        }
        return (
            <div className="section">
                <div className="container">
                    {this.state.page_loading ? (
                        <Loading />
                    ) : (
                        <div
                            className="row justify-content-center align-items-center"
                            style={{ minHeight: "65vh" }}
                        >
                            <div className="col-md-5">
                                {!this.state.validToken ? (
                                    <div className="card shadow">
                                        <div
                                            className="card-body text-center"
                                            style={{ padding: "4rem" }}
                                        >
                                            <h2 className="display-4 text-danger mb-3">
                                                <i className="fas fa-times-circle"></i>
                                            </h2>
                                            <p className="h4 mb-0">
                                                Invalid forgot password link!
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card shadow-sm">
                                        <div className="card-header">
                                            <div className="text-center">
                                                <img
                                                    src={logo}
                                                    alt="IQLABS academy logo"
                                                    width="100"
                                                    height="auto"
                                                />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h6 className="primary-text mb-3">
                                                Forgot password
                                            </h6>
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
                                            <Alert
                                                variant="success"
                                                show={
                                                    this.state.showSuccessAlert
                                                }
                                                onClose={() => {
                                                    this.setState({
                                                        showSuccessAlert: false,
                                                    });
                                                }}
                                                dismissible
                                            >
                                                {this.state.successMsg}
                                            </Alert>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group ">
                                                    <label htmlFor="password">
                                                        New Password
                                                    </label>

                                                    <div
                                                        className="input-group form-shadow"
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
                                                            className="form-control"
                                                            onChange={
                                                                this
                                                                    .handlePassword
                                                            }
                                                            value={
                                                                this.state
                                                                    .password
                                                            }
                                                            placeholder="**********"
                                                            required
                                                        />
                                                        <div className="input-group-append">
                                                            <button
                                                                className="btn btn-link btn-sm bg-white shadow-none"
                                                                type="button"
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
                                                    <label htmlFor="confirm_password">
                                                        Confirm Password
                                                    </label>

                                                    <div
                                                        className="input-group form-shadow"
                                                        style={{
                                                            borderRadius: "6px",
                                                        }}
                                                    >
                                                        <input
                                                            type={
                                                                this.state
                                                                    .showConfirmPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            name="confirm_password"
                                                            id="confirm_password"
                                                            className="form-control"
                                                            onChange={
                                                                this
                                                                    .handleConfirmPassword
                                                            }
                                                            value={
                                                                this.state
                                                                    .confirmPassword
                                                            }
                                                            placeholder="**********"
                                                            required
                                                        />
                                                        <div className="input-group-append">
                                                            <button
                                                                className="btn btn-link btn-sm bg-white shadow-none"
                                                                type="button"
                                                                onClick={
                                                                    this
                                                                        .showConfirmPassword
                                                                }
                                                            >
                                                                {this.state
                                                                    .showConfirmPassword ? (
                                                                    <i className="far fa-eye-slash"></i>
                                                                ) : (
                                                                    <i className="far fa-eye"></i>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block">
                                                        {this.state
                                                            .showLoader ? (
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                                className="mr-2"
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
