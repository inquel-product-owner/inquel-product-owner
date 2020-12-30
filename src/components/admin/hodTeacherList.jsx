import React, { Component } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import { Helmet } from "react-helmet";
import ProfileLoader from "../../shared/profileLoader";

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

class HodTeacherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            teacherItems: [],
            hodItems: [],
            isLoaded: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
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
                    isLoaded: true,
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
                <Helmet>
                    <title>Admin Profile | IQLabs</title>
                </Helmet>
                {/* Navbar */}
                <Header name="User Profiles" togglenav={this.toggleSideNav} />

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
                        {/* HOD Details */}
                        {this.state.isLoaded ? (
                            <div className="row align-items-center mb-4">
                                <div className="col-md-6">
                                    <div className="row align-items-center">
                                        <div className="col-md-2 col-3">
                                            <img
                                                src={
                                                    this.state.hodItems
                                                        .profile_link !== null
                                                        ? this.state.hodItems
                                                              .profile_link
                                                        : profilepic
                                                }
                                                alt={`${this.state.hodItems.first_name} ${this.state.hodItems.last_name}`}
                                                className="img-fluid profile-pic"
                                            />
                                        </div>
                                        <div className="col-md-10 col-9 pl-0">
                                            <h5 className="primary-text">
                                                {`${this.state.hodItems.first_name} ${this.state.hodItems.last_name}`}
                                            </h5>
                                            <p className="mb-0">
                                                {this.props.match.params.hodId}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <ProfileLoader />
                        )}

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
                                                                            {`${list.first_name} ${list.last_name}`}
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

export default HodTeacherList;
