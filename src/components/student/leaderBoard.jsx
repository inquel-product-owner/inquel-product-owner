import React, { Component } from "react";
import Wrapper from "./wrapper";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../common/loader";
import LeaderboardTable from "../table/leaderboard";
import Paginations from "../common/pagination";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import { paginationCount } from "../../shared/constant.js";

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            activePage: 1,
            totalCount: 0,
            leaderBoard: [],
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

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
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
            >
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item mb-3">
                            <Link to="/student">
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
                                leaderBoard={this.state.leaderBoard}
                            />
                            <div className="card-body p-3">
                                {this.state.totalCount > paginationCount ? (
                                    <Paginations
                                        activePage={this.state.activePage}
                                        totalItemsCount={this.state.totalCount}
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
                                        activePage={this.state.activePage}
                                        totalItemsCount={this.state.totalCount}
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
            </Wrapper>
        );
    }
}

export default Leaderboard;
