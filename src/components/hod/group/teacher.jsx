import React, { Component } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import { connect } from "react-redux";
import { waterMark } from "../../sharedComponents/watermark";

const mapStateToProps = (state) => ({
    profile: state.user.profile,
    group_name: state.content.group_name,
});

function EmptyData() {
    return (
        <Nav.Item>
            <Nav.Link eventKey="0">Data not available</Nav.Link>
        </Nav.Item>
    );
}

class HODGroupTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            teacherItems: [],

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
        fetch(`${this.url}/hod/group/${this.groupId}/teacher/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        teacherItems: result.data.results,
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
        document.title = `${this.props.group_name} Teachers - HOD | IQLabs`;
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

                        {/* Filter area */}
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
                                    Teacher
                                </li>
                            </ol>
                        </nav>

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
                                                                        {list.full_name !==
                                                                        ""
                                                                            ? list.full_name
                                                                            : list.username}
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

export default connect(mapStateToProps)(HODGroupTeachers);
