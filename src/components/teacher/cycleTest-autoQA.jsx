import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";

class CycleTestAutoQA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            data: [],
            pageNumber: "",
            page_loading: true,

            selectedImageQuestion: "",
            selectedImageData: [],
            selectedImage: "",
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterName = this.props.match.params.chapterName;
        this.cycle_testId = this.props.match.params.cycle_testId;
        this.sectionId = this.props.match.params.sectionId;
        this.attempt = new URLSearchParams(this.props.location.search).get(
            "attempt"
        );
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

    loadQAData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/auto/${this.sectionId}/?attempt_number=${this.attempt}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                let data = [];
                let images = [];
                let audio = [];
                if (result.data.results.length !== 0) {
                    for (let i = 0; i < result.data.results.length; i++) {
                        if (result.data.results[i] !== null) {
                            if (result.data.results[i].mcq.length !== 0) {
                                for (
                                    let j = 0;
                                    j < result.data.results[i].mcq.length;
                                    j++
                                ) {
                                    images = [];
                                    audio = [];
                                    if (
                                        result.data.results[i].mcq[j].files
                                            .length !== 0
                                    ) {
                                        // image
                                        if (
                                            result.data.results[i].mcq[j]
                                                .files[0].type1_image_1
                                        ) {
                                            images.push({
                                                title:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0]
                                                        .type1_image_1_title,
                                                file_name: "",
                                                image: null,
                                                path:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0].type1_image_1,
                                            });
                                        }
                                        if (
                                            result.data.results[i].mcq[j]
                                                .files[0].type1_image_2
                                        ) {
                                            images.push({
                                                title:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0]
                                                        .type1_image_2_title,
                                                file_name: "",
                                                image: null,
                                                path:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0].type1_image_2,
                                            });
                                        }
                                        if (
                                            result.data.results[i].mcq[j]
                                                .files[0].type1_image_3
                                        ) {
                                            images.push({
                                                title:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0]
                                                        .type1_image_3_title,
                                                file_name: "",
                                                image: null,
                                                path:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0].type1_image_3,
                                            });
                                        }
                                        if (
                                            result.data.results[i].mcq[j]
                                                .files[0].type1_image_4
                                        ) {
                                            images.push({
                                                title:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0]
                                                        .type1_image_4_title,
                                                file_name: "",
                                                image: null,
                                                path:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0].type1_image_4,
                                            });
                                        }

                                        // audio
                                        if (
                                            result.data.results[i].mcq[j]
                                                .files[0].type1_audio_1
                                        ) {
                                            audio.push({
                                                title:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0]
                                                        .type1_audio_1_title,
                                                file_name: "",
                                                audio:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0].type1_audio_1,
                                            });
                                        }
                                        if (
                                            result.data.results[i].mcq[j]
                                                .files[0].type1_audio_2
                                        ) {
                                            audio.push({
                                                title:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0]
                                                        .type1_audio_2_title,
                                                file_name: "",
                                                audio:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0].type1_audio_2,
                                            });
                                        }
                                    }

                                    data.push({
                                        question:
                                            result.data.results[i].mcq[j]
                                                .question,
                                        question_random_id:
                                            result.data.results[i].mcq[j]
                                                .question_random_id,
                                        content: {
                                            mcq:
                                                result.data.results[i].mcq[j]
                                                    .mcq,
                                            fill_in:
                                                result.data.results[i].mcq[j]
                                                    .fill_in,
                                            boolean:
                                                result.data.results[i].mcq[j]
                                                    .boolean,
                                            fillin_answer:
                                                result.data.results[i].mcq[j]
                                                    .fillin_answer.length !== 0
                                                    ? result.data.results[i]
                                                          .mcq[j].fillin_answer
                                                    : [""],
                                            boolean_question:
                                                result.data.results[i].mcq[j]
                                                    .boolean_question.length !==
                                                0
                                                    ? result.data.results[i]
                                                          .mcq[j]
                                                          .boolean_question
                                                    : [
                                                          {
                                                              correct: false,
                                                              content: "True",
                                                          },
                                                          {
                                                              correct: false,
                                                              content: "False",
                                                          },
                                                      ],
                                            options:
                                                result.data.results[i].mcq[j]
                                                    .options.length !== 0
                                                    ? result.data.results[i]
                                                          .mcq[j].options
                                                    : [
                                                          {
                                                              correct: false,
                                                              content: "",
                                                          },
                                                          {
                                                              correct: false,
                                                              content: "",
                                                          },
                                                          {
                                                              correct: false,
                                                              content: "",
                                                          },
                                                          {
                                                              correct: false,
                                                              content: "",
                                                          },
                                                      ],
                                            explanation:
                                                result.data.results[i].mcq[j]
                                                    .explanation,
                                            images:
                                                images.length === 0
                                                    ? [
                                                          {
                                                              title: "",
                                                              file_name: "",
                                                              image: null,
                                                              path: "",
                                                          },
                                                      ]
                                                    : images,
                                            video: {
                                                title:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files.length !== 0 &&
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0]
                                                        .type1_video_1_title
                                                        ? result.data.results[i]
                                                              .mcq[j].files[0]
                                                              .type1_video_1_title
                                                        : "",
                                                file_name: "",
                                                video: null,
                                                pasteUrl:
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files.length !== 0 &&
                                                    result.data.results[i].mcq[
                                                        j
                                                    ].files[0].paste_video_url
                                                        ? result.data.results[i]
                                                              .mcq[j].files[0]
                                                              .paste_video_url
                                                        : "",
                                            },
                                            audio:
                                                audio.length === 0
                                                    ? [
                                                          {
                                                              title: "",
                                                              file_name: "",
                                                              audio: null,
                                                          },
                                                          {
                                                              title: "",
                                                              file_name: "",
                                                              audio: null,
                                                          },
                                                      ]
                                                    : audio,
                                        },
                                    });
                                }
                            } else {
                                continue;
                            }
                        } else {
                            continue;
                        }
                    }
                }
                this.setState({
                    data: data,
                    page_loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = `${this.chapterName} - Teacher | IQLabs`;

        this.loadQAData();
    };

    changeImage = (image_index, q_index) => {
        const images = [...this.state.data];
        if (
            this.state.selectedImage === image_index &&
            this.state.selectedImageQuestion === q_index
        ) {
            this.setState({
                selectedImage: "",
                selectedImageQuestion: "",
                selectedImageData: [],
            });
        } else {
            this.setState({
                selectedImage: image_index,
                selectedImageQuestion: q_index,
                selectedImageData: images[q_index].content.images[image_index],
            });
        }
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Subject name" togglenav={this.toggleSideNav} />

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

                        {/* Header */}
                        <div className="card primary-bg text-white small mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-7">Section name</div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <div className="col-md-4">
                                                {this.attempt}
                                            </div>
                                            <div className="col-md-4">
                                                {this.state.data.length !== 0
                                                    ? this.state.data.length
                                                    : "0"}{" "}
                                                Questions
                                            </div>
                                            <div className="col-md-4">
                                                Total time: 40 mins
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Q&A */}
                        {this.state.data.length !== 0
                            ? this.state.data.map((data, q_index) => {
                                  return (
                                      <div className="row mb-3" key={q_index}>
                                          <div className="col-md-1">
                                              <div className="card shadow-sm">
                                                  <div className="card-body p-2 text-center font-weight-bold">
                                                      {q_index + 1}
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="col-md-11 pl-0">
                                              <div className="card small shadow-sm">
                                                  <div className="card-body">
                                                      <div className="row">
                                                          {/* Questions & options */}
                                                          <div
                                                              className={`${
                                                                  this.state
                                                                      .selectedImageData
                                                                      .length !==
                                                                      0 &&
                                                                  this.state
                                                                      .selectedImageQuestion ===
                                                                      q_index
                                                                      ? "col-md-9"
                                                                      : "col-md-11 pr-md-0"
                                                              }`}
                                                          >
                                                              <div className="form-group">
                                                                  <div className="card">
                                                                      <div
                                                                          className="card-body font-weight-bold py-2"
                                                                          dangerouslySetInnerHTML={{
                                                                              __html:
                                                                                  data.question,
                                                                          }}
                                                                      ></div>
                                                                  </div>
                                                              </div>
                                                              {data.content
                                                                  .mcq ? (
                                                                  <div className="row">
                                                                      {data.content.options.map(
                                                                          (
                                                                              options,
                                                                              index
                                                                          ) => {
                                                                              return (
                                                                                  <div
                                                                                      className="col-md-6"
                                                                                      key={
                                                                                          index
                                                                                      }
                                                                                  >
                                                                                      <div className="form-group">
                                                                                          <div
                                                                                              className={`card form-shadow ${
                                                                                                  options.correct
                                                                                                      ? "border border-success"
                                                                                                      : ""
                                                                                              }`}
                                                                                          >
                                                                                              <div className="card-body small py-2">
                                                                                                  {options.content !==
                                                                                                  "" ? (
                                                                                                      options.content
                                                                                                  ) : (
                                                                                                      <span className="text-muted">{`Option 0${
                                                                                                          index +
                                                                                                          1
                                                                                                      }`}</span>
                                                                                                  )}
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      )}
                                                                  </div>
                                                              ) : (
                                                                  ""
                                                              )}
                                                              {data.content
                                                                  .fill_in ? (
                                                                  <div className="row">
                                                                      {data.content.fillin_answer.map(
                                                                          (
                                                                              fill_in,
                                                                              index
                                                                          ) => {
                                                                              return (
                                                                                  <div
                                                                                      className="col-md-6"
                                                                                      key={
                                                                                          index
                                                                                      }
                                                                                  >
                                                                                      <div className="form-group">
                                                                                          <div className="card form-shadow">
                                                                                              <div className="card-body small py-2">
                                                                                                  {fill_in !==
                                                                                                  "" ? (
                                                                                                      fill_in
                                                                                                  ) : (
                                                                                                      <span className="text-muted">{`Answer 0${
                                                                                                          index +
                                                                                                          1
                                                                                                      }`}</span>
                                                                                                  )}
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      )}
                                                                  </div>
                                                              ) : (
                                                                  ""
                                                              )}
                                                              {data.content
                                                                  .boolean ? (
                                                                  <div className="row">
                                                                      {data.content.boolean_question.map(
                                                                          (
                                                                              boolean,
                                                                              index
                                                                          ) => {
                                                                              return (
                                                                                  <div
                                                                                      className="col-md-6"
                                                                                      key={
                                                                                          index
                                                                                      }
                                                                                  >
                                                                                      <div className="form-group">
                                                                                          <div
                                                                                              className={`card form-shadow ${
                                                                                                  boolean.correct
                                                                                                      ? "border border-success"
                                                                                                      : ""
                                                                                              }`}
                                                                                          >
                                                                                              <div className="card-body small py-2">
                                                                                                  {
                                                                                                      boolean.content
                                                                                                  }
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      )}
                                                                  </div>
                                                              ) : (
                                                                  ""
                                                              )}
                                                          </div>
                                                          {/* image preview */}
                                                          {this.state
                                                              .selectedImageData
                                                              .length !== 0 &&
                                                          this.state
                                                              .selectedImageQuestion ===
                                                              q_index ? (
                                                              <div className="col-md-2 mb-2 mb-md-0 pr-md-0">
                                                                  <div className="card shadow-sm">
                                                                      <img
                                                                          src={
                                                                              this
                                                                                  .state
                                                                                  .selectedImageData
                                                                                  .path
                                                                          }
                                                                          alt={
                                                                              this
                                                                                  .state
                                                                                  .selectedImageData
                                                                                  .file_name
                                                                          }
                                                                          className="img-fluid rounded-lg"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          ) : (
                                                              ""
                                                          )}
                                                          <div className="col-md-1 d-flex justify-content-md-center justify-content-around flex-wrap">
                                                              {data.content.images.map(
                                                                  (
                                                                      images,
                                                                      index
                                                                  ) => {
                                                                      return images.path !==
                                                                          "" ? (
                                                                          <div
                                                                              key={
                                                                                  index
                                                                              }
                                                                              className="card preview-img-sm bg-light shadow-sm"
                                                                              style={{
                                                                                  backgroundImage: `url(${images.path})`,
                                                                              }}
                                                                              onClick={() =>
                                                                                  this.changeImage(
                                                                                      index,
                                                                                      q_index
                                                                                  )
                                                                              }
                                                                          ></div>
                                                                      ) : (
                                                                          <div
                                                                              key={
                                                                                  index
                                                                              }
                                                                              className="card preview-img-sm bg-light shadow-sm"
                                                                          ></div>
                                                                      );
                                                                  }
                                                              )}
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  );
                              })
                            : ""}

                        {/* Navigation */}
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary btn-sm">
                                    <i className="fas fa-angle-left mr-1"></i>{" "}
                                    Previous
                                </button>
                            </div>
                            <div className="col-md-6 text-right">
                                <button className="btn btn-primary btn-sm">
                                    Next
                                    <i className="fas fa-angle-right ml-2"></i>
                                </button>
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

export default CycleTestAutoQA;
