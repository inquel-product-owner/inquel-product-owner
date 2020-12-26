import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideNav extends Component {
    render() {
        const active = this.props.activeLink;
        return (
            <div
                id="sidebar"
                className={`text-center ${this.props.shownav ? "active" : ""}`}
            >
                <Link to="/admin">
                    <button
                        className={`btn sidebar-btn ${
                            active === "dashboard" ? "active" : ""
                        } btn-sm mb-3`}
                    >
                        <i
                            class="fas fa-tachometer-alt"
                            style={{ marginLeft: "-1.5px" }}
                        ></i>
                    </button>
                </Link>
                <Link to="/admin/profiles">
                <button
                        className={`btn sidebar-btn ${
                            active === "profiles" ? "active" : ""
                        } btn-sm mb-3`}
                    >
                        <i
                            class="fas fa-users"
                            style={{ marginLeft: "-1.5px" }}
                        ></i>
                    </button>
                </Link>
                <Link to="/admin/course-management">
                <button
                        className={`btn sidebar-btn ${
                            active === "course" ? "active" : ""
                        } btn-sm mb-3`}
                    >
                        <i
                            class="fas fa-graduation-cap"
                            style={{ marginLeft: "-1.5px" }}
                        ></i>
                    </button>
                </Link>
            </div>
        );
    }
}

export default SideNav;
