import React, { Component } from "react";
import { Tab, Row, Col, Nav, Card, Accordion } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import Loading from "../sharedComponents/loader";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
        };
        this.chapterName = this.props.match.params.chapterName;
        this.topicName = this.props.match.params.topicName;
        this.url = baseUrl + studentUrl;
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

    render() {
        document.title = "Notes - Student | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Subject name" togglenav={this.toggleSideNav} />

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
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <h6 className="primary-text mb-0">
                                            {`Notes :: ${this.chapterName}`}
                                        </h6>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <button className="btn btn-primary btn-sm">
                                            Approve
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
                                    defaultActiveKey=""
                                >
                                    <Row>
                                        <Col sm={3} className="mb-3 mb-md-0">
                                            <div className="card shadow-sm">
                                                <Nav
                                                    variant="pills"
                                                    className="flex-column"
                                                >
                                                    <Nav.Item className="grey-item">
                                                        <Nav.Link className="p-3">
                                                            <Accordion defaultActiveKey="">
                                                                <Card>
                                                                    <Accordion.Toggle
                                                                        as={
                                                                            Card.Header
                                                                        }
                                                                        eventKey="0"
                                                                        style={{
                                                                            cursor:
                                                                                "pointer",
                                                                        }}
                                                                        onClick={
                                                                            this
                                                                                .toggleCollapse
                                                                        }
                                                                    >
                                                                        Chapter
                                                                        01
                                                                    </Accordion.Toggle>

                                                                    <Accordion.Collapse eventKey="0">
                                                                        <div>
                                                                            <Nav.Item className="grey-item">
                                                                                <Nav.Link
                                                                                    eventKey="0"
                                                                                    className="p-3"
                                                                                >
                                                                                    Topic
                                                                                    01
                                                                                </Nav.Link>
                                                                            </Nav.Item>

                                                                            <Nav.Item className="grey-item">
                                                                                <Nav.Link
                                                                                    eventKey="1"
                                                                                    className="p-3"
                                                                                >
                                                                                    Topic
                                                                                    02
                                                                                </Nav.Link>
                                                                            </Nav.Item>
                                                                        </div>
                                                                    </Accordion.Collapse>
                                                                </Card>
                                                            </Accordion>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </div>
                                        </Col>
                                        <Col sm={9} className="pl-md-0">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="0">
                                                    <div className="card shadow-sm">
                                                        <div className="card-body">
                                                            1 Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipisicing elit.
                                                            Sit tempora ratione
                                                            saepe quos repellat
                                                            soluta quo sint,
                                                            nemo ad dolores
                                                            mollitia adipisci
                                                            provident animi
                                                            accusantium ea
                                                            obcaecati
                                                            consequatur quam
                                                            magnam!
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="1">
                                                    <div className="card shadow-sm">
                                                        <div className="card-body">
                                                            2 Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipisicing elit.
                                                            Sit tempora ratione
                                                            saepe quos repellat
                                                            soluta quo sint,
                                                            nemo ad dolores
                                                            mollitia adipisci
                                                            provident animi
                                                            accusantium ea
                                                            obcaecati
                                                            consequatur quam
                                                            magnam!
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="2">
                                                    <div className="card shadow-sm">
                                                        <div className="card-body">
                                                            3 Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipisicing elit.
                                                            Sit tempora ratione
                                                            saepe quos repellat
                                                            soluta quo sint,
                                                            nemo ad dolores
                                                            mollitia adipisci
                                                            provident animi
                                                            accusantium ea
                                                            obcaecati
                                                            consequatur quam
                                                            magnam!
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
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

export default Notes;
