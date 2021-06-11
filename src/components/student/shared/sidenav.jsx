import React, { Component } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class SideNav extends Component {
    render() {
        const active = this.props.activeLink;
        return (
            <div
                id="sidebar"
                className={`text-center light-bg ${
                    this.props.shownav ? "active" : ""
                }`}
            >
                <div style={{ height: "80%" }}>
                    <Link to="/dashboard">
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
                                    className="fas fa-tachometer-alt"
                                    style={{ marginLeft: "-1.5px" }}
                                ></i>
                            </button>
                        </OverlayTrigger>
                    </Link>
                    <Link to="/dashboard/leaderboard">
                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                                <Tooltip id="tooltip">Leaderboard</Tooltip>
                            }
                        >
                            <button
                                className={`btn sidebar-btn ${
                                    active === "leaderboard" ? "active" : ""
                                } btn-sm mb-3`}
                            >
                                <i
                                    className="fas fa-chart-bar"
                                    style={{ marginLeft: "-1.5px" }}
                                ></i>
                            </button>
                        </OverlayTrigger>
                    </Link>
                    <Link to="/dashboard/study-planner">
                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                                <Tooltip id="tooltip">Study Planner</Tooltip>
                            }
                        >
                            <button
                                className={`btn sidebar-btn ${
                                    active === "calendar" ? "active" : ""
                                } btn-sm mb-3`}
                            >
                                <i className="far fa-calendar-alt"></i>
                            </button>
                        </OverlayTrigger>
                    </Link>
                    <Link to="/dashboard/quiz">
                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                                <Tooltip id="tooltip">Quiz</Tooltip>
                            }
                        >
                            <button
                                className={`btn sidebar-btn ${
                                    active === "quiz" ? "active" : ""
                                } btn-sm mb-3`}
                            >
                                <i className="fas fa-puzzle-piece"></i>
                            </button>
                        </OverlayTrigger>
                    </Link>
                    <Link to="/dashboard/catalog">
                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                                <Tooltip id="tooltip">Course Catalog</Tooltip>
                            }
                        >
                            <button
                                className={`btn sidebar-btn ${
                                    active === "course" ? "active" : ""
                                } btn-sm mb-3`}
                            >
                                <i className="fas fa-graduation-cap" style={{marginLeft:'-2px'}}></i>
                            </button>
                        </OverlayTrigger>
                    </Link>
                </div>

                <div
                    className="d-flex flex-column justify-content-end"
                    style={{ height: "20%" }}
                >
                    <Link to="/dashboard">
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
                    <Link to="/dashboard">
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
