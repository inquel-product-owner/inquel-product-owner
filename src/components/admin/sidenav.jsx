import React, { Component } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class SideNav extends Component {
    render() {
        const active = this.props.activeLink;
        return (
            <div
                id="sidebar"
                className={`text-center light-bg ${this.props.shownav ? "active" : ""}`}
            >
                <Link to="/admin">
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={<Tooltip id="tooltip">Dashboard</Tooltip>}
                    >
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
                    </OverlayTrigger>
                </Link>
                <Link to="/admin/profiles">
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={<Tooltip id="tooltip">Profiles</Tooltip>}
                    >
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
                    </OverlayTrigger>
                </Link>
                <Link to="/admin/course-management">
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={<Tooltip id="tooltip">Master Data</Tooltip>}
                    >
                        <button
                            className={`btn sidebar-btn ${
                                active === "course" ? "active" : ""
                            } btn-sm mb-3`}
                        >
                            <i
                                className="fas fa-graduation-cap"
                                style={{ marginLeft: "-1.5px" }}
                            ></i>
                        </button>
                    </OverlayTrigger>
                </Link>
            </div>
        );
    }
}

export default SideNav;
