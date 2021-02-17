import React, { Component } from "react";
import { Tab, Row, Col, Nav, Badge } from "react-bootstrap";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import Loading from "../sharedComponents/loader";

function EmptyData() {
    return (
        <Nav.Item>
            <Nav.Link eventKey="0">Data not available</Nav.Link>
        </Nav.Item>
    );
}

class HodTeacherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            teacherItems: [],
            hodItems: [],
            page_loading: true,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        document.title = "Teacher Profile - Admin | IQLabs";

        const hodId = this.props.match.params.hodId;
        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        Promise.all([
            fetch(`${url}/hod/${hodId}/`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
            fetch(`${url}/hod/${hodId}/teacher/`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
        ])
            .then((result) => {
                this.setState({
                    hodItems: result[0].data,
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
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name="HOD Teacher List"
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="profiles"
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

                        {/* HOD Details */}
                        <div className="row align-items-center mb-4">
                            <div className="col-md-6">
                                <div className="row align-items-center">
                                    <div className="col-md-2 col-3">
                                        <img
                                            src={
                                                this.state.hodItems.length !== 0
                                                    ? this.state.hodItems
                                                          .profile_link !== null
                                                        ? this.state.hodItems
                                                              .profile_link
                                                        : profilepic
                                                    : profilepic
                                            }
                                            alt={this.state.hodItems.full_name}
                                            className="img-fluid profile-pic"
                                        />
                                    </div>
                                    <div className="col-md-10 col-9 pl-0">
                                        <h5 className="primary-text">
                                            {this.state.hodItems.length !== 0
                                                ? this.state.hodItems
                                                      .full_name !== ""
                                                    ? this.state.hodItems
                                                          .full_name
                                                    : this.state.hodItems
                                                          .username
                                                : ""}
                                        </h5>
                                        <p className="mb-0">
                                            {this.state.hodItems.length !==
                                            0 ? (
                                                this.state.hodItems
                                                    .is_active ? (
                                                    <Badge
                                                        variant="success"
                                                        className="ml-1"
                                                    >
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="danger"
                                                        className="ml-1"
                                                    >
                                                        Not active
                                                    </Badge>
                                                )
                                            ) : (
                                                ""
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Teachers list */}
                        <div className="row justify-content-center justify-content-between mb-4">
                            <div className="col-md-3 mb-2 mb-md-0">
                                <h5 className="primary-text font-weight-bold">
                                    Teacher profiles
                                </h5>
                            </div>
                            <div className="col-md-3">
                                <form action="">
                                    <input
                                        type="search"
                                        name="search"
                                        id="search"
                                        placeholder="Search Teacher"
                                        className="form-control"
                                    />
                                </form>
                            </div>
                        </div>
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
                                                                        {list.full_name
                                                                            ? list.full_name
                                                                            : "No name"}
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
                                                                                {list
                                                                                    .handling
                                                                                    .length !==
                                                                                0
                                                                                    ? list.handling.map(
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
                                                                                                          {item.subjects
                                                                                                              ? item.subjects.map(
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
                                                                                                                                    {subject
                                                                                                                                        .chapters
                                                                                                                                        .length !==
                                                                                                                                    0
                                                                                                                                        ? subject.chapters.map(
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
                                                                                                                                          )
                                                                                                                                        : ""}
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        );
                                                                                                                    }
                                                                                                                )
                                                                                                              : ""}
                                                                                                      </td>
                                                                                                      <td></td>
                                                                                                      <td></td>
                                                                                                  </tr>
                                                                                              );
                                                                                          }
                                                                                      )
                                                                                    : ""}
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

export default HodTeacherList;
