import React, { Component } from "react";
import { Modal, Spinner, Alert } from "react-bootstrap";

// Content update modal
export class ContentUpdateModal extends Component {
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

// Content deletion modal
export class ContentDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleDelete = () => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        fetch(this.props.url, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify(this.props.data),
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
                    this.props.formSubmission();
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
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
                <Modal.Header closeButton>
                    Delete {this.props.type}
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
                    {this.props.type === "notes" ||
                    this.props.type === "summary" ||
                    this.props.type === "question" ||
                    this.props.type === "concept" ? (
                        <p className="mb-0">
                            Are you sure that you want to delete this{" "}
                            {this.props.type}?
                        </p>
                    ) : (
                        <p className="mb-0">
                            Are you sure that you want to delete{" "}
                            <span className="font-weight-bold-600">
                                {this.props.name}
                            </span>
                            ?
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-link btn-sm shadow-none mr-2"
                        onClick={this.props.toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm shadow-none"
                        onClick={this.handleDelete}
                    >
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
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

// Multi Content deletion modal
export class MultiContentDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleDelete = () => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        if (this.props.data.length !== 0) {
            let temp = [];
            let body = {};
            this.props.data.forEach((data) => {
                temp.push(data.id);
            });
            body[this.props.field] = temp;

            fetch(`${this.props.url}`, {
                method: "DELETE",
                headers: this.headers,
                body: JSON.stringify(body),
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
                        this.props.formSubmission();
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            showLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({
                errorMsg: `Please select a ${this.props.type} to delete`,
                showErrorAlert: true,
                showLoader: false,
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
                <Modal.Header closeButton>
                    Delete {this.props.type}
                </Modal.Header>
                <Modal.Body>
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
                    <p>
                        Are you sure that you want to delete this{" "}
                        {this.props.type}?
                    </p>
                    {this.props.data.map((item, index) => {
                        return (
                            <p className="small mb-2" key={index}>
                                {index + 1}. {item.name}
                            </p>
                        );
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-link btn-sm shadow-none mr-2"
                        onClick={this.props.toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm shadow-none"
                        onClick={this.handleDelete}
                    >
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
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

// Content disable modal
export class ContentDisableModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleDisable = () => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        if (this.props.data.length !== 0) {
            let temp = [];
            let body = {};
            this.props.data.forEach((data) => {
                temp.push(data.id);
            });
            body[this.props.field] = temp;

            fetch(`${this.props.url}`, {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify(body),
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
                        this.props.formSubmission();
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            showLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({
                errorMsg: `Please select a ${this.props.type} to disable`,
                showErrorAlert: true,
                showLoader: false,
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
                <Modal.Header closeButton>
                    Disable {this.props.type}
                </Modal.Header>
                <Modal.Body>
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
                    <p>
                        Are you sure that you want to disable this{" "}
                        {this.props.type}?
                    </p>
                    {this.props.data.map((item, index) => {
                        return (
                            <p className="small mb-2" key={index}>
                                {index + 1}. {item.name}
                            </p>
                        );
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-link btn-sm shadow-none mr-2"
                        onClick={this.props.toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm shadow-none"
                        onClick={this.handleDisable}
                    >
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
                        Disable
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

// Content enable modal
export class ContentEnableModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleEnable = () => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        if (this.props.data.length !== 0) {
            let temp = [];
            let body = {};
            this.props.data.forEach((data) => {
                temp.push(data.id);
            });
            body[this.props.field] = temp;

            fetch(`${this.props.url}`, {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify(body),
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
                        this.props.formSubmission();
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            showLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({
                errorMsg: `Please select a ${this.props.type} to enable`,
                showErrorAlert: true,
                showLoader: false,
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
                <Modal.Header closeButton>
                    Enable {this.props.type}
                </Modal.Header>
                <Modal.Body>
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
                    <p>
                        Are you sure that you want to enable this{" "}
                        {this.props.type}?
                    </p>
                    {this.props.data.map((item, index) => {
                        return (
                            <p className="small mb-2" key={index}>
                                {index + 1}. {item.name}
                            </p>
                        );
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-link btn-sm shadow-none mr-2"
                        onClick={this.props.toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm shadow-none"
                        onClick={this.handleEnable}
                    >
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
                        Enable
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}