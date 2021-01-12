import React, { Component } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../../shared/loadingComponent";

class EmailVerification extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: "",
            isValid: false,
            validToken: true,
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            errorMsg: "",
            successMsg: "",
            redirectLogin: false,
            showPassword: false,
            showConfirmPassword: false,
            page_loading: true,
        };
    }

    componentDidMount = () => {
        document.title = "Account verification | IQLabs";

        var token = this.props.match.params.tokenId;
        var url = baseUrl + hodUrl;
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        fetch(`${url}/hod/activate/teacher/?activation_token=${token}`, {
            headers: headers,
            method: "GET",
        })
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

    handleFirstName = (event) => {
        this.setState({
            firstName: event.target.value,
        });
    };

    handleLastName = (event) => {
        this.setState({
            lastName: event.target.value,
        });
    };

    handleusername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
        });
        if (
            !this.state.firstName ||
            !this.state.lastName ||
            !this.state.username ||
            !this.state.password ||
            !this.state.confirmPassword
        ) {
            this.setState({
                errorMsg: "All the fields are required",
                isValid: false,
                showErrorAlert: true,
            });
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errorMsg: "Password doesn't match",
                isValid: false,
                showErrorAlert: true,
            });
        } else {
            this.setState({
                showLoader: true,
            });
            var token = this.props.match.params.tokenId;
            var url = baseUrl + hodUrl;
            var headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            fetch(`${url}/hod/activate/teacher/`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({
                    token: token,
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    username: this.state.username,
                    new_password: this.state.password,
                    confirm_password: this.state.confirmPassword,
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
                    console.log(result);
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
            return <Redirect to="/teacher/login" />;
        }
        return (
            <div className="container-fluid ">
                {this.state.page_loading ? (
                    <Loading />
                ) : (
                    <div
                        className="row justify-content-center py-3 align-items-center"
                        style={{ minHeight: "100vh" }}
                    >
                        <div className="col-md-4">
                            {!this.state.validToken ? (
                                <div className="card shadow">
                                    <div
                                        className="card-body text-center"
                                        style={{ padding: "4rem" }}
                                    >
                                        <h2 className="display-4 text-danger mb-3">
                                            <i className="fas fa-times-circle"></i>
                                        </h2>
                                        <p className="h3 mb-0">
                                            Invalid activation link!
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="card shadow">
                                    <div className="card-body">
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
                                            show={this.state.showSuccessAlert}
                                            onClose={() => {
                                                this.setState({
                                                    showSuccessAlert: false,
                                                });
                                            }}
                                            dismissible
                                        >
                                            {this.state.successMsg}
                                        </Alert>

                                        <h3 className="primary-text">
                                            Teacher Activation
                                        </h3>
                                        <p className="small mb-4">
                                            Please update your details
                                        </p>
                                        <form onSubmit={this.handleSubmit} autoComplete="off">
                                            <div className="form-group ">
                                                <label htmlFor="firstname">
                                                    First Name:
                                                </label>

                                                <input
                                                    type="text"
                                                    name="firstname"
                                                    value={this.state.firstName}
                                                    onChange={
                                                        this.handleFirstName
                                                    }
                                                    className="form-control form-shadow"
                                                    placeholder="Enter First Name"
                                                    id="firstname"
                                                />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="lastname">
                                                    Last Name:
                                                </label>

                                                <input
                                                    type="text"
                                                    name="lastname"
                                                    value={this.state.lastName}
                                                    onChange={
                                                        this.handleLastName
                                                    }
                                                    className="form-control form-shadow"
                                                    placeholder="Enter Last Name"
                                                    id="lastname"
                                                />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="username">
                                                    Username:
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={this.state.username}
                                                    onChange={
                                                        this.handleusername
                                                    }
                                                    className="form-control form-shadow"
                                                    placeholder="Enter username"
                                                    id="username"
                                                />
                                            </div>

                                            <div className="form-group ">
                                                <label htmlFor="password">
                                                    Enter Password:
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
                                                            this.handlePassword
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
                                                            onClick={
                                                                this
                                                                    .showPassword
                                                            }
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="confirm_password">
                                                    Confirm Password:
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
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-primary btn-block"
                                                onClick={this.validate}
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
                                                    ""
                                                )}
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default EmailVerification;
