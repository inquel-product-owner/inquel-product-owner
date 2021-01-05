import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideNav extends Component {
    render() {
        const active = this.props.activeLink;
        return (
            <div
                id="sidebar"
                className={`text-center ${this.props.shownav ? "active" : ""}`}
                style={{ backgroundColor: "#fff9f0" }}
            >
                <div style={{ height: "80%" }}>
                    <Link to="/hod">
                        <button
                            className={`btn sidebar-btn ${
                                active === "dashboard" ? "active" : ""
                            } btn-sm mb-3`}
                        >
                            <i
                                className="fas fa-home"
                                style={{ marginLeft: "-1.5px" }}
                            ></i>
                        </button>
                    </Link>
                    <Link to="/hod/profile">
                        <button
                            className={`btn sidebar-btn ${
                                active === "profiles" ? "active" : ""
                            } btn-sm mb-3`}
                        >
                            <i
                                className="fas fa-users"
                                style={{ marginLeft: "-1.5px" }}
                            ></i>
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="btn sidebar-btn btn-sm mb-3">
                            <i
                                className="far fa-sticky-note"
                                style={{ marginLeft: "-1.5px" }}
                            ></i>
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="btn sidebar-btn btn-sm mb-3">
                            <i
                                className="far fa-clipboard"
                                style={{ marginLeft: "-1.5px" }}
                            ></i>
                        </button>
                    </Link>
                </div>
                <div style={{ height: "20%" }}>
                    <Link to="/">
                        <button className="btn sidebar-btn btn-sm mb-3">
                            <i
                                className="far fa-question-circle"
                                style={{ marginLeft: "-1.5px" }}
                            ></i>
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="btn sidebar-btn btn-sm">
                            <i
                                className="fas fa-cog"
                                style={{ marginLeft: "-1.5px" }}
                            ></i>
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SideNav;
