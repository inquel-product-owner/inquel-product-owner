import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner, Dropdown } from "react-bootstrap";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import courseimg from "../../assets/code.jpg";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import { paginationCount } from "../../shared/globalValues.js";
import Loading from "../shared/loader";
import GroupTable from "../table/group";
import SubjectTable from "../table/subject";
import Paginations from "../shared/pagination";
import AlertBox from "../shared/alert";
import {
    ContentDeleteModal,
    ContentDisableModal,
    ContentEnableModal,
    MultiContentDeleteModal,
    SingleContentDisableModal,
    SingleContentEnableModal,
} from "../shared/contentManagementModal";
import { connect } from "react-redux";
import Slider from "react-slick";
import store from "../../redux/store";
import Select from "react-select";

const mapStateToProps = (state) => ({
    data: state.user.profile,
});

class SubjectModal extends Component {
    constructor() {
        super();
        this.state = {
            category: [],
            sub_category: [],
            discipline: [],
            levels: [],
            subjects: [],
            subjectName: "",

            selectedCategory: { label: "", value: "" },
            selectedSubcategory: { label: "", value: "" },
            selectedDiscipline: { label: "", value: "" },
            selectedlevels: { label: "", value: "" },
            selectedSubjects: { label: "", value: "" },

            subcategory_loading: false,
            content_loading: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        fetch(`${this.url}/hod/levels/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        category: result.data.CATEGORY,
                    });
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

    handleInput = (event) => {
        this.setState({
            subjectName: event.target.value,
        });
    };

    handleCategory = (event) => {
        let category = this.state.selectedCategory;
        category.label = event.label;
        category.value = event.value;
        this.setState({
            selectedCategory: category,
            sub_category: [],
            discipline: [],
            levels: [],
            subjects: [],
            selectedSubcategory: { label: "", value: "" },
            subcategory_loading: true,
        });

        if (event.value !== "") {
            fetch(`${this.url}/hod/levels/?category=${event.value}`, {
                headers: this.headers,
                method: "GET",
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        this.setState({
                            sub_category: result.data.sub_category,
                            subcategory_loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                        });
                    }
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    handleSubcategory = (event) => {
        let sub_category = this.state.selectedSubcategory;
        sub_category.label = event.label;
        sub_category.value = event.value;
        this.setState({
            selectedSubcategory: sub_category,
            discipline: [],
            levels: [],
            subjects: [],
            content_loading: true,
        });

        if (event.value !== "") {
            fetch(
                `${this.url}/hod/levels/?category=${this.state.selectedCategory.value}&sub_category=${event.value}`,
                {
                    headers: this.headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        this.setState({
                            discipline: result.data.DISCIPLINE,
                            levels: result.data.LEVELS,
                            subjects: result.data.SUBJECTS,
                            content_loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                            content_loading: false,
                        });
                    }
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    handleDiscipline = (event) => {
        let discipline = this.state.selectedDiscipline;
        discipline.label = event.label;
        discipline.value = event.value;
        this.setState({
            selectedDiscipline: discipline,
        });
    };

    handleLevel = (event) => {
        let level = this.state.selectedlevels;
        level.label = event.label;
        level.value = event.value;
        this.setState({
            selectedlevels: level,
        });
    };

    handleSubject = (event) => {
        let subject = this.state.selectedSubjects;
        subject.label = event.label;
        subject.value = event.value;
        this.setState({
            selectedSubjects: subject,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showLoader: true,
        });

        fetch(`${this.url}/hod/create/subject/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                subject_name: this.state.subjectName,
                category: this.state.selectedCategory.value,
                sub_category: this.state.selectedSubcategory.value,
                discipline: this.state.selectedDiscipline.value,
                level: this.state.selectedlevels.value,
                subject: this.state.selectedSubjects.value,
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
                scrollable
                backdrop="static"
            >
                <Modal.Header closeButton>Create Subject</Modal.Header>
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

                    <div className="form-group">
                        <label htmlFor="subject">Subject name</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            className="form-control form-control-lg borders"
                            onChange={this.handleInput}
                            placeholder="Enter subject name"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <Select
                            className="basic-single borders"
                            placeholder="Select category"
                            isSearchable={true}
                            name="category"
                            id="category"
                            options={(this.state.category || []).map((list) => {
                                return {
                                    value: list.code,
                                    label: list.title,
                                };
                            })}
                            value={(this.state.category || []).map((list) => {
                                return this.state.selectedCategory.value ===
                                    list.code
                                    ? {
                                          value: list.code,
                                          label: list.title,
                                      }
                                    : "";
                            })}
                            onChange={this.handleCategory}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sub_category">Sub Category</label>
                        <Select
                            className="basic-single borders"
                            placeholder="Select subcategory"
                            isSearchable={true}
                            name="sub_category"
                            id="sub_category"
                            isLoading={
                                this.state.subcategory_loading ? true : false
                            }
                            options={this.state.sub_category.map((list) => {
                                return {
                                    value: list.code,
                                    label: list.title,
                                };
                            })}
                            value={(this.state.sub_category || []).map(
                                (list) => {
                                    return this.state.selectedSubcategory
                                        .value === list.code
                                        ? {
                                              value: list.code,
                                              label: list.title,
                                          }
                                        : "";
                                }
                            )}
                            isDisabled={
                                this.state.selectedCategory.value === ""
                                    ? true
                                    : false
                            }
                            onChange={this.handleSubcategory}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discipline">Discipline</label>
                        <Select
                            className="basic-single borders"
                            placeholder="Select discipline"
                            isSearchable={true}
                            name="discipline"
                            id="discipline"
                            isLoading={
                                this.state.content_loading ? true : false
                            }
                            options={(
                                Object.entries(this.state.discipline) || []
                            ).map(([key, value]) => {
                                return {
                                    value: key,
                                    label: value,
                                };
                            })}
                            value={(
                                Object.entries(this.state.discipline) || []
                            ).map(([key, value]) => {
                                return this.state.selectedDiscipline.value ===
                                    key
                                    ? {
                                          value: key,
                                          label: value,
                                      }
                                    : "";
                            })}
                            isDisabled={
                                this.state.selectedSubcategory.value === ""
                                    ? true
                                    : false
                            }
                            onChange={this.handleDiscipline}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="level">Level</label>
                        <Select
                            className="basic-single borders"
                            placeholder="Select level"
                            isSearchable={true}
                            name="level"
                            id="level"
                            isLoading={
                                this.state.content_loading ? true : false
                            }
                            options={(
                                Object.entries(this.state.levels) || []
                            ).map(([key, value]) => {
                                return {
                                    value: key,
                                    label: value,
                                };
                            })}
                            value={(
                                Object.entries(this.state.levels) || []
                            ).map(([key, value]) => {
                                return this.state.selectedlevels.value === key
                                    ? {
                                          value: key,
                                          label: value,
                                      }
                                    : "";
                            })}
                            isDisabled={
                                this.state.selectedSubcategory.value === ""
                                    ? true
                                    : false
                            }
                            onChange={this.handleLevel}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <Select
                            className="basic-single borders"
                            placeholder="Select subject"
                            isSearchable={true}
                            name="subject"
                            id="subject"
                            isLoading={
                                this.state.content_loading ? true : false
                            }
                            options={(
                                Object.entries(this.state.subjects) || []
                            ).map(([key, value]) => {
                                return {
                                    value: key,
                                    label: value,
                                };
                            })}
                            value={(
                                Object.entries(this.state.subjects) || []
                            ).map(([key, value]) => {
                                return this.state.selectedSubjects.value === key
                                    ? {
                                          value: key,
                                          label: value,
                                      }
                                    : "";
                            })}
                            isDisabled={
                                this.state.selectedSubcategory.value === ""
                                    ? true
                                    : false
                            }
                            onChange={this.handleSubject}
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-primary btn-block shadow-none"
                        onClick={this.handleSubmit}
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
                        Create Subject
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class HODDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            content: "",
            type: "",

            groupItems: [],
            subjectItems: [],
            courseItems: [],
            selectedData: [],

            activeGroupPage: 1,
            totalGroupCount: 0,
            activeSubjectPage: 1,
            totalSubjectCount: 0,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.url = baseUrl + hodUrl;
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

    loadGroupData = () => {
        fetch(`${this.url}/hod/groups/?page=${this.state.activeGroupPage}`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        groupItems: result.data.results,
                        totalGroupCount: result.data.count,
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

    loadSubjectData = () => {
        fetch(`${this.url}/hod/subject/?page=${this.state.activeSubjectPage}`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        subjectItems: result.data.results,
                        totalSubjectCount: result.data.count,
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

    loadCourseData = () => {
        fetch(`${this.url}/hod/course/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        courseItems: result.data || [],
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
        document.title = "Dashboard - HOD | IQLabs";

        this.loadGroupData();
        this.loadSubjectData();
        this.loadCourseData();
    };

    toggleModal = (content, type) => {
        this.setState({
            showModal: !this.state.showModal,
            content: content,
            type: type,
        });
    };

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showModal: false,
            });
        }, 1000);
        if (this.state.content === "group") {
            this.loadGroupData();
        } else if (this.state.content === "subject") {
            this.loadSubjectData();
        } else if (this.state.content === "course") {
            this.loadCourseData();
        }
    };

    // Gets group ID from the group table
    handleGroupId = (data) => {
        let value = [];
        const groupItems = this.state.groupItems;
        for (let i = 0; i < groupItems.length; i++) {
            if (data.includes(groupItems[i].id.toString())) {
                value.push({
                    id: groupItems[i].id.toString(),
                    name: groupItems[i].group_name,
                });
            } else {
                continue;
            }
        }
        this.setState({
            selectedData: value,
        });
    };

    // Gets Subject ID from the Subject table
    handleSubjectId = (data) => {
        let value = [];
        const subjectItems = this.state.subjectItems;
        for (let i = 0; i < subjectItems.length; i++) {
            if (data.includes(subjectItems[i].id.toString())) {
                value.push({
                    id: subjectItems[i].id.toString(),
                    name: subjectItems[i].subject_name,
                });
            } else {
                continue;
            }
        }
        this.setState({
            selectedData: value,
        });
    };

    handleGroupPageChange(pageNumber) {
        this.setState(
            { activeGroupPage: pageNumber, page_loading: true },
            () => {
                this.loadGroupData();
            }
        );
    }

    handleSubjectPageChange(pageNumber) {
        this.setState(
            { activeSubjectPage: pageNumber, page_loading: true },
            () => {
                this.loadSubjectData();
            }
        );
    }

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                    },
                },
            ],
        };
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Dashboard" togglenav={this.toggleSideNav} />

                {/* Alert message */}
                <AlertBox
                    errorMsg={this.state.errorMsg}
                    successMsg={this.state.successMsg}
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={this.state.showSuccessAlert}
                    toggleSuccessAlert={() => {
                        this.setState({
                            showSuccessAlert: false,
                        });
                    }}
                    toggleErrorAlert={() => {
                        this.setState({
                            showErrorAlert: false,
                        });
                    }}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Group Delete Modal */}
                {this.state.showModal &&
                this.state.content === "group" &&
                this.state.type === "DELETE" ? (
                    <MultiContentDeleteModal
                        show={this.state.showModal}
                        onHide={() => this.toggleModal("group", "DELETE")}
                        toggleModal={() => this.toggleModal("group", "DELETE")}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/create/group/`}
                        data={this.state.selectedData}
                        field="group_ids"
                        type="Group"
                    />
                ) : (
                    ""
                )}

                {/* Subject create modal */}
                {this.state.showModal &&
                this.state.content === "subject" &&
                this.state.type === "ADD" ? (
                    <SubjectModal
                        show={this.state.showModal}
                        onHide={() => this.toggleModal("subject", "ADD")}
                        formSubmission={this.formSubmission}
                    />
                ) : (
                    ""
                )}

                {/* Subject Delete Modal */}
                {this.state.showModal &&
                this.state.content === "subject" &&
                this.state.type === "DELETE" ? (
                    <MultiContentDeleteModal
                        show={this.state.showModal}
                        onHide={() => this.toggleModal("subject", "DELETE")}
                        toggleModal={() =>
                            this.toggleModal("subject", "DELETE")
                        }
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/create/subject/`}
                        data={this.state.selectedData}
                        field="subject_ids"
                        type="subject"
                    />
                ) : (
                    ""
                )}

                {/* Subject Disable Modal */}
                {this.state.showModal &&
                this.state.content === "subject" &&
                this.state.type === "DISABLE" ? (
                    <ContentDisableModal
                        show={this.state.showModal}
                        onHide={() => this.toggleModal("subject", "DISABLE")}
                        toggleModal={() =>
                            this.toggleModal("subject", "DISABLE")
                        }
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/create/subject/`}
                        data={this.state.selectedData}
                        field="subject_ids"
                        type="subject"
                    />
                ) : (
                    ""
                )}

                {/* Subject Enable Modal */}
                {this.state.showModal &&
                this.state.content === "subject" &&
                this.state.type === "ENABLE" ? (
                    <ContentEnableModal
                        show={this.state.showModal}
                        onHide={() => this.toggleModal("subject", "ENABLE")}
                        toggleModal={() =>
                            this.toggleModal("subject", "ENABLE")
                        }
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/create/subject/`}
                        data={this.state.selectedData}
                        field="subject_ids"
                        type="subject"
                    />
                ) : (
                    ""
                )}

                {/* Course Delete Modal */}
                {this.state.showModal &&
                this.state.content === "course" &&
                this.state.type === "DELETE" ? (
                    <ContentDeleteModal
                        show={this.state.showModal}
                        onHide={() => this.toggleModal("course", "DELETE")}
                        toggleModal={() => this.toggleModal("course", "DELETE")}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/course/${this.state.selectedData.course_id}/`}
                        name={this.state.selectedData.course_name}
                        type="course"
                    />
                ) : (
                    ""
                )}

                {/* Course Disable Modal */}
                {this.state.showModal &&
                this.state.content === "course" &&
                this.state.type === "DISABLE" ? (
                    <SingleContentDisableModal
                        show={this.state.showModal}
                        onHide={() => this.toggleModal("course", "DISABLE")}
                        toggleModal={() =>
                            this.toggleModal("course", "DISABLE")
                        }
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/course/${this.state.selectedData.course_id}/status/`}
                        name={this.state.selectedData.course_name}
                        type="course"
                        method="PATCH"
                    />
                ) : (
                    ""
                )}

                {/* Course Enable Modal */}
                {this.state.showModal &&
                this.state.content === "course" &&
                this.state.type === "ENABLE" ? (
                    <SingleContentEnableModal
                        show={this.state.showModal}
                        onHide={() => this.toggleModal("course", "ENABLE")}
                        toggleModal={() => this.toggleModal("course", "ENABLE")}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/course/${this.state.selectedData.course_id}/status/`}
                        name={this.state.selectedData.course_name}
                        type="course"
                        method="PATCH"
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
                        {/* ----- Welcome ----- */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body text-center p-4">
                                <h3 className="primary-text mb-0">
                                    WELCOME BACK
                                </h3>
                            </div>
                        </div>

                        {/* ----- Group card ----- */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <h5>Groups</h5>
                                    </div>
                                    <div className="col-6 text-right">
                                        <Link to="/hod/group">
                                            <button className="btn btn-primary btn-sm shadow-none mr-1">
                                                Group Configuration
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={() =>
                                                this.toggleModal(
                                                    "group",
                                                    "DELETE"
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <GroupTable
                                groupItems={this.state.groupItems}
                                path="hod"
                                view={true}
                                check={true}
                                handleGroupId={this.handleGroupId}
                            />
                            <div className="card-body p-3">
                                {this.state.totalGroupCount >
                                paginationCount ? (
                                    <Paginations
                                        activePage={this.state.activeGroupPage}
                                        totalItemsCount={
                                            this.state.totalGroupCount
                                        }
                                        onChange={this.handleGroupPageChange.bind(
                                            this
                                        )}
                                    />
                                ) : null}
                            </div>
                        </div>

                        {this.props.data !== null ? (
                            this.props.data.permissions !== undefined ? (
                                this.props.data.permissions.config_course ===
                                true ? (
                                    <>
                                        {/* ----- Subject card ----- */}
                                        <div className="card shadow-sm mb-4">
                                            <div className="card-header">
                                                <div className="row align-items-center">
                                                    <div className="col-md-3">
                                                        <h5>Subjects</h5>
                                                    </div>
                                                    <div className="col-md-9 text-right">
                                                        <button
                                                            className="btn btn-primary btn-sm shadow-none mr-1"
                                                            onClick={() =>
                                                                this.toggleModal(
                                                                    "subject",
                                                                    "ADD"
                                                                )
                                                            }
                                                        >
                                                            Add
                                                        </button>
                                                        <button
                                                            className="btn btn-primary btn-sm shadow-none mr-1"
                                                            onClick={() =>
                                                                this.toggleModal(
                                                                    "subject",
                                                                    "DELETE"
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            className="btn btn-primary btn-sm shadow-none mr-1"
                                                            onClick={() =>
                                                                this.toggleModal(
                                                                    "subject",
                                                                    "ENABLE"
                                                                )
                                                            }
                                                        >
                                                            Enable
                                                        </button>
                                                        <button
                                                            className="btn btn-primary btn-sm shadow-none"
                                                            onClick={() =>
                                                                this.toggleModal(
                                                                    "subject",
                                                                    "DISABLE"
                                                                )
                                                            }
                                                        >
                                                            Disable
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <SubjectTable
                                                subjectItems={
                                                    this.state.subjectItems
                                                }
                                                path="hod"
                                                status={true}
                                                handleSubjectId={
                                                    this.handleSubjectId
                                                }
                                            />
                                            <div className="card-body p-3">
                                                {this.state.totalSubjectCount >
                                                paginationCount ? (
                                                    <Paginations
                                                        activePage={
                                                            this.state
                                                                .activeSubjectPage
                                                        }
                                                        totalItemsCount={
                                                            this.state
                                                                .totalSubjectCount
                                                        }
                                                        onChange={this.handleSubjectPageChange.bind(
                                                            this
                                                        )}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>

                                        {/* ----- Course card ----- */}
                                        <div className="card shadow-sm">
                                            <div className="card-header">
                                                <h5>Course</h5>
                                            </div>
                                            <div className="card-body">
                                                {this.state.courseItems
                                                    .length !== 0 ? (
                                                    <Slider {...settings}>
                                                        {this.state.courseItems.map(
                                                            (data, index) => {
                                                                return (
                                                                    <div
                                                                        className="px-3"
                                                                        data-index={
                                                                            index
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <div className="card">
                                                                            <img
                                                                                src={
                                                                                    data.course_thumbnail_url ===
                                                                                    null
                                                                                        ? courseimg
                                                                                        : data.course_thumbnail_url
                                                                                }
                                                                                className="card-img-top"
                                                                                alt={
                                                                                    data.course_name
                                                                                }
                                                                            />
                                                                            <div
                                                                                className="text-right mt-2"
                                                                                style={{
                                                                                    position:
                                                                                        "absolute",
                                                                                    right: "7px",
                                                                                }}
                                                                            >
                                                                                <Dropdown>
                                                                                    <Dropdown.Toggle
                                                                                        variant="white"
                                                                                        className="btn btn-primary-invert btn-sm shadow-none caret-off"
                                                                                    >
                                                                                        <i className="fas fa-ellipsis-v"></i>
                                                                                    </Dropdown.Toggle>

                                                                                    <Dropdown.Menu>
                                                                                        <Dropdown.Item
                                                                                            onClick={() => {
                                                                                                this.toggleModal(
                                                                                                    "course",
                                                                                                    "DELETE"
                                                                                                );
                                                                                                this.setState(
                                                                                                    {
                                                                                                        selectedData:
                                                                                                            data,
                                                                                                    }
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <i className="far fa-trash-alt mr-1"></i>{" "}
                                                                                            Delete
                                                                                        </Dropdown.Item>
                                                                                        {data.is_active ===
                                                                                        false ? (
                                                                                            <Dropdown.Item
                                                                                                onClick={() => {
                                                                                                    this.toggleModal(
                                                                                                        "course",
                                                                                                        "ENABLE"
                                                                                                    );
                                                                                                    this.setState(
                                                                                                        {
                                                                                                            selectedData:
                                                                                                                data,
                                                                                                        }
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <i className="far fa-check-circle mr-1"></i>{" "}
                                                                                                Enable
                                                                                            </Dropdown.Item>
                                                                                        ) : (
                                                                                            <Dropdown.Item
                                                                                                onClick={() => {
                                                                                                    this.toggleModal(
                                                                                                        "course",
                                                                                                        "DISABLE"
                                                                                                    );
                                                                                                    this.setState(
                                                                                                        {
                                                                                                            selectedData:
                                                                                                                data,
                                                                                                        }
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <i className="fas fa-ban mr-1"></i>{" "}
                                                                                                Disable
                                                                                            </Dropdown.Item>
                                                                                        )}
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown>
                                                                            </div>
                                                                            <Link
                                                                                to={`/hod/course/${data.course_id}`}
                                                                                className="text-decoration-none"
                                                                                onClick={() => {
                                                                                    store.dispatch(
                                                                                        {
                                                                                            type: "COURSE",
                                                                                            payload:
                                                                                                data.course_name,
                                                                                        }
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <div
                                                                                    className="card-body primary-bg text-white p-2"
                                                                                    style={{
                                                                                        cursor: "pointer",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        data.course_name
                                                                                    }
                                                                                </div>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </Slider>
                                                ) : 'No data to display...'}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}

                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(HODDashboard);
