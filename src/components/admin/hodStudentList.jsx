import React, { Component } from "react";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import Loading from "../sharedComponents/loader";
import Paginations from "../sharedComponents/pagination";
import StudentTable from "../table/studentTable";

class HodStudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            studentItems: [],
            hodItems: [],
            page_loading: true,
            activeStudentPage: 1,
            totalStudentCount: 0,
        };
        this.hodId = this.props.match.params.hodId;
        this.url = baseUrl + adminPathUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    loadStudentData = () => {
        fetch(
            `${this.url}/hod/${this.hodId}/student/?page=${this.state.activeStudentPage}`,
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
        document.title = "HOD Student list - Admin | IQLabs";

        fetch(`${this.url}/hod/${this.hodId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    hodItems: result.data,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });

        this.loadStudentData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.activeStudentPage !== this.state.activeStudentPage) {
            this.loadStudentData();
            this.setState({
                page_loading: true,
            });
        }
    };

    handleStudentPageChange(pageNumber) {
        this.setState({ activeStudentPage: pageNumber });
    }

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name="HOD Student List"
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

                        <div className="row align-items-center mb-4">
                            <div className="col-md-6">
                                <div className="row align-items-center">
                                    <div className="col-md-2 col-3">
                                        <img
                                            src={
                                                this.state.hodItems.length !== 0
                                                    ? this.state.hodItems
                                                          .profile_link !== null
                                                        ? this.state.hodItems
                                                              .profile_link
                                                        : profilepic
                                                    : profilepic
                                            }
                                            alt={`${this.state.hodItems.first_name} ${this.state.hodItems.last_name}`}
                                            className="img-fluid profile-pic"
                                        />
                                    </div>
                                    <div className="col-md-10 col-9 pl-0">
                                        <h5 className="primary-text">
                                            {this.state.hodItems.length !== 0
                                                ? `${this.state.hodItems.first_name} ${this.state.hodItems.last_name}`
                                                : ""}
                                        </h5>
                                        <p className="mb-0">
                                            {this.props.match.params.hodId}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Student List */}
                        <div className="card shadow-sm">
                            <StudentTable
                                studentItems={this.state.studentItems}
                                path={`admin/hod/${this.props.match.params.hodId}`}
                                category={true}
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

export default HodStudentList;
