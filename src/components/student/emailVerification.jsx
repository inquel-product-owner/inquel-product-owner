import React, { Component } from "react";
import { Link } from "react-router-dom";
import { baseUrl, accountsUrl } from "../../shared/baseUrl.js";
import Loading from "../../shared/loadingComponent";

class EmailVerify extends Component {
    constructor(props) {
        super(props);
        this.state = { validToken: true, page_loading: true };
    }

    componentDidMount = () => {
        document.title = "Account verification | IQLabs";
        var authToken = this.props.match.params.tokenId;
        var url = baseUrl + accountsUrl;
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        fetch(`${url}/verify/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                token: authToken,
            }),
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

    render() {
        return (
            <div className="section">
                <div className="container">
                    {this.state.page_loading ? (
                        <Loading />
                    ) : (
                        <div
                            className="row justify-content-center align-items-center"
                            style={{ minHeight: "60vh" }}
                        >
                            <div className="col-md-5">
                                <div className="card shadow">
                                    <div className="card-body text-center p-5">
                                        {this.state.validToken ? (
                                            <>
                                                <h2 className="display-4 primary-text mb-3">
                                                    <i className="fas fa-check-circle"></i>
                                                </h2>
                                                <p className="h4 mb-4">
                                                    Your account is verified!
                                                </p>
                                                <Link
                                                    to="/student/login"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="btn btn-primary btn-block">
                                                        Login
                                                    </button>
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <h2 className="display-4 text-danger mb-3">
                                                    <i className="fas fa-times-circle"></i>
                                                </h2>
                                                <p className="h4 mb-0">
                                                    Invalid verification link!
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default EmailVerify;
