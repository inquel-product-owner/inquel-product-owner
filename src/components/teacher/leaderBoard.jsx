import React, { Component } from "react";
import SideNav from "./sidenav";
import Header from "./navbar";
import Loading from "../sharedComponents/loader";
import LeaderboardTable from "../table/leaderboardTable";
import Paginations from "../sharedComponents/pagination";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            showSideNav: false,
            activePage: 1,
            totalCount: 0,
            leaderBoard: [],
            page_loading: false,
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
        document.title = "Leaderboard - Teacher | IQLabs";
    };

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

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

                        <div className="mb-3">
                            <button className="btn btn-primary btn-sm mr-2">
                                Quiz
                            </button>
                            <button className="btn btn-primary-invert btn-sm">
                                Course Toppers
                            </button>
                        </div>

                        {/* Group table */}
                        <div className="card shadow-sm mb-4">
                            <LeaderboardTable
                                leaderBoard={this.state.leaderBoard}
                            />
                            <div className="card-body p-3">
                                <Paginations
                                    activePage={this.state.activePage}
                                    totalItemsCount={this.state.totalCount}
                                    onChange={this.handlePageChange.bind(this)}
                                />
                            </div>
                        </div>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default Leaderboard;
