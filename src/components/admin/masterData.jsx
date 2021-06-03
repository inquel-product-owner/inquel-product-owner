import React, { Component } from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Modal, Spinner, Alert } from "react-bootstrap";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import Loading from "../common/loader";
import AlertBox from "../common/alert";

class ContentAdding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + adminPathUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        this.setState({
            data: this.props.data,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            showLoader: true,
        });

        fetch(`${this.url}/data/master/`, {
            headers: this.headers,
            method: "PUT",
            body: JSON.stringify(this.state.data),
        })
            .then((res) => res.json())
            .then((result) => {
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

    handleInput = (event) => {
        let data = this.state.data;
        if (this.props.type === "category") {
            data.category[event.target.name] = event.target.value;
        }
        if (this.props.type === "sub_category") {
            data.category.sub_category[event.target.name] = event.target.value;
        }
        if (
            this.props.type === "discipline" ||
            this.props.type === "level" ||
            this.props.type === "subject"
        ) {
            data.category.sub_category[this.props.type][event.target.name] =
                event.target.value;
        }
        if (this.props.type === "board" || this.props.type === "course") {
            data[this.props.type][event.target.name] = event.target.value;
        }
        this.setState({
            data: data,
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
                <Modal.Header closeButton>Add master data</Modal.Header>
                <form onSubmit={this.handleSubmit} autoComplete="off">
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
                            <label htmlFor="code">Code</label>
                            <input
                                type="text"
                                name="code"
                                id="code"
                                className="form-control borders"
                                onChange={this.handleInput}
                                placeholder="Enter code"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="form-control borders"
                                onChange={this.handleInput}
                                placeholder="Enter title"
                                required
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary btn-block shadow-none">
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
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

class AdminMasterData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            activeType: "",
            selectedCategory: { label: "", value: "" },
            selectedSubcategory: { label: "", value: "" },
            contentAddingType: "",
            selectedData: "",

            category: [],
            subcategory: [],
            discipline: [],
            levels: [],
            subjects: [],
            board: [],
            type: [],
            subcategory_loading: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.url = baseUrl + adminPathUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    handleType = (event) => {
        this.setState({
            activeType: event.value,
            selectedCategory: { label: "", value: "" },
            selectedSubcategory: { label: "", value: "" },
        });
    };

    loadMasterData = () => {
        fetch(`${this.url}/data/filter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        category: result.data.CATEGORY,
                        board: result.data.BOARD,
                        type: result.data.TYPE,
                        selectedCategory: { label: "", value: "" },
                        selectedSubcategory: { label: "", value: "" },
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
        document.title = "Master Data - Admin | IQLabs";

        this.loadMasterData();
    };

    handleCategory = (event) => {
        let category = this.state.selectedCategory;
        category.label = event.label;
        category.value = event.value;
        this.setState({
            selectedCategory: category,
            subcategory: [],
            discipline: [],
            selectedSubcategory: { label: "", value: "" },
            subcategory_loading: true,
        });

        if (event.value !== "") {
            fetch(`${this.url}/data/filter/?category=${event.value}`, {
                headers: this.headers,
                method: "GET",
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        this.setState({
                            subcategory: result.data.sub_category,
                            subcategory_loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                        });
                    }
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
            page_loading: true,
        });

        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        if (event.value !== "") {
            fetch(
                `${url}/data/filter/?category=${this.state.selectedCategory.value}&sub_category=${event.value}`,
                {
                    headers: headers,
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
                            page_loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            page_loading: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    toggleModal = (type) => {
        if (type === "category") {
            this.setState({
                selectedData: {
                    category: {
                        code: "",
                        title: "",
                    },
                    category_update: true,
                },
            });
        }
        if (type === "sub_category") {
            this.setState({
                selectedData: {
                    category: {
                        code: this.state.selectedCategory.value,
                        sub_category: {
                            code: "",
                            title: "",
                        },
                    },
                    sub_category_update: true,
                },
            });
        }
        if (type === "discipline" || type === "level" || type === "subject") {
            this.setState({
                selectedData: {
                    category: {
                        code: this.state.selectedCategory.value,
                        sub_category: {
                            code: this.state.selectedSubcategory.value,
                            [type]: {
                                code: "",
                                title: "",
                            },
                        },
                    },
                    [`${type}_update`]: true,
                },
            });
        }
        if (type === "board" || type === "course") {
            this.setState({
                selectedData: {
                    [type]: {
                        code: "",
                        title: "",
                    },
                },
            });
        }
        this.setState({
            contentAddingType: type,
            showModal: !this.state.showModal,
        });
    };

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showModal: false,
            });
            if (
                this.state.contentAddingType === "category" ||
                this.state.contentAddingType === "board" ||
                this.state.contentAddingType === "course"
            ) {
                this.loadMasterData();
            }
            if (this.state.contentAddingType === "sub_category") {
                this.handleCategory(this.state.selectedCategory);
            }
            if (
                this.state.contentAddingType === "discipline" ||
                this.state.contentAddingType === "level" ||
                this.state.contentAddingType === "subject"
            ) {
                this.handleSubcategory(this.state.selectedSubcategory);
            }
        }, 1000);
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Master Data" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} activeLink="course" />

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

                {this.state.showModal ? (
                    <ContentAdding
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        formSubmission={this.formSubmission}
                        type={this.state.contentAddingType}
                        data={this.state.selectedData}
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
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-3">
                                <li className="breadcrumb-item">
                                    <Link to="/admin">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Master Data
                                </li>
                            </ol>
                        </nav>

                        {/* ----- Options ----- */}
                        <div className="row">
                            <div className="col-md-3 mb-3 mb-md-0">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="select1">
                                                Option
                                            </label>
                                            <Select
                                                className="basic-single form-shadow"
                                                placeholder="Select option"
                                                isSearchable={true}
                                                name="option"
                                                options={[
                                                    {
                                                        label: "Categories",
                                                        value: "category",
                                                    },
                                                    {
                                                        label: "Board",
                                                        value: "board",
                                                    },
                                                    {
                                                        label: "Types",
                                                        value: "types",
                                                    },
                                                ]}
                                                onChange={this.handleType}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="category">
                                                Category
                                            </label>
                                            <Select
                                                className="basic-single form-shadow"
                                                isSearchable={true}
                                                name="category"
                                                options={this.state.category.map(
                                                    function (list) {
                                                        return {
                                                            value: list.code,
                                                            label: list.title,
                                                        };
                                                    }
                                                )}
                                                value={
                                                    this.state.selectedCategory
                                                        .label !== ""
                                                        ? this.state
                                                              .selectedCategory
                                                        : {
                                                              label: "Select category",
                                                              value: "",
                                                          }
                                                }
                                                isDisabled={
                                                    this.state.activeType ===
                                                    "category"
                                                        ? false
                                                        : true
                                                }
                                                onChange={this.handleCategory}
                                                required
                                            />
                                        </div>

                                        <button
                                            className="btn btn-light btn-sm btn-block border-secondary shadow-none mb-2"
                                            onClick={() =>
                                                this.toggleModal("category")
                                            }
                                            disabled={
                                                this.state.activeType ===
                                                "category"
                                                    ? false
                                                    : true
                                            }
                                        >
                                            Add +
                                        </button>

                                        <div className="form-group">
                                            <label htmlFor="select3">
                                                Sub Category
                                            </label>
                                            <Select
                                                className="basic-single form-shadow"
                                                isSearchable={true}
                                                name="subcategory"
                                                isLoading={
                                                    this.state
                                                        .subcategory_loading
                                                        ? true
                                                        : false
                                                }
                                                options={this.state.subcategory.map(
                                                    function (list) {
                                                        return {
                                                            value: list.code,
                                                            label: list.title,
                                                        };
                                                    }
                                                )}
                                                value={
                                                    this.state
                                                        .selectedSubcategory
                                                        .label !== ""
                                                        ? this.state
                                                              .selectedSubcategory
                                                        : {
                                                              label: "Select subcategory",
                                                              value: "",
                                                          }
                                                }
                                                isDisabled={
                                                    this.state.selectedCategory
                                                        .value === ""
                                                        ? true
                                                        : false
                                                }
                                                onChange={
                                                    this.handleSubcategory
                                                }
                                                required
                                            />
                                        </div>

                                        <button
                                            className="btn btn-light btn-sm btn-block border-secondary shadow-none"
                                            onClick={() =>
                                                this.toggleModal("sub_category")
                                            }
                                            disabled={
                                                this.state.selectedCategory
                                                    .value === ""
                                                    ? true
                                                    : false
                                            }
                                        >
                                            Add +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9">
                                {/* ----- Category Data ----- */}
                                {this.state.activeType === "category" &&
                                this.state.selectedCategory.value !== "" &&
                                this.state.selectedSubcategory.value !== "" ? (
                                    <div className="row">
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div className="card border-primary">
                                                <div className="card-header secondary-bg text-black">
                                                    Discipline
                                                </div>
                                                <div className="card-body">
                                                    {this.state.discipline
                                                        .length !== 0 ? (
                                                        Object.values(
                                                            this.state
                                                                .discipline
                                                        ).map((list, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    <p className="mb-2">
                                                                        {list}
                                                                    </p>
                                                                    <div className="dropdown-divider"></div>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <p>
                                                            Data not available
                                                        </p>
                                                    )}
                                                    <button
                                                        className="btn btn-light btn-sm btn-block border-secondary shadow-none"
                                                        onClick={() =>
                                                            this.toggleModal(
                                                                "discipline"
                                                            )
                                                        }
                                                    >
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div className="card border-primary">
                                                <div className="card-header secondary-bg text-black">
                                                    Level
                                                </div>
                                                <div className="card-body">
                                                    {this.state.levels
                                                        .length !== 0 ? (
                                                        Object.values(
                                                            this.state.levels
                                                        ).map((list, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    <p className="mb-2">
                                                                        {list}
                                                                    </p>
                                                                    <div className="dropdown-divider"></div>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <p>
                                                            Data not available
                                                        </p>
                                                    )}
                                                    <button
                                                        className="btn btn-light btn-sm btn-block border-secondary shadow-none"
                                                        onClick={() =>
                                                            this.toggleModal(
                                                                "level"
                                                            )
                                                        }
                                                    >
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card border-primary">
                                                <div className="card-header secondary-bg text-black">
                                                    Subject
                                                </div>
                                                <div className="card-body">
                                                    {this.state.subjects
                                                        .length !== 0 ? (
                                                        Object.values(
                                                            this.state.subjects
                                                        ).map((list, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    <p className="mb-2">
                                                                        {list}
                                                                    </p>
                                                                    <div className="dropdown-divider"></div>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <p>
                                                            Data not available
                                                        </p>
                                                    )}
                                                    <button
                                                        className="btn btn-light btn-sm btn-block border-secondary shadow-none"
                                                        onClick={() =>
                                                            this.toggleModal(
                                                                "subject"
                                                            )
                                                        }
                                                    >
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {/* ----- Board Data ----- */}
                                {this.state.activeType === "board" ? (
                                    <div className="row">
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div className="card border-primary">
                                                <div className="card-header secondary-bg text-black text-center">
                                                    Board / University
                                                </div>
                                                <div className="card-body">
                                                    {this.state.board.length !==
                                                    0 ? (
                                                        this.state.board.map(
                                                            (list, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <p className="mb-2">
                                                                            {
                                                                                list.title
                                                                            }
                                                                        </p>
                                                                        <div className="dropdown-divider"></div>
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <p>
                                                            Data not available
                                                        </p>
                                                    )}
                                                    <button
                                                        className="btn btn-light btn-sm btn-block border-secondary shadow-none"
                                                        onClick={() =>
                                                            this.toggleModal(
                                                                "board"
                                                            )
                                                        }
                                                    >
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {/* ----- Type Data ----- */}
                                {this.state.activeType === "types" ? (
                                    <div className="row">
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div className="card border-primary">
                                                <div className="card-header primary-bg text-white text-center font-weight-bold">
                                                    Course
                                                </div>
                                                <div className="card-body">
                                                    {this.state.type.length !==
                                                    0 ? (
                                                        this.state.type.map(
                                                            (list, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <p className="mb-2">
                                                                            {
                                                                                list.title
                                                                            }
                                                                        </p>
                                                                        <div className="dropdown-divider"></div>
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <p>
                                                            Data not available
                                                        </p>
                                                    )}
                                                    <button
                                                        className="btn btn-light btn-sm btn-block border-secondary shadow-none"
                                                        onClick={() =>
                                                            this.toggleModal(
                                                                "course"
                                                            )
                                                        }
                                                    >
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
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

export default AdminMasterData;
