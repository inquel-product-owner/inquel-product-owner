import React, { Component } from "react";
import Wrapper from "./wrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Spinner, Modal, Alert } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../common/loader";
import userpic from "../../assets/user-v1.png";
import AlertBox from "../common/alert";
import dateFormat from "dateformat";
import { country } from "../../shared/countries.js";
import { connect } from "react-redux";
import storeDispatch from "../../redux/dispatch";
import { PROFILE } from "../../redux/action";

const mapStateToProps = (state) => ({
    profileData: state.user.profile,
});

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
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
    }

    handleImageFile = (event) => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        let form_data = new FormData();
        form_data.append("teacher_profile_image_1", event.target.files[0]);

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
                errorMsg: "File size exceeds more then 5MB!",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            if (this.props.profile_link === null) {
                axios
                    .post(`${this.url}/teacher/profile/`, form_data, options)
                    .then((result) => {
                        if (result.data.sts === true) {
                            this.setState({
                                successMsg: result.data.msg,
                                showSuccessAlert: true,
                                showLoader: false,
                            });
                            this.props.formSubmission();
                        } else {
                            this.setState({
                                errorMsg: result.data.msg,
                                showErrorAlert: true,
                                showLoader: false,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({
                            errorMsg: "Something went wrong!",
                            showErrorAlert: true,
                            showLoader: false,
                        });
                    });
            } else {
                axios
                    .patch(`${this.url}/teacher/profile/`, form_data, options)
                    .then((result) => {
                        if (result.data.sts === true) {
                            this.setState({
                                successMsg: result.data.msg,
                                showSuccessAlert: true,
                                showLoader: false,
                            });
                            this.props.formSubmission();
                        } else {
                            this.setState({
                                errorMsg: result.data.msg,
                                showErrorAlert: true,
                                showLoader: false,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({
                            errorMsg: "Something went wrong!",
                            showErrorAlert: true,
                            showLoader: false,
                        });
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

class TeacherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            teacherItems: this.props.profileData,
            showEditOption: false,

            page_loading: false,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showImageLoader: false,
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

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    toggleEdit = () => {
        this.setState({
            showEditOption: !this.state.showEditOption,
        });
    };

    handleInput = (event) => {
        let data = this.state.teacherItems;
        data[event.target.name] = event.target.value;
        this.setState({
            teacherItems: data,
        });
    };

    handleDate = (event) => {
        let data = this.state.teacherItems;
        data.date_of_birth = dateFormat(event.target.value, "yyyy-mm-dd");
        this.setState({
            teacherItems: data,
        });
    };

    handleSelect = (event) => {
        let data = this.state.teacherItems;
        data.country_code = event.value;
        this.setState({
            teacherItems: data,
        });
    };

    loadTeacherData = () => {
        fetch(`${this.url}/teacher/profile/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    storeDispatch(PROFILE, result.data);
                    this.setState({
                        teacherItems: result.data,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    componentDidMount = () => {
        document.title = "My Profile - Teacher | IQLabs";
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: true,
        });

        fetch(`${this.url}/teacher/profile/`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({
                first_name: this.state.teacherItems.first_name,
                last_name: this.state.teacherItems.last_name,
                username: this.state.teacherItems.username,
                phone_num:
                    this.state.teacherItems.country_code +
                    this.state.teacherItems.phone_num,
                date_of_birth: dateFormat(
                    this.state.teacherItems.date_of_birth,
                    "yyyy-mm-dd"
                ),
                description: this.state.teacherItems.description,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
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
                                this.loadTeacherData();
                            }, 1000);
                        }
                    );
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
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    showLoader: false,
                });
            });
    };

    formSubmission = () => {
        setTimeout(() => {
            this.loadTeacherData();
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
            <Wrapper
                header="My Profile"
                activeLink="dashboard"
                history={this.props.history}
            >
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

                {/* Image modal */}
                {this.state.showModal ? (
                    <ImageUploadModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        profile_link={this.state.teacherItems.profile_link}
                        formSubmission={this.formSubmission}
                    />
                ) : (
                    ""
                )}

                <div className="row align-items-center mb-3">
                    <div className="col-8">
                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/teacher">
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
                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <img
                                        src={
                                            this.state.teacherItems.length !== 0
                                                ? this.state.teacherItems
                                                      .profile_link !== null
                                                    ? this.state.teacherItems
                                                          .profile_link
                                                    : userpic
                                                : userpic
                                        }
                                        alt={this.state.teacherItems.full_name}
                                        className="img-fluid rounded-lg shadow-sm mb-3"
                                    />
                                    <button
                                        className="btn btn-light secondary-bg borders btn-block btn-sm shadow-none"
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
                                    {this.state.teacherItems.full_name} - @
                                    {this.state.teacherItems.username}
                                </p>
                                <p className="small mb-0">
                                    {this.state.teacherItems.email}
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
                                            <div className="col-lg-4 col-sm-6 col-12">
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
                                                                .teacherItems
                                                                .first_name
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
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
                                                                .teacherItems
                                                                .last_name
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="username">
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        id="username"
                                                        className="form-control border-secondary"
                                                        value={
                                                            this.state
                                                                .teacherItems
                                                                .username
                                                        }
                                                        onChange={
                                                            this.handleInput
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
                                                                width: "35%",
                                                            }}
                                                        >
                                                            <Select
                                                                className="basic-single border-right"
                                                                defaultValue={{
                                                                    label: this
                                                                        .state
                                                                        .teacherItems
                                                                        .country_code
                                                                        ? this
                                                                              .state
                                                                              .teacherItems
                                                                              .country_code
                                                                        : "Country code",
                                                                    value: this
                                                                        .state
                                                                        .teacherItems
                                                                        .country_code
                                                                        ? this
                                                                              .state
                                                                              .teacherItems
                                                                              .country_code
                                                                        : "Country code",
                                                                }}
                                                                isSearchable={
                                                                    false
                                                                }
                                                                name="country_code"
                                                                options={country.map(
                                                                    (list) => {
                                                                        return {
                                                                            value: list.dialCode,
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
                                                                    this.state
                                                                        .teacherItems
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
                                                                .teacherItems
                                                                .date_of_birth,
                                                            "yyyy-mm-dd"
                                                        )}
                                                        onChange={
                                                            this.handleDate
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
                                                                        .teacherItems
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
                                                                        .teacherItems
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
                                                                        .teacherItems
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
                                                                        .teacherItems
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
                                                onChange={this.handleInput}
                                            >
                                                {
                                                    this.state.teacherItems
                                                        .description
                                                }
                                            </textarea>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <button
                                                    className="btn btn-secondary btn-sm btn-block"
                                                    onClick={this.toggleEdit}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-primary btn-block btn-sm">
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
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            // Profile details GET
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h6 className="primary-text mb-3">
                                        Personal Details
                                    </h6>
                                    <div className="row gutters">
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="small font-weight-bold-600 mb-2">
                                                    First Name
                                                </p>
                                                {
                                                    this.state.teacherItems
                                                        .first_name
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="small font-weight-bold-600 mb-2">
                                                    Last Name
                                                </p>
                                                {
                                                    this.state.teacherItems
                                                        .last_name
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="small font-weight-bold-600 mb-2">
                                                    Username
                                                </p>
                                                {
                                                    this.state.teacherItems
                                                        .username
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="small font-weight-bold-600 mb-2">
                                                    Email
                                                </p>
                                                {this.state.teacherItems.email}
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="small font-weight-bold-600 mb-2">
                                                    Phone
                                                </p>
                                                {
                                                    this.state.teacherItems
                                                        .country_code
                                                }
                                                {
                                                    this.state.teacherItems
                                                        .phone_num
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="small font-weight-bold-600 mb-2">
                                                    Date of Birth
                                                </p>
                                                {dateFormat(
                                                    this.state.teacherItems
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
                                                                .teacherItems
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
                                                                .teacherItems
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
                                                                .teacherItems
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
                                                                .teacherItems
                                                                .country
                                                        }
                                                    </div>
                                                </div>
                                            </div> */}

                                    <div className="form-group">
                                        <p className="small font-weight-bold-600 mb-2">
                                            About
                                        </p>
                                        {this.state.teacherItems.description}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default connect(mapStateToProps)(TeacherProfile);
