import React, { Component } from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Card, Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../sharedComponents/loader";
import AlertBox from "../sharedComponents/alert";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";

function Lock() {
    return (
        <OverlayTrigger
            key="top"
            placement="top"
            overlay={
                <Tooltip id="tooltip">
                    Complete the topics to unlock cycle test
                </Tooltip>
            }
        >
            <button className="btn btn-sm primary-text shadow-none">
                <i className="fas fa-lock"></i>
            </button>
        </OverlayTrigger>
    );
}

const ChapterListRender = (props) => {
    return (
        <Card className="mb-1" key={props.chapter_index}>
            <Accordion.Toggle
                as={Card.Header}
                eventKey={`chapter-${props.all_chapters.indexOf(
                    props.chapter.chapter_id
                )}`}
                className="pinkrange-bg shadow-sm mb-2"
                style={{
                    borderRadius: "8px",
                }}
                onClick={() =>
                    props.toggleCollapse(
                        `chapter-${props.all_chapters.indexOf(
                            props.chapter.chapter_id
                        )}`
                    )
                }
            >
                <div className="row align-items-center">
                    <div className="col-md-4 mb-2 mb-md-0">
                        <div className="row align-items-center">
                            <div className="col-1">
                                <span>
                                    <i
                                        className={`fas fa-chevron-circle-down ${
                                            props.chapterEventKey ===
                                            `chapter-${props.all_chapters.indexOf(
                                                props.chapter.chapter_id
                                            )}`
                                                ? ""
                                                : "fa-rotate-270"
                                        }`}
                                    ></i>
                                </span>
                            </div>
                            <div className="col-1 small font-weight-bold-600">
                                {props.all_chapters.indexOf(
                                    props.chapter.chapter_id
                                ) + 1}
                            </div>
                            <div className="col-8 small font-weight-bold-600">
                                {props.chapter.chapter_name}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 small primary-text font-weight-bold-600">
                        <div className="row align-items-center justify-content-end">
                            <div className="col-md-2 mb-2 mb-md-0">
                                {props.chapter.weightage}
                            </div>
                            <div className="col-md-2 mb-2 mb-md-0">
                                <Link
                                    to={`${props.url}/chapter/${props.chapter.chapter_id}/summary`}
                                >
                                    <button className="btn btn-light btn-sm">
                                        <i className="fas fa-eye fa-sm"></i>
                                    </button>
                                </Link>
                            </div>
                            <div className="col-md-2 mb-2 mb-md-0">
                                <Link
                                    to={`${props.url}/chapter/${props.chapter.chapter_id}/notes`}
                                >
                                    <button className="btn btn-light btn-sm">
                                        <i className="fas fa-eye fa-sm"></i>
                                    </button>
                                </Link>
                            </div>
                            <div className="col-md-2 mb-2 mb-md-0">
                                {props.chapter_remarks[
                                    props.all_chapters.indexOf(
                                        props.chapter.chapter_id
                                    )
                                ] !== undefined ? (
                                    props.chapter_remarks[
                                        props.all_chapters.indexOf(
                                            props.chapter.chapter_id
                                        )
                                    ][props.chapter.chapter_id] !==
                                    undefined ? (
                                        props.chapter_remarks[
                                            props.all_chapters.indexOf(
                                                props.chapter.chapter_id
                                            )
                                        ][props.chapter.chapter_id].remarks !==
                                        undefined ? (
                                            <div
                                                className="text-white text-center p-2 rounded"
                                                style={{
                                                    backgroundColor:
                                                        props.chapter_remarks[
                                                            props.all_chapters.indexOf(
                                                                props.chapter
                                                                    .chapter_id
                                                            )
                                                        ][
                                                            props.chapter
                                                                .chapter_id
                                                        ].color,
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {
                                                    props.chapter_remarks[
                                                        props.all_chapters.indexOf(
                                                            props.chapter
                                                                .chapter_id
                                                        )
                                                    ][props.chapter.chapter_id]
                                                        .remarks
                                                }
                                            </div>
                                        ) : (
                                            ""
                                        )
                                    ) : null
                                ) : null}
                            </div>
                            <div className="col-md-2 mb-2 mb-md-0"></div>
                            <div className="col-md-2 text-right mb-2 mb-md-0">
                                <button
                                    className={`btn btn-sm shadow-none ${
                                        props.topics.length !== 0 &&
                                        props.topics_completed.length !== 0
                                            ? props.topics_completed.length ===
                                              props.subjectItems.chapters.length
                                                ? props.topics[
                                                      props.all_chapters.indexOf(
                                                          props.chapter
                                                              .chapter_id
                                                      )
                                                  ] !== undefined &&
                                                  props.topics_completed[
                                                      props.all_chapters.indexOf(
                                                          props.chapter
                                                              .chapter_id
                                                      )
                                                  ] !== undefined
                                                    ? props.topics[
                                                          props.all_chapters.indexOf(
                                                              props.chapter
                                                                  .chapter_id
                                                          )
                                                      ].length ===
                                                      props.topics_completed[
                                                          props.all_chapters.indexOf(
                                                              props.chapter
                                                                  .chapter_id
                                                          )
                                                      ].length
                                                        ? "text-success"
                                                        : "text-muted"
                                                    : "text-muted"
                                                : "text-muted"
                                            : "text-muted"
                                    }`}
                                    style={{
                                        fontSize: "18px",
                                    }}
                                    onClick={(event) => {
                                        props.handleAllTopicCompletion(
                                            props.all_chapters.indexOf(
                                                props.chapter.chapter_id
                                            ),
                                            props.chapter.chapter_id
                                        );
                                        event.stopPropagation();
                                    }}
                                >
                                    <i className="fas fa-check-circle"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Toggle>

            <Accordion.Collapse
                eventKey={`chapter-${props.all_chapters.indexOf(
                    props.chapter.chapter_id
                )}`}
            >
                <>
                    <Accordion>
                        {/* ----- Topic list ----- */}
                        {props.chapter.topics.map((topic, structure_index) => {
                            return topic.chapter_structure.map(
                                (topics, topic_index) => {
                                    return (
                                        <div key={topic_index}>
                                            <Accordion.Toggle
                                                as={Card.Header}
                                                eventKey={`topic-${props.all_chapters.indexOf(
                                                    props.chapter.chapter_id
                                                )}-${topic_index}`}
                                                className="light-bg shadow-sm py-2 mb-2"
                                                style={{
                                                    borderRadius: "8px",
                                                }}
                                                onClick={() =>
                                                    props.toggleTopicCollapse(
                                                        `topic-${props.all_chapters.indexOf(
                                                            props.chapter
                                                                .chapter_id
                                                        )}-${topic_index}`
                                                    )
                                                }
                                            >
                                                <div className="row align-items-center">
                                                    <div className="col-md-4 mb-2 mb-md-0">
                                                        <div className="row align-items-center">
                                                            <div className="col-1">
                                                                <span>
                                                                    <i
                                                                        className={`fas fa-chevron-circle-down ${
                                                                            props.topicEventKey ===
                                                                            `topic-${props.all_chapters.indexOf(
                                                                                props
                                                                                    .chapter
                                                                                    .chapter_id
                                                                            )}-${topic_index}`
                                                                                ? ""
                                                                                : "fa-rotate-270"
                                                                        }`}
                                                                    ></i>
                                                                </span>
                                                            </div>
                                                            <div className="col-2 small font-weight-bold-600">
                                                                {
                                                                    topics.topic_num
                                                                }
                                                            </div>
                                                            <div className="col-9 small font-weight-bold-600">
                                                                <Link
                                                                    to={`${props.url}/chapter/${props.chapter.chapter_id}/${topics.topic_num}/learn`}
                                                                    className="primary-text"
                                                                >
                                                                    {
                                                                        topics.topic_name
                                                                    }
                                                                    <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-8 small primary-text font-weight-bold-600">
                                                        <div className="row align-items-center">
                                                            <div className="col-md-2 mb-2 mb-md-0"></div>
                                                            <div className="col-md-2 mb-2 mb-md-0"></div>
                                                            <div className="col-md-2 mb-2 mb-md-0"></div>
                                                            <div className="col-md-2 mb-2 mb-md-0">
                                                                {props
                                                                    .topics_remarks[
                                                                    props.all_chapters.indexOf(
                                                                        props
                                                                            .chapter
                                                                            .chapter_id
                                                                    )
                                                                ] !==
                                                                undefined ? (
                                                                    props
                                                                        .topics_remarks[
                                                                        props.all_chapters.indexOf(
                                                                            props
                                                                                .chapter
                                                                                .chapter_id
                                                                        )
                                                                    ][
                                                                        topics
                                                                            .topic_num
                                                                    ] !==
                                                                    undefined ? (
                                                                        props
                                                                            .topics_remarks[
                                                                            props.all_chapters.indexOf(
                                                                                props
                                                                                    .chapter
                                                                                    .chapter_id
                                                                            )
                                                                        ][
                                                                            topics
                                                                                .topic_num
                                                                        ]
                                                                            .remarks !==
                                                                        undefined ? (
                                                                            <div
                                                                                className="text-white text-center p-2 rounded"
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        props
                                                                                            .topics_remarks[
                                                                                            props.all_chapters.indexOf(
                                                                                                props
                                                                                                    .chapter
                                                                                                    .chapter_id
                                                                                            )
                                                                                        ][
                                                                                            topics
                                                                                                .topic_num
                                                                                        ]
                                                                                            .color,
                                                                                    textTransform:
                                                                                        "capitalize",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    props
                                                                                        .topics_remarks[
                                                                                        props.all_chapters.indexOf(
                                                                                            props
                                                                                                .chapter
                                                                                                .chapter_id
                                                                                        )
                                                                                    ][
                                                                                        topics
                                                                                            .topic_num
                                                                                    ]
                                                                                        .remarks
                                                                                }
                                                                            </div>
                                                                        ) : (
                                                                            ""
                                                                        )
                                                                    ) : null
                                                                ) : null}
                                                            </div>
                                                            <div className="col-md-2 mb-2 mb-md-0">
                                                                {
                                                                    topics.next_topic
                                                                }
                                                            </div>
                                                            <div className="col-md-2 mb-2 mb-md-0 text-right">
                                                                <button
                                                                    className={`btn btn-sm shadow-none ${
                                                                        props
                                                                            .topics_completed[
                                                                            props.all_chapters.indexOf(
                                                                                props
                                                                                    .chapter
                                                                                    .chapter_id
                                                                            )
                                                                        ] !==
                                                                        undefined
                                                                            ? props.topics_completed[
                                                                                  props.all_chapters.indexOf(
                                                                                      props
                                                                                          .chapter
                                                                                          .chapter_id
                                                                                  )
                                                                              ].includes(
                                                                                  topics.topic_num
                                                                              )
                                                                                ? "text-success"
                                                                                : "text-muted"
                                                                            : "text-muted"
                                                                    }`}
                                                                    style={{
                                                                        fontSize:
                                                                            "18px",
                                                                    }}
                                                                    onClick={(
                                                                        event
                                                                    ) => {
                                                                        props.handleTopicCompletion(
                                                                            topics.topic_num,
                                                                            topics.topic_name,
                                                                            props.all_chapters.indexOf(
                                                                                props
                                                                                    .chapter
                                                                                    .chapter_id
                                                                            ),
                                                                            props
                                                                                .chapter
                                                                                .chapter_id
                                                                        );

                                                                        event.stopPropagation();
                                                                    }}
                                                                >
                                                                    <i className="fas fa-check-circle"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse
                                                eventKey={`topic-${props.all_chapters.indexOf(
                                                    props.chapter.chapter_id
                                                )}-${topic_index}`}
                                            >
                                                <Card>
                                                    {/* ----- Sub topic list ----- */}
                                                    {(topics.child || []).map(
                                                        (
                                                            child,
                                                            child_index
                                                        ) => {
                                                            return props.topic(
                                                                child,
                                                                child_index,
                                                                props.all_chapters.indexOf(
                                                                    props
                                                                        .chapter
                                                                        .chapter_id
                                                                ),
                                                                props.chapter
                                                                    .chapter_id
                                                            );
                                                        }
                                                    )}
                                                </Card>
                                            </Accordion.Collapse>
                                        </div>
                                    );
                                }
                            );
                        })}
                    </Accordion>

                    {/* ----- Cycle test list ----- */}
                    {props.chapter.cycle_tests.map((cycle, cycle_index) => {
                        return props.cycleTest(
                            cycle,
                            cycle_index,
                            props.all_chapters.indexOf(
                                props.chapter.chapter_id
                            ),
                            props.chapter.chapter_id
                        );
                    })}
                </>
            </Accordion.Collapse>
        </Card>
    );
};

class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectItems: [],
            topics: [],
            topics_completed: [],
            topics_remarks: [],
            chapter_remarks: [],
            all_topics_completed: [],

            all_chapters: [],
            semester_chapters: [],

            chapterEventKey: "chapter-0",
            topicEventKey: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
        this.subjectId = this.props.match.params.subjectId;
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    toggleCollapse = (index) => {
        this.setState({
            chapterEventKey: this.state.chapterEventKey !== index ? index : "",
        });
    };

    toggleTopicCollapse = (index) => {
        this.setState({
            topicEventKey: this.state.topicEventKey !== index ? index : "",
        });
    };

    // Loads topic completion data
    loadTopicCompletedData = (chapter_id, chapter_index) => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${chapter_id}/topics/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let topics_completed = [...this.state.topics_completed];
                    let all_topics_completed = [
                        ...this.state.all_topics_completed,
                    ];
                    let topics_remarks = [...this.state.topics_remarks];
                    let chapter_remarks = [...this.state.chapter_remarks];
                    topics_completed[chapter_index] =
                        result.data.topics_completed !== undefined
                            ? Array.isArray(result.data.topics_completed)
                                ? result.data.topics_completed
                                : []
                            : [];
                    all_topics_completed[chapter_index] =
                        result.data.all_topics_completed !== undefined
                            ? result.data.all_topics_completed
                            : "";
                    topics_remarks[chapter_index] =
                        result.data.topics_remarks !== undefined
                            ? result.data.topics_remarks
                            : "";
                    chapter_remarks[chapter_index] =
                        result.data.chapter_remarks !== undefined
                            ? result.data.chapter_remarks
                            : "";

                    // Updating the completed topics data in topics state
                    let topics = [...this.state.topics];
                    if (
                        Object.entries(result.data).length !== 0 &&
                        topics.length !== 0 &&
                        topics[chapter_index] !== undefined &&
                        topics_completed[chapter_index].length !== 0 &&
                        topics_completed[chapter_index] !== undefined
                    ) {
                        for (let i = 0; i < topics[chapter_index].length; i++) {
                            if (
                                topics_completed[chapter_index].includes(
                                    topics[chapter_index][i].topic_num
                                )
                            ) {
                                topics[chapter_index][i].isCompleted = true;
                            }
                        }
                    }

                    this.setState({
                        topics: topics,
                        topics_completed: topics_completed,
                        all_topics_completed: all_topics_completed,
                        topics_remarks: topics_remarks,
                        chapter_remarks: chapter_remarks,
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

    // Flatten the chapter_structure array of objects
    loopTopicStructure = (array) => {
        var result = [];
        array.forEach((a) => {
            result.push({
                topic_num: a.topic_num,
                topic_name: a.topic_name,
                isCompleted: false,
            });
            if (Array.isArray(a.child)) {
                result = result.concat(this.loopTopicStructure(a.child));
            }
        });
        return result;
    };

    // loads chapter and topic data
    componentDidMount = () => {
        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        subjectItems: result.data,
                    });
                    let topics = [];
                    let all_chapters = [];
                    let semester_chapters = [];
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        // Extracting topics from the chapter_structure
                        for (
                            let j = 0;
                            j < result.data.chapters[i].topics.length;
                            j++
                        ) {
                            topics.push(
                                this.loopTopicStructure(
                                    result.data.chapters[i].topics[j]
                                        .chapter_structure
                                )
                            );
                        }
                        // function to load completed topic list from API
                        this.loadTopicCompletedData(
                            result.data.chapters[i].chapter_id,
                            i
                        );
                        // Gets all chapter id from the chapters list
                        all_chapters.push(result.data.chapters[i].chapter_id);
                    }
                    for (let i = 0; i < result.data.semesters.length; i++) {
                        // Gets all chapter id from the semester list
                        for (
                            let j = 0;
                            j < result.data.semesters[i].chapters.length;
                            j++
                        ) {
                            semester_chapters.push(
                                result.data.semesters[i].chapters[j]
                            );
                        }
                    }
                    this.setState({
                        topics: topics,
                        all_chapters: all_chapters,
                        semester_chapters: semester_chapters,
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

    // Topic completion toggle
    handleTopicCompletion = (
        topic_num,
        topic_name,
        chapter_index,
        chapter_id
    ) => {
        let topics = [...this.state.topics];
        let temp = {};

        for (let i = 0; i < topics[chapter_index].length; i++) {
            if (
                topics[chapter_index][i].topic_num === topic_num &&
                topics[chapter_index][i].topic_name === topic_name
            ) {
                topics[chapter_index][i].isCompleted = !topics[chapter_index][i]
                    .isCompleted;
            }
            temp[topics[chapter_index][i].topic_num] =
                topics[chapter_index][i].isCompleted;
        }

        this.handleTopicCompletionSubmit(temp, chapter_index, chapter_id);
    };

    // All topic completion toggle
    handleAllTopicCompletion = (chapter_index, chapter_id) => {
        let topics = [...this.state.topics];
        let topics_completed = [...this.state.topics_completed];
        let temp = {};

        for (let i = 0; i < topics[chapter_index].length; i++) {
            if (
                topics[chapter_index].length ===
                topics_completed[chapter_index].length
            ) {
                topics[chapter_index][i].isCompleted = false;
            } else {
                topics[chapter_index][i].isCompleted = true;
            }
            temp[topics[chapter_index][i].topic_num] =
                topics[chapter_index][i].isCompleted;
        }

        this.handleTopicCompletionSubmit(temp, chapter_index, chapter_id);
    };

    // Submit topic completion
    handleTopicCompletionSubmit = (data, chapter_index, chapter_id) => {
        this.setState({
            page_loading: true,
        });

        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${chapter_id}/topics/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ topic_num: data }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: "Topic completion updated",
                            showSuccessAlert: true,
                        },
                        () => {
                            this.loadTopicCompletedData(
                                chapter_id,
                                chapter_index
                            );
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

    topic = (data, index, chapter_index, chapter_id) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return this.topic(topic, index, chapter_index, chapter_id);
        });
        let topics_completed = [...this.state.topics_completed];

        return (
            <div className="ml-md-3" key={index}>
                <Card.Header
                    className="small light-bg shadow-sm py-2 mb-2"
                    style={{ borderRadius: "8px" }}
                >
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <div className="row">
                                <div className="col-md-2 col-3">
                                    {data.topic_num}
                                </div>
                                <div className="col-md-10 col-9">
                                    <Link
                                        to={`${this.props.match.url}/chapter/${chapter_id}/${data.topic_num}/learn`}
                                        className="primary-text"
                                    >
                                        {data.topic_name}
                                        <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="row align-items-center">
                                <div className="col-md-2 mb-2 mb-md-0"></div>
                                <div className="col-md-2 mb-2 mb-md-0"></div>
                                <div className="col-md-2 mb-2 mb-md-0"></div>
                                <div className="col-md-2 mb-2 mb-md-0"></div>
                                <div className="col-md-2 mb-2 mb-md-0">
                                    {data.next_topic}
                                </div>
                                <div className="col-md-2 mb-2 mb-md-0 text-right">
                                    <button
                                        className={`btn btn-sm shadow-none ${
                                            topics_completed[chapter_index] !==
                                            undefined
                                                ? topics_completed[
                                                      chapter_index
                                                  ].includes(data.topic_num)
                                                    ? "text-success"
                                                    : "text-muted"
                                                : "text-muted"
                                        }`}
                                        style={{
                                            fontSize: "18px",
                                        }}
                                        onClick={() =>
                                            this.handleTopicCompletion(
                                                data.topic_num,
                                                data.topic_name,
                                                chapter_index,
                                                chapter_id
                                            )
                                        }
                                    >
                                        <i className="fas fa-check-circle"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <div>{nestedTopics}</div>
            </div>
        );
    };

    cycleTest = (data, index, chapter_index, chapter_id) => {
        return (
            <div
                className="card card-header shadow-sm light-bg mb-2"
                key={index}
            >
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <p className="small primary-text font-weight-bold-600 mb-0">
                            {data.cycle_test_name}
                        </p>
                    </div>
                    <div className="col-md-4 d-flex align-items-center justify-content-end">
                        {
                            // Check if all the topics are completed
                            this.state.all_topics_completed[chapter_index] ===
                            true ? (
                                // Check if cycle test is created or not
                                data.direct_question === false &&
                                data.auto_test_question === false ? (
                                    // if not then display the error message in tooltip
                                    <OverlayTrigger
                                        key="top"
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                Cycle test is not created yet
                                            </Tooltip>
                                        }
                                    >
                                        <button className="btn btn-sm primary-text shadow-none">
                                            <i className="fas fa-lock"></i>
                                        </button>
                                    </OverlayTrigger>
                                ) : // if exist, then redirect them to appropriate cycle test
                                data.direct_question === true ? (
                                    <Link
                                        to={`${this.props.match.url}/chapter/${chapter_id}/cycle/${data.cycle_test_id}/direct`}
                                    >
                                        <button className="btn btn-primary btn-sm shadow-none">
                                            Start
                                        </button>
                                    </Link>
                                ) : (
                                    <Link
                                        to={`${this.props.match.url}/chapter/${chapter_id}/cycle/${data.cycle_test_id}`}
                                    >
                                        <button className="btn btn-primary btn-sm shadow-none">
                                            Start
                                        </button>
                                    </Link>
                                )
                            ) : (
                                // if not then display the error message in tooltip
                                <Lock />
                            )
                        }
                    </div>
                </div>
            </div>
        );
    };

    render() {
        document.title = `${
            this.state.subjectItems.subject_name !== undefined
                ? this.state.subjectItems.subject_name
                : ""
        } - Student | IQLabs`;
        const all_chapters = this.state.all_chapters;
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={
                        this.state.subjectItems.subject_name !== undefined
                            ? this.state.subjectItems.subject_name
                            : ""
                    }
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

                        <div className="row align-items-center mb-3">
                            <div className="col-md-6">
                                {/* Breadcrumb */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/student">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            <span>Course:</span>
                                            {this.state.subjectItems
                                                .subject_name !== undefined
                                                ? this.state.subjectItems
                                                      .subject_name
                                                : ""}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6 d-flex justify-content-start justify-content-md-end">
                                <button className="btn btn-primary btn-sm shadow-none mr-1">
                                    My Personal Notes
                                </button>
                                <button className="btn btn-primary btn-sm shadow-none mr-1">
                                    Simulation
                                </button>
                                <Link to={`${this.props.match.url}/results`}>
                                    <button className="btn btn-primary btn-sm shadow-none">
                                        Test Result
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Course details */}
                        <div className="card shadow-sm">
                            <div className="card-header secondary-bg primary-text font-weight-bold">
                                <div className="row align-items-center">
                                    <div className="col-md-4 mb-2 mb-md-0">
                                        Chapter
                                    </div>
                                    <div className="col-md-8 small primary-text font-weight-bold">
                                        <div className="row justify-content-end">
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Weightage
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Summary
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Notes
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Remarks
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Next topic
                                            </div>
                                            <div className="col-md-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <Accordion defaultActiveKey="chapter-0">
                                    {this.state.subjectItems.length !== 0
                                        ? this.state.subjectItems.semesters.map(
                                              (semester, semester_index) => {
                                                  return (
                                                      <React.Fragment
                                                          key={semester_index}
                                                      >
                                                          {/* ----- Chapter list ----- */}
                                                          {this.state.subjectItems.chapters.map(
                                                              (
                                                                  chapter,
                                                                  chapter_index
                                                              ) => {
                                                                  return semester.chapters.includes(
                                                                      chapter.chapter_id
                                                                  ) ? (
                                                                      <ChapterListRender
                                                                          key={
                                                                              chapter_index
                                                                          }
                                                                          chapter={
                                                                              chapter
                                                                          }
                                                                          chapter_index={
                                                                              chapter_index
                                                                          }
                                                                          all_chapters={
                                                                              all_chapters
                                                                          }
                                                                          url={
                                                                              this
                                                                                  .props
                                                                                  .match
                                                                                  .url
                                                                          }
                                                                          subjectItems={
                                                                              this
                                                                                  .state
                                                                                  .subjectItems
                                                                          }
                                                                          topics_completed={
                                                                              this
                                                                                  .state
                                                                                  .topics_completed
                                                                          }
                                                                          topics_remarks={
                                                                              this
                                                                                  .state
                                                                                  .topics_remarks
                                                                          }
                                                                          chapter_remarks={
                                                                              this
                                                                                  .state
                                                                                  .chapter_remarks
                                                                          }
                                                                          topics={
                                                                              this
                                                                                  .state
                                                                                  .topics
                                                                          }
                                                                          chapterEventKey={
                                                                              this
                                                                                  .state
                                                                                  .chapterEventKey
                                                                          }
                                                                          topicEventKey={
                                                                              this
                                                                                  .state
                                                                                  .topicEventKey
                                                                          }
                                                                          toggleCollapse={
                                                                              this
                                                                                  .toggleCollapse
                                                                          }
                                                                          handleAllTopicCompletion={
                                                                              this
                                                                                  .handleAllTopicCompletion
                                                                          }
                                                                          handleTopicCompletion={
                                                                              this
                                                                                  .handleTopicCompletion
                                                                          }
                                                                          toggleTopicCollapse={
                                                                              this
                                                                                  .toggleTopicCollapse
                                                                          }
                                                                          topic={
                                                                              this
                                                                                  .topic
                                                                          }
                                                                          cycleTest={
                                                                              this
                                                                                  .cycleTest
                                                                          }
                                                                      />
                                                                  ) : null;
                                                              }
                                                          )}
                                                          {/* ----- Semester list ----- */}
                                                          <div
                                                              className="card card-header pinkrange-bg shadow-sm"
                                                              style={{
                                                                  marginBottom:
                                                                      "0.75rem",
                                                              }}
                                                          >
                                                              <div className="row align-items-center">
                                                                  <div className="col-6">
                                                                      <p className="small font-weight-bold-600 mb-0">
                                                                          {
                                                                              semester.semester_name
                                                                          }
                                                                      </p>
                                                                  </div>
                                                                  <div className="col-6 text-right">
                                                                      {semester.chapters_completed ===
                                                                      true ? (
                                                                          // Check if semester exam is created or not
                                                                          semester.direct_question ===
                                                                              false &&
                                                                          semester.auto_test_question ===
                                                                              false ? (
                                                                              // if not then display the error message in tooltip
                                                                              <OverlayTrigger
                                                                                  key="top"
                                                                                  placement="top"
                                                                                  overlay={
                                                                                      <Tooltip id="tooltip">
                                                                                          Semester
                                                                                          exam
                                                                                          is
                                                                                          not
                                                                                          created
                                                                                          yet
                                                                                      </Tooltip>
                                                                                  }
                                                                              >
                                                                                  <button className="btn btn-sm primary-text">
                                                                                      <i className="fas fa-lock"></i>
                                                                                  </button>
                                                                              </OverlayTrigger>
                                                                          ) : // if exist, then redirect them to appropriate cycle test
                                                                          semester.direct_question ===
                                                                            true ? (
                                                                              <Link
                                                                                  to={`${this.props.match.url}/semester/${semester.semester_id}/direct`}
                                                                              >
                                                                                  <button className="btn btn-primary btn-sm shadow-none">
                                                                                      Start
                                                                                  </button>
                                                                              </Link>
                                                                          ) : (
                                                                              <Link
                                                                                  to={`${this.props.match.url}/semester/${semester.semester_id}`}
                                                                              >
                                                                                  <button className="btn btn-primary btn-sm shadow-none">
                                                                                      Start
                                                                                  </button>
                                                                              </Link>
                                                                          )
                                                                      ) : (
                                                                          <Lock />
                                                                      )}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </React.Fragment>
                                                  );
                                              }
                                          )
                                        : null}
                                    {/* ----- Unassigned chapter list ----- */}
                                    {this.state.subjectItems.length !== 0
                                        ? this.state.subjectItems.chapters.map(
                                              (chapter, chapter_index) => {
                                                  return !this.state.semester_chapters.includes(
                                                      chapter.chapter_id
                                                  ) ? (
                                                      <ChapterListRender
                                                          key={chapter_index}
                                                          chapter={chapter}
                                                          chapter_index={
                                                              chapter_index
                                                          }
                                                          all_chapters={
                                                              all_chapters
                                                          }
                                                          url={
                                                              this.props.match
                                                                  .url
                                                          }
                                                          subjectItems={
                                                              this.state
                                                                  .subjectItems
                                                          }
                                                          topics_completed={
                                                              this.state
                                                                  .topics_completed
                                                          }
                                                          topics_remarks={
                                                              this.state
                                                                  .topics_remarks
                                                          }
                                                          chapter_remarks={
                                                              this.state
                                                                  .chapter_remarks
                                                          }
                                                          topics={
                                                              this.state.topics
                                                          }
                                                          chapterEventKey={
                                                              this.state
                                                                  .chapterEventKey
                                                          }
                                                          topicEventKey={
                                                              this.state
                                                                  .topicEventKey
                                                          }
                                                          toggleCollapse={
                                                              this
                                                                  .toggleCollapse
                                                          }
                                                          handleAllTopicCompletion={
                                                              this
                                                                  .handleAllTopicCompletion
                                                          }
                                                          handleTopicCompletion={
                                                              this
                                                                  .handleTopicCompletion
                                                          }
                                                          toggleTopicCollapse={
                                                              this
                                                                  .toggleTopicCollapse
                                                          }
                                                          topic={this.topic}
                                                          cycleTest={
                                                              this.cycleTest
                                                          }
                                                      />
                                                  ) : null;
                                              }
                                          )
                                        : null}
                                </Accordion>
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

export default Subject;

// {
//     /* <>
//     <div className="card-body">
//         <Accordion defaultActiveKey="chapter-0">
//             {this.state.subjectItems.length !== 0
//                 ? this.state.subjectItems.chapters.map((data, index) => {
//                       return (
//                           <Card className="mb-2" key={index}>
//                               <Accordion.Toggle
//                                   as={Card.Header}
//                                   eventKey={`chapter-${index}`}
//                                   className="pinkrange-bg shadow-sm mb-2"
//                                   style={{
//                                       borderRadius: "8px",
//                                   }}
//                                   onClick={() =>
//                                       this.toggleCollapse(`chapter-${index}`)
//                                   }
//                               >
//                                   <div className="row align-items-center">
//                                       <div className="col-md-4 mb-2 mb-md-0">
//                                           <div className="row align-items-center">
//                                               <div className="col-1">
//                                                   <span>
//                                                       <i
//                                                           className={`fas fa-chevron-circle-down ${
//                                                               this.state
//                                                                   .chapterEventKey ===
//                                                               `chapter-${index}`
//                                                                   ? ""
//                                                                   : "fa-rotate-270"
//                                                           }`}
//                                                       ></i>
//                                                   </span>
//                                               </div>
//                                               <div className="col-1 small font-weight-bold-600">
//                                                   {index + 1}
//                                               </div>
//                                               <div className="col-8 small font-weight-bold-600">
//                                                   {data.chapter_name}
//                                               </div>
//                                           </div>
//                                       </div>
//                                       <div className="col-md-8 small primary-text font-weight-bold-600">
//                                           <div className="row align-items-center justify-content-end">
//                                               <div className="col-md-2 mb-2 mb-md-0">
//                                                   {data.weightage}
//                                               </div>
//                                               <div className="col-md-2 mb-2 mb-md-0">
//                                                   <Link
//                                                       to={`${this.props.match.url}/chapter/${data.chapter_id}/summary`}
//                                                   >
//                                                       <button className="btn btn-light btn-sm">
//                                                           <i className="fas fa-eye fa-sm"></i>
//                                                       </button>
//                                                   </Link>
//                                               </div>
//                                               <div className="col-md-2 mb-2 mb-md-0">
//                                                   <Link
//                                                       to={`${this.props.match.url}/chapter/${data.chapter_id}/notes`}
//                                                   >
//                                                       <button className="btn btn-light btn-sm">
//                                                           <i className="fas fa-eye fa-sm"></i>
//                                                       </button>
//                                                   </Link>
//                                               </div>
//                                               <div className="col-md-2 mb-2 mb-md-0">
//                                                   <div className="d-inline p-2 rounded">
//                                                       Remarks
//                                                   </div>
//                                               </div>
//                                               <div className="col-md-2 mb-2 mb-md-0"></div>
//                                               <div className="col-md-2 text-right mb-2 mb-md-0">
//                                                   <button
//                                                       className={`btn btn-sm shadow-none ${
//                                                           this.state.topics
//                                                               .length !== 0 &&
//                                                           this.state
//                                                               .topics_completed
//                                                               .length !== 0
//                                                               ? this.state
//                                                                     .topics_completed
//                                                                     .length ===
//                                                                 this.state
//                                                                     .subjectItems
//                                                                     .chapters
//                                                                     .length
//                                                                   ? this.state
//                                                                         .topics[
//                                                                         index
//                                                                     ] !==
//                                                                         undefined &&
//                                                                     this.state
//                                                                         .topics_completed[
//                                                                         index
//                                                                     ] !==
//                                                                         undefined
//                                                                       ? this
//                                                                             .state
//                                                                             .topics[
//                                                                             index
//                                                                         ]
//                                                                             .length ===
//                                                                         this
//                                                                             .state
//                                                                             .topics_completed[
//                                                                             index
//                                                                         ].length
//                                                                           ? "text-success"
//                                                                           : "text-muted"
//                                                                       : "text-muted"
//                                                                   : "text-muted"
//                                                               : "text-muted"
//                                                       }`}
//                                                       style={{
//                                                           fontSize: "18px",
//                                                       }}
//                                                       onClick={(event) => {
//                                                           this.handleAllTopicCompletion(
//                                                               index,
//                                                               data.chapter_id
//                                                           );
//                                                           event.stopPropagation();
//                                                       }}
//                                                   >
//                                                       <i className="fas fa-check-circle"></i>
//                                                   </button>
//                                               </div>
//                                           </div>
//                                       </div>
//                                   </div>
//                               </Accordion.Toggle>

//                               <Accordion.Collapse eventKey={`chapter-${index}`}>
//                                   <>
//                                       <Accordion>
//                                           {/* ----- Topic list ----- */
// }
// //   {data.topics.map(
// //       (topic, structure_index) => {
// //           return topic.chapter_structure.map(
// //               (topics, topic_index) => {
// //                   return (
// //                       <div
// //                           key={
// //                               topic_index
// //                           }
// //                       >
// //                           <Accordion.Toggle
// //                               as={
// //                                   Card.Header
// //                               }
// //                               eventKey={`topic-${index}-${topic_index}`}
// //                               className="light-bg shadow-sm py-2 mb-2"
// //                               style={{
// //                                   borderRadius:
// //                                       "8px",
// //                               }}
// //                               onClick={() =>
// //                                   this.toggleTopicCollapse(
// //                                       `topic-${index}-${topic_index}`
// //                                   )
// //                               }
// //                           >
// //                               <div className="row align-items-center">
// //                                   <div className="col-md-4 mb-2 mb-md-0">
// //                                       <div className="row">
// //                                           <div className="col-1">
// //                                               <span>
// //                                                   <i
// //                                                       className={`fas fa-chevron-circle-down ${
// //                                                           this
// //                                                               .state
// //                                                               .topicEventKey ===
// //                                                           `topic-${index}-${topic_index}`
// //                                                               ? ""
// //                                                               : "fa-rotate-270"
// //                                                       }`}
// //                                                   ></i>
// //                                               </span>
// //                                           </div>
// //                                           <div className="col-2 small font-weight-bold-600">
// //                                               {
// //                                                   topics.topic_num
// //                                               }
// //                                           </div>
// //                                           <div className="col-9 small font-weight-bold-600">
// //                                               <Link
// //                                                   to={`${this.props.match.url}/chapter/${data.chapter_id}/${topics.topic_num}/learn`}
// //                                                   className="primary-text"
// //                                               >
// //                                                   {
// //                                                       topics.topic_name
// //                                                   }
// //                                                   <i className="fas fa-external-link-alt fa-xs ml-2"></i>
// //                                               </Link>
// //                                           </div>
// //                                       </div>
// //                                   </div>

// //                                   <div className="col-md-8 small primary-text font-weight-bold-600">
// //                                       <div className="row align-items-center">
// //                                           <div className="col-md-2 mb-2 mb-md-0"></div>
// //                                           <div className="col-md-2 mb-2 mb-md-0"></div>
// //                                           <div className="col-md-2 mb-2 mb-md-0"></div>
// //                                           <div className="col-md-2 mb-2 mb-md-0">
// //                                               {this
// //                                                   .state
// //                                                   .topics_remarks[
// //                                                   index
// //                                               ] !==
// //                                               undefined ? (
// //                                                   this
// //                                                       .state
// //                                                       .topics_remarks[
// //                                                       index
// //                                                   ][
// //                                                       topics
// //                                                           .topic_num
// //                                                   ] !==
// //                                                   undefined ? (
// //                                                       this
// //                                                           .state
// //                                                           .topics_remarks[
// //                                                           index
// //                                                       ][
// //                                                           topics
// //                                                               .topic_num
// //                                                       ]
// //                                                           .remarks !==
// //                                                       undefined ? (
// //                                                           <div
// //                                                               className="text-white text-center p-2 rounded"
// //                                                               style={{
// //                                                                   backgroundColor: this
// //                                                                       .state
// //                                                                       .topics_remarks[
// //                                                                       index
// //                                                                   ][
// //                                                                       topics
// //                                                                           .topic_num
// //                                                                   ]
// //                                                                       .color,
// //                                                                   textTransform:
// //                                                                       "capitalize",
// //                                                               }}
// //                                                           >
// //                                                               {
// //                                                                   this
// //                                                                       .state
// //                                                                       .topics_remarks[
// //                                                                       index
// //                                                                   ][
// //                                                                       topics
// //                                                                           .topic_num
// //                                                                   ]
// //                                                                       .remarks
// //                                                               }
// //                                                           </div>
// //                                                       ) : (
// //                                                           ""
// //                                                       )
// //                                                   ) : null
// //                                               ) : null}
// //                                           </div>
// //                                           <div className="col-md-2 mb-2 mb-md-0">
// //                                               {
// //                                                   topics.next_topic
// //                                               }
// //                                           </div>
// //                                           <div className="col-md-2 mb-2 mb-md-0 text-right">
// //                                               <button
// //                                                   className={`btn btn-sm shadow-none ${
// //                                                       this
// //                                                           .state
// //                                                           .topics_completed[
// //                                                           index
// //                                                       ] !==
// //                                                       undefined
// //                                                           ? this.state.topics_completed[
// //                                                                 index
// //                                                             ].includes(
// //                                                                 topics.topic_num
// //                                                             )
// //                                                               ? "text-success"
// //                                                               : "text-muted"
// //                                                           : "text-muted"
// //                                                   }`}
// //                                                   style={{
// //                                                       fontSize:
// //                                                           "18px",
// //                                                   }}
// //                                                   onClick={(
// //                                                       event
// //                                                   ) => {
// //                                                       this.handleTopicCompletion(
// //                                                           topics.topic_num,
// //                                                           topics.topic_name,
// //                                                           index,
// //                                                           data.chapter_id
// //                                                       );

// //                                                       event.stopPropagation();
// //                                                   }}
// //                                               >
// //                                                   <i className="fas fa-check-circle"></i>
// //                                               </button>
// //                                           </div>
// //                                       </div>
// //                                   </div>
// //                               </div>
// //                           </Accordion.Toggle>

// //                           <Accordion.Collapse
// //                               eventKey={`topic-${index}-${topic_index}`}
// //                           >
// //                               <Card>
// {
//     /* ----- Sub topic list ----- */
// }
// {
//     /* {(
//                                                                               topics.child ||
//                                                                               []
//                                                                           ).map(
//                                                                               (
//                                                                                   child,
//                                                                                   child_index
//                                                                               ) => {
//                                                                                   return this.topic(
//                                                                                       child,
//                                                                                       child_index,
//                                                                                       index,
//                                                                                       data.chapter_id
//                                                                                   );
//                                                                               }
//                                                                           )}
//                                                                       </Card>
//                                                                   </Accordion.Collapse>
//                                                               </div>
//                                                           );
//                                                       }
//                                                   );
//                                               }
//                                           )}
//                                       </Accordion> */
// }

// {
//     /* ----- Cycle test list ----- */
// }
// {
//     /* {data.cycle_tests.map(
//                                           (cycle, cycle_index) => {
//                                               return this.cycleTest(
//                                                   cycle,
//                                                   cycle_index,
//                                                   index,
//                                                   data.chapter_id
//                                               );
//                                           }
//                                       )}
//                                   </>
//                               </Accordion.Collapse>
//                           </Card>
//                       );
//                   })
//                 : null}
//         </Accordion>

//         <div className="card card-header secondary-bg shadow-sm">
//             <div className="row align-items-center">
//                 <div className="col-6">
//                     <p className="small font-weight-bold-600 mb-0">
//                         Semester Exams
//                     </p>
//                 </div>
//                 <div className="col-6 text-right">
//                     <button className="btn btn-primary btn-sm">Start</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// </> */
// }
