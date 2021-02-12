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
                <div style={{ height: "80%" }}>
                    <Link to="/hod">
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
                    <Link to="/hod/profile">
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
                    <Link to="/">
                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={<Tooltip id="tooltip">Notes</Tooltip>}
                        >
                            <button className="btn sidebar-btn btn-sm mb-3">
                                <i
                                    className="far fa-sticky-note"
                                    style={{ marginLeft: "-1.5px" }}
                                ></i>
                            </button>
                        </OverlayTrigger>
                    </Link>
                    <Link to="/">
                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={<Tooltip id="tooltip">Clipboard</Tooltip>}
                        >
                            <button className="btn sidebar-btn btn-sm mb-3">
                                <i
                                    className="far fa-clipboard"
                                    style={{ marginLeft: "-1.5px" }}
                                ></i>
                            </button>
                        </OverlayTrigger>
                    </Link>
                </div>
                <div className="d-flex flex-column justify-content-end" style={{ height: "20%" }}>
                    <Link to="/">
                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={<Tooltip id="tooltip">Help</Tooltip>}
                        >
                            <button className="btn sidebar-btn btn-sm mb-2">
                                <i
                                    className="far fa-question-circle"
                                    style={{ marginLeft: "-1.5px" }}
                                ></i>
                            </button>
                        </OverlayTrigger>
                    </Link>
                    <Link to="/">
                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={<Tooltip id="tooltip">Settings</Tooltip>}
                        >
                            <button className="btn sidebar-btn btn-sm mb-3">
                                <i
                                    className="fas fa-cog"
                                    style={{ marginLeft: "-1.5px" }}
                                ></i>
                            </button>
                        </OverlayTrigger>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SideNav;
