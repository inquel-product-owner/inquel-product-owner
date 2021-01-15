import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../../shared/loadingComponent";
import GroupTable from "../table/groupTable";
import Paginations from "../../shared/pagination";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupItem: [],
            activeGroupPage: 1,
            totalGroupCount: 0,
            page_loading: true,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    loadGroupData = () => {
        var url = baseUrl + teacherUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        fetch(`${url}/teacher/group/?page=${this.state.activeGroupPage}`, {
            headers: headers,
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

    componentDidMount = () => {
        document.title = "Dashboard - Teacher | IQLabs";
        this.loadGroupData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.activeGroupPage !== this.state.activeGroupPage) {
            this.loadGroupData();
            this.setState({
                page_loading: true,
            });
        }
    };

    handleGroupPageChange(pageNumber) {
        this.setState({ activeGroupPage: pageNumber });
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
                                <h4 className="primary-text">Groups</h4>
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
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
