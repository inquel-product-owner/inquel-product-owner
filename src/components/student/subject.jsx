import React, { Component } from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Card, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../sharedComponents/loader";
import AlertModal from "../sharedComponents/alertModal";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";

class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectItems: [],
            collapsed: [],
            page_loading: true,
            showAlertModal: false,
        };
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.collapsed = [];
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    toggleCollapse = (index) => {
        let collapsed = [...this.state.collapsed];
        for (let i = 0; i < collapsed.length; i++) {
            if (i !== index) {
                collapsed[i] = true;
            }
        }
        collapsed[index] = !collapsed[index];
        this.setState({
            collapsed: collapsed,
        });
    };

    componentDidMount = () => {
        fetch(`${this.url}/student/subject/${this.subjectId}`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        subjectItems: result.data,
                        page_loading: false,
                    });
                    let collapsed = [];
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        collapsed.push(i === 0 ? false : true);
                    }
                    this.setState({
                        collapsed: collapsed,
                    });
                } else {
                    this.setState({
                        alertMsg: result.detail ? result.detail : result.msg,
                        showAlertModal: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });

        // fetch(`${this.url}/student/subject/${this.subjectId}/chapter/chapterId/topics/`, {
        //     method: "GET",
        //     headers: this.headers,
        // })
        //     .then((res) => res.json())
        //     .then((result) => {
        //         console.log(result);
        //         if (result.sts === true) {
        //             this.setState({
        //                 subjectItems: result.data,
        //                 page_loading: false,
        //             });
        //         } else {
        //             this.setState({
        //                 alertMsg: result.detail ? result.detail : result.msg,
        //                 showAlertModal: true,
        //                 page_loading: false,
        //             });
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    topic = (data, index, chapter_id) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return this.topic(topic, index, chapter_id);
        });

        return (
            <div key={index}>
                <Card.Header
                    className="small light-bg shadow-sm mb-2"
                    style={{ borderRadius: "8px" }}
                >
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <div className="row">
                                <div className="col-md-2 col-3">
                                    {data.topic_num}
                                </div>
                                <div className="col-md-10 col-9">
                                    {data.topic_name}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="row align-items-center">
                                <div className="col-md-2 mb-2 mb-md-0"></div>
                                <div className="col-md-2 mb-2 mb-md-0"></div>
                                <div className="col-md-2 mb-2 mb-md-0">
                                    <Link
                                        to={`${this.props.match.url}/chapter/${chapter_id}/${data.topic_name}/notes`}
                                    >
                                        <button className="btn btn-light btn-sm shadow-sm">
                                            <i className="fas fa-eye fa-sm"></i>
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-md-2 mb-2 mb-md-0">
                                    Remarks
                                </div>
                                <div className="col-md-2 mb-2 mb-md-0">1.2</div>
                                <div className="col-md-2 mb-2 mb-md-0 text-right">
                                    <span className="h5 text-muted">
                                        <i className="fas fa-check-circle"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <div className="ml-md-3">{nestedTopics}</div>
            </div>
        );
    };

    cycleTest = (data, index) => {
        return (
            <div
                className="card card-header shadow-sm light-bg mb-2"
                key={index}
            >
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="small primary-text font-weight-bold-600 mb-0">
                            {data.cycle_test_name}
                        </p>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        {data.direct_question !== undefined ? (
                            data.direct_question === false ? (
                                <Link
                                    to={`${this.props.match.url}/cycle/${data.cycle_test_id}`}
                                >
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() =>
                                            this.dispatchCycle(
                                                data.cycle_test_name
                                            )
                                        }
                                    >
                                        Auto
                                    </button>
                                </Link>
                            ) : (
                                <Link
                                    to={`${this.props.match.url}/cycle/${data.cycle_test_id}/direct`}
                                >
                                    <button
                                        className="btn btn-primary btn-sm ml-2"
                                        onClick={() =>
                                            this.dispatchCycle(
                                                data.cycle_test_name
                                            )
                                        }
                                    >
                                        Direct Test
                                    </button>
                                </Link>
                            )
                        ) : null}
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

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* ALert modal */}
                {this.state.showAlertModal ? (
                    <AlertModal
                        show={this.state.showAlertModal}
                        msg={this.state.alertMsg}
                        goBack={this.props.history.goBack}
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
                                <button className="btn btn-primary btn-sm mr-1">
                                    My Personal Notes
                                </button>
                                <button className="btn btn-primary btn-sm">
                                    Simulation
                                </button>
                            </div>
                        </div>

                        {/* Course details */}
                        <div className="card shadow-sm">
                            <div className="card-header secondary-bg primary-text font-weight-bold">
                                <div className="row">
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
                                            <div className="col-md-2">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <Accordion defaultActiveKey="chapter-0">
                                    {this.state.subjectItems.length !== 0
                                        ? this.state.subjectItems.chapters.map(
                                              (data, index) => {
                                                  this.collapsed.push(
                                                      index === 0 ? false : true
                                                  );
                                                  return (
                                                      <Card
                                                          className="mb-2"
                                                          key={index}
                                                      >
                                                          <Accordion.Toggle
                                                              as={Card.Header}
                                                              eventKey={`chapter-${index}`}
                                                              className="pinkrange-bg shadow-sm mb-2"
                                                              style={{
                                                                  cursor:
                                                                      "pointer",
                                                                  borderRadius:
                                                                      "8px",
                                                              }}
                                                              onClick={() =>
                                                                  this.toggleCollapse(
                                                                      index
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
                                                                                          this
                                                                                              .state
                                                                                              .collapsed[
                                                                                              index
                                                                                          ]
                                                                                              ? "fa-rotate-270"
                                                                                              : ""
                                                                                      }`}
                                                                                  ></i>
                                                                              </span>
                                                                          </div>
                                                                          <div className="col-1 small font-weight-bold-600">
                                                                              {index +
                                                                                  1}
                                                                          </div>
                                                                          <div className="col-8 small font-weight-bold-600">
                                                                              {
                                                                                  data.chapter_name
                                                                              }
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  <div className="col-md-8 small primary-text font-weight-bold-600">
                                                                      <div className="row align-items-center justify-content-end">
                                                                          <div className="col-md-2 mb-2 mb-md-0">
                                                                              {
                                                                                  data.weightage
                                                                              }
                                                                          </div>
                                                                          <div className="col-md-2 mb-2 mb-md-0">
                                                                              <Link
                                                                                  to={`${this.props.match.url}/chapter/${data.chapter_id}/summary`}
                                                                              >
                                                                                  <button className="btn btn-light btn-sm">
                                                                                      <i className="fas fa-eye fa-sm"></i>
                                                                                  </button>
                                                                              </Link>
                                                                          </div>
                                                                          <div className="col-md-2 mb-2 mb-md-0"></div>
                                                                          <div className="col-md-2 mb-2 mb-md-0">
                                                                              Remarks
                                                                          </div>
                                                                          <div className="col-md-2 mb-2 mb-md-0"></div>
                                                                          <div className="col-md-2 text-right mb-2 mb-md-0">
                                                                              <span className="h5 text-muted">
                                                                                  <i className="fas fa-check-circle"></i>
                                                                              </span>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </Accordion.Toggle>

                                                          <Accordion.Collapse
                                                              eventKey={`chapter-${index}`}
                                                          >
                                                              <Card>
                                                                  {/* Topic list */}
                                                                  {data.topics.map(
                                                                      (
                                                                          topic
                                                                      ) => {
                                                                          return topic.chapter_structure.map(
                                                                              (
                                                                                  topics,
                                                                                  topic_index
                                                                              ) => {
                                                                                  return this.topic(
                                                                                      topics,
                                                                                      topic_index,
                                                                                      data.chapter_id
                                                                                  );
                                                                              }
                                                                          );
                                                                      }
                                                                  )}

                                                                  {/* Cycle test list */}
                                                                  {data.cycle_tests.map(
                                                                      (
                                                                          cycle,
                                                                          cycle_index
                                                                      ) => {
                                                                          return this.cycleTest(
                                                                              cycle,
                                                                              cycle_index
                                                                          );
                                                                      }
                                                                  )}
                                                              </Card>
                                                          </Accordion.Collapse>
                                                      </Card>
                                                  );
                                              }
                                          )
                                        : null}
                                </Accordion>

                                <div className="card card-header secondary-bg shadow-sm">
                                    <div className="row align-items-center">
                                        <div className="col-6">
                                            <p className="small font-weight-bold-600 mb-0">
                                                Semester Exams
                                            </p>
                                        </div>
                                        <div className="col-6 text-right">
                                            <button className="btn btn-primary btn-sm">
                                                Start
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
