import React, { Component } from "react";
import profilepic from "../../assets/user-v1.png";
import Wrapper from "./wrapper";
import { paginationCount } from "../../shared/globalValues.js";
import Paginations from "../common/pagination";
import StudentTable from "../table/student";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

class AdminHodStudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentItems: [],
            hodItems: [],
            activeStudentPage: 1,
            totalStudentCount: 0,
        };
        this.hodId = this.props.match.params.hodId;
    }

    loadStudentData = () => {
        fetch(
            `${this.wrapper.url}/hod/${this.hodId}/student/?page=${this.state.activeStudentPage}`,
            {
                headers: this.wrapper.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        studentItems: result.data.results,
                        totalStudentCount: result.data.count,
                    });
                    this.wrapper.pageLoading(false);
                } else {
                    this.wrapper.pageLoading(false);
                    this.wrapper.errorAlert(result.msg, true);
                }
            })
            .catch((err) => {
                console.log(err);
                this.wrapper.pageLoading(false);
                this.wrapper.errorAlert("Something went wrong!", true);
            });
    };

    componentDidMount = () => {
        document.title = "Student list - Admin | IQLabs";

        fetch(`${this.wrapper.url}/hod/${this.hodId}/`, {
            headers: this.wrapper.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        hodItems: result.data,
                    });
                    this.wrapper.pageLoading(false);
                } else {
                    this.wrapper.pageLoading(false);
                    this.wrapper.errorAlert(result.msg, true);
                }
            })
            .catch((err) => {
                console.log(err);
                this.wrapper.pageLoading(false);
                this.wrapper.errorAlert("Something went wrong!", true);
            });

        this.loadStudentData();
    };

    handleStudentPageChange(pageNumber) {
        this.setState({ activeStudentPage: pageNumber }, () => {
            this.wrapper.pageLoading(true);
            this.loadStudentData();
        });
    }

    render() {
        return (
            <Wrapper
                history={this.props.history}
                header="Student List"
                activeLink="profiles"
                ref={(ref) => (this.wrapper = ref)}
            >
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-3">
                        <li className="breadcrumb-item">
                            <Link to="/admin">
                                <i className="fas fa-home fa-sm"></i>
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="#" onClick={this.props.history.goBack}>
                                HOD
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Student</li>
                    </ol>
                </nav>

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
                                    alt={this.state.hodItems.full_name}
                                    className="img-fluid profile-pic"
                                />
                            </div>
                            <div className="col-md-10 col-9 pl-0">
                                <h5 className="primary-text">
                                    {this.state.hodItems.length !== 0
                                        ? this.state.hodItems.full_name !== ""
                                            ? this.state.hodItems.full_name
                                            : this.state.hodItems.username
                                        : ""}
                                </h5>
                                <p className="mb-0">
                                    {this.state.hodItems.length !== 0 ? (
                                        this.state.hodItems.is_active ? (
                                            <Badge variant="success">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="danger">
                                                Not active
                                            </Badge>
                                        )
                                    ) : (
                                        ""
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student List */}
                <div className="card shadow-sm">
                    <StudentTable
                        studentItems={this.state.studentItems}
                        path={`admin/hod/${this.hodId}`}
                        category={true}
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
            </Wrapper>
        );
    }
}

export default AdminHodStudentList;
