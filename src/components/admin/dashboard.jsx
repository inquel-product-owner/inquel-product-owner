import React, { Component } from "react";
import Wrapper from "./wrapper";
import { Tabs, Tab, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import courseimg from "../../assets/code.jpg";
import { baseUrl, adminPathUrl, inquelAdminUrl } from "../../shared/baseUrl";
import Loading from "../common/loader";
import AlertBox from "../common/alert";
import SubscriptionTable from "../common/table/subscription";
import { paginationCount } from "../../shared/constant";
import Paginations from "../common/pagination";
import SubscriptionModal, {
    SubscriptionUpdateModal,
} from "./subscriptionModal";
import CourseTable from "../common/table/course";

const Statistics = (props) => {
    return (
        <>
            <p className="small font-weight-bold">Quick Stats</p>
            <div className="row mb-4">
                <div className="col-md-3 col-6 mb-3 mb-md-0">
                    <div className="card shadow-sm p-2 h-100">
                        <div className="card-body">
                            <p className="small font-weight-bold mb-2">
                                Total Courses
                            </p>
                            <h3 className="font-weight-bold">28,345</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3 mb-md-0">
                    <div className="card shadow-sm p-2 h-100">
                        <div className="card-body">
                            <p className="small font-weight-bold mb-2">
                                Pending Approval
                            </p>
                            <h3
                                className="font-weight-bold"
                                style={{
                                    color: "tomato",
                                }}
                            >
                                120
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3 mb-md-0">
                    <div className="card shadow-sm p-2 h-100">
                        <div className="card-body">
                            <p className="small font-weight-bold mb-2">
                                New Courses this month
                            </p>
                            <h3 className="font-weight-bold">
                                89{" "}
                                <span className="text-success">
                                    <i className="fas fa-angle-double-up ml-2 fa-sm"></i>
                                </span>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3 mb-md-0">
                    <div className="card shadow-sm p-2 h-100">
                        <div className="card-body">
                            <p className="small font-weight-bold mb-2">
                                Online learning
                            </p>
                            <h3 className="font-weight-bold">
                                46%{" "}
                                <span className="text-danger">
                                    <i className="fas fa-angle-double-down ml-2 fa-sm"></i>
                                </span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptionModalShow: false,
        };
    }

    toggleSubscriptionModal = () => {
        this.setState({
            subscriptionModalShow: !this.state.subscriptionModalShow,
        });
    };

    render() {
        return (
            <>
                <SubscriptionUpdateModal
                    show={this.state.subscriptionModalShow}
                    onHide={this.toggleSubscriptionModal}
                />
                <div className="card shadow-sm">
                    <div className="card-header text-right p-1">
                        <button
                            className="btn btn-link btn-sm shadow-none"
                            onClick={this.props.toggleClose}
                        >
                            <i className="fas fa-times fa-sm ml-1"></i> Close
                        </button>
                    </div>
                    <div className="card-body">
                        <h6 className="primary-text font-weight-bold mb-3">
                            Course Name
                        </h6>
                        <p className="primary-text">Configuration</p>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-5">
                                <p className="primary-text small mb-0 font-weight-bold">
                                    Category ID
                                </p>
                            </div>
                            <div className="col-md-7">
                                <form action="">
                                    <select
                                        name="category"
                                        id="category"
                                        className="form-control form-control-sm form-shadow"
                                    >
                                        <option value="school">School</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-5">
                                <p className="primary-text small mb-0 font-weight-bold">
                                    Sub Category
                                </p>
                            </div>
                            <div className="col-md-7">
                                <form action="">
                                    <select
                                        name="subcategory"
                                        id="subcategory"
                                        className="form-control form-control-sm form-shadow"
                                    >
                                        <option value="sch">SCH</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-5">
                                <p className="primary-text small mb-0 font-weight-bold">
                                    Discipline
                                </p>
                            </div>
                            <div className="col-md-7">
                                <form action="">
                                    <select
                                        name="discipline"
                                        id="discipline"
                                        className="form-control form-control-sm form-shadow"
                                    >
                                        <option value="none">None</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-5">
                                <p className="primary-text small mb-0 font-weight-bold">
                                    Levels
                                </p>
                            </div>
                            <div className="col-md-7">
                                <form action="">
                                    <select
                                        name="level"
                                        id="level"
                                        className="form-control form-control-sm form-shadow"
                                    >
                                        <option value="10">10th</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-5">
                                <p className="primary-text small mb-0 font-weight-bold">
                                    Subjects
                                </p>
                            </div>
                            <div className="col-md-7">
                                <form action="">
                                    <select
                                        name="subject"
                                        id="subject"
                                        className="form-control form-control-sm form-shadow"
                                    >
                                        <option value="maths">Maths</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-5">
                                <p className="primary-text small mb-0 font-weight-bold">
                                    Board / University
                                </p>
                            </div>
                            <div className="col-md-7">
                                <form action="">
                                    <select
                                        name="university"
                                        id="university"
                                        className="form-control form-control-sm form-shadow"
                                    >
                                        <option value="cbse">CBSE</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="row align-items-center mb-4">
                            <div className="col-md-5">
                                <p className="primary-text small mb-0 font-weight-bold">
                                    Type
                                </p>
                            </div>
                            <div className="col-md-7">
                                <form action="">
                                    <select
                                        name="type"
                                        id="type"
                                        className="form-control form-control-sm form-shadow"
                                    >
                                        <option value="premium">Premium</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <Link
                            to="/admin/course/001"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <button className="btn btn-primary btn-block btn-sm">
                                View course
                            </button>
                        </Link>
                        <div className="dropdown-divider my-3"></div>
                        <p className="primary-text small font-weight-bold">
                            Others
                        </p>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-5">
                                <p className="primary-text small mb-0 font-weight-bold">
                                    Assigned HOD
                                </p>
                            </div>
                            <div className="col-md-7">
                                <form action="">
                                    <select
                                        name="assignedhod"
                                        id="assignedhod"
                                        className="form-control form-control-sm form-shadow"
                                    >
                                        <option value="ram">Ram</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="row align-items-center mb-4">
                            <div className="col-md-5">
                                <p className="primary-text small mb-0 font-weight-bold">
                                    Content Status
                                </p>
                            </div>
                            <div className="col-md-7">
                                <form action="">
                                    <select
                                        name="status"
                                        id="status"
                                        className="form-control form-control-sm form-shadow"
                                    >
                                        <option value="published">
                                            Published
                                        </option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary btn-block btn-sm"
                            onClick={this.toggleSubscriptionModal}
                        >
                            Subscription plans
                        </button>
                        <div className="dropdown-divider my-3"></div>

                        <button className="btn btn-primary btn-block btn-sm">
                            Publish course
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

const CourseCard = (props) => {
    return (
        <>
            <div className="row mt-3">
                {props.data.results && props.data.results.length !== 0
                    ? props.data.results.map((list, index) => {
                          return (
                              <div
                                  className="col-md-3 col-sm-6 mb-3"
                                  key={index}
                              >
                                  <div
                                      className="card"
                                      onClick={
                                          !props.course
                                              ? props.toggleSubscriptionDetails
                                              : () => {}
                                      }
                                      style={{
                                          cursor: `${
                                              !props.course ? "pointer" : "auto"
                                          }`,
                                      }}
                                  >
                                      <img
                                          src={courseimg}
                                          className="card-img-top"
                                          alt={
                                              list.course_name
                                                  ? list.course_name
                                                  : list.title
                                          }
                                      />
                                      <div className="card-body primary-bg text-white p-2">
                                          {list.course_name
                                              ? list.course_name
                                              : list.title}
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : "No data to display..."}
            </div>
            {props.data.count > paginationCount ? (
                <div className="d-flex justify-content-center w-100 mt-3">
                    <Paginations
                        activePage={props.activePage}
                        totalItemsCount={props.data.count}
                        onChange={props.handleOnChange.bind(this)}
                    />
                </div>
            ) : null}
        </>
    );
};

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubscriptionModal: false,
            showSubscriptionDetails: false,
            isTableView: true,
            activeTab: "published",

            hod_courses: {},
            published: {},
            unpublished: {},

            activePublishedPage: 1,
            activeUnpublishPage: 1,
            activeHODCoursePage: 1,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.url = baseUrl + adminPathUrl;
        this.inquelURL = baseUrl + inquelAdminUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    toggleSubscriptionModal = () => {
        this.setState({
            showSubscriptionModal: !this.state.showSubscriptionModal,
        });
    };

    toggleSubscriptionDetails = () => {
        this.setState({
            showSubscriptionDetails: true,
        });
    };

    loadUnpublishedSubscription = (page) => {
        let URL =
            page && page > 1
                ? `${this.inquelURL}/subscription/?page=${page}`
                : `${this.inquelURL}/subscription/`;
        fetch(URL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        unpublished: result.data,
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

    loadHODCourses = (page) => {
        let URL =
            page && page > 1
                ? `${this.inquelURL}/hod/courses/?page=${page}`
                : `${this.inquelURL}/hod/courses/`;
        fetch(URL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        hod_courses: result.data,
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
        document.title = "Dashboard - Admin | IQLabs";

        this.loadUnpublishedSubscription();
        this.loadHODCourses();
    };

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showSubscriptionModal: false,
            });
        }, 1000);
    };

    handlePublishedPageChange(pageNumber) {
        this.setState(
            { activePublishedPage: pageNumber, page_loading: true },
            () => {
                this.loadPublishedData(this.state.activePublishedPage);
            }
        );
    }

    handleUnpublishPageChange(pageNumber) {
        this.setState(
            { activeUnpublishPage: pageNumber, page_loading: true },
            () => {
                this.loadUnpublishedData(this.state.activeUnpublishPage);
            }
        );
    }

    handleHODCoursePageChange(pageNumber) {
        this.setState(
            { activeHODCoursePage: pageNumber, page_loading: true },
            () => {
                this.loadHODCourses(this.state.activeHODCoursePage);
            }
        );
    }

    render() {
        return (
            <Wrapper
                history={this.props.history}
                header="Admin"
                activeLink="dashboard"
                hideBackButton={true}
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

                {/* Subscription create modal */}
                <SubscriptionModal
                    show={this.state.showSubscriptionModal}
                    onHide={this.toggleSubscriptionModal}
                    formSubmission={this.formSubmission}
                />

                <div className="row">
                    <div
                        className={`${
                            this.state.showSubscriptionDetails
                                ? "col-md-9"
                                : "col-12"
                        }`}
                    >
                        {/* Stats */}
                        <Statistics />

                        {/* Filter area */}
                        <div className="row align-items-center justify-content-center justify-content-md-end mb-3">
                            <div className="col-md-6">
                                <div
                                    className="btn-group btn-group-toggle"
                                    data-toggle="buttons"
                                >
                                    <OverlayTrigger
                                        key="top1"
                                        placement="top"
                                        overlay={
                                            <Tooltip
                                                id="tooltip"
                                                className="text-left"
                                            >
                                                Table View
                                            </Tooltip>
                                        }
                                    >
                                        <label
                                            className={`btn btn-light ${
                                                this.state.isTableView
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="options"
                                                id="tableview"
                                                onChange={() => {
                                                    this.setState({
                                                        isTableView: true,
                                                    });
                                                }}
                                            />{" "}
                                            <i className="fas fa-th-list"></i>
                                        </label>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        key="top2"
                                        placement="top"
                                        overlay={
                                            <Tooltip
                                                id="tooltip"
                                                className="text-left"
                                            >
                                                Card View
                                            </Tooltip>
                                        }
                                    >
                                        <label
                                            className={`btn btn-light ${
                                                this.state.isTableView
                                                    ? ""
                                                    : "active"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="options"
                                                id="cardview"
                                                onChange={() => {
                                                    this.setState({
                                                        isTableView: false,
                                                    });
                                                }}
                                            />{" "}
                                            <i className="fas fa-th-large"></i>
                                        </label>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className="col-md-6 text-md-right text-center">
                                {this.state.activeTab === "hod_course" ? (
                                    <button
                                        className="btn btn-primary btn-sm shadow-none mr-1"
                                        onClick={this.toggleSubscriptionModal}
                                    >
                                        Create Subscription
                                    </button>
                                ) : (
                                    ""
                                )}
                                {this.state.activeTab === "published" ? (
                                    <button
                                        className="btn btn-primary btn-sm shadow-none"
                                        disabled={
                                            this.state.published.results &&
                                            this.state.published.results
                                                .length === 0
                                                ? true
                                                : false
                                        }
                                    >
                                        Unpublish
                                    </button>
                                ) : this.state.activeTab === "hod_course" ? (
                                    <button className="btn btn-primary btn-sm shadow-none">
                                        Unpublish
                                    </button>
                                ) : (
                                    <button className="btn btn-primary btn-sm shadow-none mr-1">
                                        Publish
                                    </button>
                                )}
                                {this.state.activeTab === "unpublished" ? (
                                    <button className="btn btn-primary btn-sm shadow-none">
                                        Delete
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        {/* ---------- Table view ---------- */}
                        {this.state.isTableView ? (
                            <Tabs
                                activeKey={this.state.activeTab}
                                onSelect={(key) =>
                                    this.setState({
                                        activeTab: key,
                                    })
                                }
                            >
                                <Tab eventKey="published" title="Published">
                                    <div className="card shadow-sm">
                                        <SubscriptionTable
                                            data={
                                                this.state.published.results ||
                                                []
                                            }
                                            toggleDetails={
                                                this.toggleSubscriptionDetails
                                            }
                                        />
                                        <div className="card-body p-3">
                                            {this.state.published.count >
                                            paginationCount ? (
                                                <Paginations
                                                    activePage={
                                                        this.state
                                                            .activePublishedPage
                                                    }
                                                    totalItemsCount={
                                                        this.state.published
                                                            .count
                                                    }
                                                    onChange={this.handlePublishedPageChange.bind(
                                                        this
                                                    )}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </Tab>
                                <Tab
                                    eventKey="unpublished"
                                    title="Ready for publishing"
                                >
                                    <div className="card shadow-sm">
                                        <SubscriptionTable
                                            data={
                                                this.state.unpublished
                                                    .results || []
                                            }
                                            toggleDetails={
                                                this.toggleSubscriptionDetails
                                            }
                                        />
                                        <div className="card-body p-3">
                                            {this.state.unpublished.count >
                                            paginationCount ? (
                                                <Paginations
                                                    activePage={
                                                        this.state
                                                            .activeUnpublishPage
                                                    }
                                                    totalItemsCount={
                                                        this.state.unpublished
                                                            .count
                                                    }
                                                    onChange={this.handleUnpublishPageChange.bind(
                                                        this
                                                    )}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="hod_course" title="HOD Course">
                                    <div className="card shadow-sm">
                                        <CourseTable
                                            data={
                                                this.state.hod_courses
                                                    .results || []
                                            }
                                        />
                                        <div className="card-body p-3">
                                            {this.state.hod_courses.count >
                                            paginationCount ? (
                                                <Paginations
                                                    activePage={
                                                        this.state
                                                            .activeHODCoursePage
                                                    }
                                                    totalItemsCount={
                                                        this.state.hod_courses
                                                            .count
                                                    }
                                                    onChange={this.handleHODCoursePageChange.bind(
                                                        this
                                                    )}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        ) : (
                            // ---------- Card view ----------
                            <Tabs
                                activeKey={this.state.activeTab}
                                onSelect={(key) =>
                                    this.setState({
                                        activeTab: key,
                                    })
                                }
                            >
                                <Tab eventKey="published" title="Published">
                                    <CourseCard
                                        data={this.state.published}
                                        toggleSubscriptionDetails={
                                            this.toggleSubscriptionDetails
                                        }
                                        activePage={
                                            this.state.activePublishedPage
                                        }
                                        handleOnChange={
                                            this.handlePublishedPageChange
                                        }
                                    />
                                </Tab>
                                <Tab
                                    eventKey="unpublished"
                                    title="Ready for publishing"
                                >
                                    <CourseCard
                                        data={this.state.unpublished}
                                        toggleSubscriptionDetails={
                                            this.toggleSubscriptionDetails
                                        }
                                        activePage={
                                            this.state.activeUnpublishPage
                                        }
                                        handleOnChange={
                                            this.handleUnpublishPageChange
                                        }
                                    />
                                </Tab>
                                <Tab eventKey="hod_course" title="HOD Course">
                                    <CourseCard
                                        data={this.state.hod_courses}
                                        toggleSubscriptionDetails={
                                            this.toggleSubscriptionDetails
                                        }
                                        activePage={
                                            this.state.activeHODCoursePage
                                        }
                                        handleOnChange={
                                            this.handleHODCoursePageChange
                                        }
                                        course={true}
                                    />
                                </Tab>
                            </Tabs>
                        )}
                    </div>

                    {this.state.showSubscriptionDetails ? (
                        <div className="col-md-3">
                            <CourseDetails
                                toggleClose={() => {
                                    this.setState({
                                        showSubscriptionDetails: false,
                                    });
                                }}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default AdminDashboard;
