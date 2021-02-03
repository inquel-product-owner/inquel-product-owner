import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
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
        this.url = baseUrl + teacherUrl;
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
                <Modal.Header
                    closeButton
                    className="font-weight-bold primary-text"
                >
                    Scorecard Configuration
                </Modal.Header>
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
                                        <span className="mx-2">to</span>
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
                    <button className="btn btn-primary btn-sm">
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

class CycleTestAuto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            chapterList: [],
            chapterName: "",
            sections: [
                {
                    section_id: "",
                    section_name: "",
                    question_type: "",
                    category: "",
                    no_questions: "",
                    marks: "",
                    total_marks: "",
                },
            ],
            page_loading: true,
            is_formSubmitted: false,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.cycle_testId = this.props.match.params.cycle_testId;
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

    loadAutoTestData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/filter/?chapter_name=${this.state.chapterName}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    page_loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        this.setState(
            {
                chapterName: this.props.match.params.chapterName,
            },
            () => {
                this.loadAutoTestData();
            }
        );

        fetch(`${this.url}/teacher/subject/${this.subjectId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    chapterList: result.data.results,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.match.params.chapterName !== this.state.chapterName) {
            this.setState(
                {
                    chapterName: this.props.match.params.chapterName,
                    page_loading: true,
                },
                () => {
                    this.loadAutoTestData();
                }
            );
        }

        // if (
        //     prevState.is_formSubmitted !== this.state.is_formSubmitted &&
        //     this.state.is_formSubmitted === true
        // ) {
        //     this.loadChapterData();
        //     this.setState({
        //         is_formSubmitted: false,
        //     });
        // }
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
            pathname: `/teacher/subject/${this.subjectId}/${event.value}/cycle/${this.cycle_testId}`,
        });
        this.setState(
            {
                chapterName: event.value,
                page_loading: true,
            },
            () => {
                this.loadAutoTestData();
            }
        );
    };

    handleSection_name = (index, event) => {
        const section = [...this.state.sections];
        section[index].section_name = event.target.value;
        this.setState({
            sections: section,
        });
    };
    handleSection_questions = (index, event) => {
        const section = [...this.state.sections];
        section[index].question_type = event.target.value;
        this.setState({
            sections: section,
        });
    };
    handleSection_category = (index, event) => {
        const section = [...this.state.sections];
        section[index].category = event.target.value;
        this.setState({
            sections: section,
        });
    };
    handleSection_questions = (index, event) => {
        const section = [...this.state.sections];
        section[index].no_questions = event.target.value;
        this.setState({
            sections: section,
        });
    };
    handleSection_marks = (index, event) => {
        const section = [...this.state.sections];
        section[index].marks = event.target.value;
        this.setState({
            sections: section,
        });
    };
    handleSection_totalmarks = (index, event) => {
        const section = [...this.state.sections];
        section[index].total_marks = event.target.value;
        this.setState({
            sections: section,
        });
    };

    addSection = () => {
        const sections = [...this.state.sections];
        sections.push({
            section_id: "",
            section_name: "",
            question_type: "",
            category: "",
            no_questions: "",
            marks: "",
            total_marks: "",
        });
        this.setState({
            sections: sections,
        });
    };

    removeSection = (index) => {
        const sections = [...this.state.sections];
        sections.splice(index, 1);
        this.setState({
            sections: sections,
        });
    };

    render() {
        document.title = `${this.state.chapterName} - Teacher | IQLabs`;
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
                                <h6 className="mb-0">
                                    {this.state.chapterName}
                                </h6>
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
                                        <input
                                            type="text"
                                            name="duration"
                                            className="form-control form-shadow"
                                            placeholder="Enter time duration"
                                        />
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
                                <button className="btn btn-primary btn-sm mr-2">
                                    Save
                                </button>
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
                                            <th scope="col"></th>
                                            <th scope="col">
                                                Section Description
                                            </th>
                                            <th scope="col">Question Type</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">
                                                No. of Questions
                                            </th>
                                            <th scope="col">Marks</th>
                                            <th scope="col">Total Marks</th>
                                            <th scope="col">View</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.sections.map(
                                            (section, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary-invert shadow-sm btn-sm"
                                                                onClick={() =>
                                                                    this.removeSection(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-minus-circle"></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control form-shadow"
                                                                placeholder="Section Description 01"
                                                                value={
                                                                    section.section_name
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleSection_name(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <select
                                                                name="type"
                                                                id="type"
                                                                className="form-control form-shadow"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleSection_type(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
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
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleSection_category(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
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
                                                                value={
                                                                    section.no_questions
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleSection_questions(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className="form-control form-shadow"
                                                                type="text"
                                                                placeholder="Marks"
                                                                value={
                                                                    section.marks
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleSection_marks(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className="form-control form-shadow"
                                                                type="text"
                                                                placeholder="Total marks"
                                                                value={
                                                                    section.total_marks
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleSection_totalmarks(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/teacher/subject/${this.subjectId}/${this.state.chapterName}/cycle/${this.cycle_testId}/section/${index}`}
                                                            >
                                                                <button className="btn btn-link shadow-sm">
                                                                    <i className="fas fa-eye"></i>
                                                                </button>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-link shadow-sm">
                                                                Save
                                                            </button></td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-body">
                                <button
                                    className="btn btn-light btn-block shadow-sm"
                                    onClick={this.addSection}
                                >
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

export default CycleTestAuto;
