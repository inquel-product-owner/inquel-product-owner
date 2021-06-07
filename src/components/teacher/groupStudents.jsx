import React, { Component } from "react";
import Wrapper from "./wrapper";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import { paginationCount } from "../../shared/constant.js";
import Loading from "../common/loader";
import Paginations from "../common/pagination";
import StudentTable from "../table/student";
import AlertBox from "../common/alert";

const mapStateToProps = (state) => ({
    group_name: state.content.group_name,
    profile: state.user.profile,
});

class TeacherGroupStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentItem: [],
            selectedStudent: [],
            activeStudentPage: 1,
            totalStudentCount: 0,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

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
                if (result.sts === true) {
                    this.setState({
                        studentItem: result.data.results,
                        totalStudentCount: result.data.count,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    componentDidMount = () => {
        this.loadStudentData();
    };

    // Gets Student ID from the Student table
    handleStudentId = (data) => {
        let value = [];
        const studentItems = this.state.studentItem;
        for (let i = 0; i < studentItems.length; i++) {
            if (data.includes(studentItems[i].id.toString())) {
                value.push({
                    id: studentItems[i].id.toString(),
                    username: studentItems[i].username,
                });
            } else {
                continue;
            }
        }
        this.setState({
            selectedStudent: value,
        });
    };

    handleStudentPageChange(pageNumber) {
        this.setState(
            { activeStudentPage: pageNumber, page_loading: true },
            () => {
                this.loadStudentData();
            }
        );
    }

    render() {
        document.title = this.props.group_name + " - Teacher | IQLabs";
        return (
            <Wrapper
                header={this.props.group_name}
                activeLink="dashboard"
                history={this.props.history}
                waterMark={this.props.profile}
            >
                {/* Alert message */}
                <AlertBox
                    errorMsg={this.state.errorMsg}
                    successMsg={this.state.successMsg}
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={this.state.showSuccessAlert}
                    toggleSuccessAlert={() => {
                        this.setState({
                            showSuccessAlert: false,
                        });
                    }}
                    toggleErrorAlert={() => {
                        this.setState({
                            showErrorAlert: false,
                        });
                    }}
                />

                {/* Filter area */}
                <div className="row align-items-center mb-3">
                    <div className="col-md-6">
                        {/* ----- Breadcrumb ----- */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/teacher">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        {this.props.group_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Student Profiles
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex flex-wrap justify-content-end">
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="primary"
                                    id="dropdown-basic"
                                    className="btn-sm shadow-none"
                                >
                                    Notify
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu-down dropdown-menu-down-btn">
                                    <Dropdown.Item>Notify All</Dropdown.Item>
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
                        path={`teacher/group/${this.groupId}`}
                        handleStudentId={this.handleStudentId}
                    />
                    <div className="card-body p-3">
                        {this.state.totalStudentCount > paginationCount ? (
                            <Paginations
                                activePage={this.state.activeStudentPage}
                                totalItemsCount={this.state.totalStudentCount}
                                onChange={this.handleStudentPageChange.bind(
                                    this
                                )}
                            />
                        ) : null}
                    </div>
                </div>

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default connect(mapStateToProps)(TeacherGroupStudents);
