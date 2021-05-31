import React, { Component } from "react";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import Loading from "../../common/loader";
import AlertBox from "../../common/alert";
import { connect } from "react-redux";
import { waterMark } from "../../common/function/watermark";

const mapStateToProps = (state) => ({
    profile: state.user.profile,
    group_name: state.content.group_name,
});

class HODGroupDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupItem: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
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

    componentDidMount = () => {
        document.title = `${this.props.group_name} Details - HOD | IQLabs`;

        fetch(`${this.url}/hod/group/${this.groupId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        groupItem: result.data,
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

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.group_name}
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
                    style={waterMark(this.props.profile)}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* Breadcrumb */}
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
                                        {this.props.group_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Details
                                </li>
                            </ol>
                        </nav>

                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table table-xl">
                                    <thead className="text-white primary-bg">
                                        <tr>
                                            <th scope="col">Sl.No</th>
                                            <th scope="col">Subject</th>
                                            <th scope="col">
                                                <div className="row">
                                                    <div className="col-6">
                                                        Chapters
                                                    </div>
                                                    <div className="col-6">
                                                        Teacher
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.groupItem.length !== 0
                                            ? this.state.groupItem.subjects.map(
                                                  (data, index) => {
                                                      return (
                                                          <tr key={index}>
                                                              <td>
                                                                  {index + 1}
                                                              </td>
                                                              <td>
                                                                  {
                                                                      data.subject_name
                                                                  }
                                                              </td>
                                                              <td>
                                                                  {data.chapters
                                                                      .length !==
                                                                  0
                                                                      ? data.chapters.map(
                                                                            (
                                                                                chapter,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <div
                                                                                        className="row"
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                    >
                                                                                        <p className="col-6">
                                                                                            {
                                                                                                chapter.chapter_name
                                                                                            }
                                                                                        </p>
                                                                                        <div className="col-6">
                                                                                            <p
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    chapter
                                                                                                        .teacher
                                                                                                        .full_name
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )
                                                                      : ""}
                                                              </td>
                                                          </tr>
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer"></div>
                        </div>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(HODGroupDetails);
