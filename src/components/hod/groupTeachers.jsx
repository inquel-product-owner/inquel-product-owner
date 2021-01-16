import React, { Component } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";

function EmptyData() {
    return (
        <Nav.Item>
            <Nav.Link eventKey="0">Data not available</Nav.Link>
        </Nav.Item>
    );
}

class GroupTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupItem: [],
            teacherItems: [],
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

        Promise.all([
            fetch(`${url}/hod/group/${this.props.match.params.groupId}`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
            fetch(
                `${url}/hod/group/${this.props.match.params.groupId}/teacher/`,
                {
                    headers: headers,
                    method: "GET",
                }
            ).then((res) => res.json()),
        ])
            .then((result) => {
                this.setState({
                    groupItem: result[0].data,
                    teacherItems: result[1].data.results,
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
                ? this.state.groupItem.group_name +
                  " Teacher List - HOD | IQLabs"
                : "Group Teacher List - HOD | IQLabs";
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

                        {/* Filter area */}
                        <div className="row align-items-center">
                            <div className="col-md-2">
                                <h5 className="primary-text">
                                    Teacher Profile
                                </h5>
                            </div>
                            <div className="col-md-10">
                                <div className="row justify-content-end mb-4">
                                    <div className="col-md-3 pr-md-0">
                                        <form>
                                            <div className="form-group">
                                                <input
                                                    type="search"
                                                    name="search"
                                                    id="search"
                                                    className="form-control"
                                                    placeholder="Search"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-3 justify-content-between">
                                        <button className="btn btn-primary btn-sm mr-1">
                                            Delete
                                        </button>
                                        <button className="btn btn-primary btn-sm mr-1">
                                            Enable
                                        </button>
                                        <button className="btn btn-primary btn-sm">
                                            Disable
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Teacher list */}
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <Tab.Container
                                    id="left-tabs-example"
                                    defaultActiveKey="0"
                                >
                                    <Row>
                                        <Col sm={3} className="mb-3 mb-md-0">
                                            <Nav
                                                variant="pills"
                                                className="flex-column"
                                            >
                                                {this.state.teacherItems
                                                    .length !== 0 ? (
                                                    this.state.teacherItems.map(
                                                        (list, index) => {
                                                            return (
                                                                <Nav.Item
                                                                    key={index}
                                                                >
                                                                    <Nav.Link
                                                                        eventKey={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            list.full_name
                                                                        }
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <EmptyData />
                                                )}
                                            </Nav>
                                        </Col>
                                        <Col sm={9}>
                                            <Tab.Content>
                                                {this.state.teacherItems.map(
                                                    (list, index) => {
                                                        return (
                                                            <Tab.Pane
                                                                key={index}
                                                                eventKey={index}
                                                            >
                                                                <div className="card shadow-sm">
                                                                    <div className="table-responsive">
                                                                        <table className="table">
                                                                            <thead className="secondary-bg primary-text">
                                                                                <tr>
                                                                                    <th scope="col">
                                                                                        Handling
                                                                                        Group
                                                                                    </th>
                                                                                    <th scope="col">
                                                                                        <div className="row">
                                                                                            <div className="col-6">
                                                                                                Handling
                                                                                                Subject
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                                Handling
                                                                                                Chapters
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>
                                                                                    <th scope="col">
                                                                                        Exams
                                                                                    </th>
                                                                                    <th scope="col">
                                                                                        Quizes
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {list.handling.map(
                                                                                    (
                                                                                        item,
                                                                                        index
                                                                                    ) => {
                                                                                        return (
                                                                                            <tr
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                            >
                                                                                                <td>
                                                                                                    {item.group_name ===
                                                                                                    "independent"
                                                                                                        ? ""
                                                                                                        : item.group_name}
                                                                                                </td>
                                                                                                <td>
                                                                                                    {item.subjects.map(
                                                                                                        (
                                                                                                            subject,
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
                                                                                                                            subject.subject_name
                                                                                                                        }
                                                                                                                    </p>
                                                                                                                    <div className="col-6">
                                                                                                                        {subject.chapters.map(
                                                                                                                            (
                                                                                                                                chapter,
                                                                                                                                index
                                                                                                                            ) => {
                                                                                                                                return (
                                                                                                                                    <p
                                                                                                                                        key={
                                                                                                                                            index
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        {
                                                                                                                                            chapter.chapter_name
                                                                                                                                        }
                                                                                                                                    </p>
                                                                                                                                );
                                                                                                                            }
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            );
                                                                                                        }
                                                                                                    )}
                                                                                                </td>
                                                                                                <td></td>
                                                                                                <td></td>
                                                                                            </tr>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </Tab.Pane>
                                                        );
                                                    }
                                                )}
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
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

export default GroupTeachers;
