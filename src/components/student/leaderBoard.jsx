import React, { Component } from "react";
import Wrapper from "./wrapper";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../common/loader";
import LeaderboardTable from "../common/table/leaderboard";
import Paginations from "../common/pagination";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import { paginationCount } from "../../shared/constant.js";

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            leaderBoard: [],
            activeQuizPage: 1,
            totalQuizCount: 0,
            activeCoursePage: 1,
            totalCourseCount: 0,

            page_loading: false,
            activeTab: "quiz",
        };
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        if (!this.props.location.hash) {
            this.setState({ activeTab: "quiz" });
        } else {
            this.setState({ activeTab: this.props.location.hash.substring(1) });
        }
    };

    handleQuizPageChange(pageNumber) {
        this.setState({ activeQuizPage: pageNumber });
    }
    handleCoursePageChange(pageNumber) {
        this.setState({ activeCoursePage: pageNumber });
    }

    handleSelect = (key) => {
        this.setState({ activeTab: key });
        this.props.history.push({ hash: key });
    };

    render() {
        return (
            <Wrapper
                header="Leaderboard"
                activeLink="leaderboard"
                history={this.props.history}
                hideBackButton={true}
            >
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item mb-3">
                            <Link to="/dashboard">
                                <i className="fas fa-home fa-sm"></i>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Leaderboard</li>
                    </ol>
                </nav>

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
                                data={this.state.leaderBoard}
                                points={true}
                            />
                            <div className="card-body p-3">
                                {this.state.totalQuizCount > paginationCount ? (
                                    <Paginations
                                        activePage={this.state.activeQuizPage}
                                        totalItemsCount={
                                            this.state.totalQuizCount
                                        }
                                        onChange={this.handleQuizPageChange.bind(
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
                                data={this.state.leaderBoard}
                                average={true}
                            />
                            <div className="card-body p-3">
                                {this.state.totalCourseCount >
                                paginationCount ? (
                                    <Paginations
                                        activePage={this.state.activeCoursePage}
                                        totalItemsCount={
                                            this.state.totalCourseCount
                                        }
                                        onChange={this.handleCoursePageChange.bind(
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
            </Wrapper>
        );
    }
}

export default Leaderboard;
