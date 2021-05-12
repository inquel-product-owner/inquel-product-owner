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

const TopicListRender = (props) => {
    const nestedTopics = (props.topics.child || []).map((topic, index) => {
        return (
            <Accordion key={index}>
                <TopicListRender
                    {...props}
                    topics={topic}
                    topic_index={index}
                />
            </Accordion>
        );
    });

    return (
        <>
            <Accordion.Toggle
                as={Card.Header}
                eventKey={`topic-${props.topic_index}-${props.topics.topic_num}`}
                className="light-bg shadow-sm py-2 mb-2"
                style={{
                    borderRadius: "8px",
                }}
                onClick={() =>
                    props.topics.child.length !== 0
                        ? props.toggleTopicCollapse(
                              `topic-${props.topic_index}-${props.topics.topic_num}`,
                              props.chapter_index
                          )
                        : ""
                }
            >
                <div className="row align-items-center">
                    <div className="col-md-5 mb-2 mb-md-0">
                        <div className="row align-items-center">
                            <div className="col-1">
                                {props.topics.child.length !== 0 ? (
                                    <div>
                                        <i
                                            className={`fas fa-chevron-circle-down ${
                                                props.topicEventKey[
                                                    props.chapter_index
                                                ].includes(
                                                    `topic-${props.topic_index}-${props.topics.topic_num}`
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
                                <div className="mr-3">
                                    {props.topics.topic_num}
                                </div>
                                <div className="w-100">
                                    <Link
                                        to={`${props.url}/chapter/${props.chapter.chapter_id}/${props.topics.topic_num}/learn`}
                                        className="primary-text"
                                    >
                                        {props.topics.topic_name}
                                        <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7 small primary-text font-weight-bold-600">
                        <div className="row align-items-center">
                            <div className="col-md-2 mb-2 mb-md-0"></div>
                            <div className="col-md-2 mb-2 mb-md-0"></div>
                            <div className="col-md-2 mb-2 mb-md-0"></div>
                            <div className="col-md-2 mb-2 mb-md-0">
                                {props.topics_remarks[
                                    props.all_chapters.indexOf(
                                        props.chapter.chapter_id
                                    )
                                ] !== undefined ? (
                                    props.topics_remarks[
                                        props.all_chapters.indexOf(
                                            props.chapter.chapter_id
                                        )
                                    ][props.topics.topic_num] !== undefined ? (
                                        props.topics_remarks[
                                            props.all_chapters.indexOf(
                                                props.chapter.chapter_id
                                            )
                                        ][props.topics.topic_num].remarks !==
                                        undefined ? (
                                            <div
                                                className="text-white text-center p-2 rounded"
                                                style={{
                                                    backgroundColor:
                                                        props.topics_remarks[
                                                            props.all_chapters.indexOf(
                                                                props.chapter
                                                                    .chapter_id
                                                            )
                                                        ][
                                                            props.topics
                                                                .topic_num
                                                        ].color,
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {
                                                    props.topics_remarks[
                                                        props.all_chapters.indexOf(
                                                            props.chapter
                                                                .chapter_id
                                                        )
                                                    ][props.topics.topic_num]
                                                        .remarks
                                                }
                                            </div>
                                        ) : (
                                            ""
                                        )
                                    ) : null
                                ) : null}
                            </div>
                            <div className="col-md-2 mb-2 mb-md-0 text-center">
                                {props.topics.next_topic ? (
                                    <Link
                                        to={`${props.url}/chapter/${props.chapter.chapter_id}/${props.topics.next_topic}/learn`}
                                        className="text-dark"
                                    >
                                        {props.topics.next_topic}
                                        <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-md-2 mb-2 mb-md-0 text-right">
                                <button
                                    className={`btn btn-sm shadow-none ${
                                        props.topics_completed[
                                            props.all_chapters.indexOf(
                                                props.chapter.chapter_id
                                            )
                                        ] !== undefined
                                            ? props.topics_completed[
                                                  props.all_chapters.indexOf(
                                                      props.chapter.chapter_id
                                                  )
                                              ].includes(props.topics.topic_num)
                                                ? "text-success"
                                                : "text-muted"
                                            : "text-muted"
                                    }`}
                                    style={{
                                        fontSize: "18px",
                                    }}
                                    onClick={(event) => {
                                        props.handleTopicCompletion(
                                            props.topics.topic_num,
                                            props.topics.topic_name,
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
                eventKey={`topic-${props.topic_index}-${props.topics.topic_num}`}
                className="ml-3"
            >
                <div>{nestedTopics}</div>
            </Accordion.Collapse>
        </>
    );
};

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
                    cursor: "default",
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
                    <div className="col-md-5 mb-2 mb-md-0">
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
                    <div className="col-md-7 small primary-text font-weight-bold-600">
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
                    {/* ----- Topic list ----- */}
                    {props.chapter.topics.map((topic, structure_index) => {
                        return topic.chapter_structure.map(
                            (topics, topic_index) => {
                                return (
                                    <Accordion key={topic_index}>
                                        <TopicListRender
                                            {...props}
                                            topics={topics}
                                            topic_index={topic_index}
                                        />
                                    </Accordion>
                                );
                            }
                        );
                    })}

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

                    {/* ----- Quiz list ----- */}
                    {Object.entries(props.quiz).length !== 0 ? (
                        <div className="card card-header shadow-sm light-bg mb-2">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <p className="small primary-text font-weight-bold-600 mb-0">
                                        {props.quiz.quiz_name}
                                    </p>
                                </div>
                                <div className="col-md-6 d-flex align-items-center justify-content-end">
                                    <Link
                                        to={`${props.url}/chapter/${props.chapter.chapter_id}/quiz/${props.quiz.quiz_id}`}
                                    >
                                        <button className="btn btn-primary btn-sm shadow-none">
                                            Start
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
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
            quiz: [],

            all_chapters: [],
            semester_chapters: [],

            chapterEventKey: "",
            topicEventKey: [],

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

    toggleTopicCollapse = (key, chapter_index) => {
        let topicEventKey = this.state.topicEventKey;
        if (topicEventKey.length !== 0 && topicEventKey[chapter_index]) {
            if (topicEventKey[chapter_index].includes(key)) {
                topicEventKey[chapter_index].splice(
                    topicEventKey[chapter_index].indexOf(key),
                    1
                );
            } else {
                topicEventKey[chapter_index].push(key);
            }
        }

        this.setState({
            topicEventKey: topicEventKey,
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

    // Loads quiz data
    loadQuizData = (chapter_id, chapter_index) => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${chapter_id}/quiz/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let quiz = [...this.state.quiz];
                    quiz[chapter_index] = result.data;
                    this.setState({
                        quiz: quiz,
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

    // loads chapter, topic and semester data
    loadSubjectData = () => {
        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let topics = [];
                    let all_chapters = [];
                    let semester_chapters = [];
                    let topicKey = [];
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
                        // function to load quiz data from API
                        this.loadQuizData(
                            result.data.chapters[i].chapter_id,
                            i
                        );
                        // Gets all chapter id from the chapters list
                        all_chapters.push(result.data.chapters[i].chapter_id);
                        // Topic event key
                        topicKey.push([]);
                        if (
                            this.state.topicEventKey.length !== 0 &&
                            this.state.topicEventKey[i] !== undefined
                        ) {
                            if (this.state.topicEventKey[i].length !== 0) {
                                topicKey[i] = this.state.topicEventKey[i];
                            }
                        }
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
                        subjectItems: result.data,
                        topics: topics,
                        all_chapters: all_chapters,
                        semester_chapters: semester_chapters,
                        topicEventKey: topicKey,
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
        this.loadSubjectData();

        // let secret = new fernet.Secret(
        //     "4Fy2fTI1oyK9McR5mRunLmfynGdzOdxiRQRNqhUY70k="
        // );
        // let encryptData = 'gAAAAABglCEXcrWIl_Dx7-BUL5v5VH0ctZM-mcPnvbU0zcLL0yONVaqi_eOo3IXGQEihFYfNYgw93S2WcqDo1B7Kt5ji-cTB8zl241-swhEol8zUchLloV6VZP_AarpEGScZKSDJ5oHIB0fx9YUAqYful--VBfaEzaXVt6L0SUgf31LoA8U7VBlJFyOW2tOTFSduoqwNLh8VymB9kU4Z8gk8RWiY2m8J30VasEeulUncHiVAGIKIdlM0PJz8S9JsUfLezXnkS2eY78ejNwGicG-Pxl46Dl--DSA5maOPI_EVS3QkA1dc93TTeeP_whwXRCPLjrswZpg-hRQRXfGUesgwL7YvwvyiD-LFoZV5FRvfTN74ZBffgphyK9fHyxEEbph9Ge9A9BAzdwcRq96HiecWfDG9zYbPXy3IkgV1VXoA6mKRJLzWZtJThVMfZW1FNFegaU0uVEafBj5IyrFJpfBbtKZkUJIojuDdhgdL8i3o-JPdE_8j9q6BCkzNMmAJ_2JDa20LYe20VUdVWVKTeur-Vw49me4t9HjGlLV2RVBkGgnPpYrBsGkYPJ_mTMW7w5dosSOVdNaSdKXFhNv2L-lpOYekKOVhXM7ZDokkoouxm6M8K5JaSuFjZPWj6eHAtD5WVGwMZHZBVxNud-GqJG3N5L-Q3IECGgsOoHDZE1zzBTm5OTmSGdjUCND7sggDzTjXRoseHB36yPpGavhFkiDsyAeQ8SCGlygHEQq5q_G8WlMHP4t7qzU2w2EuXIfiJJ_8Vs6yqBnJ7wGbYZKFEJVVFhMVhUeUl23lhfajq09U8nTf7aabhPaIVghT8E4zDYTn99EcAZXwyFoxwerjBzpbg1G5dFnBQ72azg9_KRgdTZKKuRha_JKJzStimnK18foR-jePdiQXLwAGV_FBKz41P0hdTZx-X-ijSRKD2AXdc4sVKt2hHmbHI3PBehengnY3J8l6FakFUkmZKKXUX8Yj2-T6ek4ULUnJKQ5W3YvZzeGSvDUFvNDYNtFRsMBHMUu0zsldZfNjDtM5YXpbVNbjCyTFcpf1eMA7a5-19OxzgvjBFX5xw2WSuu9zBI0gsQ6Tq3RDD9AfOdKxLGkJGRfGTgHLnvAo5gI7n-LdNt-ehZHG0U1DQZBZoXlbPh82m-oSL4AnmEnsS4qa2vvf85VkeeSYad4OAszVVY5DC22QEN73mBkMUFvUmB_GUbYCa8hNCWik4ZGXGhEBt33xg-g9pGxlz7cOT8jggU-SyEfEnggwL88jEf06zfs7z_LzT3dFBpHKth-aFhC-sjoUtKqGJ6K1tslYmOq6kBlIkVE33Z1QKH4EAUGNawThKTLvbUdfNu5i3W8HAJErF05u9nUIt_lit0k80HaU0JKqHoNJ9uy1nMc-ffGaXwO8X5gAOaJ8LymvTVT1kMWlIcEFNQHGGso40ONgOU9x1zsc2lh57u_QBDqVu9qH-nwQzrM5dcD_tw8lHt-F9qt7B2R4krTanKixSKzr5FqmPKBjz7NMTrW6oEE92o1Qj88rMJhLNiBQDkcHOD3LH6zechvYBJYwTBmChxPFjmI39Y0csrA1kXt1I8EaztGGf6Dokj4wmtx5aU-Q1WjocXf3l6Hzf3eFuu7S-8vwdRrFpKN9z4TDzF6TZKmeL-HIt6N0-YyNsp1Gzoxv5cfbhUwMUbJ7V3bmlzqZamNCS3zyXYxS0q8GT8N8QuTEVkmEBSyKGX14pGJacNZIa93Eju0PwGgJ0d_yvycAohK-XR7fgZDJ5L7Kfv8833CYkkEHlc0_vKDHIW9MVgn1O5wNJ4R0O8-XEXCVp90RXJfnGalZuf_zgWhG8WUBK3GU2aOQzVklcE8dfGl-kTEbf-_vekTamrsY3ugO9w8sQ00uFn_s1AQPntdA6Dc9yiX7WI8XdEPxuJ_F_G8JvLcch_y9iyLjQbblg9G5QHnbMTOzcrSMrJ5DQXIfzHKmmTbDc90bx9nk-SaGM4tFp4sh9ElWjO2h3VmaduIlshJZORSjfS7HWmM2duDEWmQHqohyXOQSG_bDuC8H8iQ9miEVD-GhWg4Hl9Iu1FPxmyqowdKMMgSs-yboFLbF6JWUY3u3srUOu1_7RCEhpbXDpIbq_p_-fRQRR7OtdjPqJopS7lB6tD_-mZiA6YrkwDiQf4wVHaHMT0ztcFkCTsnCTBTt877WWPvg_G9qPJ_hfN49J_XsNuvRBwRmHlpF5uEstx1WYj0_CckYQ-7MuPPkAaCmFBZ2zDVF9LVd0_KxR7aEcMR69WNfVpwknb9neUwD_0wxcGkJwAnx5Wpiec1ZUCBCW9WBeJxXbP8E9_jS1kTauS8BPEDFkJzXB4B8JeLPAvVtK17eTzLwl0XMVuQHwtdcevEvFNNLHnmW-LuyPD2RxO71rok2bCmDWEUlvBfg1ONu8NG6O_kge_rOBUaQYPo3opafHIlKtORAc_r5hb8ScyABIujggYXkBJllENmU8c16GbugyuONqvVUAV-MYsZUD6UJXZWijrYaxhz-tGH3xGLnPopvSvEd1q-ho8fkmgOwjb2eTR6D7R2RZsRN0nZQXhxbLHHD60XKLTpVPC2Hh2r7cbIQcWm0FsGYBnNScxpW1w6LbEsvMQCwTe699X45yR_XunI1Q3ifwEXGjF-nqtprXfkJMED8bOczdX1jorOE0maJigKLTzGIuFmVeXmIyaiT_4uQ03eQ6vC3PYDJJbrhACKvXz4ZONW8OLnxcMoVgbZ0msC4TuNTJT-C1gSzzFXCm_8lOBYaNLj1fEYyskMu4j7GFGHYUqxHHiFvn6QXGbrhQUvUa74oBfYchhYEFkrkLVOo4GpEexEnFHAGeCGdAfYXW0qVO5guj0UT2YeUeFhp0YdslupFrb3lc2kWXv_iHrVrjkxE1nCvKLnJ-mu02MpZIbmKLywxWEbKztoqkRdG9j6oOp8hl7FXA-h2Gm1Wj-dzoEQNwRSy4B6Ha2ncqTE0YaZTD9TC_ZugAI3nFE-Qpb_fgOndPpYC4COpfRKhJ8jwKloRdQzzIsZjrRjut8_BfEtDPzAHwE2pi_k_cvlUD_MhKL5hsqXBzOjKnxST1JP9yRm7f7SfW_L3yH-Kasj8NPIsIMqy8Zwnhqh-79aH9BT-Xy8mk19I9aPbG9qZySdSOBiJzhQSV8dntUtnZg=='
        // let token = new fernet.Token({
        //     secret: secret,
        //     token: encryptData,
        //     ttl: 0,
        // });
        // let response = JSON.parse(token.decode());
        // console.log(JSON.stringify(response))
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
                            this.loadSubjectData();
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

    handleCycleStart = (chapter_id, cycle_test_id) => {
        this.setState({
            page_loading: true,
        });

        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${chapter_id}/cycletest/auto/start/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    cycle_test_id: cycle_test_id,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.props.history.push(
                        `${this.props.match.url}/chapter/${chapter_id}/cycle/${cycle_test_id}/auto`
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

    handleSemesterStart = (semester_id) => {
        this.setState({
            page_loading: true,
        });

        fetch(
            `${this.url}/student/subject/${this.subjectId}/semester/${semester_id}/auto/start/`,
            {
                method: "POST",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.props.history.push(
                        `${this.props.match.url}/semester/${semester_id}/auto`
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
                                    <button
                                        className="btn btn-primary btn-sm shadow-none"
                                        onClick={() =>
                                            this.handleCycleStart(
                                                chapter_id,
                                                data.cycle_test_id
                                            )
                                        }
                                    >
                                        Start
                                    </button>
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
                                <Link
                                    to={`${this.props.match.url}/personal-notes`}
                                >
                                    <button className="btn btn-primary btn-sm shadow-none mr-1">
                                        My Personal Notes
                                    </button>
                                </Link>
                                <Link to={`${this.props.match.url}/favourites`}>
                                    <button className="btn btn-primary btn-sm shadow-none mr-1">
                                        Favourites
                                    </button>
                                </Link>
                                <button className="btn btn-primary btn-sm shadow-none mr-1">
                                    Simulation
                                </button>
                                <Link to={`${this.props.match.url}/results`}>
                                    <button className="btn btn-primary btn-sm shadow-none">
                                        Test Analysis
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Course details */}
                        <div className="card shadow-sm">
                            <div className="card-header secondary-bg primary-text font-weight-bold">
                                <div className="row align-items-center">
                                    <div className="col-md-5 mb-2 mb-md-0">
                                        Chapter
                                    </div>
                                    <div className="col-md-7 small primary-text font-weight-bold">
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
                                <Accordion defaultActiveKey="">
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
                                                                          cycleTest={
                                                                              this
                                                                                  .cycleTest
                                                                          }
                                                                          quiz={
                                                                              this
                                                                                  .state
                                                                                  .quiz[
                                                                                  chapter_index
                                                                              ]
                                                                                  ? this
                                                                                        .state
                                                                                        .quiz[
                                                                                        chapter_index
                                                                                    ]
                                                                                  : {}
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
                                                                              <button
                                                                                  className="btn btn-primary btn-sm shadow-none"
                                                                                  onClick={() =>
                                                                                      this.handleSemesterStart(
                                                                                          semester.semester_id
                                                                                      )
                                                                                  }
                                                                              >
                                                                                  Start
                                                                              </button>
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
                                                          cycleTest={
                                                              this.cycleTest
                                                          }
                                                          quiz={
                                                              this.state.quiz[
                                                                  chapter_index
                                                              ]
                                                                  ? this.state
                                                                        .quiz[
                                                                        chapter_index
                                                                    ]
                                                                  : {}
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
