import React, { Component } from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import dummyImg from "../../assets/code.jpg";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";

class CycleTestQA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
        };
        this.subjectId = this.props.match.params.subjectId;
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

    componentDidMount = () => {
        document.title = `${this.chapterName} - Student | IQLabs`;
    };

    render() {
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

                        {/* Header */}
                        <div className="card primary-bg text-white small mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-7">
                                        Section - 01 | Brief of Section
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <div className="col-md-4">
                                                Attempt 01
                                            </div>
                                            <div className="col-md-4">
                                                5 Questions
                                            </div>
                                            <div className="col-md-4">
                                                Total time: 40 mins
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Q&A */}
                        <div className="row mb-3">
                            <div className="col-md-1">
                                <div className="card shadow-sm">
                                    <div className="card-body p-2 text-center font-weight-bold">
                                        1
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-11 pl-0">
                                <div className="card small shadow-sm">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <p className="font-weight-bold">
                                                    Lorem ipsum dolor sit, amet
                                                    consectetur adipisicing
                                                    elit. Magnam, dolores
                                                    cumque. Quisquam, ad facere.
                                                    Eligendi ipsam quo modi amet
                                                    optio obcaecati laboriosam
                                                    magnam odio dolorem,
                                                    aliquam, eum dolore,
                                                    doloribus sequi?
                                                </p>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <div className="card shadow-sm bg-success">
                                                            <div className="card-body">
                                                                Option 01
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <div className="card shadow-sm bg-light">
                                                            <div className="card-body">
                                                                Option 02
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 mb-md-0">
                                                        <div className="card shadow-sm bg-light">
                                                            <div className="card-body">
                                                                Option 03
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="card shadow-sm bg-light">
                                                            <div className="card-body">
                                                                Option 04
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <img
                                                    src={dummyImg}
                                                    alt="Dummy bg"
                                                    className="img-fluid rounded shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary btn-sm">
                                    <i className="fas fa-angle-left mr-1"></i>{" "}
                                    Previous
                                </button>
                            </div>
                            <div className="col-md-6 text-right">
                                <button className="btn btn-primary btn-sm">
                                    Next
                                    <i className="fas fa-angle-right ml-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CycleTestQA;
