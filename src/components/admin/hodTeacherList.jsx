import React, { Component } from "react";
import Wrapper from "./wrapper";
import profilepic from "../../assets/user-v1.png";
import { Tab, Row, Col, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function EmptyData() {
    return (
        <Nav.Item>
            <Nav.Link eventKey="0">Data not available</Nav.Link>
        </Nav.Item>
    );
}

class AdminHodTeacherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherItems: [],
            hodItems: [],
        };
        this.hodId = this.props.match.params.hodId;
    }

    componentDidMount = () => {
        document.title = "Teacher Profile - Admin | IQLabs";

        Promise.all([
            fetch(`${this.wrapper.url}/hod/${this.hodId}/`, {
                headers: this.wrapper.headers,
                method: "GET",
            }).then((res) => res.json()),
            fetch(`${this.wrapper.url}/hod/${this.hodId}/teacher/`, {
                headers: this.wrapper.headers,
                method: "GET",
            }).then((res) => res.json()),
        ])
            .then((result) => {
                if (result[1].sts === true) {
                    this.setState({
                        hodItems: result[0].data,
                        teacherItems: result[1].data.results,
                    });
                    this.wrapper.pageLoading(false);
                } else {
                    this.wrapper.pageLoading(false);
                    this.wrapper.errorAlert(result[1].msg, true);
                }
            })
            .catch((err) => {
                console.log(err);
                this.wrapper.pageLoading(false);
                this.wrapper.errorAlert("Something went wrong!", true);
            });
    };

    render() {
        return (
            <Wrapper
                history={this.props.history}
                header="Teacher List"
                activeLink="profiles"
                ref={(ref) => (this.wrapper = ref)}
            >
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-3">
                        <li className="breadcrumb-item">
                            <Link to="/admin">
                                <i className="fas fa-home fa-sm"></i>
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="#" onClick={this.props.history.goBack}>
                                HOD
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Teacher</li>
                    </ol>
                </nav>

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
                                        ? this.state.hodItems.full_name !== ""
                                            ? this.state.hodItems.full_name
                                            : this.state.hodItems.username
                                        : ""}
                                </h5>
                                <p className="mb-0">
                                    {this.state.hodItems.length !== 0 ? (
                                        this.state.hodItems.is_active ? (
                                            <Badge variant="success">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="danger">
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
                                        {this.state.teacherItems.length !==
                                        0 ? (
                                            this.state.teacherItems.map(
                                                (list, index) => {
                                                    return (
                                                        <Nav.Item key={index}>
                                                            <Nav.Link
                                                                eventKey={index}
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
            </Wrapper>
        );
    }
}

export default AdminHodTeacherList;
