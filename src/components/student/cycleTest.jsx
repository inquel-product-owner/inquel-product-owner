import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";

class Scorecard extends Component {
    constructor() {
        super();
        this.state = {
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>Scorecard Configuration</Modal.Header>
                <Modal.Body>
                    <Alert
                        variant="danger"
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

                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <th scope="col">Range in %</th>
                                <th scope="col">Retake Duration</th>
                                <th scope="col">Reducation %</th>
                                <th scope="col">Reducation Duration</th>
                                <th scope="col">Remarks</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="d-flex align-items-center">
                                        <input
                                            type="number"
                                            name="range1"
                                            id="range1"
                                            className="form-control form-shadow"
                                        />
                                        to
                                        <input
                                            type="number"
                                            name="range2"
                                            id="range2"
                                            className="form-control form-shadow"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="retake"
                                            id="retake"
                                            className="form-control form-shadow"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="reducation"
                                            id="reducation"
                                            className="form-control form-shadow"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="duration"
                                            id="duration"
                                            className="form-control form-shadow"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="remarks"
                                            id="remarks"
                                            className="form-control form-shadow"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <button className="btn btn-primary">
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
                        Save & Close
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class CycleTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            chapterList: [],
            chapterName: "",
            page_loading: true,
            is_formSubmitted: false,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterName = this.props.match.params.chapterName;
        this.url = baseUrl + studentUrl;
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

    componentDidMount = () => {
        this.setState({
            chapterName: this.props.match.params.chapterName,
        });

        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    chapterList: result.data.results,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.match.params.chapterName !== this.state.chapterName) {
            this.setState({
                chapterName: this.props.match.params.chapterName,
            });
        }

        if (
            prevState.is_formSubmitted !== this.state.is_formSubmitted &&
            this.state.is_formSubmitted === true
        ) {
            this.loadChapterData();
            this.setState({
                is_formSubmitted: false,
            });
        }
    };

    formSubmission = (is_formSubmitted) => {
        if (is_formSubmitted) {
            this.setState({
                is_formSubmitted: true,
            });
        }
    };

    handleSelect = (event) => {
        this.props.history.push({
            pathname: `/student/subject/${this.subjectId}/${event.value}`,
        });
        this.setState({
            chapterName: event.value,
        });
    };

    render() {
        document.title = `${this.state.chapterName} - Student | IQLabs`;
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Subject name" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Scorecard modal */}
                {this.state.showModal ? (
                    <Scorecard
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        formSubmission={this.formSubmission}
                        subjectId={this.props.match.params.subjectId}
                    />
                ) : (
                    ""
                )}

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        <div className="card shadow-sm mb-3">
                            <div className="card-body text-center">
                                <h6 className="mb-0">{this.chapterName}</h6>
                            </div>
                        </div>

                        {/* Header configuration */}
                        <div className="row align-items-center mb-3">
                            <div className="col-md-8">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <Select
                                            className="basic-single"
                                            placeholder={this.state.chapterName}
                                            value={[]}
                                            isSearchable={true}
                                            name="chapter"
                                            options={this.state.chapterList.map(
                                                function (list) {
                                                    return {
                                                        value:
                                                            list.chapter_name,
                                                        label:
                                                            list.chapter_name,
                                                    };
                                                }
                                            )}
                                            onChange={this.handleSelect}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card shadow-sm">
                                            <div className="card-body text-center py-2">
                                                180 mins
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <select
                                            name="attempt"
                                            id="attempt"
                                            className="form-control form-shadow"
                                        >
                                            <option value="attempt 01">
                                                Attempt 01
                                            </option>
                                            <option value="attempt 02">
                                                Attempt 02
                                            </option>
                                            <option value="attempt 03">
                                                Attempt 03
                                            </option>
                                            <option value="attempt 04">
                                                Attempt 04
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-right">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={this.toggleModal}
                                >
                                    Score Configuration
                                </button>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="primary-bg text-white">
                                        <tr>
                                            <th scope="col">Section</th>
                                            <th scope="col">
                                                Section Description
                                            </th>
                                            <th scope="col" className="tom">
                                                No. of Questions
                                            </th>
                                            <th scope="col">Question Type</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Marks</th>
                                            <th scope="col">View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control form-shadow"
                                                    placeholder="01"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control form-shadow"
                                                    placeholder="Section Description 01"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="form-control form-shadow"
                                                    type="number"
                                                    value="0"
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    name="type"
                                                    id="type"
                                                    className="form-control form-shadow"
                                                >
                                                    <option value="type1">
                                                        Type 1
                                                    </option>
                                                    <option value="type2">
                                                        Type 2
                                                    </option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    name="category"
                                                    id="category"
                                                    className="form-control form-shadow"
                                                >
                                                    <option value="mcq">
                                                        MCQ
                                                    </option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    className="form-control form-shadow"
                                                    type="number"
                                                    value="0"
                                                />
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/teacher/subject/${this.subjectId}/${this.chapterName}/01/cycle-test`}
                                                >
                                                    <button className="btn btn-link shadow-sm">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-body">
                                <button className="btn btn-light btn-block shadow-sm">
                                    Add Section +
                                </button>
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

export default CycleTest;
