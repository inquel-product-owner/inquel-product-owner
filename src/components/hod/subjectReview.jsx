import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../../shared/loadingComponent";

class SubjectReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectItems: [],
            chapterData: [],
            page_loading: true,
        };
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
        this.url = baseUrl + hodUrl;
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        fetch(
            `${this.url}/hod/subjects/${this.props.match.params.subjectId}/chapters/`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    subjectItems: result.data,
                    chapterData: result.data.chapters,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        document.title =
            this.state.subjectItems.length !== 0
                ? this.state.subjectItems.subject_name + " - HOD | IQLabs"
                : "Subject - HOD | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.subjectItems.subject_name}
                    togglenav={this.toggleSideNav}
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
                            className="btn btn-primary-invert btn-sm mb-2"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        <div className="row align-items-center mb-3">
                            <div className="col-md-6">
                                <h5 className="primary-text">
                                    {this.state.subjectItems.subject_name}
                                </h5>
                            </div>
                            <div className="col-md-6 text-center text-md-right">
                                <button className="btn btn-primary-invert mr-2">
                                    Filter{" "}
                                    <i className="fas fa-filter ml-1"></i>
                                </button>
                                <Link
                                    to={`/hod/subject/${this.props.match.params.subjectId}/assign`}
                                >
                                    <button className="btn btn-primary mr-2">
                                        Add New
                                    </button>
                                </Link>
                                <Link
                                    to={`/hod/subject/${this.props.match.params.subjectId}/configure`}
                                >
                                    <button className="btn btn-primary">
                                        Configure Course
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="secondary-bg">
                                        <tr>
                                            <th scope="col">
                                                Course structure
                                            </th>
                                            <th scope="col">Status</th>
                                            <th scope="col">
                                                Teacher assigned
                                            </th>
                                            <th scope="col"></th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Disable / Enable / Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.chapterData.length !== 0
                                            ? this.state.chapterData.map(
                                                  (list, index) => {
                                                      return (
                                                          <tr key={index}>
                                                              <td>
                                                                  <Link
                                                                      to={`/chapter/${this.props.match.params.subjectId}/${list.chapter_name}`}
                                                                      className="primary-text"
                                                                  >
                                                                      {
                                                                          list.chapter_name
                                                                      }
                                                                  </Link>
                                                              </td>
                                                              <td>
                                                                  {list.chapter_status ===
                                                                  "Yet to start" ? (
                                                                      <span className="text-danger">
                                                                          {
                                                                              list.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : list.chapter_status ===
                                                                    "Approved" ? (
                                                                      <span className="text-success">
                                                                          {
                                                                              list.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : list.chapter_status ===
                                                                    "In Progress" ? (
                                                                      <span className="text-warning">
                                                                          {
                                                                              list.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : list.chapter_status ===
                                                                        "Review" &&
                                                                    list.chapter_status ===
                                                                        "Ready for review" ? (
                                                                      <span className="text-primary">
                                                                          {
                                                                              list.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : (
                                                                      list.chapter_status
                                                                  )}
                                                              </td>
                                                              <td>
                                                                  {
                                                                      list
                                                                          .teacher
                                                                          .full_name
                                                                  }
                                                              </td>
                                                              <td>
                                                                  <button className="btn btn-primary-invert btn-sm">
                                                                      Re assign
                                                                  </button>
                                                              </td>
                                                              <td className="text-center">
                                                                  <button className="btn btn-primary btn-sm mr-1">
                                                                      D
                                                                  </button>
                                                                  <button className="btn btn-primary btn-sm mr-1">
                                                                      E
                                                                  </button>
                                                                  <button className="btn btn-primary btn-sm">
                                                                      <i className="fas fa-trash-alt fa-sm"></i>
                                                                  </button>
                                                              </td>
                                                          </tr>
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </tbody>
                                </table>
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

export default SubjectReview;
