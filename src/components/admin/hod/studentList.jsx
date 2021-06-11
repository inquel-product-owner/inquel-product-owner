import React, { Component } from "react";
import Wrapper from "../wrapper";
import profilepic from "../../../assets/user-v1.png";
import { paginationCount } from "../../../shared/constant.js";
import Paginations from "../../common/pagination";
import StudentTable from "../../common/table/student";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl, adminPathUrl } from "../../../shared/baseUrl";
import Loading from "../../common/loader";
import AlertBox from "../../common/alert";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    hod_data: state.storage.temp,
});

class AdminHodStudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentItems: [],
            activeStudentPage: 1,
            totalStudentCount: 0,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
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
                if (result.sts === true) {
                    this.setState({
                        studentItems: result.data.results,
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
        document.title = "Student list - Admin | IQLabs";

        this.loadStudentData();
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
        return (
            <Wrapper
                history={this.props.history}
                header="Student List"
                activeLink="profiles"
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
                                        this.props.hod_data &&
                                        Object.keys(this.props.hod_data)
                                            .length !== 0
                                            ? this.props.hod_data
                                                  .profile_link !== null
                                                ? this.props.hod_data
                                                      .profile_link
                                                : profilepic
                                            : profilepic
                                    }
                                    alt={this.props.hod_data.full_name}
                                    className="img-fluid profile-pic"
                                />
                            </div>
                            <div className="col-md-10 col-9 pl-0">
                                <h5 className="primary-text">
                                    {this.props.hod_data &&
                                    Object.keys(this.props.hod_data).length !==
                                        0
                                        ? this.props.hod_data.full_name !== ""
                                            ? this.props.hod_data.full_name
                                            : this.props.hod_data.username
                                        : ""}
                                </h5>
                                <p className="mb-0">
                                    {this.props.hod_data &&
                                    Object.keys(this.props.hod_data).length !==
                                        0 ? (
                                        this.props.hod_data.is_active ? (
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

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default connect(mapStateToProps)(AdminHodStudentList);
