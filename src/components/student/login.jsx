import React, { Component } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { baseUrl, accountsUrl, adminPathUrl } from "../../shared/baseUrl.js";
import Footer from "../home/shared/footer";
import TopNavbar from "../home/shared/navbar";
import { ForgotPasswordModal } from "../common/forgotPassword";
import storeDispatch from "../../redux/dispatch";
import { PROFILE } from "../../redux/action/index.js";

class StudentLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",

            errorMsg: "",
            showLoader: false,
            showErrorAlert: false,
            showPassword: false,
            showModal: false,
            is_formSubmitted: false,
        };
        this.url = baseUrl + accountsUrl;
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

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    setLocalStorage = (data) => {
        localStorage.clear();
        storeDispatch(PROFILE, {});
        localStorage.setItem("Authorization", `Token ${data.token}`);
        localStorage.setItem("is_student", data.is_student);

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
                user: "student",
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    // Loggout from all the dashboard if the user is logged in
                    if (localStorage.getItem("Authorization")) {
                        fetch(`${this.url}/logout/`, {
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
                        // Logout the admin if he is logged in
                    } else if (localStorage.getItem("Inquel-Auth")) {
                        var url = baseUrl + adminPathUrl;
                        var authToken = localStorage.getItem("Inquel-Auth");
                        var headers = {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "Inquel-Auth": authToken,
                        };

                        fetch(`${url}/logout/`, {
                            headers: headers,
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
        document.title = "Login - Student | IQLabs";
    };

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showModal: false,
            });
        }, 2500);
    };

    render() {
        if (
            localStorage.getItem("Authorization") &&
            localStorage.getItem("is_student")
        ) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <>
                {this.state.showModal ? (
                    <ForgotPasswordModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        formSubmission={this.formSubmission}
                    />
                ) : (
                    ""
                )}

                <TopNavbar />

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        minHeight: "80vh",
                    }}
                >
                    <div className="container py-5">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-4 col-md-6">
                                <div className="card shadow py-2">
                                    <div className="card-body ">
                                        <h4 className="primary-text">
                                            STUDENT LOGIN
                                        </h4>
                                        <p className="small text-muted">
                                            Enjoy unlimited learning | Enjoy 7
                                            days Free Trails
                                        </p>

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
                                            <div className="form-group">
                                                <label htmlFor="password">
                                                    Password
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
                                                <p className="small mb-0 text-right">
                                                    {" "}
                                                    <Link
                                                        to="#"
                                                        onClick={
                                                            this.toggleModal
                                                        }
                                                        className="primary-text"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </p>
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
                                        <p className="small text-center mb-2">
                                            or
                                        </p>
                                        <div className="d-flex justify-content-center mb-3">
                                            <button className="btn btn-primary btn-sm mr-3">
                                                <i className="fab fa-google"></i>
                                            </button>
                                            <button className="btn btn-primary btn-sm">
                                                <i className="fab fa-facebook"></i>
                                            </button>
                                        </div>
                                        <p className="text-center small mb-0">
                                            Don't have an account?{" "}
                                            <Link
                                                to="/register"
                                                className="primary-text font-weight-bold"
                                            >
                                                Join Inquel Online Learning
                                            </Link>{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </>
        );
    }
}

export default StudentLogin;
