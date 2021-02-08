import React, { Component } from "react";
import { Spinner, Alert } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";

class SubjectAssigning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            teacherData: [],
            chapterStatus: [],
            courseStructure: "",
            selectedStatus: "",
            selectedTeacher: "",
            weightage: "",
            subjectItem: [],
            successMsg: "",
            errorMsg: "",
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    handleCourse = (event) => {
        this.setState({
            courseStructure: event.target.value,
        });
    };

    handleWeightage = (event) => {
        this.setState({
            weightage: event.target.value,
        });
    };

    handleStatus = (event) => {
        this.setState({
            selectedStatus: event.target.value,
        });
    };

    handleTeacher = (event) => {
        this.setState({
            selectedTeacher: event.target.value,
        });
    };

    componentDidMount = () => {
        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        var subjectId = this.props.match.params.subjectId;

        fetch(`${url}/hod/subject/${subjectId}/assign/teacher/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    teacherData: result.data.teachers,
                    chapterStatus: result.data.chapter_status.chapters,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: true,
        });

        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        var subjectId = this.props.match.params.subjectId;

        fetch(`${url}/hod/subject/${subjectId}/assign/teacher/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                chapter_name: this.state.courseStructure,
                chapter_status: this.state.selectedStatus,
                teacher_id: this.state.selectedTeacher,
                weightage: this.state.weightage,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        document.title =
            this.state.subjectItem.length !== 0
                ? this.state.subjectItem.subject_name + " Assign - HOD | IQLabs"
                : "Subject Assign - HOD | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Subject Name" togglenav={this.toggleSideNav} />

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
                            <div className="col-md-6">
                                <h5 className="primary-text mb-0">
                                    {this.props.subjectName}
                                </h5>
                            </div>
                        </div>

                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <div className="card shadow-sm">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="secondary-bg">
                                            <tr>
                                                <th scope="col">
                                                    Course structure
                                                </th>
                                                <th scope="col">Status</th>
                                                <th scope="col">
                                                    Teacher assigned
                                                </th>
                                                <th scope="col">Weightage</th>
                                                <th
                                                    scope="col"
                                                    className="text-center"
                                                >
                                                    Disable / Enable / Delete
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-light">
                                                <td>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name="chapter"
                                                            className="form-control shadow-sm"
                                                            onChange={
                                                                this
                                                                    .handleCourse
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <select
                                                            name="status"
                                                            className="form-control shadow-sm"
                                                            onChange={
                                                                this
                                                                    .handleStatus
                                                            }
                                                        >
                                                            <option value="">
                                                                Select an option
                                                            </option>
                                                            {this.state.chapterStatus.map(
                                                                (
                                                                    list,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <option
                                                                            value={
                                                                                list
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                list
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <select
                                                                    name="teacher"
                                                                    className="form-control shadow-sm"
                                                                    onChange={
                                                                        this
                                                                            .handleTeacher
                                                                    }
                                                                >
                                                                    <option value="">
                                                                        Select
                                                                        teacher
                                                                    </option>
                                                                    {this.state.teacherData.map(
                                                                        (
                                                                            list,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    value={
                                                                                        list.id
                                                                                    }
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        list.username
                                                                                    }
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name="weightage"
                                                            className="form-control shadow-sm"
                                                            onChange={
                                                                this
                                                                    .handleWeightage
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <button type="button" className="btn btn-primary btn-sm mr-1">
                                                        D
                                                    </button>
                                                    <button type="button" className="btn btn-primary btn-sm mr-1">
                                                        E
                                                    </button>
                                                    <button type="button" className="btn btn-primary btn-sm">
                                                        <i className="fas fa-trash-alt fa-sm"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-body p-2">
                                    <button type="submit" className="btn btn-light btn-block shadow-sm">
                                        {this.state.showLoader ? (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="mr-2"
                                            />
                                        ) : (
                                            ""
                                        )}
                                        Save
                                    </button>
                                    <Alert
                                        variant="danger"
                                        className="mt-3"
                                        show={this.state.showErrorAlert}
                                        onClose={() => {
                                            this.setState({
                                                showErrorAlert: false,
                                            });
                                        }}
                                        dismissible
                                    >
                                        {this.state.errorMsg}
                                    </Alert>
                                    <Alert
                                        variant="success"
                                        className="mt-3"
                                        show={this.state.showSuccessAlert}
                                        onClose={() => {
                                            this.setState({
                                                showSuccessAlert: false,
                                            });
                                        }}
                                        dismissible
                                    >
                                        {this.state.successMsg}
                                    </Alert>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubjectAssigning;
