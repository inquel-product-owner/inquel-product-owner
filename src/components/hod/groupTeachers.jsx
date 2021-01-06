import React, { Component } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";

function Loading() {
    return <p>Loading...</p>;
}

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
            isLoaded: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    dateConversion = (date) => {
        var newDate = new Date(date).toLocaleDateString();
        var datearray = newDate.split("/");
        return datearray[1] + "/" + datearray[0] + "/" + datearray[2];
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
                `${url}/hod/group/${this.props.match.params.groupId}/student/`,
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
                    isLoaded: true,
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
                ? this.state.groupItem.group_name + " Teacher List| IQLabs"
                : "Group Teacher List | IQLabs";
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
                        {/* Filter area */}
                        <div className="row align-items-center">
                            <div className="col-md-2">
                                <h5 className="primary-text">
                                    Teacher Profile
                                </h5>
                            </div>
                            <div className="col-md-10">
                                <div className="row justify-content-center justify-content-md-end mb-4">
                                    <div className="col-md-4 pr-md-0">
                                        <form>
                                            <div className="form-group">
                                                <input
                                                    type="search"
                                                    name="search"
                                                    id="search"
                                                    className="form-control mb-md-0 mb-2"
                                                    placeholder="Search"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-4 text-md-right text-center">
                                        <button className="btn btn-primary mr-md-2 mr-1">
                                            Add
                                        </button>
                                        <button className="btn btn-primary mr-md-2 mr-1">
                                            Delete
                                        </button>
                                        <button className="btn btn-primary mr-md-2 mr-1">
                                            Enable
                                        </button>
                                        <button className="btn btn-primary">
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
                                    defaultActiveKey="1"
                                >
                                    <Row>
                                        <Col sm={3} className="mb-3 mb-md-0">
                                            <Nav
                                                variant="pills"
                                                className="flex-column"
                                            >
                                                {this.state.isLoaded ? (
                                                    this.state.teacherItems
                                                        .length !== 0 ? (
                                                        this.state.teacherItems.map(
                                                            (list, index) => {
                                                                return (
                                                                    <Nav.Item
                                                                        key={
                                                                            index
                                                                        }
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
                                                    )
                                                ) : (
                                                    <Loading />
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
                                                                                        standard
                                                                                    </th>
                                                                                    <th scope="col">
                                                                                        Handling
                                                                                    </th>
                                                                                    <th scope="col">
                                                                                        Chapters
                                                                                        Assigned
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
                                                                                <tr>
                                                                                    <td>
                                                                                        9th
                                                                                        Standard
                                                                                    </td>
                                                                                    <td>
                                                                                        Chemistry
                                                                                    </td>
                                                                                    <td>
                                                                                        <p>
                                                                                            Chapter
                                                                                            1
                                                                                        </p>
                                                                                        <p>
                                                                                            Chapter
                                                                                            2
                                                                                        </p>
                                                                                        <p className="mb-0">
                                                                                            Chapter
                                                                                            3
                                                                                        </p>
                                                                                    </td>
                                                                                    <td>
                                                                                        <p>
                                                                                            Simulation
                                                                                            1
                                                                                        </p>
                                                                                        <p>
                                                                                            Simulation
                                                                                            2
                                                                                        </p>
                                                                                        <p className="mb-0">
                                                                                            Simulation
                                                                                            3
                                                                                        </p>
                                                                                    </td>
                                                                                    <td>
                                                                                        <p>
                                                                                            Chapter
                                                                                            8
                                                                                        </p>
                                                                                        <p>
                                                                                            Chapter
                                                                                            9
                                                                                        </p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        10th
                                                                                        Standard
                                                                                    </td>
                                                                                    <td>
                                                                                        Chemistry
                                                                                    </td>
                                                                                    <td>
                                                                                        <p>
                                                                                            Chapter
                                                                                            1
                                                                                        </p>
                                                                                        <p>
                                                                                            Chapter
                                                                                            2
                                                                                        </p>
                                                                                        <p>
                                                                                            Chapter
                                                                                            3
                                                                                        </p>
                                                                                        <p className="mb-0">
                                                                                            Chapter
                                                                                            4
                                                                                        </p>
                                                                                    </td>
                                                                                    <td>
                                                                                        <p>
                                                                                            Simulation
                                                                                            1
                                                                                        </p>
                                                                                        <p>
                                                                                            Simulation
                                                                                            2
                                                                                        </p>
                                                                                        <p className="mb-0">
                                                                                            Simulation
                                                                                            3
                                                                                        </p>
                                                                                    </td>
                                                                                    <td>
                                                                                        <p>
                                                                                            Chapter
                                                                                            8
                                                                                        </p>
                                                                                        <p>
                                                                                            Chapter
                                                                                            9
                                                                                        </p>
                                                                                    </td>
                                                                                </tr>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupTeachers;
