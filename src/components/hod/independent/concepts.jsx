import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import ReactCardFlip from "react-card-flip";
import Loading from "../../common/loader";
import AlertBox from "../../common/alert";
import FileModal from "../shared/fileExplorer";
import { ConceptDataFormat } from "../../common/function/dataFormating";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
    chapter_name: state.content.chapter_name,
    topic_name: state.content.topic_name,
});

class HODSubjectConcepts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,

            concepts: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,

            selectedImage: "",
            selectedVideo: "",
            selectedAudio: "",
            flipState: [false],
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.topicNum = this.props.match.params.topicNum;
        this.url = baseUrl + hodUrl;
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

    toggleModal = (image, video, audio) => {
        this.setState({
            showModal: !this.state.showModal,
            selectedImage: image,
            selectedVideo: video,
            selectedAudio: audio,
        });
    };

    // -------------------------- Load concept data --------------------------

    loadConceptData = async (path) => {
        var apiURL =
            path === undefined || path === null
                ? `${this.url}/hod/subject/${this.subjectId}/chapter/${this.chapterId}/${this.topicNum}/concepts/`
                : path;
        await fetch(apiURL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    let data = [...this.state.concepts];
                    if (
                        result.data.results &&
                        result.data.results.length !== 0
                    ) {
                        let conceptData = ConceptDataFormat(
                            result.data.results
                        );
                        data.push(...conceptData.result);

                        this.setState(
                            {
                                concepts: data,
                            },
                            () => {
                                if (result.data.next !== null) {
                                    this.loadConceptData(result.data.next);
                                } else {
                                    this.setState({
                                        page_loading: false,
                                    });
                                }
                            }
                        );
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
        window.MathJax.typeset();
    };

    componentDidMount = () => {
        document.title = `${this.props.topic_name} : Concepts - HOD | IQLabs`;

        this.loadConceptData();
    };

    handleFlip = (index) => {
        const flips = [...this.state.flipState];
        flips[index] = !flips[index];
        this.setState({
            flipState: flips,
        });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.subject_name}
                    togglenav={this.toggleSideNav}
                />

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

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* File viewing Modal */}
                {this.state.showModal ? (
                    <FileModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        image={this.state.selectedImage}
                        video={this.state.selectedVideo}
                        audio={this.state.selectedAudio}
                    />
                ) : null}

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

                        {/* ----- Breadcrumb ----- */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-3">
                                <li className="breadcrumb-item">
                                    <Link to="/hod">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/hod/subject/${this.subjectId}`}>
                                        {this.props.subject_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        {this.props.chapter_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Concepts
                                </li>
                            </ol>
                        </nav>

                        {/* Header area */}
                        <h5 className="primary-text mb-4">
                            {`Concepts - ${this.props.topic_name}`}
                        </h5>

                        {/* -------------------- Concepts -------------------- */}
                        {this.state.concepts.length !== 0
                            ? this.state.concepts.map((concept, c_index) => {
                                  return (
                                      <div
                                          className="d-flex align-items-start mb-3"
                                          key={c_index}
                                      >
                                          {/* ---------- Side buttons ---------- */}
                                          <div
                                              className="bg-white small font-weight-bold-600 rounded-lg shadow-sm text-nowrap mr-2"
                                              style={{
                                                  paddingTop: "8px",
                                                  paddingBottom: "8px",
                                                  paddingLeft: "12px",
                                                  paddingRight: "12px",
                                                  userSelect: "none",
                                              }}
                                          >
                                              {c_index <= 8
                                                  ? `0${c_index + 1}`
                                                  : c_index + 1}
                                          </div>

                                          {/* ---------- Concept preview ---------- */}
                                          <div className="w-100">
                                              <ReactCardFlip
                                                  isFlipped={
                                                      this.state.flipState[
                                                          c_index
                                                      ]
                                                  }
                                                  flipDirection="vertical"
                                              >
                                                  <div
                                                      className="card shadow-sm"
                                                      style={{
                                                          minHeight: "120px",
                                                      }}
                                                      onClick={() =>
                                                          this.handleFlip(
                                                              c_index
                                                          )
                                                      }
                                                  >
                                                      <div className="card-body">
                                                          <div className="d-flex align-items-start">
                                                              {/* term */}
                                                              <div
                                                                  className="w-100"
                                                                  dangerouslySetInnerHTML={{
                                                                      __html: concept
                                                                          .content
                                                                          .terms,
                                                                  }}
                                                              ></div>
                                                              {/* File modal button */}
                                                              {concept.content
                                                                  .images
                                                                  .length !==
                                                                  0 ||
                                                              concept.content
                                                                  .video
                                                                  .path !==
                                                                  "" ||
                                                              concept.content
                                                                  .audio
                                                                  .length !==
                                                                  0 ? (
                                                                  <button
                                                                      className="btn btn-light bg-white shadow-sm ml-3"
                                                                      onClick={(
                                                                          e
                                                                      ) => {
                                                                          this.toggleModal(
                                                                              concept
                                                                                  .content
                                                                                  .images,
                                                                              concept
                                                                                  .content
                                                                                  .video,
                                                                              concept
                                                                                  .content
                                                                                  .audio
                                                                          );
                                                                          e.stopPropagation();
                                                                      }}
                                                                  >
                                                                      <i className="far fa-folder-open"></i>
                                                                  </button>
                                                              ) : (
                                                                  ""
                                                              )}
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div
                                                      className="card shadow-sm"
                                                      style={{
                                                          minHeight: "120px",
                                                      }}
                                                      onClick={() =>
                                                          this.handleFlip(
                                                              c_index
                                                          )
                                                      }
                                                  >
                                                      <div className="card-body">
                                                          <div className="d-flex align-items-start">
                                                              {/* definition */}
                                                              <div
                                                                  className="w-100"
                                                                  dangerouslySetInnerHTML={{
                                                                      __html: concept
                                                                          .content
                                                                          .definition,
                                                                  }}
                                                              ></div>
                                                              {/* File modal button */}
                                                              {concept.content
                                                                  .images
                                                                  .length !==
                                                                  0 ||
                                                              concept.content
                                                                  .video
                                                                  .path !==
                                                                  "" ||
                                                              concept.content
                                                                  .audio
                                                                  .length !==
                                                                  0 ? (
                                                                  <button
                                                                      className="btn btn-light bg-white shadow-sm ml-3"
                                                                      onClick={(
                                                                          e
                                                                      ) => {
                                                                          this.toggleModal(
                                                                              concept
                                                                                  .content
                                                                                  .images,
                                                                              concept
                                                                                  .content
                                                                                  .video,
                                                                              concept
                                                                                  .content
                                                                                  .audio
                                                                          );
                                                                          e.stopPropagation();
                                                                      }}
                                                                  >
                                                                      <i className="far fa-folder-open"></i>
                                                                  </button>
                                                              ) : (
                                                                  ""
                                                              )}
                                                          </div>
                                                      </div>
                                                  </div>
                                              </ReactCardFlip>
                                          </div>
                                      </div>
                                  );
                              })
                            : "No content to display..."}

                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(HODSubjectConcepts);
