import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import Paginations from "../sharedComponents/pagination";
import StudentTable from "../table/studentTable";

class GroupStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupItem: [],
            studentItem: [],
            activeStudentPage: 1,
            totalStudentCount: 0,
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

    toggleStudentModal = () => {
        this.setState({
            showStudentModal: !this.state.showStudentModal,
        });
    };

    loadStudentData = () => {
        fetch(
            `${this.url}/teacher/student/?group=${this.props.match.params.groupId}&page=${this.state.activeStudentPage}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    studentItem: result.data.results,
                    totalStudentCount: result.data.count,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        this.loadStudentData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.is_formSubmited !== this.state.is_formSubmited &&
            this.state.is_formSubmited === true
        ) {
            this.loadStudentData();
            this.setState({
                is_formSubmited: false,
            });
        }

        if (prevState.activeStudentPage !== this.state.activeStudentPage) {
            this.loadStudentData();
            this.setState({
                page_loading: true,
            });
        }
    };

    formSubmission = (is_formSubmited) => {
        if (is_formSubmited) {
            this.setState({
                is_formSubmited: true,
            });
        }
    };

    handleStudentPageChange(pageNumber) {
        this.setState({ activeStudentPage: pageNumber });
    }

    render() {
        document.title =
            this.state.groupItem.length !== 0
                ? this.state.groupItem.group_name + " Student List - Teacher | IQLabs"
                : "Group Student List - Teacher | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.groupItem.group_name}
                    togglenav={this.toggleSideNav}
                />

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
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-2"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* Filter area */}
                        <div className="row align-items-center">
                            <div className="col-md-2">
                                <h5 className="primary-text">
                                    Students Profile
                                </h5>
                            </div>
                            <div className="col-md-10">
                                <div className="d-flex flex-wrap justify-content-end mb-4">
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Delete
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Enable
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Disable
                                    </button>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="primary"
                                            id="dropdown-basic"
                                            className="btn-sm"
                                        >
                                            Notify
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                Notify All
                                            </Dropdown.Item>
                                            <div className="dropdown-divider"></div>
                                            <Dropdown.Item>
                                                Notify Selected
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>

                        {/* Student list */}
                        <div className="card shadow-sm">
                            <StudentTable
                                studentItems={this.state.studentItem}
                                path="teacher"
                            />
                            <div className="card-body p-3">
                                <Paginations
                                    activePage={this.state.activeStudentPage}
                                    totalItemsCount={
                                        this.state.totalStudentCount
                                    }
                                    onChange={this.handleStudentPageChange.bind(
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

export default GroupStudents;
