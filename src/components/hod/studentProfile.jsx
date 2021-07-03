import React, { Component } from "react";
import Wrapper from "./wrapper";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import profilepic from "../../assets/user-v1.png";
import { baseUrl, hodUrl } from "../../shared/baseUrl";
import Loading from "../common/loader";
import AlertBox from "../common/alert";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    group_name: state.content.group_name,
});

class HODStudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_data: [],
            subject_data: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
        this.studentId = this.props.match.params.studentId;
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        document.title = "Student Profile - HOD | IQLabs";

        fetch(`${this.url}/hod/student/${this.studentId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        student_data: result.data,
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

    render() {
        return (
            <Wrapper
                header={
                    this.groupId ? this.props.group_name : "Student Profile"
                }
                activeLink="profiles"
                history={this.props.history}
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
                            <Link to="/hod">
                                <i className="fas fa-home fa-sm"></i>
                            </Link>
                        </li>
                        {this.groupId ? (
                            <li className="breadcrumb-item">
                                <Link to={`/hod/group/${this.groupId}`}>
                                    {this.props.group_name}
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                        <li className="breadcrumb-item">
                            <Link to="#" onClick={this.props.history.goBack}>
                                Students
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Profile</li>
                    </ol>
                </nav>

                {/* Student details */}
                <div className="row align-items-center mb-4">
                    <div className="col-md-6">
                        <div className="row align-items-center">
                            <div className="col-md-2 col-3">
                                <img
                                    src={
                                        this.state.student_data.profile_link !==
                                        null
                                            ? this.state.student_data
                                                  .profile_link
                                            : profilepic
                                    }
                                    alt={this.state.student_data.full_name}
                                    className="img-fluid profile-pic"
                                />
                            </div>
                            <div className="col-md-10 col-9 pl-0">
                                <h5 className="primary-text">
                                    {this.state.student_data.full_name !== ""
                                        ? this.state.student_data.full_name
                                        : this.state.student_data.username}
                                </h5>
                                <p className="mb-0">
                                    {this.state.student_data.length !== 0 ? (
                                        this.state.student_data.is_active ? (
                                            <Badge variant="success">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="danger">
                                                Inactive
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
                <div className="row mb-4">
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">First Name</p>
                        <p className="text-break mb-0">
                            {this.state.student_data.first_name}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">Last Name</p>
                        <p className="text-break mb-0">
                            {this.state.student_data.last_name}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">Email ID</p>
                        <p className="text-break mb-0">
                            {this.state.student_data.email}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">Mobile</p>
                        <p className="text-break mb-0">
                            {this.state.student_data.country_code}
                            {this.state.student_data.phone_num}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">Institution</p>
                        <p className="text-break mb-0">XYZ</p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6">
                        <p className="mb-1 font-weight-bold-600">Standard</p>
                        <p className="text-break mb-0">XYZ</p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">Referral</p>
                        <p className="text-break mb-0">XYZ</p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">Address</p>
                        <p className="text-break mb-0">
                            {this.state.student_data.address}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">City</p>
                        <p className="text-break mb-0">
                            {this.state.student_data.city}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">District</p>
                        <p className="text-break mb-0">
                            {this.state.student_data.district}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">State</p>
                        <p className="text-break mb-0">
                            {this.state.student_data.state}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6">
                        <p className="mb-1 font-weight-bold-600">Country</p>
                        <p className="text-break mb-0">
                            {this.state.student_data.country}
                        </p>
                    </div>
                </div>

                {/* Subject list */}
                {this.state.subject_data &&
                this.state.subject_data.length !== 0 ? (
                    <div className="card shadow-sm">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="primary-text">
                                    <tr>
                                        <th scope="col">Subjects</th>
                                        <th scope="col">Valid from</th>
                                        <th scope="col">Valid to</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Group</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    ""
                )}

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default connect(mapStateToProps)(HODStudentProfile);
