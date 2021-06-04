import React, { Component } from "react";
import Wrapper from "./wrapper";
import { Link } from "react-router-dom";
import profilepic from "../../assets/user-v1.png";
import { Badge } from "react-bootstrap";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import Loading from "../common/loader";
import AlertBox from "../common/alert";

class AdminStudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentItems: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.studentId = this.props.match.params.studentId;
        this.url = baseUrl + adminPathUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    componentDidMount = () => {
        document.title = "Student Profile - Admin | IQLabs";

        fetch(`${this.url}/student/${this.studentId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        studentItems: result.data,
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
                history={this.props.history}
                header="Student Profile"
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
                                Student
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
                                        this.state.studentItems.length !== 0
                                            ? this.state.studentItems
                                                  .profile_link !== null
                                                ? this.state.studentItems
                                                      .profile_link
                                                : profilepic
                                            : profilepic
                                    }
                                    alt={this.state.studentItems.full_name}
                                    className="img-fluid profile-pic"
                                />
                            </div>
                            <div className="col-md-10 col-9 pl-0">
                                <h5 className="primary-text">
                                    {this.state.studentItems.length !== 0
                                        ? this.state.studentItems.full_name !==
                                          ""
                                            ? this.state.studentItems.full_name
                                            : this.state.studentItems.username
                                        : ""}
                                </h5>
                                <p className="mb-0">
                                    {this.state.studentItems.length !== 0 ? (
                                        this.state.studentItems.is_active ? (
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
                <div className="row mb-4">
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">First Name</p>
                        <p className="text-break mb-0">
                            {this.state.studentItems.first_name}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">Last Name</p>
                        <p className="text-break mb-0">
                            {this.state.studentItems.last_name}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">Email ID</p>
                        <p className="text-break mb-0">
                            {this.state.studentItems.email}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">Mobile</p>
                        <p className="text-break mb-0">
                            {this.state.studentItems.country_code}
                            {this.state.studentItems.phone_num}
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
                            {this.state.studentItems.address}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">City</p>
                        <p className="text-break mb-0">
                            {this.state.studentItems.city}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">District</p>
                        <p className="text-break mb-0">
                            {this.state.studentItems.district}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                        <p className="mb-1 font-weight-bold-600">State</p>
                        <p className="text-break mb-0">
                            {this.state.studentItems.state}
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6">
                        <p className="mb-1 font-weight-bold-600">Country</p>
                        <p className="text-break mb-0">
                            {this.state.studentItems.country}
                        </p>
                    </div>
                </div>

                {/* Course list */}
                <div className="card shadow-sm">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="primary-text">
                                <tr>
                                    <th scope="col">Courses subscribed</th>
                                    <th scope="col">Valid from</th>
                                    <th scope="col">Valid to</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Amount paid</th>
                                    <th scope="col">Discount Applied</th>
                                    <th scope="col">Quiz Points</th>
                                    <th scope="col">Simulation</th>
                                    <th scope="col" className="text-center">
                                        Scorecard
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mathematics 10th CBSE (Full course)</td>
                                    <td>05/10/2020</td>
                                    <td>10/10/2020</td>
                                    <td>Persuing</td>
                                    <td>2560</td>
                                    <td>SP2020210001</td>
                                    <td>212</td>
                                    <td>First Class</td>
                                    <td className="text-center">
                                        <Link to="/admin/course/001">
                                            <button className="btn btn-sm btn-primary shadow-none">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Physics</td>
                                    <td>10/10/2020</td>
                                    <td>02/03/2020</td>
                                    <td>Persuing</td>
                                    <td>3871</td>
                                    <td>SP2020210001</td>
                                    <td>436</td>
                                    <td>Not Taken</td>
                                    <td className="text-center">
                                        <Link to="/admin/course/001">
                                            <button className="btn btn-sm btn-primary shadow-none">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Chemistry</td>
                                    <td>03/01/2020</td>
                                    <td>07/07/2020</td>
                                    <td>Completed</td>
                                    <td>9568</td>
                                    <td>SP2020210001</td>
                                    <td>128</td>
                                    <td>Distiction</td>
                                    <td className="text-center">
                                        <Link to="/admin/course/001">
                                            <button className="btn btn-sm btn-primary shadow-none">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default AdminStudentProfile;
