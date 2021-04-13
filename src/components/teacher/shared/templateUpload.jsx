import React, { Component } from "react";
import axios from "axios";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../../shared/baseUrl.js";

class TemplateUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.subjectId = this.props.subjectId;
        this.chapterId = this.props.chapterId;
        this.topic_num = this.props.topic_num;
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
    }

    handleFile = (event) => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        let form_data = new FormData();
        form_data.append("topic_num", this.topic_num);
        if (this.props.type === "match") {
            form_data.append("match_file", event.target.files[0]);
        } else if (this.props.type === "type_1") {
            form_data.append("chapter_id", this.chapterId);
            form_data.append("question_file", event.target.files[0]);
        } else if (this.props.type === "type_2") {
            form_data.append("type_two_file", event.target.files[0]);
        } else if (this.props.type === "concept") {
            form_data.append("chapter_id", this.chapterId);
            form_data.append("concepts_file", event.target.files[0]);
        }

        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: this.authToken,
            },
        };

        let extension = event.target.files[0].name.split(".");

        if (extension[extension.length - 1].toLowerCase() !== "xlsx") {
            this.setState({
                errorMsg: "Invalid file format!",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (event.target.files[0].size > 5242880) {
            this.setState({
                errorMsg: "File sixe exceeds more then 5MB!",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            axios
                .post(this.props.url, form_data, options)
                .then((result) => {
                    console.log(result);
                    if (result.data.sts === true) {
                        this.setState({
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                        });
                        this.props.formSubmission();
                    } else {
                        this.setState({
                            errorMsg: result.data.detail
                                ? result.data.detail
                                : result.data.msg,
                            showErrorAlert: true,
                            showLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    console.warn(err);
                    if (err.response) {
                        this.setState({
                            errorMsg: err.response.data.msg,
                        });
                    } else if (err.request) {
                        this.setState({
                            errorMsg: err.request.data.msg,
                        });
                    } else if (err.message) {
                        this.setState({
                            errorMsg: err.message.data.msg,
                        });
                    }
                    this.setState({
                        showErrorAlert: true,
                        page_loading: false,
                    });
                });
        }
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="align-items-center">
                    Upload Template
                    {this.state.showLoader ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="ml-3 mb-0"
                        />
                    ) : (
                        ""
                    )}
                </Modal.Header>
                <Modal.Body>
                    <Alert
                        variant="danger"
                        show={this.state.showErrorAlert}
                        onClose={() => {
                            this.setState({
                                showErrorAlert: false,
                            });
                        }}
                        dismissible
                    >
                        {this.state.errorMsg}
                    </Alert>
                    <Alert
                        variant="success"
                        show={this.state.showSuccessAlert}
                        onClose={() => {
                            this.setState({
                                showSuccessAlert: false,
                            });
                        }}
                        dismissible
                    >
                        {this.state.successMsg}
                    </Alert>

                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="file"
                            accept=".xlsx"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={(event) => this.handleFile(event)}
                        />
                        <label className="custom-file-label" htmlFor="file">
                            Choose file
                        </label>
                    </div>
                    <small
                        className="form-text text-muted mb-2"
                        style={{ marginTop: "0px" }}
                    >
                        Select only .xlsx format. Max size is 5MB
                    </small>
                </Modal.Body>
            </Modal>
        );
    }
}

export default TemplateUpload;
