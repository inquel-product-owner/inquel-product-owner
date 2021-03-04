import React, { Component } from "react";
import Header from "./shared/examNavbar";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import AlertBox from "../sharedComponents/alert";
import Loading from "../sharedComponents/loader";
import dateFormat from "dateformat";

class CycleTestQA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject_name: "",
            chapter_name: "",
            cycleTestItem: [],
            examInfo: [],
            sections: [],
            activeSection: 0,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,

            time: {},
            seconds: 0,
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);

        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.cycleTestId = this.props.match.params.cycleTestId;
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    toggleSuccessAlert = () => {
        this.setState({
            showSuccessAlert: false,
        });
    };
    toggleErrorAlert = () => {
        this.setState({
            showErrorAlert: false,
        });
    };

    // ---------- Loading the data ----------

    // creates section structure
    loopSectionStructure = () => {
        const sections =
            this.state.cycleTestItem.auto_test !== undefined
                ? this.state.cycleTestItem.auto_test
                : [];
        let temp = [...this.state.sections];
        let questions = [];

        if (localStorage.getItem("data")) {
            temp = JSON.parse(localStorage.getItem("data"));
        } else {
            if (sections.length !== 0) {
                sections.forEach((data) => {
                    questions = [];
                    data.questions.forEach((question) => {
                        questions.push({
                            question_random_id: question.question_random_id,
                            answer: [],
                        });
                    });
                    temp.push({
                        section_id: data.section_id,
                        questions: questions,
                    });
                });
            }
        }

        this.setState({
            sections: temp,
        });
    };

    // loads sections and question data
    loadCycleTestData = () => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/auto/?cycle_test_id=${this.cycleTestId}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    var duration = "";
                    if (localStorage.getItem("duration")) {
                        duration = localStorage.getItem("duration");
                    } else if (result.data.auto_test_duration !== undefined) {
                        duration = result.data.auto_test_duration * 60;
                    } else {
                        duration = 0;
                    }
                    this.setState(
                        {
                            cycleTestItem: result.data,
                            seconds: duration,
                        },
                        () => {
                            this.loopSectionStructure();
                            this.loadExamInfo();
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

    // loads exam start and end time info
    loadExamInfo = () => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/auto/start/?cycle_test_id=${this.cycleTestId}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    var date = new Date();
                    var endTime = new Date(dateFormat(result.data.end_time));
                    this.setState({
                        examInfo: result.data,
                        page_loading: false,
                    });
                    this.startTimer();
                    console.log(date)
                    console.log(endTime)
                    console.log(dateFormat("Wed, 03 Mar 2021 05:40:52 GMT"))
                    // currentDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
                    // (currentDate - endDate.getTime()) / 1000
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

    // loads subject info
    componentDidMount = () => {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });

        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let chapter_name = "";
                    // extract currently selected chapter name
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        if (
                            result.data.chapters[i].chapter_id ===
                            this.chapterId
                        ) {
                            chapter_name = result.data.chapters[i].chapter_name;
                        } else {
                            continue;
                        }
                    }
                    this.setState({
                        subject_name: result.data.subject_name,
                        chapter_name: chapter_name,
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

        this.loadCycleTestData();
    };

    // ---------- Submitting the data ----------

    // submits the exam
    handleSubmit = () => {
        this.setState({
            page_loading: true,
        });

        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/auto/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    cycle_test_id: this.cycleTestId,
                    sections: this.state.sections,
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
                            setTimeout(() => {
                                this.props.history.goBack();
                                localStorage.removeItem("data");
                                localStorage.removeItem("duration");
                            }, 1000);
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

    handleNext = () => {
        this.setState({
            activeSection: this.state.activeSection + 1,
        });
    };
    handlePrev = () => {
        this.setState({
            activeSection: this.state.activeSection - 1,
        });
    };

    // ---------- handle option selection ----------

    handleMCQ = (event, index) => {
        let sections = [...this.state.sections];
        if (event.target.checked) {
            sections[this.state.activeSection].questions[index].answer.push(
                event.target.value
            );
            this.setState({
                sections: sections,
            });
            localStorage.setItem("data", JSON.stringify(sections));
        } else {
            sections[this.state.activeSection].questions[index].answer.splice(
                sections[this.state.activeSection].questions[
                    index
                ].answer.indexOf(event.target.value),
                1
            );
            this.setState({
                sections: sections,
            });
            localStorage.setItem("data", JSON.stringify(sections));
        }
    };

    handleFillin = (event, index) => {
        let sections = [...this.state.sections];
        if (event.target.value !== "") {
            sections[this.state.activeSection].questions[index].answer[0] =
                event.target.value;
            this.setState({
                sections: sections,
            });
            localStorage.setItem("data", JSON.stringify(sections));
        } else {
            sections[this.state.activeSection].questions[index].answer = [];
            this.setState({
                sections: sections,
            });
            localStorage.setItem("data", JSON.stringify(sections));
        }
    };

    handleBoolean = (event, index) => {
        let sections = [...this.state.sections];
        sections[this.state.activeSection].questions[index].answer[0] =
            event.target.value;
        this.setState({
            sections: sections,
        });
        localStorage.setItem("data", JSON.stringify(sections));
    };

    // ---------- Countdown Timer ----------

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            h: hours,
            m: minutes,
            s: seconds,
        };
        return obj;
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        // localStorage.setItem("duration", seconds);

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.handleSubmit();
        }
    }

    // ---------- Image viewer ----------

    render() {
        const sections =
            this.state.cycleTestItem.auto_test !== undefined
                ? this.state.cycleTestItem.auto_test
                : [];
        const question =
            this.state.sections[this.state.activeSection] !== undefined
                ? this.state.sections[this.state.activeSection].questions !==
                  undefined
                    ? this.state.sections[this.state.activeSection].questions
                    : []
                : [];
        return (
            <>
                {/* Navbar */}
                <Header
                    name={this.state.subject_name}
                    chapter_name={`${this.state.chapter_name} - ${this.state.cycleTestItem.cycle_test_name}`}
                    goBack={this.props.history.goBack}
                />

                {/* ALert message */}
                <AlertBox
                    errorMsg={this.state.errorMsg}
                    successMsg={this.state.successMsg}
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={this.state.showSuccessAlert}
                    toggleSuccessAlert={this.toggleSuccessAlert}
                    toggleErrorAlert={this.toggleErrorAlert}
                />

                <div className="exam-section">
                    <div className="container-fluid">
                        {/* Header */}
                        <div className="card card-body secondary-bg primary-text font-weight-bold-600 small mb-4 py-2">
                            <div className="row align-items-center">
                                <div className="col-md-7">
                                    {sections.length !== 0
                                        ? sections[this.state.activeSection]
                                              .section_description
                                        : ""}
                                </div>
                                <div className="col-md-5">
                                    <div className="row align-items-center">
                                        <div className="col-md-3">
                                            Attempt{" "}
                                            {this.state.examInfo.attempt}
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                this.state.cycleTestItem
                                                    .total_questions
                                            }{" "}
                                            Questions
                                        </div>
                                        <div className="col-md-3">
                                            Total marks:{" "}
                                            {
                                                this.state.cycleTestItem
                                                    .total_marks
                                            }
                                        </div>
                                        <div className="col-md-3">
                                            <div className="bg-warning text-center rounded py-2">
                                                {this.state.time.h}:
                                                {this.state.time.m}:
                                                {this.state.time.s}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------- Q&A ---------- */}
                        {sections.length !== 0
                            ? sections[this.state.activeSection].questions !==
                              undefined
                                ? sections[
                                      this.state.activeSection
                                  ].questions.map((data, index) => {
                                      return (
                                          <div
                                              className="d-flex align-items-start justify-content mb-3"
                                              key={index}
                                          >
                                              <button className="btn btn-light light-bg btn-sm border-0 shadow-sm mr-1 px-3 font-weight-bold">
                                                  {index <= 8
                                                      ? `0${index + 1}`
                                                      : index + 1}
                                              </button>
                                              <div
                                                  className="card light-bg shadow-sm"
                                                  style={{ width: "100%" }}
                                              >
                                                  <div className="card-body">
                                                      <div className="row">
                                                          <div
                                                              className={`${
                                                                  data.files !==
                                                                  undefined
                                                                      ? "col-md-11"
                                                                      : "col-12"
                                                              }`}
                                                          >
                                                              <p
                                                                  className="font-weight-bold-600"
                                                                  dangerouslySetInnerHTML={{
                                                                      __html:
                                                                          data.question,
                                                                  }}
                                                              ></p>
                                                              <div className="row small">
                                                                  {/* ----- MCQ ----- */}
                                                                  {data.mcq ===
                                                                  true ? (
                                                                      data.options.map(
                                                                          (
                                                                              option,
                                                                              option_index
                                                                          ) => {
                                                                              return (
                                                                                  <div
                                                                                      className="col-md-6 mb-3"
                                                                                      key={
                                                                                          option_index
                                                                                      }
                                                                                  >
                                                                                      <div className="card card-body secondary-bg shadow-sm p-3">
                                                                                          <div className="custom-control custom-checkbox">
                                                                                              <input
                                                                                                  type="checkbox"
                                                                                                  className="custom-control-input"
                                                                                                  id={`customCheck1${option_index}`}
                                                                                                  value={
                                                                                                      option.content
                                                                                                  }
                                                                                                  onChange={(
                                                                                                      event
                                                                                                  ) =>
                                                                                                      this.handleMCQ(
                                                                                                          event,
                                                                                                          index
                                                                                                      )
                                                                                                  }
                                                                                                  checked={
                                                                                                      question.length !==
                                                                                                      0
                                                                                                          ? question[
                                                                                                                index
                                                                                                            ]
                                                                                                                .answer
                                                                                                                .length !==
                                                                                                            0
                                                                                                              ? question[
                                                                                                                    index
                                                                                                                ].answer.includes(
                                                                                                                    option.content
                                                                                                                )
                                                                                                                  ? true
                                                                                                                  : false
                                                                                                              : false
                                                                                                          : false
                                                                                                  }
                                                                                              />
                                                                                              <label
                                                                                                  className="custom-control-label"
                                                                                                  htmlFor={`customCheck1${option_index}`}
                                                                                              >
                                                                                                  {
                                                                                                      option.content
                                                                                                  }
                                                                                              </label>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      )
                                                                  ) : // ----- True or false -----
                                                                  data.boolean ===
                                                                    true ? (
                                                                      data.boolean_question.map(
                                                                          (
                                                                              option,
                                                                              boolean_index
                                                                          ) => {
                                                                              return (
                                                                                  <div
                                                                                      className="col-md-6 mb-3"
                                                                                      key={
                                                                                          boolean_index
                                                                                      }
                                                                                  >
                                                                                      <div className="card card-body secondary-bg shadow-sm p-3">
                                                                                          <div className="form-check">
                                                                                              <input
                                                                                                  className="form-check-input"
                                                                                                  type="radio"
                                                                                                  id={`customCheck1${boolean_index}`}
                                                                                                  name={`radio${index}`}
                                                                                                  value={
                                                                                                      option.content
                                                                                                  }
                                                                                                  onChange={(
                                                                                                      event
                                                                                                  ) =>
                                                                                                      this.handleBoolean(
                                                                                                          event,
                                                                                                          index
                                                                                                      )
                                                                                                  }
                                                                                                  checked={
                                                                                                      question.length !==
                                                                                                      0
                                                                                                          ? question[
                                                                                                                index
                                                                                                            ]
                                                                                                                .answer
                                                                                                                .length !==
                                                                                                            0
                                                                                                              ? question[
                                                                                                                    index
                                                                                                                ].answer.includes(
                                                                                                                    option.content
                                                                                                                )
                                                                                                                  ? true
                                                                                                                  : false
                                                                                                              : false
                                                                                                          : false
                                                                                                  }
                                                                                              />
                                                                                              <label
                                                                                                  className="form-check-label"
                                                                                                  id={`customCheck1${boolean_index}`}
                                                                                              >
                                                                                                  {
                                                                                                      option.content
                                                                                                  }
                                                                                              </label>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      )
                                                                  ) : // ----- Fill in answers -----
                                                                  data.fill_in ===
                                                                    true ? (
                                                                      <div
                                                                          className="col-md-6 mb-3"
                                                                          key={
                                                                              index
                                                                          }
                                                                      >
                                                                          <input
                                                                              type="text"
                                                                              name="fill_in"
                                                                              className="form-control borders"
                                                                              placeholder="Type your answer here"
                                                                              value={
                                                                                  question.length !==
                                                                                  0
                                                                                      ? question[
                                                                                            index
                                                                                        ]
                                                                                            .answer
                                                                                            .length !==
                                                                                        0
                                                                                          ? question[
                                                                                                index
                                                                                            ]
                                                                                                .answer[0]
                                                                                          : ""
                                                                                      : ""
                                                                              }
                                                                              onChange={(
                                                                                  event
                                                                              ) =>
                                                                                  this.handleFillin(
                                                                                      event,
                                                                                      index
                                                                                  )
                                                                              }
                                                                              autoComplete="off"
                                                                          />
                                                                      </div>
                                                                  ) : null}
                                                              </div>

                                                              {/* ----- Multiple choice notes ----- */}
                                                              {data.mcq_answers !==
                                                              undefined ? (
                                                                  data.mcq_answers >
                                                                  1 ? (
                                                                      <div className="small">
                                                                          <b>
                                                                              Note:
                                                                          </b>{" "}
                                                                          {
                                                                              data.mcq_answers
                                                                          }{" "}
                                                                          answers
                                                                          are
                                                                          correct
                                                                      </div>
                                                                  ) : null
                                                              ) : null}
                                                          </div>

                                                          {/* ----- Image section ----- */}
                                                          {data.files !==
                                                          undefined ? (
                                                              <div className="col-md-1">
                                                                  {data.files
                                                                      .length !==
                                                                  0
                                                                      ? Object.entries(
                                                                            data
                                                                                .files[0]
                                                                        ).map(
                                                                            (
                                                                                [
                                                                                    key,
                                                                                    value,
                                                                                ],
                                                                                index
                                                                            ) => {
                                                                                return key ===
                                                                                    "type1_image_1" ||
                                                                                    key ===
                                                                                        "type1_image_2" ||
                                                                                    key ===
                                                                                        "type1_image_3" ||
                                                                                    key ===
                                                                                        "type1_image_4" ? (
                                                                                    <div
                                                                                        className={`card preview-img-xs shadow-sm mb-2 ${
                                                                                            this
                                                                                                .state
                                                                                                .selectedImage ===
                                                                                            index
                                                                                                ? "border-primary"
                                                                                                : ""
                                                                                        }`}
                                                                                        style={{
                                                                                            backgroundImage: `url(${value})`,
                                                                                        }}
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                    ></div>
                                                                                ) : (
                                                                                    ""
                                                                                );
                                                                            }
                                                                        )
                                                                      : ""}
                                                              </div>
                                                          ) : (
                                                              ""
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      );
                                  })
                                : null
                            : null}

                        {/* Navigation */}
                        <div className="row">
                            <div className="col-md-6">
                                <button
                                    className="btn btn-primary btn-sm shadow-none"
                                    disabled={
                                        this.state.activeSection === 0
                                            ? true
                                            : false
                                    }
                                    onClick={this.handlePrev}
                                >
                                    <i className="fas fa-angle-left mr-1"></i>
                                    Previous
                                </button>
                            </div>
                            <div className="col-md-6 text-right">
                                {sections.length !== 0 ? (
                                    this.state.activeSection <
                                    sections.length - 1 ? (
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handleNext}
                                        >
                                            Next
                                            <i className="fas fa-angle-right ml-2"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    )
                                ) : (
                                    <button
                                        className="btn btn-primary btn-sm shadow-none"
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                        <i className="fas fa-angle-right ml-2"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </>
        );
    }
}

export default CycleTestQA;
