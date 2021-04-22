import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="primary-bg py-5">
            <div className="container">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <h5 className="font-weight-bold text-light mb-4">
                            SUBJECTS
                        </h5>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Arts
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Maths
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Science
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Social Science
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Degreee course
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Medical courses
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Comitative Exams
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Open Source
                            </Link>
                        </p>
                        <p>
                            <Link to="" className="text-light">
                                Classes
                            </Link>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h5 className="font-weight-bold text-light mb-4">
                            FEATURES
                        </h5>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Premium Content
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Flashcards
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Free Courses
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Course Catalogue
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Leader Board
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Study Guide
                            </Link>
                        </p>
                        <p>
                            <Link to="" className="text-light">
                                Buy A Course
                            </Link>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h5 className="font-weight-bold text-light mb-4">
                            HELP
                        </h5>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Sign Up
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Help Center
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Students
                            </Link>
                        </p>
                        <p>
                            <Link to="" className="text-light">
                                Technical Help Center
                            </Link>
                        </p>
                    </div>
                    <div className="col-md-3">
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
                                Blog
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Latest Updates
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                Careers
                            </Link>
                        </p>
                        <p className="mb-2">
                            <Link to="" className="text-light">
                                How Inquel Works?
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
                        <p>
                            <Link to="" className="text-light">
                                Legal Notice
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
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
                    &copy;{new Date().getFullYear()} Inquel inc. Powered By{" "}
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
