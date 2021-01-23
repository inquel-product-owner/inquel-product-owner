import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";

class GroupDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupItem: [],
            page_loading: true,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        fetch(`${url}/hod/group/${this.props.match.params.groupId}`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    groupItem: result.data,
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
            this.state.groupItem.length !== 0
                ? this.state.groupItem.group_name + " Details - HOD | IQLabs"
                : "Group Details - HOD | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.groupItem.group_name}
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

                        <div className="row">
                            <div className="col-md-8">
                                <h5 className="primary-text mb-3">Details</h5>
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
                                                {this.state.groupItem.length !==
                                                0
                                                    ? this.state.groupItem.subjects.map(
                                                          (data, index) => {
                                                              return (
                                                                  <tr
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <td>
                                                                          {index +
                                                                              1}
                                                                      </td>
                                                                      <td>
                                                                          {
                                                                              data.subject_name
                                                                          }
                                                                      </td>
                                                                      <td>
                                                                          {data
                                                                              .chapters
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
                                    {/* <div className="card-body">
                                        <button className="btn btn-light btn-sm btn-block shadow-sm">
                                            Add
                                        </button>
                                    </div> */}
                                    <div className="card-footer"></div>
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

export default GroupDetails;
