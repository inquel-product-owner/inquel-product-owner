import React, { Component } from "react";
import axios from "axios";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Spinner, Modal, Alert } from "react-bootstrap";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import userpic from "../../assets/user-v1.png";
import AlertBox from "../sharedComponents/alert";
import dateFormat from "dateformat";
import { country } from "../../shared/countries.js";

class ImageUploadModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
    }

    handleImageFile = (event) => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        let form_data = new FormData();
        form_data.append("profile_image_1", event.target.files[0]);

        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: this.authToken,
            },
        };

        let extension = event.target.files[0].name.split(".");
        let format = ["jpg", "jpeg", "png", "webp"];

        if (!format.includes(extension[extension.length - 1].toLowerCase())) {
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
            if (this.props.profile_link === null) {
                axios
                    .post(`${this.url}/student/profile/`, form_data, options)
                    .then((result) => {
                        console.log(result);
                        if (result.data.url && result.data.sts === true) {
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
                                showLoader: false,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                axios
                    .patch(`${this.url}/student/profile/`, form_data, options)
                    .then((result) => {
                        console.log(result);
                        if (result.data.url && result.data.sts === true) {
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
                                showLoader: false,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    };

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton className="align-items-center">
                        Upload Image
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
                                id="img1"
                                accept="image/*"
                                aria-describedby="inputGroupFileAddon01"
                                onChange={(event) =>
                                    this.handleImageFile(event)
                                }
                            />
                            <label className="custom-file-label" htmlFor="img1">
                                Choose file
                            </label>
                        </div>
                        <small
                            className="form-text text-muted mb-2"
                            style={{ marginTop: "0px" }}
                        >
                            Select only .png .jpg .jpeg .webp format. Max size
                            is 5MB
                        </small>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            studentItems: [],
            showEditOption: false,
            page_loading: true,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showImageLoader: false,
            showLoader: false,
        };
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

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

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

    toggleEdit = () => {
        this.setState({
            showEditOption: !this.state.showEditOption,
        });
    };

    handleInput = (event) => {
        let data = this.state.studentItems;
        data[event.target.name] = event.target.value;
        this.setState({
            studentItems: data,
        });
    };

    handleDate = (event) => {
        let data = this.state.studentItems;
        data.date_of_birth = dateFormat(event.target.value, "yyyy-mm-dd");
        this.setState({
            studentItems: data,
        });
    };

    handleSelect = (event) => {
        let data = this.state.studentItems;
        data.country_code = event.value;
        this.setState({
            studentItems: data,
        });
    };

    loadStudentData = () => {
        fetch(`${this.url}/student/profile/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        studentItems: result.data,
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
        document.title = "My Profile - Student | IQLabs";

        this.loadStudentData();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: true,
        });

        fetch(`${this.url}/student/profile/`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({
                first_name: this.state.studentItems.first_name,
                last_name: this.state.studentItems.last_name,
                phone_num:
                    this.state.studentItems.country_code +
                    this.state.studentItems.phone_num,
                date_of_birth: dateFormat(
                    this.state.studentItems.date_of_birth,
                    "yyyy-mm-dd"
                ),
                description: this.state.studentItems.description,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                        },
                        () => {
                            setTimeout(() => {
                                this.setState({
                                    showEditOption: false,
                                    page_loading: true,
                                });
                                this.loadStudentData();
                            }, 1000);
                        }
                    );
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

    formSubmission = () => {
        setTimeout(() => {
            this.loadStudentData();
            this.setState({
                showModal: false,
                page_loading: true,
            });
        }, 1000);
    };

    renderValue = (data) => {
        return (
            <span>
                <img
                    src={data.flag}
                    alt=""
                    className="img-fluid"
                    width="25px"
                    height="auto"
                />{" "}
                {data.isoCode} - {data.dialCode}
            </span>
        );
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="My Profile" togglenav={this.toggleSideNav} />

                {/* ALert message */}
                <AlertBox
                    errorMsg={this.state.errorMsg}
                    successMsg={this.state.successMsg}
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={this.state.showSuccessAlert}
                    toggleSuccessAlert={this.toggleSuccessAlert}
                    toggleErrorAlert={this.toggleErrorAlert}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Image modal */}
                {this.state.showModal ? (
                    <ImageUploadModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        profile_link={this.state.studentItems.profile_link}
                        formSubmission={this.formSubmission}
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

                        <div className="row align-items-center mb-3">
                            <div className="col-8">
                                {/* Breadcrumb */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/student">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            My Profile
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-4 text-right">
                                {!this.state.showEditOption ? (
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={this.toggleEdit}
                                    >
                                        <i className="far fa-edit mr-1"></i>
                                        Edit Profile
                                    </button>
                                ) : null}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 pl-md-4 mb-3 mb-md-0">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div style={{ position: "relative" }}>
                                            <img
                                                src={
                                                    this.state.studentItems
                                                        .length !== 0
                                                        ? this.state
                                                              .studentItems
                                                              .profile_link !==
                                                          null
                                                            ? this.state
                                                                  .studentItems
                                                                  .profile_link
                                                            : userpic
                                                        : userpic
                                                }
                                                alt={
                                                    this.state.studentItems
                                                        .full_name
                                                }
                                                className="img-fluid shadow-sm mb-3"
                                            />
                                            <button
                                                className="btn btn-light secondary-bg borders btn-block btn-sm"
                                                onClick={this.toggleModal}
                                                style={{
                                                    position: "absolute",
                                                    bottom: "10px",
                                                }}
                                            >
                                                Upload Profile Pic
                                            </button>
                                        </div>
                                        <p className="primary-text font-weight-bold-600 mb-2">
                                            {this.state.studentItems.full_name}{" "}
                                            - @
                                            {this.state.studentItems.username}
                                        </p>
                                        <p className="small">
                                            {this.state.studentItems.email}
                                        </p>
                                        <h6>About</h6>
                                        <p className="small mb-0">
                                            {
                                                this.state.studentItems
                                                    .description
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9 pr-md-4">
                                {this.state.showEditOption ? (
                                    <div className="card shadow-sm">
                                        <form
                                            onSubmit={this.handleSubmit}
                                            autoComplete="off"
                                        >
                                            <div className="card-body">
                                                <h6 className="primary-text mb-3">
                                                    Personal Details
                                                </h6>
                                                <div className="row gutters">
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="first_name">
                                                                First Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="first_name"
                                                                id="first_name"
                                                                className="form-control border-secondary"
                                                                value={
                                                                    this.state
                                                                        .studentItems
                                                                        .first_name
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="last_name">
                                                                Last Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="last_name"
                                                                id="last_name"
                                                                className="form-control border-secondary"
                                                                value={
                                                                    this.state
                                                                        .studentItems
                                                                        .last_name
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="phone_num">
                                                                Phone
                                                            </label>
                                                            <div className="d-flex border-secondary rounded-lg">
                                                                <div
                                                                    style={{
                                                                        width:
                                                                            "35%",
                                                                    }}
                                                                >
                                                                    <Select
                                                                        className="basic-single border-right"
                                                                        defaultValue={{
                                                                            label: this
                                                                                .state
                                                                                .studentItems
                                                                                .country_code,
                                                                            value: this
                                                                                .state
                                                                                .studentItems
                                                                                .country_code,
                                                                        }}
                                                                        isSearchable={
                                                                            false
                                                                        }
                                                                        name="country_code"
                                                                        options={country.map(
                                                                            (
                                                                                list
                                                                            ) => {
                                                                                return {
                                                                                    value:
                                                                                        list.dialCode,
                                                                                    label: this.renderValue(
                                                                                        list
                                                                                    ),
                                                                                };
                                                                            }
                                                                        )}
                                                                        onChange={
                                                                            this
                                                                                .handleSelect
                                                                        }
                                                                        required
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        type="text"
                                                                        name="phone_num"
                                                                        id="phone"
                                                                        className="form-control form-control-lg"
                                                                        onChange={
                                                                            this
                                                                                .handleInput
                                                                        }
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .studentItems
                                                                                .phone_num
                                                                        }
                                                                        placeholder="Enter phone number"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="date_of_birth">
                                                                Date of Birth
                                                            </label>
                                                            <input
                                                                type="date"
                                                                name="date_of_birth"
                                                                id="date_of_birth"
                                                                className="form-control border-secondary"
                                                                value={dateFormat(
                                                                    this.state
                                                                        .studentItems
                                                                        .date_of_birth,
                                                                    "yyyy-mm-dd"
                                                                )}
                                                                onChange={
                                                                    this
                                                                        .handleDate
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <div className="dropdown-divider"></div>

                                                <h6 className="primary-text my-3">
                                                    Address
                                                </h6>
                                                <div className="row gutters">
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="city">
                                                                City
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="city"
                                                                id="city"
                                                                className="form-control border-secondary"
                                                                value={
                                                                    this.state
                                                                        .studentItems
                                                                        .city
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="district">
                                                                District
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="district"
                                                                id="district"
                                                                className="form-control border-secondary"
                                                                value={
                                                                    this.state
                                                                        .studentItems
                                                                        .district
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="state">
                                                                State
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="state"
                                                                id="state"
                                                                className="form-control border-secondary"
                                                                value={
                                                                    this.state
                                                                        .studentItems
                                                                        .state
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="country">
                                                                Country
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="country"
                                                                id="country"
                                                                className="form-control border-secondary"
                                                                value={
                                                                    this.state
                                                                        .studentItems
                                                                        .country
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div> */}

                                                <div className="dropdown-divider"></div>

                                                <h6 className="primary-text my-3">
                                                    About Me
                                                </h6>
                                                <div className="form-group">
                                                    <label htmlFor="description">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        name="description"
                                                        id="description"
                                                        rows="4"
                                                        className="form-control border-secondary"
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    >
                                                        {
                                                            this.state
                                                                .studentItems
                                                                .description
                                                        }
                                                    </textarea>
                                                </div>
                                                {this.state.showEditOption ? (
                                                    <button className="btn btn-primary btn-block btn-sm">
                                                        {this.state
                                                            .showLoader ? (
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
                                                        Save and Close
                                                    </button>
                                                ) : null}
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h6 className="primary-text mb-3">
                                                Personal Details
                                            </h6>
                                            <div className="row gutters">
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <p className="small font-weight-bold-600 mb-2">
                                                            First Name
                                                        </p>
                                                        {
                                                            this.state
                                                                .studentItems
                                                                .first_name
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <p className="small font-weight-bold-600 mb-2">
                                                            Last Name
                                                        </p>
                                                        {
                                                            this.state
                                                                .studentItems
                                                                .last_name
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <p className="small font-weight-bold-600 mb-2">
                                                            Phone
                                                        </p>
                                                        {`${this.state.studentItems.country_code}-${this.state.studentItems.phone_num}`}
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <p className="small font-weight-bold-600 mb-2">
                                                            Date of Birth
                                                        </p>
                                                        {dateFormat(
                                                            this.state
                                                                .studentItems
                                                                .date_of_birth,
                                                            "dd-mm-yyyy"
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="dropdown-divider"></div>

                                            <h6 className="primary-text my-3">
                                                Address
                                            </h6>
                                            <div className="row gutters">
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <p className="small font-weight-bold-600 mb-2">
                                                            City
                                                        </p>
                                                        {
                                                            this.state
                                                                .studentItems
                                                                .city
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <p className="small font-weight-bold-600 mb-2">
                                                            District
                                                        </p>
                                                        {
                                                            this.state
                                                                .studentItems
                                                                .district
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <p className="small font-weight-bold-600 mb-2">
                                                            State
                                                        </p>
                                                        {
                                                            this.state
                                                                .studentItems
                                                                .state
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <p className="small font-weight-bold-600 mb-2">
                                                            Country
                                                        </p>
                                                        {
                                                            this.state
                                                                .studentItems
                                                                .country
                                                        }
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
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

export default Profile;
