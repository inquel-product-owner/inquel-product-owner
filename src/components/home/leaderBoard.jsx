import React, { Component } from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import { Tabs, Tab } from "react-bootstrap";
import Loading from "../common/loader";
import LeaderboardTable from "../common/table/leaderboard";
import Paginations from "../common/pagination";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import { paginationCount } from "../../shared/constant.js";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";

class HomeLeaderboard extends Component {
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
            <>
                <Header activeLink="leaderboard" />

                <header className="jumbotron">
                    <h1 className="mb-0">Leader Board</h1>
                </header>

                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => window.location.reload()}
                >
                    <main className="container mb-5">
                        <div className="card card-body shadow-sm">
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
                                            {this.state.totalQuizCount >
                                            paginationCount ? (
                                                <Paginations
                                                    activePage={
                                                        this.state
                                                            .activeQuizPage
                                                    }
                                                    totalItemsCount={
                                                        this.state
                                                            .totalQuizCount
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
                                            leaderBoard={this.state.leaderBoard}
                                        />
                                        <div className="card-body p-3">
                                            {this.state.totalCourseCount >
                                            paginationCount ? (
                                                <Paginations
                                                    activePage={
                                                        this.state
                                                            .activeCoursePage
                                                    }
                                                    totalItemsCount={
                                                        this.state
                                                            .totalCourseCount
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
                        </div>
                    </main>

                    {/* Loading component */}
                    {this.state.page_loading ? <Loading /> : ""}
                </ErrorBoundary>

                <Footer />
            </>
        );
    }
}

export default HomeLeaderboard;
