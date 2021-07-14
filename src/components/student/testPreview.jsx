import React, { Component, useState, useEffect } from "react";
import Header from "./shared/examNavbar";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import { Document, Page, pdfjs } from "react-pdf";
import dateFormat from "dateformat";
import { connect } from "react-redux";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import VideoModal from "../common/modal/videoModal";
import { OverlayTrigger, Tooltip, Modal, Popover } from "react-bootstrap";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
    temp: state.storage.temp,
    course_name: state.content.course_name,
});

const ExplanationModal = (props) => {
    const [data, setData] = useState("");

    useEffect(() => {
        async function fetchData() {
            await setData(props.data);
        }
        fetchData();
        window.MathJax.typeset();
    });

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >
            <Modal.Header closeButton>Explanation</Modal.Header>
            <Modal.Body className="position-static">
                <div style={{ minHeight: "50vh" }}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data,
                        }}
                    ></div>
                    <div
                        className="position-absolute"
                        style={{ right: "50px", top: "15px" }}
                    >
                        {(props.audio || []).map((audio, audio_index) => {
                            return audio.path !== "" ? (
                                <OverlayTrigger
                                    trigger="click"
                                    rootClose
                                    key={`popover${audio_index}`}
                                    placement="bottom"
                                    overlay={
                                        <Popover
                                            id={`popover-positioned-bottom${audio_index}`}
                                        >
                                            {audio.title !== "" ? (
                                                <Popover.Title>
                                                    {audio.title}
                                                </Popover.Title>
                                            ) : (
                                                ""
                                            )}
                                            <Popover.Content className="overflow-auto">
                                                <audio
                                                    src={audio.path}
                                                    autoPlay
                                                    controls
                                                    controlsList="nodownload"
                                                ></audio>
                                            </Popover.Content>
                                        </Popover>
                                    }
                                >
                                    <button
                                        className="btn btn-primary btn-sm rounded-circle mr-2 shadow-none"
                                        key={audio_index}
                                    >
                                        <i className="fas fa-volume-up buttton fa-sm"></i>
                                    </button>
                                </OverlayTrigger>
                            ) : (
                                ""
                            );
                        })}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

class TestPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showExplanationModal: false,
            showVideoModal: false,
            selectedData: "",

            questions: [],

            totalSection: 0,
            currentSectionIndex: 0,
            totalSubQuestion: [],
            currentSubQuestionIndex: [],
            totalQuestion: 0,
            section_marks: [],

            selectedImageData: [],
            startIndex: 0,
            isLightBoxOpen: false,
            selectedVideoData: "",
            selectedAudio: [],

            numPages: null,
            pageNumber: 1,
        };
        this.subscriptionId = this.props.match.params.subscriptionId;
        this.courseId = this.props.match.params.courseId;
        this.subjectId = this.props.match.params.subjectId;
        this.cycleTestId = this.props.match.params.cycleTestId;
        this.semesterId = this.props.match.params.semesterId;
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }

    loopAutoSection = async () => {
        let sections = [];
        let questions = [];
        let totalSubQuestion = [];
        let currentSubQuestionIndex = [];
        let totalQuestion = 0;
        let section_marks = [];
        this.props.temp.data.forEach((data) => {
            if (
                data.cycle_test_id === this.cycleTestId ||
                data.semester_id === this.semesterId
            ) {
                // section looping
                data.sections.forEach((section) => {
                    questions = [];
                    let total = [];
                    let current = [];
                    let temp_section_marks = 0;

                    // question looping
                    for (let i = 0; i < section.questions.length; i++) {
                        let images = [];
                        let audio = [];
                        let videoTitle = "";
                        let videoPath = "";
                        totalQuestion++;
                        temp_section_marks += section.questions[i].marks;

                        // type one
                        if (section.questions[i].sub_question === undefined) {
                            total.push(0);
                            current.push(0);

                            if (
                                section.questions[i].files &&
                                section.questions[i].files.length !== 0
                            ) {
                                // image
                                if (section.questions[i].files.type1_image_1) {
                                    images.push({
                                        title: section.questions[i].files
                                            .type1_image_1_title,
                                        file_name: "",
                                        image: null,
                                        path: section.questions[i].files
                                            .type1_image_1,
                                    });
                                }
                                if (section.questions[i].files.type1_image_2) {
                                    images.push({
                                        title: section.questions[i].files
                                            .type1_image_2_title,
                                        file_name: "",
                                        image: null,
                                        path: section.questions[i].files
                                            .type1_image_2,
                                    });
                                }
                                if (section.questions[i].files.type1_image_3) {
                                    images.push({
                                        title: section.questions[i].files
                                            .type1_image_3_title,
                                        file_name: "",
                                        image: null,
                                        path: section.questions[i].files
                                            .type1_image_3,
                                    });
                                }
                                if (section.questions[i].files.type1_image_4) {
                                    images.push({
                                        title: section.questions[i].files
                                            .type1_image_4_title,
                                        file_name: "",
                                        image: null,
                                        path: section.questions[i].files
                                            .type1_image_4,
                                    });
                                }

                                // audio
                                if (section.questions[i].files.type1_audio_1) {
                                    audio.push({
                                        title: section.questions[i].files
                                            .type1_audio_1_title,
                                        file_name: "",
                                        audio: null,
                                        path: section.questions[i].files
                                            .type1_audio_1,
                                    });
                                }
                                if (section.questions[i].files.type1_audio_2) {
                                    audio.push({
                                        title: section.questions[i].files
                                            .type1_audio_2_title,
                                        file_name: "",
                                        audio: null,
                                        path: section.questions[i].files
                                            .type1_audio_2,
                                    });
                                }

                                // video
                                if (
                                    section.questions[i].files.paste_video_url
                                ) {
                                    videoPath =
                                        section.questions[i].files
                                            .paste_video_url;
                                }
                                if (section.questions[i].files.type1_video_1) {
                                    videoPath =
                                        section.questions[i].files
                                            .type1_video_1;
                                }
                                if (
                                    section.questions[i].files
                                        .type1_video_1_title
                                ) {
                                    videoTitle =
                                        section.questions[i].files
                                            .type1_video_1_title;
                                }
                            }

                            questions.push({
                                type: "type_1",
                                question: section.questions[i].question,
                                question_random_id:
                                    section.questions[i].question_random_id,
                                explanation:
                                    section.questions[i].explanation || "",
                                images: images.length !== 0 ? images : [],
                                video: {
                                    title: videoTitle,
                                    file_name: "",
                                    video: null,
                                    path: videoPath,
                                    url: "",
                                },
                                audio: audio.length !== 0 ? audio : [],
                                proper_answer:
                                    section.questions[i].proper_answer || [],
                                answer: section.questions[i].answer || [],
                                marks: section.questions[i].marks,
                            });
                            // type two
                        } else if (
                            section.questions[i].sub_question !== undefined
                        ) {
                            let sub_question = [];
                            total.push(
                                section.questions[i].sub_question.length
                            );
                            current.push(0);

                            // Image
                            if (
                                section.questions[i].files &&
                                Object.entries(section.questions[i].files)
                                    .length !== 0
                            ) {
                                if (section.questions[i].files.type2_image_1) {
                                    images.push({
                                        title: section.questions[i].files
                                            .type2_image_1_title,
                                        file_name: "",
                                        image: null,
                                        path: section.questions[i].files
                                            .type2_image_1,
                                    });
                                }
                                if (section.questions[i].files.type2_image_2) {
                                    images.push({
                                        title: section.questions[i].files
                                            .type2_image_2_title,
                                        file_name: "",
                                        image: null,
                                        path: section.questions[i].files
                                            .type2_image_2,
                                    });
                                }
                                if (section.questions[i].files.type2_image_3) {
                                    images.push({
                                        title: section.questions[i].files
                                            .type2_image_3_title,
                                        file_name: "",
                                        image: null,
                                        path: section.questions[i].files
                                            .type2_image_3,
                                    });
                                }
                                if (section.questions[i].files.type2_image_4) {
                                    images.push({
                                        title: section.questions[i].files
                                            .type2_image_4_title,
                                        file_name: "",
                                        image: null,
                                        path: section.questions[i].files
                                            .type2_image_4,
                                    });
                                }

                                // audio
                                if (section.questions[i].files.type2_audio_1) {
                                    audio.push({
                                        title: section.questions[i].files
                                            .type2_audio_1_title,
                                        file_name: "",
                                        audio: null,
                                        path: section.questions[i].files
                                            .type2_audio_1,
                                    });
                                }
                                if (section.questions[i].files.type2_audio_2) {
                                    audio.push({
                                        title: section.questions[i].files
                                            .type2_audio_2_title,
                                        file_name: "",
                                        audio: null,
                                        path: section.questions[i].files
                                            .type2_audio_2,
                                    });
                                }

                                // video
                                if (
                                    section.questions[i].files.paste_video_url
                                ) {
                                    videoPath =
                                        section.questions[i].files
                                            .paste_video_url;
                                }
                                if (section.questions[i].files.type2_video_1) {
                                    videoPath =
                                        section.questions[i].files
                                            .type2_video_1;
                                }
                                if (
                                    section.questions[i].files
                                        .type2_video_1_title
                                ) {
                                    videoTitle =
                                        section.questions[i].files
                                            .type2_video_1_title;
                                }
                            }

                            for (
                                let j = 0;
                                j < section.questions[i].sub_question.length;
                                j++
                            ) {
                                sub_question.push({
                                    question:
                                        section.questions[i].sub_question[j]
                                            .sub_question || "",
                                    sub_question_id:
                                        section.questions[i].sub_question[j]
                                            .sub_question_id || "",
                                    proper_answer:
                                        section.questions[i].sub_question[j]
                                            .proper_answer || [],
                                    answer:
                                        section.questions[i].sub_question[j]
                                            .answer || [],
                                    marks: section.questions[i].sub_question[j]
                                        .marks,
                                });
                            }

                            questions.push({
                                type: "type_2",
                                question: section.questions[i].question,
                                question_random_id:
                                    section.questions[i].question_random_id,
                                explanation:
                                    section.questions[i].explanation || "",
                                sub_question: sub_question,
                                images: images.length !== 0 ? images : [],
                                video: {
                                    title: videoTitle,
                                    file_name: "",
                                    video: null,
                                    path: videoPath,
                                    url: "",
                                },
                                audio: audio.length !== 0 ? audio : [],
                            });
                        }
                    }

                    totalSubQuestion.push(total);
                    currentSubQuestionIndex.push(current);
                    sections.push(questions);
                    section_marks.push(temp_section_marks);
                });
            }
        });
        await this.setState({
            questions: sections,
            totalSubQuestion: totalSubQuestion,
            currentSubQuestionIndex: currentSubQuestionIndex,
            totalSection: sections.length,
            totalQuestion: totalQuestion,
            section_marks: section_marks,
        });
        window.MathJax.typeset();
    };

    componentDidMount = () => {
        document.title = `${
            this.props.temp.cycle_test_name || this.props.temp.semester_name
        } : Test preview - Student | IQLabs`;

        if (this.props.temp.auto === true) {
            this.loopAutoSection();
        }
    };

    // ---------- Navigation ----------

    handlePrev = async () => {
        await this.setState({
            currentSectionIndex: this.state.currentSectionIndex - 1,
        });
        window.scrollTo(0, 0);
        window.MathJax.typeset();
    };

    handleNext = async () => {
        await this.setState({
            currentSectionIndex: this.state.currentSectionIndex + 1,
        });
        window.scrollTo(0, 0);
        window.MathJax.typeset();
    };

    handleSubQPrev = async (main_index) => {
        let index = this.state.currentSubQuestionIndex;
        index[this.state.currentSectionIndex][main_index] =
            index[this.state.currentSectionIndex][main_index] - 1;
        await this.setState({
            currentSubQuestionIndex: index,
        });
        window.MathJax.typeset();
    };

    handleSubQNext = async (main_index) => {
        let index = this.state.currentSubQuestionIndex;
        index[this.state.currentSectionIndex][main_index] =
            index[this.state.currentSectionIndex][main_index] + 1;
        await this.setState({
            currentSubQuestionIndex: index,
        });
        window.MathJax.typeset();
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

    toggleModal = (data, audio) => {
        this.setState({
            showExplanationModal: !this.state.showExplanationModal,
            selectedData: data,
            selectedAudio: audio,
        });
    };

    // ---------- Image & Video ----------

    changeImage = (images, index) => {
        let imageArr = [];
        this.setState({
            selectedImageData: [],
            imageStartIndex: 0,
        });
        for (let i = 0; i < images.length; i++) {
            imageArr.push({
                url: images[i].path,
                title: images[i].title,
            });
        }
        this.setState({
            selectedImageData: imageArr,
            imageStartIndex: index,
            isLightBoxOpen: true,
        });
    };

    imageRender = (data) => {
        return (
            <>
                {data.images && data.images.length !== 0
                    ? data.images.map((images, index) => {
                          return images.path !== "" ? (
                              <div
                                  key={index}
                                  className="card preview-img-circle shadow-sm"
                                  style={{
                                      backgroundImage: `url(${images.path})`,
                                  }}
                                  onClick={() => {
                                      this.changeImage(data.images, index);
                                  }}
                              ></div>
                          ) : (
                              ""
                          );
                      })
                    : ""}
                {data.video.path !== "" ? (
                    <OverlayTrigger
                        key="top5"
                        placement="top"
                        overlay={<Tooltip id="tooltip4">Video</Tooltip>}
                    >
                        <button
                            className="btn btn-primary-invert btn-sm shadow-sm rounded-circle shadow-none mt-1"
                            onClick={() => {
                                this.toggleVideoModal(data.video);
                            }}
                        >
                            <i
                                className="fas fa-video fa-sm"
                                style={{
                                    marginLeft: "4px",
                                    marginRight: "1px",
                                    marginBottom: "7px",
                                    marginTop: "7px",
                                }}
                            ></i>
                        </button>
                    </OverlayTrigger>
                ) : (
                    ""
                )}
            </>
        );
    };

    toggleVideoModal = (data) => {
        this.setState({
            showVideoModal: !this.state.showVideoModal,
            selectedVideoData: data,
        });
    };

    render() {
        var data = [];
        if (this.props.temp.auto === true) {
            data = this.state.questions[this.state.currentSectionIndex] || [];
        }
        return (
            <>
                {/* Navbar */}
                <Header
                    name={
                        this.courseId
                            ? this.props.course_name
                            : this.props.subject_name
                    }
                    chapter_name={
                        this.props.temp.cycle_test_name ||
                        this.props.temp.semester_name
                    }
                    goBack={this.props.history.goBack}
                />

                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => window.location.reload()}
                >
                    {/* Explanation modal */}
                    <ExplanationModal
                        show={this.state.showExplanationModal}
                        onHide={this.toggleModal}
                        data={this.state.selectedData}
                        audio={this.state.selectedAudio}
                    />
                </ErrorBoundary>

                {/* Image lightbox */}
                {this.state.isLightBoxOpen ? (
                    <Lightbox
                        images={this.state.selectedImageData}
                        startIndex={this.state.startIndex}
                        onClose={() => {
                            this.setState({
                                isLightBoxOpen: false,
                            });
                        }}
                    />
                ) : (
                    ""
                )}

                {/* ----- Video modal ----- */}
                {this.state.showVideoModal ? (
                    <VideoModal
                        show={this.state.showVideoModal}
                        onHide={this.toggleVideoModal}
                        video={this.state.selectedVideoData}
                    />
                ) : (
                    ""
                )}

                <div className="exam-section">
                    <div className="container-fluid">
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onReset={() => window.location.reload()}
                        >
                            {this.props.temp.direct === true ? (
                                <>
                                    {/* Header configuration */}
                                    <div className="card card-body primary-bg text-white small shadow-sm mb-3">
                                        <div className="row align-items-center justify-content-center text-center">
                                            <div className="col-md-2">
                                                <span className="font-weight-bold-600">
                                                    Exam Date:
                                                </span>{" "}
                                                {dateFormat(
                                                    this.props.temp.data
                                                        .exam_date,
                                                    "dd/mm/yyyy"
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <span className="font-weight-bold-600">
                                                    Submitted On:
                                                </span>{" "}
                                                {dateFormat(
                                                    this.props.temp.data
                                                        .submission_time,
                                                    "dd/mm/yyyy hh:MM"
                                                )}
                                            </div>
                                            <div className="col-md-2">
                                                <span className="font-weight-bold-600">
                                                    Scored Marks:
                                                </span>{" "}
                                                {
                                                    this.props.temp.data
                                                        .obtained_test_marks
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card light-bg shadow-sm">
                                        {/* File displaying */}
                                        <div className="card-body">
                                            <div
                                                className="card card-body secondary-bg text-center"
                                                style={{ minHeight: "40vh" }}
                                            >
                                                <div id="ResumeContainer">
                                                    <Document
                                                        file={
                                                            this.props.temp.data
                                                                .answer_file_url
                                                        }
                                                        onLoadSuccess={
                                                            this
                                                                .onDocumentLoadSuccess
                                                        }
                                                        className={
                                                            "PDFDocument"
                                                        }
                                                    >
                                                        <Page
                                                            pageNumber={
                                                                this.state
                                                                    .pageNumber
                                                            }
                                                            className={
                                                                "PDFPage shadow"
                                                            }
                                                        />
                                                    </Document>
                                                </div>
                                                <p className="my-3">
                                                    Page {this.state.pageNumber}{" "}
                                                    of {this.state.numPages}
                                                </p>
                                                <nav>
                                                    <button
                                                        className="btn btn-primary btn-sm mr-2"
                                                        onClick={
                                                            this.goToPrevPage
                                                        }
                                                        disabled={
                                                            this.state
                                                                .pageNumber ===
                                                            1
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        Prev
                                                    </button>
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={
                                                            this.goToNextPage
                                                        }
                                                        disabled={
                                                            this.state
                                                                .numPages ===
                                                            this.state
                                                                .pageNumber
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        Next
                                                    </button>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* ----- Header Info ----- */}
                                    <div className="card card-body primary-bg text-white shadow-sm py-3 mb-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-2 font-weight-bold-600">
                                                Exam Details
                                            </div>
                                            <div className="col-md-2 small">
                                                Total questions:{" "}
                                                {this.state.totalQuestion <= 9
                                                    ? `0${this.state.totalQuestion}`
                                                    : this.state.totalQuestion}
                                            </div>
                                            <div className="col-md-2 small">
                                                Scored marks:{" "}
                                                {
                                                    this.props.temp.data[0]
                                                        .student_scored_marks
                                                }
                                                /
                                                {
                                                    this.props.temp.data[0]
                                                        .total_marks
                                                }
                                            </div>
                                            <div className="col-md-2 small">
                                                Percentage:{" "}
                                                {
                                                    this.props.temp.data[0]
                                                        .student_percentage
                                                }
                                                %
                                            </div>
                                            <div className="col-md-3 small">
                                                Submitted On:{" "}
                                                {dateFormat(
                                                    this.props.temp.submit_time,
                                                    "dd-mm-yyyy"
                                                )}
                                            </div>
                                            <div className="col-md-1 small font-weight-bold-600">
                                                <div
                                                    className="text-center rounded py-2"
                                                    style={{
                                                        backgroundColor:
                                                            this.props.temp
                                                                .data[0].color,
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {
                                                        this.props.temp.data[0]
                                                            .remarks
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* section details */}
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-md-4 secondary-bg primary-text rounded-lg px-3 py-2">
                                            <div className="row align-items-center">
                                                <div className="col-6 font-weight-bold-600">
                                                    {
                                                        this.props.temp.data[0]
                                                            .sections[
                                                            this.state
                                                                .currentSectionIndex
                                                        ].section_description
                                                    }
                                                </div>
                                                <div className="col-6 small font-weight-bold-600">
                                                    Scored marks:{" "}
                                                    {
                                                        this.state
                                                            .section_marks[
                                                            this.state
                                                                .currentSectionIndex
                                                        ]
                                                    }
                                                    /
                                                    {
                                                        this.props.temp.data[0]
                                                            .sections[
                                                            this.state
                                                                .currentSectionIndex
                                                        ].section_total_marks
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {(data || []).map((question, q_index) => {
                                        return question.type === "type_1" ? (
                                            <div
                                                className="d-flex align-items-start justify-content mb-3"
                                                key={q_index}
                                            >
                                                <button
                                                    className="btn btn-light light-bg btn-sm border-0 shadow-sm mr-1 px-3 font-weight-bold-600 rounded-lg"
                                                    style={{
                                                        cursor: "default",
                                                    }}
                                                >
                                                    {q_index <= 8
                                                        ? `0${q_index + 1}`
                                                        : q_index + 1}
                                                </button>
                                                <div className="card light-bg shadow-sm w-100">
                                                    <div className="card-body">
                                                        <div className="d-flex">
                                                            {/* Questions & options */}
                                                            <div className="w-100">
                                                                <div
                                                                    className="mb-3"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: question.question,
                                                                    }}
                                                                ></div>

                                                                {/* ---------- Options ---------- */}

                                                                {(
                                                                    question.proper_answer ||
                                                                    []
                                                                ).map(
                                                                    (
                                                                        option,
                                                                        option_index
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                className="form-group"
                                                                                key={
                                                                                    option_index
                                                                                }
                                                                            >
                                                                                <div
                                                                                    className={`card shadow-sm ${
                                                                                        (
                                                                                            question.answer ||
                                                                                            []
                                                                                        )
                                                                                            .map(
                                                                                                (
                                                                                                    data
                                                                                                ) =>
                                                                                                    option.content
                                                                                                        ? data
                                                                                                        : data.toLowerCase()
                                                                                            )
                                                                                            .includes(
                                                                                                option.content
                                                                                                    ? option.content
                                                                                                    : option.toLowerCase()
                                                                                            )
                                                                                            ? question.marks >
                                                                                              0
                                                                                                ? "success-bg"
                                                                                                : option.correct
                                                                                                ? "success-bg"
                                                                                                : "danger-bg"
                                                                                            : option.correct ===
                                                                                              true
                                                                                            ? "success-bg"
                                                                                            : "bg-white"
                                                                                    }`}
                                                                                >
                                                                                    <div
                                                                                        className="card-body small font-weight-bold-600 pt-3 pb-0"
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html: `<div class="mb-3">${
                                                                                                option.content !==
                                                                                                undefined
                                                                                                    ? option.content
                                                                                                    : option
                                                                                            }</div>`,
                                                                                        }}
                                                                                    ></div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}

                                                                {/* ---------- Student answers ---------- */}

                                                                {question.proper_answer ? (
                                                                    question.marks ===
                                                                        0 &&
                                                                    question
                                                                        .proper_answer[0]
                                                                        .content ===
                                                                        undefined ? (
                                                                        <div className="row mb-2">
                                                                            <div className="col-md-6">
                                                                                <div
                                                                                    className="card card-body danger-bg h-100"
                                                                                    style={{
                                                                                        minHeight:
                                                                                            "100px",
                                                                                    }}
                                                                                >
                                                                                    <p className="font-weight-bold-600 mb-2">
                                                                                        Your
                                                                                        answer(s):
                                                                                    </p>
                                                                                    {(
                                                                                        question.answer ||
                                                                                        []
                                                                                    ).map(
                                                                                        (
                                                                                            answer,
                                                                                            answer_index
                                                                                        ) => {
                                                                                            return (
                                                                                                <p
                                                                                                    className="small mb-2"
                                                                                                    key={
                                                                                                        answer_index
                                                                                                    }
                                                                                                    dangerouslySetInnerHTML={{
                                                                                                        __html: answer,
                                                                                                    }}
                                                                                                ></p>
                                                                                            );
                                                                                        }
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        ""
                                                                    )
                                                                ) : (
                                                                    ""
                                                                )}

                                                                {/* ----- Explanation ----- */}

                                                                {(question.audio &&
                                                                    question
                                                                        .audio
                                                                        .length !==
                                                                        0) ||
                                                                question.explanation !==
                                                                    "" ? (
                                                                    <button
                                                                        className="btn btn-link btn-sm shadow-none"
                                                                        onClick={() =>
                                                                            this.toggleModal(
                                                                                question.explanation,
                                                                                question.audio
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fas fa-info-circle mr-1"></i>{" "}
                                                                        Explanation
                                                                    </button>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>

                                                            {/* ----- image preview ----- */}
                                                            {question.images
                                                                .length !== 0 ||
                                                            question.video
                                                                .path !== "" ? (
                                                                <div className="ml-3">
                                                                    {this.imageRender(
                                                                        question
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="d-flex align-items-start justify-content mb-3"
                                                key={q_index}
                                            >
                                                <button className="btn btn-light light-bg btn-sm border-0 shadow-sm mr-1 px-3 font-weight-bold-600 rounded-lg">
                                                    {q_index <= 8
                                                        ? `0${q_index + 1}`
                                                        : q_index + 1}
                                                </button>
                                                {/* ---------- Question preview ---------- */}
                                                <div className="card shadow-sm light-bg w-100">
                                                    <div className="d-flex">
                                                        <div className="w-100">
                                                            <div className="card-body">
                                                                {/* ----- Main Question ----- */}
                                                                <div
                                                                    className="mb-3"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: question.question,
                                                                    }}
                                                                ></div>

                                                                <div className="row mb-2">
                                                                    {/* ---------- Student answers ---------- */}
                                                                    <div className="col-md-5 order-2 order-md-1">
                                                                        <div
                                                                            className="card"
                                                                            id="drop-area"
                                                                        >
                                                                            <div className="card-header font-weight-bold-600 pb-0">
                                                                                Your
                                                                                answer(s):
                                                                            </div>
                                                                            <div className="card-body">
                                                                                {(
                                                                                    question.sub_question ||
                                                                                    []
                                                                                ).map(
                                                                                    (
                                                                                        sub_answer,
                                                                                        sub_index
                                                                                    ) => {
                                                                                        return sub_answer
                                                                                            .answer[0] ? (
                                                                                            <div
                                                                                                key={
                                                                                                    sub_index
                                                                                                }
                                                                                                className={`card card-body shadow-sm small font-weight-bold-600 ${
                                                                                                    sub_answer.marks ===
                                                                                                    0
                                                                                                        ? "danger-bg"
                                                                                                        : "success-bg"
                                                                                                } pt-3 pb-0 mb-2`}
                                                                                            >
                                                                                                <div
                                                                                                    dangerouslySetInnerHTML={{
                                                                                                        __html: `<div class="mb-3">${sub_answer.answer[0]}</div>`,
                                                                                                    }}
                                                                                                ></div>
                                                                                            </div>
                                                                                        ) : null;
                                                                                    }
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* ----- Sub Question ----- */}

                                                                    <div className="col-md-7 mb-3 mb-md-0 order-1 order-md-2">
                                                                        <div className="d-flex align-items-start justify-content h-100">
                                                                            <button className="btn secondary-bg btn-sm shadow-sm mr-1 mt-1 px-3 font-weight-bold-600 rounded-lg">
                                                                                {`${
                                                                                    q_index +
                                                                                    1
                                                                                }.${
                                                                                    this
                                                                                        .state
                                                                                        .currentSubQuestionIndex[
                                                                                        this
                                                                                            .state
                                                                                            .currentSectionIndex
                                                                                    ][
                                                                                        q_index
                                                                                    ] +
                                                                                    1
                                                                                }`}
                                                                            </button>

                                                                            {/* ---------- Sub Question preview ---------- */}
                                                                            <div className="card light-bg w-100 d-flex flex-column h-100">
                                                                                <div className="card secondary-bg py-2 px-3 mb-2">
                                                                                    <div
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html: question
                                                                                                .sub_question[
                                                                                                this
                                                                                                    .state
                                                                                                    .currentSubQuestionIndex[
                                                                                                    this
                                                                                                        .state
                                                                                                        .currentSectionIndex
                                                                                                ][
                                                                                                    q_index
                                                                                                ]
                                                                                            ]
                                                                                                .question,
                                                                                        }}
                                                                                    ></div>
                                                                                </div>

                                                                                {/* ---------- Options ---------- */}

                                                                                {(
                                                                                    question
                                                                                        .sub_question[
                                                                                        this
                                                                                            .state
                                                                                            .currentSubQuestionIndex[
                                                                                            this
                                                                                                .state
                                                                                                .currentSectionIndex
                                                                                        ][
                                                                                            q_index
                                                                                        ]
                                                                                    ]
                                                                                        .proper_answer ||
                                                                                    []
                                                                                ).map(
                                                                                    (
                                                                                        option,
                                                                                        option_index
                                                                                    ) => {
                                                                                        return (
                                                                                            <div
                                                                                                className={`card shadow-sm mb-2 ${
                                                                                                    option.correct !==
                                                                                                    undefined
                                                                                                        ? option.correct
                                                                                                            ? "success-bg"
                                                                                                            : "bg-white"
                                                                                                        : ""
                                                                                                }`}
                                                                                                key={
                                                                                                    option_index
                                                                                                }
                                                                                            >
                                                                                                <div
                                                                                                    className="card-body small font-weight-bold-600 pt-3 pb-0"
                                                                                                    dangerouslySetInnerHTML={{
                                                                                                        __html: `<div class="mb-3">${
                                                                                                            option.content !==
                                                                                                            undefined
                                                                                                                ? option.content
                                                                                                                : option
                                                                                                        }</div>`,
                                                                                                    }}
                                                                                                ></div>
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                )}

                                                                                {/* ---------- Navigation button ---------- */}

                                                                                <div className="d-flex align-items-center justify-content-center mt-auto">
                                                                                    <button
                                                                                        className="btn btn-sm primary-text shadow-none"
                                                                                        onClick={() =>
                                                                                            this.handleSubQPrev(
                                                                                                q_index
                                                                                            )
                                                                                        }
                                                                                        disabled={
                                                                                            this
                                                                                                .state
                                                                                                .currentSubQuestionIndex[
                                                                                                this
                                                                                                    .state
                                                                                                    .currentSectionIndex
                                                                                            ][
                                                                                                q_index
                                                                                            ] ===
                                                                                            0
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                    >
                                                                                        <i className="fas fa-arrow-circle-left fa-lg"></i>
                                                                                    </button>
                                                                                    <div className="border-primary small font-weight-bold-600 rounded-lg px-3 py-1 mx-3">
                                                                                        {this
                                                                                            .state
                                                                                            .currentSubQuestionIndex[
                                                                                            this
                                                                                                .state
                                                                                                .currentSectionIndex
                                                                                        ][
                                                                                            q_index
                                                                                        ] +
                                                                                            1}{" "}
                                                                                        /{" "}
                                                                                        {
                                                                                            this
                                                                                                .state
                                                                                                .totalSubQuestion[
                                                                                                this
                                                                                                    .state
                                                                                                    .currentSectionIndex
                                                                                            ][
                                                                                                q_index
                                                                                            ]
                                                                                        }
                                                                                    </div>
                                                                                    <button
                                                                                        className="btn btn-sm primary-text shadow-none"
                                                                                        onClick={() =>
                                                                                            this.handleSubQNext(
                                                                                                q_index
                                                                                            )
                                                                                        }
                                                                                        disabled={
                                                                                            this
                                                                                                .state
                                                                                                .currentSubQuestionIndex[
                                                                                                this
                                                                                                    .state
                                                                                                    .currentSectionIndex
                                                                                            ][
                                                                                                q_index
                                                                                            ] +
                                                                                                1 <
                                                                                            this
                                                                                                .state
                                                                                                .totalSubQuestion[
                                                                                                this
                                                                                                    .state
                                                                                                    .currentSectionIndex
                                                                                            ][
                                                                                                q_index
                                                                                            ]
                                                                                                ? false
                                                                                                : true
                                                                                        }
                                                                                    >
                                                                                        <i className="fas fa-arrow-circle-right fa-lg"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* ----- Explanation ----- */}

                                                                {(question.audio &&
                                                                    question
                                                                        .audio
                                                                        .length !==
                                                                        0) ||
                                                                question.explanation !==
                                                                    "" ? (
                                                                    <button
                                                                        className="btn btn-link btn-sm shadow-none"
                                                                        onClick={() =>
                                                                            this.toggleModal(
                                                                                question.explanation,
                                                                                question.audio
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fas fa-info-circle mr-1"></i>{" "}
                                                                        Explanation
                                                                    </button>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* ----- image preview ----- */}
                                                        {question.images
                                                            .length !== 0 ||
                                                        question.video.path !==
                                                            "" ? (
                                                            <div className="ml-3">
                                                                {this.imageRender(
                                                                    question
                                                                )}
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* ---------- Section navigation ---------- */}
                                    <div className="row">
                                        <div className="col-6">
                                            {this.state.currentSectionIndex !==
                                            0 ? (
                                                <button
                                                    className="btn btn-primary btn-sm shadow-none"
                                                    onClick={this.handlePrev}
                                                >
                                                    <i className="fas fa-angle-left mr-1"></i>{" "}
                                                    {
                                                        this.props.temp.data[0]
                                                            .sections[
                                                            this.state
                                                                .currentSectionIndex -
                                                                1
                                                        ].section_description
                                                    }
                                                </button>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col-6 text-right">
                                            {this.state.currentSectionIndex +
                                                1 <
                                            this.state.totalSection ? (
                                                <button
                                                    className="btn btn-primary btn-sm shadow-none"
                                                    onClick={this.handleNext}
                                                >
                                                    {
                                                        this.props.temp.data[0]
                                                            .sections[
                                                            this.state
                                                                .currentSectionIndex +
                                                                1
                                                        ].section_description
                                                    }
                                                    <i className="fas fa-angle-right ml-2"></i>
                                                </button>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </ErrorBoundary>
                    </div>
                </div>
            </>
        );
    }
}

export default connect(mapStateToProps)(TestPreview);
