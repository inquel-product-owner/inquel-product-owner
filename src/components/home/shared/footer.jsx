import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-white.png";

export default function Footer() {
    return (
        <footer className="primary-bg pt-5 pb-4">
            <div className="container">
                <div className="row justify-content-between mb-3">
                    <div className="col-lg-3 col-md-4 mb-3 mb-md-0 d-none d-md-block">
                        <img
                            src={logo}
                            alt="IQ Labs Academy"
                            className="img-fluid mb-4"
                        />
                        <div className="d-flex justify-content-around">
                            <p style={{ fontSize: "20px" }}>
                                <Link to="" className="text-light">
                                    <i className="fab fa-facebook-f"></i>
                                </Link>
                            </p>
                            <p style={{ fontSize: "20px" }}>
                                <Link to="" className="text-light">
                                    <i className="fab fa-twitter"></i>
                                </Link>
                            </p>
                            <p style={{ fontSize: "20px" }}>
                                <Link to="" className="text-light">
                                    <i className="fab fa-linkedin-in"></i>
                                </Link>
                            </p>
                            <p style={{ fontSize: "20px" }}>
                                <Link to="" className="text-light">
                                    <i className="fab fa-instagram"></i>
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8">
                        <div className="row justify-content-end">
                            <div className="col-md-4 mb-3 mb-md-0">
                                <h5 className="font-weight-bold text-light mb-4">
                                    QUICK LINKS
                                </h5>
                                <p className="mb-2">
                                    <Link to="/features" className="text-light">
                                        Features
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="text-light">
                                        Study Guide
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="/catalog" className="text-light">
                                        Buy a Course
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="/leaderboard" className="text-light">
                                        Leader Board
                                    </Link>
                                </p>
                            </div>
                            <div className="col-md-4 mb-3 mb-md-0">
                                <h5 className="font-weight-bold text-light mb-4">
                                    HELP
                                </h5>
                                <p className="mb-2">
                                    <Link to="/register" className="text-light">
                                        Sign Up
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="/login" className="text-light">
                                        Log In
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="text-light">
                                        Help Center
                                    </Link>
                                </p>
                                <p>
                                    <Link to="" className="text-light">
                                        Contact Us
                                    </Link>
                                </p>
                            </div>
                            <div className="col-md-4 mb-3 mb-md-0">
                                <h5 className="font-weight-bold text-light mb-4">
                                    ABOUT
                                </h5>
                                <p className="mb-2">
                                    <Link to="" className="text-light">
                                        Company
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="text-light">
                                        Privacy Policy
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="text-light">
                                        Terms & Conditions
                                    </Link>
                                </p>
                                <p className="mb-0">
                                    <Link to="" className="text-light">
                                        Legal Notice
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center d-md-none d-block">
                    <div className="col-md-4 d-flex justify-content-around">
                        <p style={{ fontSize: "20px" }}>
                            <Link to="" className="text-light">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                        </p>
                        <p style={{ fontSize: "20px" }}>
                            <Link to="" className="text-light">
                                <i className="fab fa-twitter"></i>
                            </Link>
                        </p>
                        <p style={{ fontSize: "20px" }}>
                            <Link to="" className="text-light">
                                <i className="fab fa-linkedin-in"></i>
                            </Link>
                        </p>
                        <p style={{ fontSize: "20px" }}>
                            <Link to="" className="text-light">
                                <i className="fab fa-instagram"></i>
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="dropdown-divider mb-4"></div>
                <h6 className="text-white text-center mb-0">
                    &copy;2020 Inquel inc. Powered By{" "}
                    <a
                        href="https://sachirva.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="secondary-text"
                    >
                        Sachirva Technology Solutions
                    </a>
                </h6>
            </div>
        </footer>
    );
}
