import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import GroupTable from "../table/groupTable";
import SubjectTable from "../table/subjectTable";
import Paginations from "../sharedComponents/pagination";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupItem: [],
            subjectItem: [],
            activeGroupPage: 1,
            totalGroupCount: 0,
            activeSubjectPage: 1,
            totalSubjectCount: 0,
            page_loading: true,
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

    loadGroupData = () => {
        fetch(`${this.url}/teacher/group/?page=${this.state.activeGroupPage}`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    groupItem: result.data.results,
                    totalGroupCount: result.data.count,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    loadSubjectData = () => {
        fetch(
            `${this.url}/teacher/subject/?page=${this.state.activeSubjectPage}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    subjectItem: result.data.results,
                    totalSubjectCount: result.data.count,
                    page_loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = "Dashboard - Teacher | IQLabs";
        this.loadGroupData();
        this.loadSubjectData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.activeGroupPage !== this.state.activeGroupPage) {
            this.loadGroupData();
            this.setState({
                page_loading: true,
            });
        }

        if (prevState.activeSubjectPage !== this.state.activeSubjectPage) {
            this.loadSubjectData();
            this.setState({
                page_loading: true,
            });
        }
    };

    handleGroupPageChange(pageNumber) {
        this.setState({ activeGroupPage: pageNumber });
    }

    handleSubjectPageChange(pageNumber) {
        this.setState({ activeSubjectPage: pageNumber });
    }

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Dashboard" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Welcome */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body text-center p-4">
                                <h3 className="primary-text mb-0">
                                    WELCOME BACK
                                </h3>
                            </div>
                        </div>

                        {/* Group table */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <h5 className="primary-text">Groups</h5>
                            </div>
                            <GroupTable
                                groupItems={this.state.groupItem}
                                path="teacher"
                                view={true}
                                check={true}
                            />
                            <div className="card-body p-3">
                                <Paginations
                                    activePage={this.state.activeGroupPage}
                                    totalItemsCount={this.state.totalGroupCount}
                                    onChange={this.handleGroupPageChange.bind(
                                        this
                                    )}
                                />
                            </div>
                        </div>

                        {/* Subject Table */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <h5 className="primary-text">Subjects</h5>
                            </div>
                            <SubjectTable
                                subjectItems={this.state.subjectItem}
                                path="teacher"
                            />
                            <div className="card-body p-3">
                                <Paginations
                                    activePage={this.state.activeSubjectPage}
                                    totalItemsCount={
                                        this.state.totalSubjectCount
                                    }
                                    onChange={this.handleSubjectPageChange.bind(
                                        this
                                    )}
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

export default Dashboard;
