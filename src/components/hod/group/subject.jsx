import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import { connect } from "react-redux";
import { waterMark } from "../../sharedComponents/watermark";

const mapStateToProps = (state) => ({
    data: state.user.profile,
});

class HODGroupSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupItem: [],
            subjectItems: [],
            chapterData: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
        this.subjectId = this.props.match.params.subjectId;
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

    loadSubjectData = () => {
        fetch(`${this.url}/hod/subjects/${this.subjectId}/chapters/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        subjectItems: result.data,
                        chapterData: result.data.chapters,
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

    componentDidMount = () => {
        fetch(`${this.url}/hod/group/${this.groupId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        groupItem: result.data,
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

        this.loadSubjectData();
    };

    render() {
        document.title =
            this.state.subjectItems.subject_name + " Subject - HOD | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.groupItem.group_name}
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
                    style={waterMark(this.props.data)}
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
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        Group
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    <span>Subject:</span>
                                    {this.state.subjectItems.subject_name}
                                </li>
                            </ol>
                        </nav>

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
                                            <th scope="col">View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.chapterData.length !== 0
                                            ? this.state.chapterData.map(
                                                  (list, index) => {
                                                      return (
                                                          <tr key={index}>
                                                              <td>
                                                                  {
                                                                      list.chapter_name
                                                                  }
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
                                                                    "Review" ? (
                                                                      <span className="text-primary">
                                                                          {
                                                                              list.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : list.chapter_status ===
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
                                                                  <button className="btn btn-primary-invert btn-sm shadow-sm">
                                                                      <i className="far fa-eye"></i>
                                                                  </button>
                                                              </td>
                                                          </tr>
                                                      );
                                                  }
                                              )
                                            : null}
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

export default connect(mapStateToProps)(HODGroupSubject);
