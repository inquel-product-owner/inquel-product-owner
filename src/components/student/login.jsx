import React, { Component, useState } from "react";
import { Navbar, Alert, Spinner, Modal } from "react-bootstrap";
import logo from "../../assets/IQ_Labs_V5.png";
import { Link, Redirect } from "react-router-dom";
import { baseUrl, accountsUrl } from "../../shared/baseUrl.js";

function ForgotPasswordModal(props) {
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [showErrorAlert, setErrorAlert] = useState(false);
    const [showSuccessAlert, setSuccessAlert] = useState(false);
    const [showLoader, setLoader] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        var url = baseUrl + accountsUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        setLoader(true);
        setErrorAlert(false);
        setSuccessAlert(false);

        fetch(`${url}/forgotpassword/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                email: email,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts) {
                    setSuccessMsg(result.msg);
                    setSuccessAlert(true);
                    setLoader(false);
                    setTimeout(() => {
                        props.formSubmission(true);
                    }, 2500);
                } else {
                    setErrorMsg(result.msg);
                    setErrorAlert(true);
                    setLoader(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="primary-text h5">
                Forgot password
            </Modal.Header>
            <Modal.Body>
                <Alert
                    variant="danger"
                    show={showErrorAlert}
                    onClose={() => {
                        setErrorAlert(false);
                    }}
                    dismissible
                >
                    {errorMsg}
                </Alert>
                <Alert
                    variant="success"
                    show={showSuccessAlert}
                    onClose={() => {
                        setSuccessAlert(false);
                    }}
                    dismissible
                >
                    {successMsg}
                </Alert>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control borders form-control-lg"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-sm btn-block">
                            {showLoader ? (
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
                            Send Email
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

class StudentLogin extends Component {
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
            showModal: false,
            is_formSubmitted: false,
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

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            errorMsg: "",
            showLoader: true,
            showErrorAlert: false,
        });
        var url = `${baseUrl}${accountsUrl}/login/`;
        fetch(url, {
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
                this.setState({
                    items: result,
                });
                if (result.sts) {
                    localStorage.clear();
                    localStorage.setItem(
                        "Authorization",
                        `Token ${result.token}`
                    );
                    localStorage.setItem("is_student", result.is_student);
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
        document.title = "Login - Student | IQLabs";
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.is_formSubmitted !== this.state.is_formSubmitted &&
            this.state.is_formSubmitted === true
        ) {
            this.setState({
                showModal: !this.state.showModal,
                is_formSubmitted: false,
            });
        }
    };

    formSubmission = (is_formSubmitted) => {
        if (is_formSubmitted) {
            this.setState({
                is_formSubmitted: true,
            });
        }
    };

    render() {
        if (
            localStorage.getItem("Authorization") &&
            localStorage.getItem("is_student")
        ) {
            return <Redirect to="/student" />;
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
                                <div className="card shadow py-2">
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
                                                    name="student_username"
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
                                                    }}
                                                >
                                                    <input
                                                        type={
                                                            this.state
                                                                .showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="student_password"
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
                                        <p className="small text-center mb-2">
                                            or
                                        </p>
                                        <div className="d-flex justify-content-center mb-3">
                                            <div className="col-md-8">
                                                <div className="d-flex">
                                                    <div className="col-6 text-center">
                                                        <button className="btn btn-primary btn-sm">
                                                            <i className="fab fa-google"></i>
                                                        </button>
                                                    </div>
                                                    <div className="col-6 text-center">
                                                        <button className="btn btn-primary btn-sm">
                                                            <i className="fab fa-facebook"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-center small mb-0">
                                            Don't have an account?{" "}
                                            <Link
                                                to=""
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
                                    <Link to="/" className="text-white">
                                        <i className="fab fa-facebook-f mr-4"></i>
                                    </Link>
                                    <Link to="/" className="text-white">
                                        <i className="fab fa-twitter mr-4"></i>
                                    </Link>
                                    <Link to="/" className="text-white">
                                        <i className="fab fa-instagram mr-4"></i>
                                    </Link>
                                    <Link to="/" className="text-white">
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

export default StudentLogin;