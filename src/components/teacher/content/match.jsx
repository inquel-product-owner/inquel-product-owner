import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import CKeditor from "../../sharedComponents/CKeditor";
import { Accordion, Card } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../../shared/baseUrl.js";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import { ContentDeleteModal } from "../../sharedComponents/contentManagementModal";
import TemplateUpload from "../shared/templateUpload";

const mapStateToProps = (state) => ({
    group_name: state.group_name,
    subject_name: state.subject_name,
    chapter_name: state.chapter_name,
    topic_name: state.topic_name,
});

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showDeleteModal: false,
            showTemplateUploadModal: false,

            alertMsg: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,

            contentCollapsed: true,
            showEdit_option: false,
            activeMatch: "",
            selectedMatch: "",

            match: [
                {
                    match_id: "",
                    match_terms: "<p>Match terms goes here</p>",
                    match_definition: "<p>Match definition goes here</p>",
                },
            ],
        };
        this.groupId = this.props.match.params.groupId;
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.topicNum = this.props.match.params.topicNum;
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

    // -------------------------- Template uploading --------------------------

    toggleTemplateModal = () => {
        this.setState({
            showTemplateUploadModal: !this.state.showTemplateUploadModal,
        });
    };

    templateFormSubmission = (data) => {
        this.setState({
            page_loading: true,
            showTemplateUploadModal: false,
        });
        this.loadMatchData();
    };

    // -------------------------- Form submission --------------------------

    loadMatchData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/${this.chapterId}/match/?topic_num=${this.topicNum}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let data = [];
                    let response = result.data.results;
                    if (response.length !== 0) {
                        for (let i = 0; i < response.length; i++) {
                            data.push({
                                match_id: response[i].match_id,
                                match_terms: response[i].match_terms,
                                match_definition: response[i].match_definition,
                            });
                        }
                        this.setState({
                            match: data,
                            page_loading: false,
                        });
                    } else {
                        this.setState({
                            page_loading: false,
                        });
                    }
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = `${this.props.topic_name} Match - Teacher | IQLabs`;

        this.loadMatchData();
    };

    handleSubmit = () => {
        this.setState({
            page_loading: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        const data = [...this.state.match];

        if (data[this.state.activeMatch].match_terms === "") {
            this.setState({
                errorMsg: "Term is required",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (data[this.state.activeMatch].match_definition === "") {
            this.setState({
                errorMsg: "Definition is required",
                showErrorAlert: true,
                page_loading: false,
            });
        } else {
            if (data[this.state.activeMatch].match_id === "") {
                this.handlePOST(data);
            } else {
                this.handlePATCH(data);
            }
        }
    };

    handlePOST = (data) => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/${this.chapterId}/match/`,
            {
                headers: this.headers,
                method: "POST",
                body: JSON.stringify({
                    topic_num: this.topicNum,
                    match_terms: data[this.state.activeMatch].match_terms,
                    match_definition:
                        data[this.state.activeMatch].match_definition,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            page_loading: false,
                        },
                        () => {
                            this.setState({
                                showEdit_option: false,
                            });
                            this.loadMatchData();
                        }
                    );
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handlePATCH = (data) => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/${this.chapterId}/match/`,
            {
                headers: this.headers,
                method: "PATCH",
                body: JSON.stringify({
                    match_id: data[this.state.activeMatch].match_id,
                    match_terms: data[this.state.activeMatch].match_terms,
                    match_definition:
                        data[this.state.activeMatch].match_definition,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            page_loading: false,
                        },
                        () => {
                            this.setState({
                                showEdit_option: false,
                            });
                            this.loadMatchData();
                        }
                    );
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // -------------------------- Collapse --------------------------

    toggleCollapse = () => {
        this.setState({
            contentCollapsed: true,
        });
        this.setState({
            contentCollapsed: !this.state.contentCollapsed,
        });
    };

    // -------------------------- Match & Explanation --------------------------

    handleTerms = (evt) => {
        const values = [...this.state.match];
        values[this.state.activeMatch].match_terms = evt.editor.getData();
        this.setState({
            match: values,
        });
    };

    handleDefinition = (evt) => {
        const values = [...this.state.match];
        values[this.state.activeMatch].match_definition = evt.editor.getData();
        this.setState({
            match: values,
        });
    };

    // -------------------------- Adding, Removing, Deleting match --------------------------

    handleAddNew = () => {
        const values = [...this.state.match];
        values.push({
            match_id: "",
            match_terms: "<p>Match terms goes here</p>",
            match_definition: "<p>Match definition goes here</p>",
        });
        this.setState({
            match: values,
            activeMatch: values.length - 1,
        });
    };

    handleCopy = (index) => {
        const values = [...this.state.match];

        values.splice(index + 1, 0, {
            match_id: "",
            match_terms: values[index].match_terms,
            match_definition: values[index].match_definition,
        });
        this.setState({
            match: values,
            activeMatch: index + 1,
        });
    };

    handleEdit = (index) => {
        this.setState({
            showEdit_option: true,
            activeMatch: index,
            showErrorAlert: false,
            showSuccessAlert: false,
        });
    };

    handleDelete = (index) => {
        const values = [...this.state.match];
        this.setState({
            showEdit_option: false,
            contentCollapsed: true,
            activeMatch: index,
        });

        if (values[index].match_id !== "") {
            this.setState({
                selectedMatch: values[index].match_id,
                showDeleteModal: !this.state.showDeleteModal,
            });
        } else {
            values.splice(index, 1);
            this.setState(
                {
                    match: values,
                    activeMatch: "",
                },
                () => {
                    if (values.length === 0) {
                        values.push({
                            match_id: "",
                            match_terms: "<p>Match terms goes here</p>",
                            match_definition:
                                "<p>Match definition goes here</p>",
                        });
                        this.setState({
                            match: values,
                        });
                    }
                }
            );
        }
    };

    toggleDeleteModal = () => {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
        });
    };

    handleMatch_Deletion = () => {
        const values = [...this.state.match];
        values.splice(this.state.activeMatch, 1);
        this.setState(
            {
                match: values,
                activeMatch: "",
            },
            () => {
                if (values.length === 0) {
                    values.push({
                        match_id: "",
                        match_terms: "<p>Match terms goes here</p>",
                        match_definition: "<p>Match definition goes here</p>",
                    });
                    this.setState({
                        match: values,
                    });
                }
            }
        );
        this.setState(
            {
                showDeleteModal: false,
                page_loading: true,
            },
            () => {
                this.loadMatchData();
            }
        );
    };

    // -------------------------- Publishing the match --------------------------

    handlePublish = () => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            page_loading: true,
        });

        const match = [...this.state.match];
        let id = [];
        for (let i = 0; i < match.length; i++) {
            if (match[i].match_id !== "") {
                id.push(match[i].match_id);
            } else {
                continue;
            }
        }

        if (id.length !== 0) {
            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/${this.chapterId}/match/publish/`,
                {
                    headers: this.headers,
                    method: "POST",
                    body: JSON.stringify({
                        match_ids: id,
                    }),
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.sts === true) {
                        this.setState({
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            page_loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            page_loading: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({
                page_loading: false,
            });
        }
    };

    render() {
        let data = [...this.state.match];
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.subject_name}
                    togglenav={this.toggleSideNav}
                />

                {/* ALert message */}
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

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Match Deletion Modal */}
                {this.state.showDeleteModal ? (
                    <ContentDeleteModal
                        show={this.state.showDeleteModal}
                        onHide={this.toggleDeleteModal}
                        formSubmission={this.handleMatch_Deletion}
                        url={`${this.url}/teacher/subject/${this.subjectId}/chapter/${this.chapterId}/match/`}
                        type="match"
                        name=""
                        data={{
                            match_id: this.state.selectedMatch,
                        }}
                        toggleModal={this.toggleDeleteModal}
                    />
                ) : null}

                {/* Template uploading Modal */}
                {this.state.showTemplateUploadModal ? (
                    <TemplateUpload
                        show={this.state.showTemplateUploadModal}
                        onHide={this.toggleTemplateModal}
                        formSubmission={this.templateFormSubmission}
                        toggleModal={this.toggleTemplateModal}
                        url={`${this.url}/teacher/subject/${this.subjectId}/chapter/${this.chapterId}/match/upload/`}
                        type="match"
                        subjectId={this.subjectId}
                        chapterId={this.chapterId}
                        topic_num={this.topicNum}
                    />
                ) : null}

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <div className="row">
                            {/* ------------------------------ Match column ------------------------------ */}
                            <div
                                className={`${
                                    this.state.showEdit_option
                                        ? "col-md-9"
                                        : "col-12"
                                } mb-4 mb-md-0`}
                            >
                                {/* Back button */}
                                <button
                                    className="btn btn-primary-invert btn-sm mb-3"
                                    onClick={this.props.history.goBack}
                                >
                                    <i className="fas fa-chevron-left fa-sm"></i>{" "}
                                    Back
                                </button>

                                {/* ----- Breadcrumb ----- */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-3">
                                        <li className="breadcrumb-item">
                                            <Link to="/teacher">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        {this.groupId !== undefined ? (
                                            <>
                                                <li className="breadcrumb-item">
                                                    <Link
                                                        to={`/teacher/group/${this.groupId}`}
                                                    >
                                                        {this.props.group_name}
                                                    </Link>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <Link
                                                        to={`/teacher/group/${this.groupId}/subject/${this.subjectId}`}
                                                    >
                                                        {
                                                            this.props
                                                                .subject_name
                                                        }
                                                    </Link>
                                                </li>
                                            </>
                                        ) : (
                                            <li className="breadcrumb-item">
                                                <Link
                                                    to={`/teacher/subject/${this.subjectId}`}
                                                >
                                                    {this.props.subject_name}
                                                </Link>
                                            </li>
                                        )}
                                        <li className="breadcrumb-item">
                                            <Link
                                                to="#"
                                                onClick={
                                                    this.props.history.goBack
                                                }
                                            >
                                                {this.props.chapter_name}
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            Match
                                        </li>
                                    </ol>
                                </nav>

                                {/* Header area */}
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-6">
                                        <h5 className="primary-text mb-0">
                                            {`Match - ${this.props.topic_name}`}
                                        </h5>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex flex-wrap justify-content-end">
                                            <button
                                                className="btn btn-primary btn-sm shadow-none mr-1"
                                                onClick={this.handlePublish}
                                            >
                                                Publish
                                            </button>
                                            <a
                                                href="https://iqlabs-media-type1.s3.us-east-2.amazonaws.com/media/Match/Templates/TeacherMatchTemplate.xlsx"
                                                className="btn btn-primary btn-sm shadow-none mr-1"
                                                download
                                            >
                                                Download template
                                            </a>
                                            <button
                                                className="btn btn-primary btn-sm shadow-none"
                                                onClick={
                                                    this.toggleTemplateModal
                                                }
                                            >
                                                Upload template
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* -------------------- MCQ -------------------- */}
                                {this.state.match.map((match, match_index) => {
                                    return (
                                        <div
                                            className="row mb-3"
                                            key={match_index}
                                        >
                                            {/* ---------- Side buttons ---------- */}
                                            <div className="col-md-1 mb-1 mb-md-0">
                                                <div className="row">
                                                    <div className="col-md-12 col-3 mb-1">
                                                        <button
                                                            type="button"
                                                            className="btn btn-light bg-white btn-block shadow-sm mr-2"
                                                        >
                                                            {match_index <= 8
                                                                ? `0${
                                                                      match_index +
                                                                      1
                                                                  }`
                                                                : match_index +
                                                                  1}
                                                        </button>
                                                    </div>
                                                    <div className="col-md-12 col-3 mb-1">
                                                        <button
                                                            type="button"
                                                            className="btn btn-light bg-white btn-block shadow-sm mr-2"
                                                            onClick={() =>
                                                                this.handleEdit(
                                                                    match_index
                                                                )
                                                            }
                                                        >
                                                            <i className="far fa-edit fa-sm"></i>
                                                        </button>
                                                    </div>
                                                    <div className="col-md-12 col-3 mb-1">
                                                        <button
                                                            type="button"
                                                            className="btn btn-light bg-white btn-block shadow-sm mr-1"
                                                            onClick={() =>
                                                                this.handleCopy(
                                                                    match_index
                                                                )
                                                            }
                                                        >
                                                            <i className="far fa-copy fa-sm"></i>
                                                        </button>
                                                    </div>
                                                    <div className="col-md-12 col-3">
                                                        <button
                                                            type="button"
                                                            className="btn btn-light bg-white btn-block shadow-sm"
                                                            onClick={() =>
                                                                this.handleDelete(
                                                                    match_index
                                                                )
                                                            }
                                                        >
                                                            <i className="far fa-trash-alt fa-sm"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ---------- match preview ---------- */}
                                            <div className="col-md-11 pl-md-0">
                                                <div
                                                    className={`card shadow-sm ${
                                                        this.state
                                                            .activeMatch ===
                                                        match_index
                                                            ? "border-primary"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="card-body">
                                                        <div className="row">
                                                            {/* ----- Terms & Definition ----- */}
                                                            <div className="col-md-6 mb-2 mb-md-0">
                                                                <div className="card bg-light">
                                                                    <div
                                                                        className="card-body py-3"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                                match.match_terms,
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="card bg-light">
                                                                    <div
                                                                        className="card-body py-3"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                                match.match_definition,
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                <button
                                    className="btn btn-primary btn-block shadow-none"
                                    onClick={this.handleAddNew}
                                >
                                    Add +
                                </button>
                            </div>

                            {/* ---------- Settings column ---------- */}
                            {this.state.showEdit_option ? (
                                <div className="col-md-3 content-edit">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handleSubmit}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-link btn-sm shadow-none"
                                            onClick={() => {
                                                this.setState({
                                                    showEdit_option: false,
                                                    contentCollapsed: true,
                                                    activeMatch: "",
                                                });
                                            }}
                                        >
                                            Close
                                        </button>
                                    </div>

                                    <Accordion defaultActiveKey="">
                                        {/* ----- Content ----- */}
                                        <Card className="shadow-sm mb-2">
                                            <Accordion.Toggle
                                                as={Card.Body}
                                                variant="link"
                                                eventKey="0"
                                                className="text-dark"
                                                style={{ cursor: "default" }}
                                                onClick={this.toggleCollapse}
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    Content
                                                    {this.state
                                                        .contentCollapsed ? (
                                                        <i className="fas fa-angle-right "></i>
                                                    ) : (
                                                        <i className="fas fa-angle-down "></i>
                                                    )}
                                                </div>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body className="p-3">
                                                    {/* ---------- Terms ---------- */}
                                                    <div className="form-group">
                                                        <label>Terms</label>
                                                        <CKeditor
                                                            data={
                                                                data[
                                                                    this.state
                                                                        .activeMatch
                                                                ].match_terms
                                                            }
                                                            onChange={
                                                                this.handleTerms
                                                            }
                                                        />
                                                    </div>

                                                    {/* ---------- Definition ---------- */}
                                                    <div className="form-group">
                                                        <label>
                                                            Definition
                                                        </label>
                                                        <CKeditor
                                                            data={
                                                                data[
                                                                    this.state
                                                                        .activeMatch
                                                                ]
                                                                    .match_definition
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleDefinition
                                                            }
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Match);
