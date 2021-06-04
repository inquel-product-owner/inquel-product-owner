import React, { Component } from "react";
import Wrapper from "../wrapper";
import { connect } from "react-redux";
import { Card, Accordion } from "react-bootstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import storeDispatch from "../../../redux/dispatch";
import { CHAPTER, CYCLE, QUIZ, TOPIC } from "../../../redux/action";
import AlertBox from "../../common/alert";
import Loading from "../../common/loader";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
    chapter_name: state.content.chapter_name,
});

class HODSubjectChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,

            chapterList: [],
            chapterId: this.props.match.params.chapterId,
            chapters: {},
            chapterIndex: 1,
            topicEventKey: [],
            teacher_name: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    // ----- Loads data -----

    loadChapterData = () => {
        fetch(
            `${this.url}/hod/subject/${this.subjectId}/chapter/${this.state.chapterId}/`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    storeDispatch(
                        CHAPTER,
                        result.data.chapter_name !== undefined
                            ? result.data.chapter_name
                            : this.props.chapter_name
                    );
                    this.setState({
                        chapters: result.data,
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

    getChapterIndex = () => {
        const chapters = [...this.state.chapterList];
        let index = 0;
        let teacher = "";
        for (let i = 0; i < chapters.length; i++) {
            if (chapters[i].chapter_id === this.state.chapterId) {
                index = i + 1;
                teacher = chapters[i].teacher.full_name;
            }
        }
        this.setState({
            chapterIndex: index,
            teacher_name: teacher,
        });
    };

    componentDidMount = async () => {
        await fetch(`${this.url}/hod/subject/${this.subjectId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState(
                        {
                            chapterList: result.data.chapters,
                        },
                        () => {
                            this.getChapterIndex();
                        }
                    );
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

        this.loadChapterData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.match.params.chapterId !== this.state.chapterId) {
            this.setState(
                {
                    chapterId: this.props.match.params.chapterId,
                    page_loading: true,
                },
                () => {
                    this.loadChapterData();
                    this.getChapterIndex();
                }
            );
        }
    };

    handleSelect = (event) => {
        this.props.history.push({
            pathname: `/hod/subject/${this.subjectId}/chapter/${event.value}`,
        });
        storeDispatch(CHAPTER, event.label);
        this.setState(
            {
                chapterId: event.value,
                page_loading: true,
            },
            () => {
                this.loadChapterData();
                this.getChapterIndex();
            }
        );
    };

    topicRender = (data, index, topic_id) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return (
                <Accordion key={index}>
                    {this.topicRender(topic, index, topic_id)}
                </Accordion>
            );
        });

        return (
            <>
                <Accordion.Toggle
                    as={Card.Header}
                    eventKey={`topic-${index}-${data.topic_num}`}
                    className="bg-light shadow-sm border py-2 mb-2"
                    style={{
                        borderRadius: "8px",
                        cursor: "default",
                    }}
                    onClick={() =>
                        data.child && data.child.length !== 0
                            ? this.toggleTopicCollapse(
                                  `topic-${index}-${data.topic_num}`
                              )
                            : ""
                    }
                >
                    <div className="row align-items-center">
                        <div className="col-4">
                            <div className="row align-items-center">
                                <div className="col-1">
                                    {data.child && data.child.length !== 0 ? (
                                        <div>
                                            <i
                                                className={`fas fa-chevron-circle-down ${
                                                    this.state.topicEventKey.includes(
                                                        `topic-${index}-${data.topic_num}`
                                                    )
                                                        ? "fa-rotate-360"
                                                        : "fa-rotate-270"
                                                }`}
                                            ></i>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col-10 d-flex small font-weight-bold-600">
                                    <div className="mr-3">{data.topic_num}</div>
                                    <div className="w-100">
                                        {data.topic_name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="row align-items-center">
                                <div className="col-2"></div>
                                <div className="col-2"></div>
                                <div className="col-2">
                                    <Link
                                        to={`${this.props.match.url}/${data.topic_num}/match`}
                                    >
                                        <button
                                            className={`btn ${
                                                this.state.chapters.approve
                                                    ? "btn-success"
                                                    : "btn-primary"
                                            } shadow-none`}
                                            onClick={() => {
                                                storeDispatch(
                                                    TOPIC,
                                                    data.topic_name
                                                );
                                            }}
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-2">
                                    <Link
                                        to={`${this.props.match.url}/${data.topic_num}/concepts`}
                                    >
                                        <button
                                            className={`btn ${
                                                this.state.chapters.approve
                                                    ? "btn-success"
                                                    : "btn-primary"
                                            } shadow-none`}
                                            onClick={() => {
                                                storeDispatch(
                                                    TOPIC,
                                                    data.topic_name
                                                );
                                            }}
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-2">
                                    <Link
                                        to={`${this.props.match.url}/${data.topic_num}/typeone`}
                                    >
                                        <button
                                            className={`btn ${
                                                this.state.chapters.approve
                                                    ? "btn-success"
                                                    : "btn-primary"
                                            } shadow-none`}
                                            onClick={() => {
                                                storeDispatch(
                                                    TOPIC,
                                                    data.topic_name
                                                );
                                            }}
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-2">
                                    <Link
                                        to={`${this.props.match.url}/${data.topic_num}/typetwo`}
                                    >
                                        <button
                                            className={`btn ${
                                                this.state.chapters.approve
                                                    ? "btn-success"
                                                    : "btn-primary"
                                            } shadow-none`}
                                            onClick={() => {
                                                storeDispatch(
                                                    TOPIC,
                                                    data.topic_name
                                                );
                                            }}
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Accordion.Toggle>

                <Accordion.Collapse
                    eventKey={`topic-${index}-${data.topic_num}`}
                    className="ml-2"
                >
                    <div>{nestedTopics}</div>
                </Accordion.Collapse>
            </>
        );
    };

    toggleTopicCollapse = (key) => {
        let topicEventKey = this.state.topicEventKey;
        if (topicEventKey.includes(key)) {
            topicEventKey.splice(topicEventKey.indexOf(key), 1);
        } else {
            topicEventKey.push(key);
        }

        this.setState({
            topicEventKey: topicEventKey,
        });
    };

    handlePublish = () => {
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        });

        fetch(
            `${this.url}/hod/subject/${this.subjectId}/chapter/${this.state.chapterId}/approve/`,
            {
                method: "POST",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        page_loading: false,
                    });
                    this.loadChapterData();
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
        document.title = `${this.props.chapter_name} - HOD | IQLabs`;
        return (
            <Wrapper
                header={this.props.subject_name}
                activeLink="dashboard"
                history={this.props.history}
                ref={(ref) => (this.wrapper = ref)}
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

                {/* ----- Breadcrumb ----- */}
                <div className="row align-items-center mb-3">
                    <div className="col-md-6 col-9">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/hod">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        {this.props.subject_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item text-truncate active">
                                    <span>Chapter:</span>
                                    {this.props.chapter_name}
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-6 col-2 text-right">
                        <button
                            className="btn btn-primary btn-sm shadow-none"
                            onClick={this.handlePublish}
                            disabled={this.state.chapters.topics ? false : true}
                        >
                            Approve
                        </button>
                    </div>
                </div>

                <div className="row align-items-center mb-3">
                    <div className="col-md-4 mb-2 mb-md-0">
                        <Select
                            className="basic-single form-shadow"
                            placeholder="Select chapter"
                            isSearchable={true}
                            name="chapter"
                            value={this.state.chapterList.map((list) => {
                                return this.props.chapter_name ===
                                    list.chapter_name
                                    ? {
                                          value: list.chapter_id,
                                          label: list.chapter_name,
                                      }
                                    : "";
                            })}
                            options={this.state.chapterList.map((list) => {
                                return {
                                    value: list.chapter_id,
                                    label: list.chapter_name,
                                };
                            })}
                            onChange={this.handleSelect}
                            required
                        />
                    </div>
                    <div className="col-md-8 d-flex align-items-center justify-content-start justify-content-md-end">
                        <div className="mr-2 primary-text font-weight-bold-600">
                            Assigned to:
                        </div>
                        <div className="p-2 bg-white shadow-sm rounded-lg small font-weight-bold-600">
                            {this.state.teacher_name}
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm" style={{ overflow: "auto" }}>
                    {/* Course details */}
                    <div style={{ minWidth: "1100px" }}>
                        <div className="card-header tomato-bg primary-text font-weight-bold-600">
                            <div className="row align-items-center">
                                <div className="col-4">Topic structure</div>
                                <div className="col-8 small primary-text font-weight-bold">
                                    <div className="row justify-content-end">
                                        <div className="col-2">Summary</div>
                                        <div className="col-2">Notes</div>
                                        <div className="col-2">Match</div>
                                        <div className="col-2">Concept</div>
                                        <div className="col-2">Type 1 Q</div>
                                        <div className="col-2">Type 2 Q</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-3">
                            <Accordion defaultActiveKey="0">
                                <Card className="bg-transparent">
                                    <Accordion.Toggle
                                        as={Card.Header}
                                        eventKey="0"
                                        className="secondary-bg shadow-sm mb-2 py-2"
                                        style={{
                                            borderRadius: "8px",
                                            cursor: "default",
                                        }}
                                        onClick={() => {
                                            this.setState({
                                                collapsed:
                                                    !this.state.collapsed,
                                            });
                                        }}
                                    >
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <div className="row align-items-center">
                                                    <div className="col-1">
                                                        <span>
                                                            <i
                                                                className={`fas fa-chevron-circle-down ${
                                                                    this.state
                                                                        .collapsed
                                                                        ? "fa-rotate-270"
                                                                        : ""
                                                                }`}
                                                            ></i>
                                                        </span>
                                                    </div>
                                                    <div className="col-10 d-flex small font-weight-bold">
                                                        <div className="mr-3">
                                                            {
                                                                this.state
                                                                    .chapterIndex
                                                            }
                                                        </div>
                                                        <div>
                                                            {
                                                                this.props
                                                                    .chapter_name
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-8">
                                                <div className="row align-items-center">
                                                    <div className="col-2">
                                                        {this.state.chapters
                                                            .topics &&
                                                        Object.keys(
                                                            this.state.chapters
                                                                .topics
                                                        ).length !== 0 ? (
                                                            <Link
                                                                to={`${this.props.match.url}/summary`}
                                                            >
                                                                <button
                                                                    className={`btn ${
                                                                        this
                                                                            .state
                                                                            .chapters
                                                                            .approve
                                                                            ? "btn-success"
                                                                            : "btn-primary"
                                                                    } shadow-none`}
                                                                >
                                                                    <i className="fas fa-eye"></i>
                                                                </button>
                                                            </Link>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <div className="col-2">
                                                        {this.state.chapters
                                                            .topics &&
                                                        Object.keys(
                                                            this.state.chapters
                                                                .topics
                                                        ).length !== 0 ? (
                                                            <Link
                                                                to={`${this.props.match.url}/notes`}
                                                            >
                                                                <button
                                                                    className={`btn ${
                                                                        this
                                                                            .state
                                                                            .chapters
                                                                            .approve
                                                                            ? "btn-success"
                                                                            : "btn-primary"
                                                                    } shadow-none`}
                                                                >
                                                                    <i className="fas fa-eye"></i>
                                                                </button>
                                                            </Link>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="0">
                                        <Card className="bg-transparent">
                                            {/* ----- Topic list ----- */}
                                            {(
                                                this.state.chapters.topics || []
                                            ).map((data, index) => {
                                                return (
                                                    <Accordion key={index}>
                                                        {this.topicRender(
                                                            data,
                                                            index
                                                        )}
                                                    </Accordion>
                                                );
                                            })}

                                            {/* ----- Cycle test list ----- */}
                                            {(
                                                this.state.chapters
                                                    .cycle_tests || []
                                            ).map((data, index) => {
                                                return (
                                                    <div
                                                        className="card card-header bg-light border shadow-sm mb-2"
                                                        style={{
                                                            padding: "12px",
                                                        }}
                                                        key={index}
                                                    >
                                                        <Link
                                                            to={`${this.props.match.url}/cycle/${data.cycle_test_id}`}
                                                            className="text-decoration-none"
                                                            onClick={() => {
                                                                storeDispatch(
                                                                    CYCLE,
                                                                    data.cycle_test_name
                                                                );
                                                            }}
                                                        >
                                                            <p className="small primary-text text-center font-weight-bold-600 mb-0">
                                                                {
                                                                    data.cycle_test_name
                                                                }
                                                            </p>
                                                        </Link>
                                                    </div>
                                                );
                                            })}

                                            {/* ----- Quiz list ----- */}
                                            {(
                                                this.state.chapters.quiz || []
                                            ).map((data, quiz_index) => {
                                                return (
                                                    <div
                                                        className="card card-header bg-light border shadow-sm mb-2"
                                                        style={{
                                                            padding: "12px",
                                                        }}
                                                        key={quiz_index}
                                                    >
                                                        <Link
                                                            to={`${this.props.match.url}/quiz/${data.quiz_id}`}
                                                            className="text-decoration-none"
                                                            onClick={() => {
                                                                storeDispatch(
                                                                    QUIZ,
                                                                    data.quiz_name
                                                                );
                                                            }}
                                                        >
                                                            <p className="small primary-text text-center font-weight-bold-600 mb-0">
                                                                {data.quiz_name}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </Card>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </div>
                </div>

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default connect(mapStateToProps)(HODSubjectChapter);
