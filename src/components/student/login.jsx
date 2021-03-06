import React, { Component } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import {
    baseUrl,
    accountsUrl,
    adminPathUrl,
    studentUrl,
} from "../../shared/baseUrl.js";
import { ForgotPasswordModal } from "../common/forgotPassword";
import storeDispatch from "../../redux/dispatch";
import { PROFILE, RESET_STATE } from "../../redux/action/index.js";
import logo from "../../assets/logo-white.png";

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
        this.redirect = new URLSearchParams(this.props.location.search).get(
            "redirect"
        );
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

    loadProfileData = (token) => {
        fetch(`${baseUrl + studentUrl}/student/profile/`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    storeDispatch(PROFILE, result.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    setLocalStorage = async (data) => {
        localStorage.clear();
        storeDispatch(RESET_STATE);

        localStorage.setItem("Authorization", `Token ${data.token}`);
        localStorage.setItem("is_student", data.is_student);
        await this.loadProfileData(data.token);

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
            if (this.redirect) {
                return <Redirect to={this.redirect} />;
            } else {
                return <Redirect to="/dashboard" />;
            }
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

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="container my-5">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-9">
                                <div className="card shadow-sm overflow-hidden">
                                    <div className="row align-items-center">
                                        {/* ----- left column ----- */}
                                        <div className="col-md-6 primary-bg pr-md-0">
                                            <div className="card-body">
                                                <div className="row justify-content-center my-3 my-md-5">
                                                    <div className="col-sm-11">
                                                        <div
                                                            className="row"
                                                            style={{
                                                                marginBottom:
                                                                    "35px",
                                                            }}
                                                        >
                                                            <div className="col-6">
                                                                <Link to="/">
                                                                    <img
                                                                        src={
                                                                            logo
                                                                        }
                                                                        alt="IQ Labs Academy"
                                                                        className="img-fluid"
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="text-white">
                                                            <h2 className="mb-3">
                                                                Welcome back!
                                                            </h2>
                                                            <p
                                                                style={{
                                                                    lineHeight:
                                                                        "30px",
                                                                    marginBottom:
                                                                        "40px",
                                                                }}
                                                            >
                                                                Enter your
                                                                credentials to
                                                                continue your
                                                                learning, or
                                                                login using
                                                                social media to
                                                                get quick access
                                                            </p>
                                                            <button className="btn btn-outline-light btn-block shadow-none">
                                                                <i className="fab fa-google mr-1"></i>{" "}
                                                                Continue with
                                                                Google
                                                            </button>
                                                            <button className="btn btn-outline-light btn-block shadow-none">
                                                                <i className="fab fa-facebook-f mr-1"></i>{" "}
                                                                Continue with
                                                                Faceboook
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ----- right column ----- */}
                                        <div className="col-md-6 pl-md-0">
                                            <div className="card-body">
                                                <div className="row justify-content-center">
                                                    <div className="col-sm-11">
                                                        <h4 className="primary-text">
                                                            Login
                                                        </h4>
                                                        <p className="small text-muted">
                                                            Enjoy unlimited
                                                            learning | Enjoy 7
                                                            days Free Trails
                                                        </p>

                                                        <Alert
                                                            variant="danger"
                                                            show={
                                                                this.state
                                                                    .showErrorAlert
                                                            }
                                                            onClose={() => {
                                                                this.setState({
                                                                    showErrorAlert: false,
                                                                });
                                                            }}
                                                            dismissible
                                                        >
                                                            {
                                                                this.state
                                                                    .errorMsg
                                                            }
                                                        </Alert>

                                                        <form
                                                            onSubmit={
                                                                this
                                                                    .handleSubmit
                                                            }
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
                                                                    onChange={
                                                                        this
                                                                            .handleInput
                                                                    }
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .username
                                                                    }
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
                                                                        borderRadius:
                                                                            "6px",
                                                                    }}
                                                                >
                                                                    <input
                                                                        type={
                                                                            this
                                                                                .state
                                                                                .showPassword
                                                                                ? "text"
                                                                                : "password"
                                                                        }
                                                                        name="password"
                                                                        id="password"
                                                                        className="form-control form-control-lg"
                                                                        onChange={
                                                                            this
                                                                                .handleInput
                                                                        }
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .password
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
                                                                            {this
                                                                                .state
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
                                                                            this
                                                                                .toggleModal
                                                                        }
                                                                        className="primary-text"
                                                                    >
                                                                        Forgot
                                                                        password?
                                                                    </Link>
                                                                </p>
                                                            </div>
                                                            <div className="form-group">
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-primary btn-block shadow-none"
                                                                >
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
                                                                        <>
                                                                            LOGIN{" "}
                                                                            <i className="fas fa-sign-in-alt ml-2"></i>
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </form>
                                                        <p className="text-center small mb-0">
                                                            Don't have an
                                                            account?{" "}
                                                            <Link
                                                                to="/register"
                                                                className="primary-text font-weight-bold"
                                                            >
                                                                Join Inquel
                                                                Online Learning
                                                            </Link>{" "}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default StudentLogin;

// {/* <div
//     className="d-flex justify-content-center align-items-center"
//     style={{
//         minHeight: "80vh",
//     }}
// >
//     <div className="container py-5">
//         <div className="row justify-content-center align-items-center">
//             <div className="col-lg-4 col-md-6">
//                 <div className="card shadow py-2">
//                     <div className="card-body ">
//                         <h4 className="primary-text">STUDENT LOGIN</h4>
//                         <p className="small text-muted">
//                             Enjoy unlimited learning | Enjoy 7 days Free Trails
//                         </p>

//                         <Alert
//                             variant="danger"
//                             show={this.state.showErrorAlert}
//                             onClose={() => {
//                                 this.setState({
//                                     showErrorAlert: false,
//                                 });
//                             }}
//                             dismissible
//                         >
//                             {this.state.errorMsg}
//                         </Alert>

//                         <form onSubmit={this.handleSubmit} autoComplete="off">
//                             <div className="form-group">
//                                 <label htmlFor="username">Username</label>
//                                 <input
//                                     type="text"
//                                     name="username"
//                                     id="username"
//                                     className="form-control form-shadow form-control-lg"
//                                     onChange={this.handleInput}
//                                     value={this.state.username}
//                                     placeholder="Username"
//                                     autoFocus
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="password">Password</label>
//                                 <div
//                                     className="input-group form-shadow"
//                                     style={{
//                                         borderRadius: "6px",
//                                     }}
//                                 >
//                                     <input
//                                         type={
//                                             this.state.showPassword
//                                                 ? "text"
//                                                 : "password"
//                                         }
//                                         name="password"
//                                         id="password"
//                                         className="form-control form-control-lg"
//                                         onChange={this.handleInput}
//                                         value={this.state.password}
//                                         placeholder="**********"
//                                         required
//                                     />
//                                     <div className="input-group-append">
//                                         <button
//                                             className="btn btn-link btn-sm bg-white shadow-none"
//                                             type="button"
//                                             id="button-addon2"
//                                             onClick={this.showPassword}
//                                         >
//                                             {this.state.showPassword ? (
//                                                 <i className="far fa-eye-slash"></i>
//                                             ) : (
//                                                 <i className="far fa-eye"></i>
//                                             )}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <p className="small mb-0 text-right">
//                                     {" "}
//                                     <Link
//                                         to="#"
//                                         onClick={this.toggleModal}
//                                         className="primary-text"
//                                     >
//                                         Forgot password?
//                                     </Link>
//                                 </p>
//                             </div>
//                             <div className="form-group">
//                                 <button
//                                     type="submit"
//                                     className="btn btn-primary btn-block shadow-none"
//                                 >
//                                     {this.state.showLoader ? (
//                                         <Spinner
//                                             as="span"
//                                             animation="border"
//                                             size="sm"
//                                             role="status"
//                                             aria-hidden="true"
//                                             className="mr-2"
//                                         />
//                                     ) : (
//                                         <>
//                                             LOGIN{" "}
//                                             <i className="fas fa-sign-in-alt ml-2"></i>
//                                         </>
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                         <p className="small text-center mb-2">or</p>
//                         <div className="d-flex justify-content-center mb-3">
//                             <button className="btn btn-primary btn-sm mr-3">
//                                 <i className="fab fa-google"></i>
//                             </button>
//                             <button className="btn btn-primary btn-sm">
//                                 <i className="fab fa-facebook"></i>
//                             </button>
//                         </div>
//                         <p className="text-center small mb-0">
//                             Don't have an account?{" "}
//                             <Link
//                                 to="/register"
//                                 className="primary-text font-weight-bold"
//                             >
//                                 Join Inquel Online Learning
//                             </Link>{" "}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>; */}
