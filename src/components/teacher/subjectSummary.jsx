import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import Switch from "react-switch";
import CKEditor from "ckeditor4-react";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";

class SubjectSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            limited: false,
            title: "",
            content: "",
        };
        this.url = baseUrl + teacherUrl;
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

    handleSwitch = () => {
        this.setState({
            limited: !this.state.limited,
        });
    };

    componentDidMount = () => {
        document.title = "Summary - Teacher | IQLabs";
    };

    onEditorChange = (evt) => {
        this.setState({
            content: evt.editor.getData(),
        });
    };

    handleTitle = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    handleSubmit = () => {
        fetch(
            `${this.url}/teacher/subject/${this.props.match.params.subjectId}/summary/`,
            {
                headers: this.headers,
                method: "POST",
                body: JSON.stringify({
                    limited: this.state.limited,
                    summary_name: this.state.title,
                    summary_content: this.state.content,
                    chapter_name: this.props.match.params.chapterName,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
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

                        <div className="card secondary-bg mb-3">
                            <div className="card-body p-3">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <p className="small mb-0">
                                            <span className="font-weight-bold">
                                                Summary:
                                            </span>{" "}
                                            {
                                                this.props.match.params
                                                    .chapterName
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                                        <button className="btn btn-primary btn-sm mr-3">
                                            Preview
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm mr-3"
                                            onClick={this.handleSubmit}
                                        >
                                            Save
                                        </button>
                                        <div className="d-flex justify-content-end">
                                            <span className="mr-2 small primary-text font-weight-bold">
                                                Limited
                                            </span>
                                            <Switch
                                                checked={this.state.limited}
                                                onChange={this.handleSwitch}
                                                onColor="#621012"
                                                onHandleColor="#efd2ac"
                                                handleDiameter={12}
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                height={18}
                                                width={35}
                                                className="react-switch"
                                                id="select-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="form-control form-shadow"
                                    placeholder="Summary title"
                                    onChange={this.handleTitle}
                                />
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="card shadow-sm">
                            <CKEditor data="" onChange={this.onEditorChange} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubjectSummary;
