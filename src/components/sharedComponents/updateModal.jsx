import React, { Component } from "react";
import { Modal, Spinner, Alert } from "react-bootstrap";

export class UpdateContentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        var data = this.props.data;
        var type = this.props.type.toLowerCase();

        data[type.replace(" ", "_") + "_name"] = this.state.name;

        fetch(this.props.url, {
            headers: this.headers,
            method: "PATCH",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
                    this.props.formSubmission(true);
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleInput = (event) => {
        this.setState({
            name: event.target.value,
        });
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
                <Modal.Header closeButton>Edit {this.props.type}</Modal.Header>
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

                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="name">{this.props.type} name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control borders"
                                onChange={this.handleInput}
                                placeholder={`${this.props.type} name`}
                                value={this.state.name}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-sm btn-block">
                                {this.state.showLoader ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="mr-2"
                                    />
                                ) : (
                                    ""
                                )}
                                Update
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}
