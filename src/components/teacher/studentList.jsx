import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Dropdown } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import StudentTable from "../table/studentTable";
import Paginations from "../sharedComponents/pagination";

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStudentPage: 1,
            totalStudentCount: 0,
            showSideNav: false,
            activeTab: "teacher",
            studentItems: [],
            page_loading: true,
            is_formSubmited: false,
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

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    loadStudentData = () => {
        fetch(
            `${this.url}/teacher/student/?page=${this.state.activeStudentPage}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    studentItems: result.data.results,
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
        document.title = "Student Profiles - Teacher | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.activeTab === "Student Profiles"}
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="profiles"
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

                        <div className="card shadow-sm">
                            <StudentTable
                                studentItems={this.state.studentItems}
                                path="teacher"
                                group={true}
                                ref={this.gridRef}
                            />
                            <div className="card-body p-3">
                                {this.state.totalStudentCount >= 10 ? (
                                    <Paginations
                                        activePage={
                                            this.state.activeStudentPage
                                        }
                                        totalItemsCount={
                                            this.state.totalStudentCount
                                        }
                                        onChange={this.handleStudentPageChange.bind(
                                            this
                                        )}
                                    />
                                ) : null}
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

export default StudentList;
