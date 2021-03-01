import React, { Component } from "react";
import Header from "./shared/examNavbar";
import ReactCardFlip from "react-card-flip";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import AlertBox from "../sharedComponents/alert";
import Loading from "../sharedComponents/loader";

class FlashCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            subject_name: "",
            chapter_name: "",
            concepts: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.topicName = this.props.match.params.topicName;
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    toggleSuccessAlert = () => {
        this.setState({
            showSuccessAlert: false,
        });
    };
    toggleErrorAlert = () => {
        this.setState({
            showErrorAlert: false,
        });
    };

    handleClick = () => {
        this.setState({
            isFlipped: !this.state.isFlipped,
        });
    };

    loadConceptData = () => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/concepts/?topic_name=${this.topicName}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        concepts: result.data.results,
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

    componentDidMount = () => {
        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let chapter_name = "";
                    // extract currently selected chapter name
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        if (
                            result.data.chapters[i].chapter_id ===
                            this.chapterId
                        ) {
                            chapter_name = result.data.chapters[i].chapter_name;
                        } else {
                            continue;
                        }
                    }
                    this.setState({
                        subject_name: result.data.subject_name,
                        chapter_name: chapter_name,
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

        this.loadConceptData();
    };

    render() {
        document.title = `${this.state.chapter_name} Concepts - Teacher | IQLabs`;
        return (
            <>
                {/* Navbar */}
                <Header
                    name={this.state.subject_name}
                    chapter_name={`${this.state.chapter_name}`}
                    goBack={this.props.history.goBack}
                />

                {/* ALert message */}
                <AlertBox
                    errorMsg={this.state.errorMsg}
                    successMsg={this.state.successMsg}
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={this.state.showSuccessAlert}
                    toggleSuccessAlert={this.toggleSuccessAlert}
                    toggleErrorAlert={this.toggleErrorAlert}
                />

                {/* Header tab section */}
                <div className="card light-bg card-body p-3 mt-1 mb-3">
                    <div className="row justify-content-center">
                        <div className="col-md-11">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <span className="small primary-text font-weight-bold-600 mb-0 mr-3">
                                        STUDY
                                    </span>
                                    <button className="btn btn-primary btn-sm mr-3">
                                        Concept
                                    </button>
                                    <button className="btn btn-primary-invert btn-sm mr-4">
                                        Practice
                                    </button>
                                    <span className="small primary-text font-weight-bold-600 mb-0 mr-3">
                                        PLAY
                                    </span>
                                    <button className="btn btn-primary-invert btn-sm">
                                        Match
                                    </button>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="btn btn-primary btn-sm rounded-circle mr-3">
                                        <i
                                            className="fas fa-bookmark fa-sm"
                                            style={{
                                                marginLeft: "1px",
                                                marginRight: "1px",
                                            }}
                                        ></i>
                                    </button>
                                    <button className="btn btn-primary btn-sm rounded-circle mr-3">
                                        <i className="fas fa-volume-up buttton fa-sm"></i>
                                    </button>
                                    <button className="btn btn-primary btn-sm rounded-circle">
                                        <i className="fas fa-volume-mute fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container-fluid mb-3">
                    <div className="row justify-content-center">
                        <div className="col-md-11">
                            <div className="card shadow-sm">
                                <div className="card-header bg-white border-0 text-right">
                                    <button className="border-0 bg-white">
                                        <i className="fas fa-expand icon"></i>
                                    </button>
                                </div>
                                <div className="card-body shadow-sm">
                                    {/* npm add react-full-screen */}
                                    <div className="card h-100 w-100 d-flex align-items-center">
                                        <div className="card-body align-items-center">
                                            <ReactCardFlip
                                                isFlipped={this.state.isFlipped}
                                                flipDirection="vertical"
                                            >
                                                <div
                                                    className="card h-100 w-100 border-0 location-front-item text-center yrt"
                                                    onClick={this.handleClick}
                                                >
                                                    <h1 className="diaplay1">
                                                        Nice Work!
                                                    </h1>
                                                    <h3>
                                                        You Just Completed
                                                        "Course/Topic Name"
                                                    </h3>
                                                    <h3>
                                                        Study with your game
                                                        practice
                                                    </h3>
                                                    <button className="border-0 bg-white icon">
                                                        Learn
                                                    </button>
                                                    <h4>
                                                        Study again with
                                                        flashcards
                                                    </h4>
                                                </div>
                                                <div
                                                    className="location-back-item text-center"
                                                    onClick={this.handleClick}
                                                >
                                                    <h3 className="icon text-left ml-2">
                                                        Definition/Title
                                                    </h3>
                                                    <p className="text-justify mr-2 ml-2">
                                                        Lorem Ipsum is simply
                                                        dummy text of the
                                                        printing and typesetting
                                                        industry. Lorem Ipsum
                                                        has been the industry's
                                                        standard dummy text ever
                                                        since the 1500s, when an
                                                        unknown printer took a
                                                        galley of type and
                                                        scrambled it to make a
                                                        type specimen book. It
                                                        has survived not only
                                                        five centuries,
                                                    </p>
                                                    <p className="text-justify mr-2 ml-2">
                                                        Lorem Ipsum is simply
                                                        dummy text of the
                                                        printing and typesetting
                                                        industry. Lorem Ipsum
                                                        has been the industry's
                                                        standard dummy text ever
                                                        since the 1500s, when an
                                                        unknown printer took a
                                                        galley of type and
                                                        scrambled it to make a
                                                        type specimen book. It
                                                        has survived not only
                                                        five centuries,
                                                    </p>
                                                </div>
                                            </ReactCardFlip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* footer */}
                <div className="card card-body secondary-bg p-3">
                    <div className="row align-items-center">
                        <div className="col-md-2">
                            <button className="border-0 mr-2 icon buttton1">
                                <i className="fas fa-keyboard"></i>
                            </button>
                            <button className="border-0 icon buttton1">
                                <i className="fas fa-edit"></i>
                            </button>
                        </div>
                        <div className="col-md-8 ">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <a
                                            className="page-link"
                                            href="activity"
                                            tabindex="-1"
                                            aria-disabled="true"
                                        >
                                            Previous
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a
                                            className="page-link"
                                            href="activity"
                                        >
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a
                                            className="page-link"
                                            href="activity"
                                        >
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a
                                            className="page-link"
                                            href="activity"
                                        >
                                            3
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="5">
                                            Next
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-md-2 text-right">
                            <button className="border-0 buttton1">
                                <i className="fas fa-play-circle icon border-0"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </>
        );
    }
}

export default FlashCard;
