import React, { Component } from "react";
import SideNav from "./shared/sidenav";
import Header from "./shared/navbar";
import { Tabs, Tab } from "react-bootstrap";
import Loading from "../sharedComponents/loader";
import LeaderboardTable from "../table/leaderboardTable";
import Paginations from "../sharedComponents/pagination";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import { paginationCount } from "../../shared/globalValues.js";

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            showSideNav: false,
            activePage: 1,
            totalCount: 0,
            leaderBoard: [],
            page_loading: false,
            activeTab: "quiz",
        };
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        if (!this.props.location.hash) {
            this.setState({ activeTab: "quiz" });
        } else {
            this.setState({ activeTab: this.props.location.hash.substring(1) });
        }
    };

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    handleSelect = (key) => {
        this.setState({ activeTab: key });
        this.props.history.push({ hash: key });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Leaderboard" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="leaderboard"
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* Leaderboard table */}
                        <Tabs
                            activeKey={
                                !this.props.location.hash
                                    ? "quiz"
                                    : this.props.location.hash.substring(1)
                            }
                            id="uncontrolled-tab-example"
                            onSelect={this.handleSelect}
                        >
                            {/* Quiz Table */}
                            <Tab eventKey="quiz" title="Quiz Masters">
                                <div className="card shadow-sm">
                                    <LeaderboardTable
                                        leaderBoard={this.state.leaderBoard}
                                    />
                                    <div className="card-body p-3">
                                        {this.state.totalCount > paginationCount ? (
                                            <Paginations
                                                activePage={
                                                    this.state.activePage
                                                }
                                                totalItemsCount={
                                                    this.state.totalCount
                                                }
                                                onChange={this.handlePageChange.bind(
                                                    this
                                                )}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </Tab>

                            {/* Course toppers table */}
                            <Tab eventKey="course" title="Course Toppers">
                                <div className="card shadow-sm">
                                    <LeaderboardTable
                                        leaderBoard={this.state.leaderBoard}
                                    />
                                    <div className="card-body p-3">
                                        {this.state.totalCount > paginationCount ? (
                                            <Paginations
                                                activePage={
                                                    this.state.activePage
                                                }
                                                totalItemsCount={
                                                    this.state.totalCount
                                                }
                                                onChange={this.handlePageChange.bind(
                                                    this
                                                )}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default Leaderboard;
