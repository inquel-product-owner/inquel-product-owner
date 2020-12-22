import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideNav extends Component {
    render() {
        return (
            <div
                id="sidebar"
                className={`text-center ${
                    this.props.shownav ? "active" : ""
                }`}
            >
                {/* <button
                    className="btn btn-light btn-sm mb-3 d-block d-md-none"
                    onClick={this.props.togglenav}
                >
                    <i className="fas fa-times fa-sm"></i>
                </button> */}
                <Link to="/">
                    <button
                        className="btn btn-primary-invert btn-sm mb-3"
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                        }}
                    >
                        D
                    </button>
                </Link>
                <Link to="/profiles">
                    <button
                        className="btn btn-primary-invert btn-sm mb-3"
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                        }}
                    >
                        P
                    </button>
                </Link>
                <Link to="/course-management">
                    <button
                        className="btn btn-primary-invert btn-sm mb-3"
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                        }}
                    >
                        C
                    </button>
                </Link>
            </div>
        );
    }
}

export default SideNav;
