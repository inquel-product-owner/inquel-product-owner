import React, { Component } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { baseUrl, accountsUrl } from "../../shared/baseUrl.js";

class EmailVerification extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            isValid: false,
            validToken: true,
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            errors: "",
            successMsg: "",
        };
    }

    componentDidMount = () => {
        document.title = "Account verification | IQLabs";

        var token = this.props.match.params.tokenId;
        var url = baseUrl + accountsUrl;
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        fetch(`${url}/hod/activate/?activation_token=${token}`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    debugger;
                    this.setState({
                        validToken: true,
                    });
                } else {
                    this.setState({
                        validToken: false,
                    });
                }
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });

        return <Redirect to="/hod/login" />;
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
                errors: "All the fields are required",
                isValid: false,
                showErrorAlert: true,
            });
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errors: "Password doesn't match",
                isValid: false,
                showErrorAlert: true,
            });
        } else {
            this.setState({
                showLoader: true,
            });
            var token = this.props.match.params.tokenId;
            var url = baseUrl + accountsUrl;
            var headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            fetch(`${url}/hod/activate/`, {
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
                    } else {
                        this.setState({
                            errors: result.msg,
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

    render() {
        if (this.state.showSuccessAlert) {
            return <Redirect to="/hod/login" />;
        }
        return (
            <div className="container-fluid ">
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
                                        {this.state.errors}
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
                                        HOD Activation
                                    </h3>
                                    <p className="small mb-4">
                                        Please update your details
                                    </p>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group ">
                                            <label htmlFor="firstname">
                                                First Name:
                                            </label>

                                            <input
                                                type="text"
                                                name="firstname"
                                                value={this.state.firstName}
                                                onChange={this.handleFirstName}
                                                className="form-control shadow-sm"
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
                                                onChange={this.handleLastName}
                                                className="form-control shadow-sm"
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
                                                onChange={this.handleusername}
                                                className="form-control shadow-sm"
                                                placeholder="Enter username"
                                                id="username"
                                            />
                                        </div>

                                        <div className="form-group ">
                                            <label htmlFor="password">
                                                Enter Password:
                                            </label>

                                            <input
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handlePassword}
                                                className="form-control shadow-sm"
                                                placeholder="Enter password"
                                                id="password"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="confirm_password">
                                                Confirm Password:
                                            </label>

                                            <input
                                                type="password"
                                                name="confirm_password"
                                                value={
                                                    this.state.confirmPassword
                                                }
                                                onChange={
                                                    this.handleConfirmPassword
                                                }
                                                className="form-control shadow-sm"
                                                placeholder="Enter confirm password"
                                                id="confirm_password"
                                            />
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
            </div>
        );
    }
}

export default EmailVerification;
