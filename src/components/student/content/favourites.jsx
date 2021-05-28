import React, { Component } from "react";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import Loading from "../../shared/loader";
import AlertBox from "../../shared/alert";
import { baseUrl, studentUrl } from "../../../shared/baseUrl.js";

class Favourites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            subjectItems: [],
            favouritesData: {},

            chapterId: "",
            chapter_name: "",
            selectedChapter: "chapter-0",
            selectedData: "",
            selectedType: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.url = baseUrl + studentUrl;
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

    toggleCollapse = (index, chapter_id, chapter_name) => {
        this.setState(
            {
                selectedChapter: `chapter-${index}`,
                chapterId: chapter_id,
                chapter_name: chapter_name,
                page_loading: true,
            },
            () => this.loadFavouritesData()
        );
    };

    // loads notes data
    loadFavouritesData = async () => {
        await fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.state.chapterId}/favourites/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let favourites = {};
                    let response = result.data;
                    if (response.length !== 0) {
                        response.forEach((item) => {
                            favourites[item.topic_num] = {
                                concepts: [],
                                questions: [],
                            };
                            if (item.concepts.length !== 0) {
                                item.concepts.forEach((concept) => {
                                    favourites[item.topic_num].concepts.push(
                                        concept
                                    );
                                });
                            }
                            if (item.questions.length !== 0) {
                                item.questions.forEach((question) => {
                                    favourites[item.topic_num].questions.push(
                                        question
                                    );
                                });
                            }
                        });
                    }
                    this.setState({
                        favouritesData: favourites,
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
        window.MathJax.typeset();
    };

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
                    let chapterId = "";
                    let chapter_name = "";
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        chapterId = result.data.chapters[0].chapter_id;
                        chapter_name = result.data.chapters[0].chapter_name;
                    }
                    this.setState(
                        {
                            chapterId: chapterId,
                            chapter_name: chapter_name,
                        },
                        () => {
                            this.loadFavouritesData();
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

    getTopicName = (data, topic_num) => {
        let topic_name = "";

        if (Array.isArray(data)) {
            data.forEach((item) => {
                if (item.topic_num === topic_num) {
                    topic_name = item.topic_name;
                } else if (item.child.length !== 0) {
                    topic_name = this.getTopicName(item.child, topic_num);
                }
            });
        }

        return topic_name;
    };

    loopSubjectData = (topic_num) => {
        let subject = this.state.subjectItems;
        let topic_name = "";

        subject.chapters.forEach((chapter) => {
            if (chapter.chapter_id === this.state.chapterId) {
                chapter.topics.forEach((topic) => {
                    topic_name = this.getTopicName(
                        topic.chapter_structure,
                        topic_num
                    );
                });
            }
        });

        return topic_name;
    };

    handleRouting = (data, type, topic_num) => {
        sessionStorage.setItem("data", JSON.stringify(data));
        this.props.history.push(
            `${this.props.match.url}/${this.state.chapterId}/${topic_num}/${type}`
        );
    };

    render() {
        document.title = `${this.state.chapter_name} Favourites - Student | IQLabs`;
        const chapter = this.state.subjectItems;
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
                                    <Link to="/student">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        Course
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Favourites
                                </li>
                            </ol>
                        </nav>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row">
                                    {/* ---------- Chapter list ---------- */}
                                    <div className="col-md-3 mb-2 mb-md-0 border-right">
                                        <div className="card">
                                            {chapter.length !== 0
                                                ? chapter.chapters.length !== 0
                                                    ? chapter.chapters.map(
                                                          (data, index) => {
                                                              return (
                                                                  <div
                                                                      className={`card card-body ${
                                                                          this
                                                                              .state
                                                                              .selectedChapter ===
                                                                          `chapter-${index}`
                                                                              ? "pinkrange-bg"
                                                                              : "light-bg"
                                                                      } font-weight-bold-600 primary-text small shadow-sm mb-2`}
                                                                      key={
                                                                          index
                                                                      }
                                                                      onClick={() =>
                                                                          this.toggleCollapse(
                                                                              index,
                                                                              data.chapter_id,
                                                                              data.chapter_name
                                                                          )
                                                                      }
                                                                      style={{
                                                                          paddingBottom:
                                                                              "13px",
                                                                          paddingTop:
                                                                              "13px",
                                                                          cursor:
                                                                              "default",
                                                                      }}
                                                                  >
                                                                      {
                                                                          data.chapter_name
                                                                      }
                                                                  </div>
                                                              );
                                                          }
                                                      )
                                                    : null
                                                : null}
                                        </div>
                                    </div>

                                    {/* ---------- Notes data ---------- */}

                                    <div className="col-md-9 pl-md-0">
                                        <div className="card card-body py-0">
                                            {Object.entries(
                                                this.state.favouritesData
                                            ).length !== 0
                                                ? Object.entries(
                                                      this.state.favouritesData
                                                  ).map(
                                                      ([key, value], index) => {
                                                          return value.concepts
                                                              .length !== 0 ||
                                                              value.questions
                                                                  .length !==
                                                                  0 ? (
                                                              <div
                                                                  className="card border-secondary mb-3"
                                                                  key={index}
                                                              >
                                                                  <div className="card-header font-weight-bold-600 pb-0">
                                                                      {`${key} - ${this.loopSubjectData(
                                                                          key
                                                                      )}`}
                                                                  </div>
                                                                  <div className="card-body">
                                                                      <div className="row">
                                                                          {value
                                                                              .concepts
                                                                              .length !==
                                                                          0 ? (
                                                                              <div className="col-md-6 mb-2">
                                                                                  <div className="card light-bg shadow-sm">
                                                                                      <div className="card-body">
                                                                                          <div className="row align-items-center pr-2">
                                                                                              <div className="col-10 primary-text font-weight-bold-600 small">
                                                                                                  Concept
                                                                                              </div>
                                                                                              <div className="col-2">
                                                                                                  <button
                                                                                                      className="btn btn-primary btn-sm shadow-none"
                                                                                                      onClick={() => {
                                                                                                          this.handleRouting(
                                                                                                              value.concepts,
                                                                                                              "concept",
                                                                                                              key
                                                                                                          );
                                                                                                      }}
                                                                                                  >
                                                                                                      View
                                                                                                  </button>
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                          ) : (
                                                                              ""
                                                                          )}
                                                                          {value
                                                                              .questions
                                                                              .length !==
                                                                          0 ? (
                                                                              <div className="col-md-6 mb-2">
                                                                                  <div className="card light-bg shadow-sm">
                                                                                      <div className="card-body">
                                                                                          <div className="row align-items-center pr-2">
                                                                                              <div className="col-10 primary-text font-weight-bold-600 small">
                                                                                                  Practice
                                                                                              </div>
                                                                                              <div className="col-2">
                                                                                                  <button
                                                                                                      className="btn btn-primary btn-sm shadow-none"
                                                                                                      onClick={() => {
                                                                                                          this.handleRouting(
                                                                                                              value.questions,
                                                                                                              "practice",
                                                                                                              key
                                                                                                          );
                                                                                                      }}
                                                                                                  >
                                                                                                      View
                                                                                                  </button>
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                          ) : (
                                                                              ""
                                                                          )}
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          ) : (
                                                              ""
                                                          );
                                                      }
                                                  )
                                                : "No content to display..."}
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

export default Favourites;
