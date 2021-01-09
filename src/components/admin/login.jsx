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
        };
    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value });
    };

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            errorMsg: "",
            showLoader: true,
            showErrorAlert: false,
        });
        var url = `${baseUrl}${adminPathUrl}/login/`;
        console.log(
            "username: " +
                this.state.username +
                " and " +
                "password " +
                this.state.password
        );
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
                    showLoader: false,
                });
                if (this.state.items.sts) {
                    localStorage.clear();
                    localStorage.setItem(
                        "Inquel-Auth",
                        `Token ${this.state.items.token}`
                    );
                }
                if (!this.state.items.sts && this.state.items.msg) {
                    this.setState({
                        errorMsg: this.state.items.msg,
                        showErrorAlert: true,
                    });
                }
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = "Admin Login | IQLabs";
    };

    render() {
        if (localStorage.getItem("Inquel-Auth")) {
            return <Redirect to="/admin" />;
        }
        return (
            <>
                <Navbar className="secondary-bg py-2 px-4">
                    <Navbar.Brand>
                        <Link to="/admin">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </Navbar.Brand>
                </Navbar>
                <div className="login">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-5">
                                <div
                                    className="card shadow border-0 py-4"
                                    style={{ borderRadius: "8px" }}
                                >
                                    <div className="card-body ">
                                        <h3 className="primary-text">LOGIN</h3>
                                        <p className="small mb-4">
                                            Login as Admin
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
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="username">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    className="form-control shadow border-0 form-control-lg"
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
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className="form-control shadow border-0 form-control-lg"
                                                    onChange={
                                                        this.changePassword
                                                    }
                                                    value={this.state.password}
                                                    placeholder="**********"
                                                    required
                                                />
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
                                    &copy;2020 Inquel inc.Powered By Sachirva
                                    Technology Solutions
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
