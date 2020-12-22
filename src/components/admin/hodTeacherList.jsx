import React, { Component } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";

class HodTeacherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="User Profiles" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        {/* <div className="mb-4">
                            <Link to="/profiles">
                                <button className="btn btn-primary">
                                    <i className="fas fa-chevron-left mr-1 fa-sm"></i>{" "}
                                    Back
                                </button>
                            </Link>
                        </div> */}

                        {/* HOD Details */}
                        <div className="row align-items-center mb-4">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <div className="row align-items-center">
                                    <div className="col-2">
                                        <img
                                            src={profilepic}
                                            alt="Profile"
                                            className="img-fluid profile-pic"
                                        />
                                    </div>
                                    <div className="col-10">
                                        <h5 className="primary-text">
                                            HOD Ram Profile
                                        </h5>
                                        <p className="mb-0">001</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Teachers list */}
                        <div className="row justify-content-center justify-content-between mb-4">
                            <div className="col-md-3">
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
                                    defaultActiveKey="1"
                                >
                                    <Row>
                                        <Col sm={3}>
                                            <Nav
                                                variant="pills"
                                                className="flex-column"
                                            >
                                                <Nav.Item>
                                                    <Nav.Link eventKey="1">
                                                        Teacher 01
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="2">
                                                        Teacher 02
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="3">
                                                        Teacher 03
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={9}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="1">
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
                                                <Tab.Pane eventKey="2">
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
                                                                            11th
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
                                                                            12th
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
                                                <Tab.Pane eventKey="3">
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
                                                                            8th
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
                                                                            7th
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
