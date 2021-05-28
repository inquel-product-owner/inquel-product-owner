import React, { Component } from "react";
import store from "../../../redux/store";
import { connect } from "react-redux";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../../shared/baseUrl";
import Loading from "../../shared/loader";
import AlertBox from "../../shared/alert";
import { ContentDeleteModal } from "../../shared/contentManagementModal";
import {
    ChapterList,
    ChapterEditModal,
    IndependentSemesterModal,
    IndependentSemesterEditModal,
} from "./contentManagementModal";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
});

class TeacherIndependentSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showChapter_EditModal: false,
            showSemesterModal: false,
            showSemester_EditModal: false,
            showSemester_DeleteModal: false,

            subjectItems: [],
            semesterItems: [],
            chapter_id: [],
            permissions: {},

            selectedChapter: "",
            selectedSemester: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
        this.subjectId = this.props.match.params.subjectId;
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

    toggleChapter_EditModal = (data) => {
        this.setState({
            selectedChapter: data,
            showChapter_EditModal: !this.state.showChapter_EditModal,
        });
    };

    toggleSemesterModal = () => {
        let chapter_id = [];
        for (let i = 0; i < this.state.subjectItems.length; i++) {
            chapter_id.push({
                chapter_id: this.state.subjectItems[i].chapter_id,
                chapter_name: this.state.subjectItems[i].chapter_name,
            });
        }
        this.setState({
            showSemesterModal: !this.state.showSemesterModal,
            chapter_id: chapter_id,
        });
    };

    toggleSemester_EditModal = (data) => {
        let chapter_id = [];
        for (let i = 0; i < this.state.subjectItems.length; i++) {
            chapter_id.push({
                chapter_id: this.state.subjectItems[i].chapter_id,
                chapter_name: this.state.subjectItems[i].chapter_name,
            });
        }
        this.setState({
            selectedSemester: data,
            showSemester_EditModal: !this.state.showSemester_EditModal,
            chapter_id: chapter_id,
        });
    };

    toggleSemester_DeleteModal = (data) => {
        this.setState({
            selectedSemester: data,
            showSemester_DeleteModal: !this.state.showSemester_DeleteModal,
        });
    };

    loadChapterData = () => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        subjectItems: result.data.results,
                        permissions: result.data.permissions,
                        page_loading: false,
                    });
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

    loadSemesterData = () => {
        fetch(
            `${this.url}/teacher/independent/subject/${this.subjectId}/semester/`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        semesterItems: result.data,
                        page_loading: false,
                    });
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
        document.title = `${this.props.subject_name} - Teacher | IQLabs`;

        this.loadChapterData();
        this.loadSemesterData();
    };

    chapterFormSubmission = () => {
        setTimeout(() => {
            this.setState({
                showChapter_EditModal: false,
            });
        }, 1000);
        this.loadChapterData();
    };

    semesterFormSubmission = () => {
        setTimeout(() => {
            this.setState({
                showSemesterModal: false,
                showSemester_EditModal: false,
                showSemester_DeleteModal: false,
            });
        }, 1000);
        this.loadSemesterData();
    };

    dispatchChapter = (data) => {
        store.dispatch({ type: "CHAPTER", payload: data });
    };

    dispatchSemester = (data) => {
        store.dispatch({ type: "SEMESTER", payload: data });
    };

    render() {
        return (
            <div className="wrapper">
                {/* ----- Navbar ----- */}
                <Header
                    name={this.props.subject_name}
                    togglenav={this.toggleSideNav}
                />

                {/* ----- Alert message ----- */}
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

                {/* ----- Sidebar ----- */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* ----- Chapter Edit modal ----- */}
                {this.state.showChapter_EditModal ? (
                    <ChapterEditModal
                        show={this.state.showChapter_EditModal}
                        onHide={this.toggleChapter_EditModal}
                        formSubmission={this.chapterFormSubmission}
                        subjectId={this.subjectId}
                        data={this.state.selectedChapter}
                    />
                ) : (
                    ""
                )}

                {/* ----- Semester modal ----- */}
                {this.state.showSemesterModal ? (
                    <IndependentSemesterModal
                        show={this.state.showSemesterModal}
                        onHide={this.toggleSemesterModal}
                        formSubmission={this.semesterFormSubmission}
                        chapter_id={this.state.chapter_id}
                        subjectId={this.subjectId}
                    />
                ) : (
                    ""
                )}

                {/* ----- Semester Edit modal ----- */}
                {this.state.showSemester_EditModal ? (
                    <IndependentSemesterEditModal
                        show={this.state.showSemester_EditModal}
                        onHide={this.toggleSemester_EditModal}
                        formSubmission={this.semesterFormSubmission}
                        subjectId={this.subjectId}
                        chapter_id={this.state.chapter_id}
                        data={this.state.selectedSemester}
                    />
                ) : (
                    ""
                )}

                {/* ----- Semester Delete modal ----- */}
                {this.state.showSemester_DeleteModal ? (
                    <ContentDeleteModal
                        show={this.state.showSemester_DeleteModal}
                        onHide={this.toggleSemester_DeleteModal}
                        formSubmission={this.semesterFormSubmission}
                        url={`${this.url}/teacher/subject/${this.subjectId}/semester/`}
                        type="Semester"
                        name={this.state.selectedSemester.semester_name}
                        data={{
                            semester_id:
                                this.state.selectedSemester.semester_id,
                        }}
                        toggleModal={this.toggleSemester_DeleteModal}
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

                        {/* Header area */}
                        {/* ----- Breadcrumb ----- */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-3">
                                <li className="breadcrumb-item">
                                    <Link to="/teacher">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    <span>Subject:</span>
                                    {this.props.subject_name}
                                </li>
                            </ol>
                        </nav>

                        <div className="card shadow-sm mb-3">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="primary-bg text-white">
                                        <tr>
                                            <th scope="col">
                                                Chapter structure
                                            </th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Weightage</th>
                                            <th scope="col">Summary</th>
                                            <th
                                                scope="col"
                                                className="text-right"
                                            >
                                                Add content
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* ----- Chapter list ----- */}
                                        {this.state.subjectItems.length !== 0
                                            ? this.state.subjectItems.map(
                                                  (chapter, index) => {
                                                      return (
                                                          <ChapterList
                                                              key={index}
                                                              chapter={chapter}
                                                              dispatchChapter={
                                                                  this
                                                                      .dispatchChapter
                                                              }
                                                              toggleChapter_EditModal={
                                                                  this
                                                                      .toggleChapter_EditModal
                                                              }
                                                              url={
                                                                  this.props
                                                                      .match.url
                                                              }
                                                              permissions={
                                                                  this.state
                                                                      .permissions
                                                              }
                                                          />
                                                      );
                                                  }
                                              )
                                            : null}

                                        {/* ----- Semester list ----- */}
                                        {this.state.semesterItems.length !== 0
                                            ? this.state.semesterItems.map(
                                                  (data, index) => {
                                                      return (
                                                          <tr key={index}>
                                                              <td>
                                                                  {
                                                                      data.semester_name
                                                                  }
                                                              </td>
                                                              <td></td>
                                                              <td></td>
                                                              <td></td>
                                                              <td className="d-flex justify-content-end">
                                                                  {/* checks if auto permission exist */}
                                                                  {data.auto_test_perm ===
                                                                  true ? (
                                                                      <Link
                                                                          to={`${this.props.match.url}/semester/${data.semester_id}`}
                                                                      >
                                                                          <button
                                                                              className="btn btn-primary btn-sm shadow-none"
                                                                              onClick={() =>
                                                                                  this.dispatchSemester(
                                                                                      data.semester_name
                                                                                  )
                                                                              }
                                                                          >
                                                                              Auto
                                                                          </button>
                                                                      </Link>
                                                                  ) : (
                                                                      // or else prints nothing
                                                                      ""
                                                                  )}
                                                                  <Dropdown>
                                                                      <Dropdown.Toggle
                                                                          variant="white"
                                                                          className="btn btn-link btn-sm shadow-none caret-off ml-2"
                                                                      >
                                                                          <i className="fas fa-ellipsis-v"></i>
                                                                      </Dropdown.Toggle>

                                                                      <Dropdown.Menu>
                                                                          <Dropdown.Item
                                                                              onClick={() =>
                                                                                  this.toggleSemester_EditModal(
                                                                                      data
                                                                                  )
                                                                              }
                                                                          >
                                                                              <i className="far fa-edit fa-sm mr-1"></i>{" "}
                                                                              Edit
                                                                          </Dropdown.Item>
                                                                          <Dropdown.Item
                                                                              onClick={() =>
                                                                                  this.toggleSemester_DeleteModal(
                                                                                      data
                                                                                  )
                                                                              }
                                                                          >
                                                                              <i className="far fa-trash-alt fa-sm mr-1"></i>{" "}
                                                                              Delete
                                                                          </Dropdown.Item>
                                                                      </Dropdown.Menu>
                                                                  </Dropdown>
                                                              </td>
                                                          </tr>
                                                      );
                                                  }
                                              )
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <button
                            className="btn btn-tomato btn-block shadow-sm"
                            onClick={this.toggleSemesterModal}
                        >
                            Add Semester Exam
                        </button>

                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(TeacherIndependentSubject);
