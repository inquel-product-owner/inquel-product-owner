import React, { Component } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import Loading from "../sharedComponents/loader";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
        };
        this.chapterName = this.props.match.params.chapterName;
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
        document.title = "Summary - Student | IQLabs";
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
                                            {`Summary :: ${this.chapterName}`}
                                        </h6>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <button className="btn btn-primary btn-sm">
                                            Publish
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
                                            <div className="card shadow-sm">
                                            <Nav
                                                variant="pills"
                                                className="flex-column"
                                            >
                                                <Nav.Item className="grey-item">
                                                    <Nav.Link eventKey="0" className="p-3">
                                                        Chapter 01
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item className="grey-item">
                                                    <Nav.Link eventKey="1" className="p-3">
                                                        Chapter 02
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item className="grey-item">
                                                    <Nav.Link eventKey="2" className="p-3">
                                                        Chapter 03
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav></div>
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

export default Summary;
