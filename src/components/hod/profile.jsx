import React, { Component } from "react";
import Wrapper from "./wrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spinner, Modal, Alert } from "react-bootstrap";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../common/loader";
import userpic from "../../assets/user-v1.png";
import AlertBox from "../common/alert";
import dateFormat from "dateformat";
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
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
    }

    handleImageFile = (event) => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        let form_data = new FormData();
        if (this.props.imageUploadType === "profile") {
            form_data.append("profile_hod_image_1", event.target.files[0]);
        } else if (this.props.imageUploadType === "watermark") {
            form_data.append("watermark_image_1", event.target.files[0]);
        }

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
            // If image upload type is profile then perform profile pic Submission
            if (this.props.imageUploadType === "profile") {
                if (this.props.profile_link === null) {
                    axios
                        .post(`${this.url}/hod/profile/`, form_data, options)
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
                        .patch(`${this.url}/hod/profile/`, form_data, options)
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
                // If image upload type is watermark then perform watermark image Submission
            } else if (this.props.imageUploadType === "watermark") {
                if (
                    this.props.watermark_image === null ||
                    this.props.watermark_image === ""
                ) {
                    axios
                        .post(
                            `${this.url}/hod/profile/watermark/`,
                            form_data,
                            options
                        )
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
                        .patch(
                            `${this.url}/hod/profile/watermark/`,
                            form_data,
                            options
                        )
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

class HODProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            hodItems: this.props.profileData,
            showEditOption: false,
            imageUploadType: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            page_loading: false,
        };
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    toggleModal = (type) => {
        this.setState({
            showModal: !this.state.showModal,
            imageUploadType: type,
        });
    };

    toggleEdit = () => {
        this.setState({
            showEditOption: !this.state.showEditOption,
        });
    };

    handleInput = (event) => {
        let data = this.state.hodItems;
        data[event.target.name] = event.target.value;
        this.setState({
            hodItems: data,
        });
    };

    handleDate = (event) => {
        let data = this.state.hodItems;
        data.date_of_birth = dateFormat(event.target.value, "yyyy-mm-dd");
        this.setState({
            hodItems: data,
        });
    };

    loadHodData = () => {
        fetch(`${this.url}/hod/profile/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    storeDispatch(PROFILE, result.data);
                    this.setState({
                        hodItems: result.data,
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
        document.title = "My Profile - HOD | IQLabs";
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: true,
        });

        fetch(`${this.url}/hod/profile/`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({
                first_name: this.state.hodItems.first_name,
                last_name: this.state.hodItems.last_name,
                username: this.state.hodItems.username,
                phone_num: this.state.hodItems.phone_num,
                date_of_birth: dateFormat(
                    this.state.hodItems.date_of_birth,
                    "yyyy-mm-dd"
                ),
                description: this.state.hodItems.description,
                department_name: this.state.hodItems.department_name,
                department_details: this.state.hodItems.department_details,
                office_address: this.state.hodItems.office_address,
                additional_details_1: this.state.hodItems.additional_details_1,
                additional_details_2: this.state.hodItems.additional_details_2,
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
                                this.loadHodData();
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
            this.loadHodData();
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

    handleWatermarkDelete = () => {
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        });

        fetch(`${this.url}/hod/profile/watermark/`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify({
                watermark_url: this.state.hodItems.watermark_image,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.msg,
                            showSuccessAlert: true,
                        },
                        () => {
                            setTimeout(() => {
                                this.loadHodData();
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
                        profile_link={this.state.hodItems.profile_link}
                        watermark_image={this.state.hodItems.watermark_image}
                        formSubmission={this.formSubmission}
                        imageUploadType={this.state.imageUploadType}
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
                                    <Link to="/hod">
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
                        <div className="row">
                            <div className="col-lg-12 col-md-6 col-12 mb-3">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                        >
                                            <img
                                                src={
                                                    this.state.hodItems
                                                        .length !== 0
                                                        ? this.state.hodItems
                                                              .profile_link !==
                                                          null
                                                            ? this.state
                                                                  .hodItems
                                                                  .profile_link
                                                            : userpic
                                                        : userpic
                                                }
                                                alt={
                                                    this.state.hodItems
                                                        .full_name
                                                }
                                                className="img-fluid rounded-lg shadow-sm mb-3"
                                            />
                                            <button
                                                className="btn btn-light secondary-bg borders btn-block btn-sm shadow-none"
                                                onClick={() =>
                                                    this.toggleModal("profile")
                                                }
                                                style={{
                                                    position: "absolute",
                                                    bottom: "10px",
                                                }}
                                            >
                                                Upload Profile Pic
                                            </button>
                                        </div>
                                        <p className="primary-text font-weight-bold-600 mb-2">
                                            {this.state.hodItems.full_name} - @
                                            {this.state.hodItems.username}
                                        </p>
                                        <p className="small mb-0">
                                            {this.state.hodItems.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-6 col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h6 className="primary-text mb-3">
                                            Permissions
                                        </h6>
                                        {this.state.hodItems.permissions !==
                                        undefined ? (
                                            <>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Progressive Score
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .prog_sco_card ===
                                                        true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Type 1
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .type_1_q ===
                                                        true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Type 2
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .type_2_q ===
                                                        true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Quiz
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .quiz === true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Match
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .match === true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Notes
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .copy_download ===
                                                        true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Summary
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .summary ===
                                                        true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Direct Questions
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .direct_q ===
                                                        true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Configure
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .config_course ===
                                                        true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Simulation Exam
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .sim_exam ===
                                                        true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Locking of Tests
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .lock_test ===
                                                        true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-10">
                                                        <p className="small mb-0 font-weight-bold-600">
                                                            Mobile App
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        {this.state.hodItems
                                                            .permissions
                                                            .android_app ===
                                                        true ? (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        ) : (
                                                            <i className="fas fa-times-circle text-danger"></i>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 pr-md-4">
                        {this.state.showEditOption ? (
                            <form
                                onSubmit={this.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="card shadow-sm">
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
                                                            this.state.hodItems
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
                                                            this.state.hodItems
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
                                                            this.state.hodItems
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
                                                        Office phone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="phone_num"
                                                        id="phone"
                                                        className="form-control border-secondary"
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                        value={
                                                            this.state.hodItems
                                                                .phone_num
                                                        }
                                                        placeholder="Enter phone number with country code"
                                                        required
                                                    />
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
                                                            this.state.hodItems
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

                                        {/* ----- About description POST ----- */}

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
                                                    this.state.hodItems
                                                        .description
                                                }
                                            </textarea>
                                        </div>

                                        {/* ----- Institution details POST ----- */}

                                        <div className="dropdown-divider my-4"></div>
                                        <h6 className="primary-text mb-3">
                                            Institution Details
                                        </h6>
                                        <div className="row gutters">
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="department_name">
                                                        Department Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="department_name"
                                                        id="department_name"
                                                        className="form-control border-secondary"
                                                        value={
                                                            this.state.hodItems
                                                                .department_name
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="department_details">
                                                        Department details
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="department_details"
                                                        id="department_details"
                                                        className="form-control border-secondary"
                                                        value={
                                                            this.state.hodItems
                                                                .department_details
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="office_address">
                                                        Office address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="office_address"
                                                        id="office_address"
                                                        className="form-control border-secondary"
                                                        value={
                                                            this.state.hodItems
                                                                .office_address
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="additional_details_1">
                                                        Additional details 1
                                                    </label>
                                                    <textarea
                                                        name="additional_details_1"
                                                        id="additional_details_1"
                                                        rows="4"
                                                        className="form-control border-secondary"
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    >
                                                        {
                                                            this.state.hodItems
                                                                .additional_details_1
                                                        }
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="additional_details_2">
                                                        Additional details 2
                                                    </label>
                                                    <textarea
                                                        name="additional_details_2"
                                                        id="additional_details_2"
                                                        rows="4"
                                                        className="form-control border-secondary"
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    >
                                                        {
                                                            this.state.hodItems
                                                                .additional_details_2
                                                        }
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <button
                                                    className="btn btn-secondary btn-sm btn-block shadow-none"
                                                    onClick={this.toggleEdit}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-primary btn-block btn-sm shadow-none">
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
                                </div>
                            </form>
                        ) : (
                            // ---------- Profile details GET ----------
                            <>
                                {/* ----- Personal details card ----- */}

                                <div className="card shadow-sm mb-3">
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
                                                        this.state.hodItems
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
                                                        this.state.hodItems
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
                                                        this.state.hodItems
                                                            .username
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <p className="small font-weight-bold-600 mb-2">
                                                        Email
                                                    </p>
                                                    {this.state.hodItems.email}
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <p className="small font-weight-bold-600 mb-2">
                                                        Phone
                                                    </p>
                                                    {
                                                        this.state.hodItems
                                                            .country_code
                                                    }
                                                    {
                                                        this.state.hodItems
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
                                                        this.state.hodItems
                                                            .date_of_birth,
                                                        "dd-mm-yyyy"
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <p className="small font-weight-bold-600 mb-2">
                                                About
                                            </p>
                                            {this.state.hodItems.description}
                                        </div>
                                    </div>
                                </div>

                                {/* ----- Institution details card ----- */}

                                <div className="card shadow-sm mb-3">
                                    <div className="card-body">
                                        <h6 className="primary-text mb-3">
                                            Institution Details
                                        </h6>
                                        <div className="row mb-3">
                                            <div className="col-3 font-weight-bold-600 small">
                                                Department Name
                                            </div>
                                            <div className="col-1">:</div>
                                            <div className="col-8">
                                                {
                                                    this.state.hodItems
                                                        .department_name
                                                }
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-3 font-weight-bold-600 small">
                                                Department details
                                            </div>
                                            <div className="col-1">:</div>
                                            <div className="col-8">
                                                {
                                                    this.state.hodItems
                                                        .department_details
                                                }
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-3 font-weight-bold-600 small">
                                                Office address
                                            </div>
                                            <div className="col-1">:</div>
                                            <div className="col-8">
                                                {
                                                    this.state.hodItems
                                                        .office_address
                                                }
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-3 font-weight-bold-600 small">
                                                Additional details 1
                                            </div>
                                            <div className="col-1">:</div>
                                            <div className="col-8">
                                                {
                                                    this.state.hodItems
                                                        .additional_details_1
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3 font-weight-bold-600 small">
                                                Additional details 2
                                            </div>
                                            <div className="col-1">:</div>
                                            <div className="col-8">
                                                {
                                                    this.state.hodItems
                                                        .additional_details_2
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ----- Watermark image card ----- */}

                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-6">
                                                <h6 className="primary-text">
                                                    Watermark Image
                                                </h6>
                                            </div>
                                            <div className="col-6 text-right">
                                                <button
                                                    className="btn btn-primary btn-sm shadow-none"
                                                    onClick={() =>
                                                        this.toggleModal(
                                                            "watermark"
                                                        )
                                                    }
                                                >
                                                    Upload Watermark
                                                </button>
                                            </div>
                                        </div>
                                        {this.state.hodItems.watermark_image !==
                                            null &&
                                        this.state.hodItems.watermark_image !==
                                            "" ? (
                                            <>
                                                <div className="row mb-2">
                                                    <div className="col-md-4 col-sm-8 col-12">
                                                        <img
                                                            src={
                                                                this.state
                                                                    .hodItems
                                                                    .watermark_image
                                                            }
                                                            alt={
                                                                this.state
                                                                    .hodItems
                                                                    .full_name
                                                            }
                                                            className="img-fluid"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn btn-outline-light text-dark btn-sm"
                                                    onClick={
                                                        this
                                                            .handleWatermarkDelete
                                                    }
                                                >
                                                    Delete watermark image
                                                </button>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default connect(mapStateToProps)(HODProfile);
