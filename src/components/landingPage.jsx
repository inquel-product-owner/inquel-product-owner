import React from "react";
import {Link} from "react-router-dom";

function LandingPage() {
    return (
        <div className="section">
            <div className="container">
                <div className="jumbotron shadow-sm mt-4">
                    <h1 className="display-4 font-weight-bold text-center">
                        Welcome To Inquel Labs
                    </h1>
                    <p className="lead text-center font-weight-bolder">
                        Please Login to Continue
                    </p>
                    <div className="text-center">
                        <Link to="/student/login">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm mr-2"
                            >
                                Student Login
                            </button>
                        </Link>
                        <Link to="/teacher/login">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm mr-2"
                            >
                                Teacher Login
                            </button>
                        </Link>
                        <Link to="/hod/login">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm mr-2"
                            >
                                Hod Login
                            </button>
                        </Link>
                        <Link to="/admin/login">
                            <button type="button" className="btn btn-primary btn-sm">
                                Admin Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
