import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";

class ChapterModal extends Component {
    constructor() {
        super();
        this.state = {
            chapter_name: "",
            weightage: "",
            chapter_status: "",
            status: [],
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/chapter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    status: result.data.chapter_status.chapters,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/chapter/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                chapter_name: this.state.chapter_name,
                chapter_status: this.state.chapter_status,
                weightage: this.state.weightage,
            }),
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

    handleCourse = (event) => {
        this.setState({
            chapter_name: event.target.value,
        });
    };

    handleWeightage = (event) => {
        this.setState({
            weightage: event.target.value,
        });
    };

    handleStatus = (event) => {
        this.setState({
            chapter_status: event.target.value,
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
                <Modal.Header closeButton>Add chapter</Modal.Header>
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
                            <label htmlFor="chapter">Chapter name</label>
                            <input
                                type="text"
                                name="chapter"
                                id="chapter"
                                className="form-control borders"
                                onChange={this.handleCourse}
                                placeholder="Chapter name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weightage">Weightage</label>
                            <input
                                type="text"
                                name="weightage"
                                id="weightage"
                                className="form-control borders"
                                onChange={this.handleWeightage}
                                placeholder="Weightage"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                name="status"
                                id="status"
                                className="form-control borders"
                                onChange={this.handleStatus}
                                required
                            >
                                <option value="">Select an option</option>
                                {this.state.status.map((list, index) => {
                                    return (
                                        <option value={list} key={index}>
                                            {list}
                                        </option>
                                    );
                                })}
                            </select>
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
                                Add
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

class SemesterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester_name: "",
            chapter_id: this.props.chapter_id,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
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

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/semester/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                semester_name: this.state.semester_name,
                chapter_ids: this.state.chapter_id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                        chapter_names: [],
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

    handleSemester = (event) => {
        this.setState({
            semester_name: event.target.value,
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
                <Modal.Header closeButton>Add Semester</Modal.Header>
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
                            <label htmlFor="semester">Semester name</label>
                            <input
                                type="text"
                                name="semester"
                                id="semester"
                                className="form-control borders"
                                onChange={this.handleSemester}
                                placeholder="Semester name"
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
                                Add
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

class ChapterEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chapter_id: this.props.data.chapter_id,
            chapter_name: this.props.data.chapter_name,
            weightage: this.props.data.weightage,
            chapter_status: this.props.data.chapter_status,
            status: [],
            data: this.props.data,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/chapter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    status: result.data.chapter_status.chapters,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/chapter/`, {
            headers: this.headers,
            method: "PATCH",
            body: JSON.stringify({
                chapter_id: this.state.chapter_id,
                chapter_name: this.state.chapter_name,
                chapter_status: this.state.chapter_status,
                weightage: this.state.weightage.toString(),
            }),
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

    handleCourse = (event) => {
        this.setState({
            chapter_name: event.target.value,
        });
    };

    handleWeightage = (event) => {
        this.setState({
            weightage: event.target.value,
        });
    };

    handleStatus = (event) => {
        this.setState({
            chapter_status: event.target.value,
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
                <Modal.Header closeButton>Edit chapter</Modal.Header>
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
                            <label htmlFor="chapter">Chapter name</label>
                            <input
                                type="text"
                                name="chapter"
                                id="chapter"
                                className="form-control borders"
                                onChange={this.handleCourse}
                                placeholder="Chapter name"
                                value={this.state.chapter_name}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weightage">Weightage</label>
                            <input
                                type="text"
                                name="weightage"
                                id="weightage"
                                className="form-control borders"
                                onChange={this.handleWeightage}
                                placeholder="Weightage"
                                value={this.state.weightage}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                name="status"
                                id="status"
                                className="form-control borders"
                                onChange={this.handleStatus}
                                value={this.state.chapter_status}
                                required
                            >
                                <option value="">Select an option</option>
                                {this.state.status.map((list, index) => {
                                    return (
                                        <option value={list} key={index}>
                                            {list}
                                        </option>
                                    );
                                })}
                            </select>
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
                                Save
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

class SemesterEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester_id: this.props.data.semester_id,
            semester_name: this.props.data.semester_name,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
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

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/semester/`, {
            headers: this.headers,
            method: "PATCH",
            body: JSON.stringify({
                semester_id: this.state.semester_id,
                semester_name: this.state.semester_name,
            }),
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

    handleSemester = (event) => {
        this.setState({
            semester_name: event.target.value,
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
                <Modal.Header closeButton>Edit Semester</Modal.Header>
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
                            <label htmlFor="semester">Semester Name</label>
                            <input
                                type="text"
                                name="semester"
                                id="semester"
                                className="form-control borders"
                                onChange={this.handleSemester}
                                placeholder="Semester name"
                                value={this.state.semester_name}
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
                                Save
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

class ChapterDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
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

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/chapter/`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify({ chapter_id: this.props.data.chapter_id }),
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
                    this.props.chapterFormSubmission(true);
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                        });
                    }
                    this.setState({
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
                <Modal.Header closeButton>Delete Chapter</Modal.Header>
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
                    <p className="mb-0">
                        Are you sure that you want to delete{" "}
                        <span className="font-weight-bold">
                            {this.props.data.chapter_name}
                        </span>
                        ?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-secondary btn-sm mr-2"
                        onClick={this.props.toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm"
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

class SemesterDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
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

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/semester/`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify({ semester_id: this.props.data.semester_id }),
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
                    this.props.semesterFormSubmission(true);
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                        });
                    }
                    this.setState({
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
                <Modal.Header closeButton>Delete Semester</Modal.Header>
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
                    <p className="mb-0">
                        Are you sure that you want to delete{" "}
                        <span className="font-weight-bold">
                            {this.props.data.semester_name}
                        </span>
                        ?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-secondary btn-sm mr-2"
                        onClick={this.props.toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm"
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

class SubjectChapters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            showSemesterModal: false,
            showChapter_EditModal: false,
            showSemester_EditModal: false,
            showChapter_DeleteModal: false,
            showSemester_DeleteModal: false,

            subjectItems: [], // Chapter data
            semesterItems: [], // Semester data
            chapter_id: [], // List of unassigned chapters
            semester_chapters: [], // List of assigned chapters under a semester

            selectedChapter: "",
            selectedSemester: "",

            page_loading: true,
            is_chapterSubmitted: false,
            is_semesterSubmitted: false,
        };
        this.subjectId = this.props.match.params.subjectId;
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

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    toggleChapter_EditModal = (data) => {
        this.setState({
            selectedChapter: data,
            showChapter_EditModal: !this.state.showChapter_EditModal,
        });
    };

    toggleSemester_EditModal = (data) => {
        this.setState({
            selectedSemester: data,
            showSemester_EditModal: !this.state.showSemester_EditModal,
        });
    };

    toggleChapter_DeleteModal = (data) => {
        this.setState({
            selectedChapter: data,
            showChapter_DeleteModal: !this.state.showChapter_DeleteModal,
        });
    };

    toggleSemester_DeleteModal = (data) => {
        this.setState({
            selectedSemester: data,
            showSemester_DeleteModal: !this.state.showSemester_DeleteModal,
        });
    };

    toggleSemesterModal = () => {
        const chapter_id = this.state.chapter_id;
        for (let i = 0; i < this.state.subjectItems.length; i++) {
            if (
                !this.state.semester_chapters.includes(
                    this.state.subjectItems[i].chapter_id
                )
            ) {
                chapter_id.push(this.state.subjectItems[i].chapter_id);
            } else {
                continue;
            }
        }
        this.setState({
            showSemesterModal: !this.state.showSemesterModal,
            chapter_id: chapter_id,
        });
    };

    loadChapterData = () => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    subjectItems: result.data.results,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    loadSemesterData = () => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/semester/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                const chapters = [];
                for (let i = 0; i < result.data.length; i++) {
                    for (let j = 0; j < result.data[i].chapters.length; j++) {
                        chapters.push(result.data[i].chapters[j]);
                    }
                }
                this.setState({
                    semesterItems: result.data,
                    semester_chapters: chapters,
                    chapter_id: [],
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = "Subject name - Teacher | IQLabs";

        this.loadChapterData();
        this.loadSemesterData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.is_chapterSubmitted !== this.state.is_chapterSubmitted &&
            this.state.is_chapterSubmitted === true
        ) {
            this.loadChapterData();
            this.setState({
                is_chapterSubmitted: false,
            });
        }

        if (
            prevState.is_semesterSubmitted !==
                this.state.is_semesterSubmitted &&
            this.state.is_semesterSubmitted === true
        ) {
            this.loadSemesterData();
            this.loadChapterData();
            this.setState({
                is_semesterSubmitted: false,
            });
        }
    };

    chapterFormSubmission = (is_chapterSubmitted) => {
        if (is_chapterSubmitted) {
            this.setState({
                is_chapterSubmitted: true,
            });
            setTimeout(() => {
                this.setState({
                    showModal: false,
                    showChapter_EditModal: false,
                    showChapter_DeleteModal: false,
                });
            }, 1500);
        }
    };

    semesterFormSubmission = (is_semesterSubmitted) => {
        if (is_semesterSubmitted) {
            this.setState({
                is_semesterSubmitted: true,
            });
            setTimeout(() => {
                this.setState({
                    showSemesterModal: false,
                    showSemester_EditModal: false,
                    showSemester_DeleteModal: false,
                });
            }, 1500);
        }
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

                {/* Chapter modal */}
                {this.state.showModal ? (
                    <ChapterModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        formSubmission={this.chapterFormSubmission}
                        subjectId={this.subjectId}
                    />
                ) : (
                    ""
                )}

                {/* Semester modal */}
                {this.state.showSemesterModal ? (
                    <SemesterModal
                        show={this.state.showSemesterModal}
                        onHide={this.toggleSemesterModal}
                        formSubmission={this.semesterFormSubmission}
                        chapter_id={this.state.chapter_id}
                        subjectId={this.subjectId}
                    />
                ) : (
                    ""
                )}

                {/* Chapter Edit modal */}
                {this.state.showChapter_EditModal ? (
                    <ChapterEditModal
                        show={this.state.showChapter_EditModal}
                        onHide={this.toggleChapter_EditModal}
                        formSubmission={this.chapterFormSubmission}
                        subjectId={this.subjectId}
                        data={this.state.selectedChapter}
                    />
                ) : (
                    ""
                )}

                {/* Semester Edit modal */}
                {this.state.showSemester_EditModal ? (
                    <SemesterEditModal
                        show={this.state.showSemester_EditModal}
                        onHide={this.toggleSemester_EditModal}
                        formSubmission={this.semesterFormSubmission}
                        subjectId={this.subjectId}
                        data={this.state.selectedSemester}
                    />
                ) : (
                    ""
                )}

                {/* Chapter Delete modal */}
                {this.state.showChapter_DeleteModal ? (
                    <ChapterDeleteModal
                        show={this.state.showChapter_DeleteModal}
                        onHide={this.toggleChapter_DeleteModal}
                        formSubmission={this.chapterFormSubmission}
                        subjectId={this.subjectId}
                        data={this.state.selectedChapter}
                        toggleModal={this.toggleChapter_DeleteModal}
                    />
                ) : (
                    ""
                )}

                {/* Semester Delete modal */}
                {this.state.showSemester_DeleteModal ? (
                    <SemesterDeleteModal
                        show={this.state.showSemester_DeleteModal}
                        onHide={this.toggleSemester_DeleteModal}
                        formSubmission={this.semesterFormSubmission}
                        subjectId={this.subjectId}
                        data={this.state.selectedSemester}
                        toggleModal={this.toggleSemester_DeleteModal}
                    />
                ) : (
                    ""
                )}

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-2"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* Header area */}
                        <div className="row align-items-center">
                            <div className="col-md-2">
                                <h5 className="primary-text">Subject name</h5>
                            </div>
                            <div className="col-md-10">
                                <div className="d-flex flex-wrap justify-content-end mb-4">
                                    <button className="btn btn-primary btn-sm">
                                        Publish
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-3">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="primary-bg text-white">
                                        <tr>
                                            <th scope="col">
                                                Chapter structure
                                            </th>
                                            <th scope="col">Weightage</th>
                                            <th scope="col">Summary</th>
                                            <th
                                                scope="col"
                                                className="text-right"
                                            >
                                                Add content
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-right"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Assigned chapter list to a semester */}
                                        {this.state.semesterItems.length !== 0
                                            ? this.state.semesterItems.map(
                                                  (data, index) => {
                                                      return (
                                                          <React.Fragment
                                                              key={index}
                                                          >
                                                              {this.state.subjectItems.map(
                                                                  (
                                                                      chapter,
                                                                      index
                                                                  ) => {
                                                                      return data.chapters.includes(
                                                                          chapter.chapter_id
                                                                      ) ? (
                                                                          <tr
                                                                              key={
                                                                                  index
                                                                              }
                                                                          >
                                                                              <td>
                                                                                  {
                                                                                      chapter.chapter_name
                                                                                  }
                                                                              </td>
                                                                              <td>
                                                                                  {
                                                                                      chapter.weightage
                                                                                  }
                                                                              </td>
                                                                              <td>
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/chapter/${chapter.chapter_name}/summary/upload`}
                                                                                      className="primary-text"
                                                                                  >
                                                                                      <button className="btn btn-primary btn-sm mr-2">
                                                                                          <i className="fas fa-file-upload"></i>
                                                                                      </button>
                                                                                  </Link>
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/chapter/${chapter.chapter_name}/summary`}
                                                                                      className="primary-text"
                                                                                  >
                                                                                      <button className="btn btn-primary btn-sm">
                                                                                          <i className="fas fa-file-medical"></i>
                                                                                      </button>
                                                                                  </Link>
                                                                              </td>
                                                                              <td className="text-right">
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/chapter/${chapter.chapter_name}`}
                                                                                  >
                                                                                      <button className="btn btn-primary btn-sm">
                                                                                          Add
                                                                                      </button>
                                                                                  </Link>
                                                                              </td>
                                                                              <td className="text-right">
                                                                                  <button
                                                                                      className="btn btn-primary-invert shadow-sm btn-sm mr-1"
                                                                                      onClick={() =>
                                                                                          this.toggleChapter_EditModal(
                                                                                              chapter
                                                                                          )
                                                                                      }
                                                                                  >
                                                                                      <i className="far fa-edit"></i>
                                                                                  </button>
                                                                                  {/* <button
                                                                                      className="btn btn-primary-invert shadow-sm btn-sm"
                                                                                      onClick={() =>
                                                                                          this.toggleChapter_DeleteModal(
                                                                                              chapter
                                                                                          )
                                                                                      }
                                                                                  >
                                                                                      <i className="far fa-trash-alt"></i>
                                                                                  </button> */}
                                                                              </td>
                                                                          </tr>
                                                                      ) : null;
                                                                  }
                                                              )}
                                                              <tr key={index}>
                                                                  <td>
                                                                      {
                                                                          data.semester_name
                                                                      }
                                                                  </td>
                                                                  <td></td>
                                                                  <td></td>
                                                                  <td className="text-right">
                                                                      {data.direct_question ===
                                                                          undefined ||
                                                                      data.direct_question ===
                                                                          false ? (
                                                                          <Link
                                                                              to={`/teacher/subject/${this.subjectId}/semester/${data.semester_id}`}
                                                                          >
                                                                              <button className="btn btn-primary btn-sm">
                                                                                  Auto
                                                                              </button>
                                                                          </Link>
                                                                      ) : (
                                                                          ""
                                                                      )}
                                                                      {data.direct_question ===
                                                                          undefined ||
                                                                      data.direct_question ===
                                                                          true ? (
                                                                          <Link
                                                                              to={`/teacher/subject/${this.subjectId}/semester/${data.semester_id}/direct`}
                                                                          >
                                                                              <button className="btn btn-primary btn-sm ml-2">
                                                                                  Direct
                                                                                  Test
                                                                              </button>
                                                                          </Link>
                                                                      ) : (
                                                                          ""
                                                                      )}
                                                                  </td>
                                                                  <td className="text-right">
                                                                      <button
                                                                          className="btn btn-primary-invert shadow-sm btn-sm mr-1"
                                                                          onClick={() =>
                                                                              this.toggleSemester_EditModal(
                                                                                  data
                                                                              )
                                                                          }
                                                                      >
                                                                          <i className="far fa-edit"></i>
                                                                      </button>
                                                                      {/* <button
                                                                          className="btn btn-primary-invert shadow-sm btn-sm"
                                                                          onClick={() =>
                                                                              this.toggleSemester_DeleteModal(
                                                                                  data
                                                                              )
                                                                          }
                                                                      >
                                                                          <i className="far fa-trash-alt"></i>
                                                                      </button> */}
                                                                  </td>
                                                              </tr>
                                                          </React.Fragment>
                                                      );
                                                  }
                                              )
                                            : null}
                                        {/* Unassigned chapter list */}
                                        {this.state.subjectItems.length !== 0
                                            ? this.state.subjectItems.map(
                                                  (chapter, index) => {
                                                      return !this.state.semester_chapters.includes(
                                                          chapter.chapter_id
                                                      ) ? (
                                                          <tr key={index}>
                                                              <td>
                                                                  {
                                                                      chapter.chapter_name
                                                                  }
                                                              </td>
                                                              <td>
                                                                  {
                                                                      chapter.weightage
                                                                  }
                                                              </td>
                                                              <td>
                                                                  <Link
                                                                      to={`/teacher/subject/${this.subjectId}/chapter/${chapter.chapter_name}/summary/upload`}
                                                                      className="primary-text"
                                                                  >
                                                                      <button className="btn btn-primary btn-sm mr-2">
                                                                          <i className="fas fa-file-upload"></i>
                                                                      </button>
                                                                  </Link>
                                                                  <Link
                                                                      to={`/teacher/subject/${this.subjectId}/chapter/${chapter.chapter_name}/summary`}
                                                                      className="primary-text"
                                                                  >
                                                                      <button className="btn btn-primary btn-sm">
                                                                          <i className="fas fa-file-medical"></i>
                                                                      </button>
                                                                  </Link>
                                                              </td>
                                                              <td className="text-right">
                                                                  <Link
                                                                      to={`/teacher/subject/${this.subjectId}/chapter/${chapter.chapter_name}`}
                                                                  >
                                                                      <button className="btn btn-primary btn-sm">
                                                                          Add
                                                                      </button>
                                                                  </Link>
                                                              </td>
                                                              <td className="text-right">
                                                                  <button
                                                                      className="btn btn-primary-invert shadow-sm btn-sm mr-1"
                                                                      onClick={() =>
                                                                          this.toggleChapter_EditModal(
                                                                              chapter
                                                                          )
                                                                      }
                                                                  >
                                                                      <i className="far fa-edit"></i>
                                                                  </button>
                                                                  {/* <button
                                                                      className="btn btn-primary-invert shadow-sm btn-sm"
                                                                      onClick={() =>
                                                                          this.toggleChapter_DeleteModal(
                                                                              chapter
                                                                          )
                                                                      }
                                                                  >
                                                                      <i className="far fa-trash-alt"></i>
                                                                  </button> */}
                                                              </td>
                                                          </tr>
                                                      ) : null;
                                                  }
                                              )
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <button
                            className="btn btn-tomato btn-block shadow-sm mb-2"
                            onClick={this.toggleModal}
                        >
                            Add Chapter
                        </button>
                        <button
                            className="btn btn-tomato btn-block shadow-sm"
                            onClick={this.toggleSemesterModal}
                        >
                            Add Semester Exam
                        </button>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default SubjectChapters;
