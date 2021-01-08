import React, { Component } from "react";
import { Navbar, Alert } from "react-bootstrap";
import logo from "../../assets/IQ_Labs_V5.png";
import { Link, Redirect } from "react-router-dom";
import { baseUrl, accountsUrl } from "../../shared/baseUrl.js";

class HODLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errortext: "",
            showErrorAlert: false,
            isloggedIn: "false",
            items: [],
        };
    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value });
    };

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = (event) => {
        this.setState({
            errortext: "",
        });
        event.preventDefault();
        var url = `${baseUrl}${accountsUrl}/login/`;
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
                });
                console.log(result);

                if (this.state.items.sts) {
                    localStorage.clear();
                    localStorage.setItem(
                        "Authorization",
                        `Token ${this.state.items.token}`
                    );
                    localStorage.setItem("is_hod", this.state.items.is_hod);
                    this.setState({
                        isloggedIn: true,
                    });
                }
                if (!this.state.items.sts && this.state.items.msg) {
                    this.setState({
                        errortext: this.state.items.msg,
                        showErrorAlert: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        if (
            localStorage.getItem("Authorization") &&
            localStorage.getItem("is_hod")
        ) {
            return <Redirect to="/hod" />;
        }
        return (
            <>
                <Navbar className="secondary-bg py-2 px-4">
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={logo} alt="Logo" width="50" height="50" />
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
                                            Login as HOD
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
                                            {this.state.errortext}
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
                                                    LOGIN{" "}
                                                    <i className="fas fa-sign-in-alt ml-2"></i>
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

export default HODLogin;
