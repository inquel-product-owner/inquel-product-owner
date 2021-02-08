import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import Paginations from "../sharedComponents/pagination";
import SubjectTable from "../table/subjectTable";
import CarouselCard from "../sharedComponents/owlCarousel";

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectModalShow: false,
            groupItem: [],
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

    addSubjectModal = () => {
        this.setState({
            subjectModalShow: !this.state.subjectModalShow,
        });
    };

    loadSubjectData = () => {
        fetch(
            `${this.url}/teacher/group/${this.props.match.params.groupId}/?page=${this.state.activeSubjectPage}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    groupItem: result.data.results,
                    totalSubjectCount: result.data.count,
                    page_loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        this.loadSubjectData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.activeSubjectPage !== this.state.activeSubjectPage) {
            this.loadSubjectData();
            this.setState({
                page_loading: true,
            });
        }
    };

    handleSubjectPageChange(pageNumber) {
        this.setState({ activeSubjectPage: pageNumber });
    }

    render() {
        document.title =
            this.state.groupItem.length !== 0
                ? this.state.groupItem.group_name + " - Teacher | IQLabs"
                : "Groups - Teacher | IQLabs";
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

                        <div className="row align-items-center mb-3">
                            <div className="col-3">
                                <h4>{this.state.groupItem.group_name}</h4>
                            </div>
                            <div className="col-9 text-right">
                                <Link
                                    to={`/teacher/group/${this.props.match.params.groupId}/student`}
                                >
                                    <button className="btn btn-primary btn-sm">
                                        Students
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Subject list */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>Subjects</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <Link to="">
                                            <button className="btn btn-primary btn-sm">
                                                View all
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <SubjectTable
                                subjectItems={this.state.groupItem}
                                path="teacher"
                            />
                            <div className="card-body p-3">
                                {this.state.totalSubjectCount >= 10 ? (
                                    <Paginations
                                        activePage={
                                            this.state.activeSubjectPage
                                        }
                                        totalItemsCount={
                                            this.state.totalSubjectCount
                                        }
                                        onChange={this.handleSubjectPageChange.bind(
                                            this
                                        )}
                                    />
                                ) : null}
                            </div>
                        </div>

                        {/* Exams carousel */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>Exams</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <Link to="">
                                            <button className="btn btn-primary btn-sm">
                                                View all
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <CarouselCard />
                            </div>
                        </div>

                        {/* Quiz carousel */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>Quiz</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <Link to="">
                                            <button className="btn btn-primary btn-sm">
                                                View all
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <CarouselCard />
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

export default Group;
