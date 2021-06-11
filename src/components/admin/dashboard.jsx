import React, { Component } from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Tabs, Tab, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import courseimg from "../../assets/code.jpg";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import Loading from "../common/loader";
import AlertBox from "../common/alert";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import SubscriptionTable from "../common/table/subscription";
import { paginationCount } from "../../shared/constant";
import Paginations from "../common/pagination";
import SubscriptionModal, {
    SubscriptionUpdateModal,
} from "./subscriptionModal";

class CourseCard extends Component {
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
                            onClick={this.props.toggleCourseCard}
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

class TableView extends Component {
    constructor() {
        super();
        this.state = {
            data: [],

            activeAllPage: 1,
            totalAllCount: 0,
            activePublishedPage: 1,
            totalPublishedCount: 0,
            activeUnpublishPage: 1,
            totalUnpublishCount: 0,
            activeHODCoursePage: 1,
            totalHODCourseCount: 0,
        };
    }

    handleAllPageChange(pageNumber) {
        this.setState({ activeAllPage: pageNumber, page_loading: true }, () => {
            this.loadData();
        });
    }

    handlePublishedPageChange(pageNumber) {
        this.setState(
            { activePublishedPage: pageNumber, page_loading: true },
            () => {
                this.loadData();
            }
        );
    }

    handleUnpublishPageChange(pageNumber) {
        this.setState(
            { activeUnpublishPage: pageNumber, page_loading: true },
            () => {
                this.loadData();
            }
        );
    }

    handleHODCoursePageChange(pageNumber) {
        this.setState(
            { activeHODCoursePage: pageNumber, page_loading: true },
            () => {
                this.loadData();
            }
        );
    }

    render() {
        return (
            <Tabs
                activeKey={this.props.activeTab}
                onSelect={(key) => this.props.toggleTab(key)}
            >
                <Tab eventKey="all" title="All">
                    <div className="card shadow-sm">
                        <SubscriptionTable data={this.state.data} />
                        <div className="card-body p-3">
                            {this.state.totalAllCount > paginationCount ? (
                                <Paginations
                                    activePage={this.state.activeAllPage}
                                    totalItemsCount={this.state.totalAllCount}
                                    onChange={this.handleAllPageChange.bind(
                                        this
                                    )}
                                />
                            ) : null}
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="published" title="Published">
                    <div className="card shadow-sm">
                        <SubscriptionTable data={this.state.data} />
                        <div className="card-body p-3">
                            {this.state.totalPublishedCount >
                            paginationCount ? (
                                <Paginations
                                    activePage={this.state.activePublishedPage}
                                    totalItemsCount={
                                        this.state.totalPublishedCount
                                    }
                                    onChange={this.handlePublishedPageChange.bind(
                                        this
                                    )}
                                />
                            ) : null}
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="unpublished" title="Ready for publishing">
                    <div className="card shadow-sm">
                        <SubscriptionTable data={this.state.data} />
                        <div className="card-body p-3">
                            {this.state.totalUnpublishCount >
                            paginationCount ? (
                                <Paginations
                                    activePage={this.state.activeUnpublishPage}
                                    totalItemsCount={
                                        this.state.totalUnpublishCount
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
                        <SubscriptionTable data={this.state.data} />
                        <div className="card-body p-3">
                            {this.state.totalHODCourseCount >
                            paginationCount ? (
                                <Paginations
                                    activePage={this.state.activeHODCoursePage}
                                    totalItemsCount={
                                        this.state.totalHODCourseCount
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
        );
    }
}

class CardView extends Component {
    constructor() {
        super();
        this.state = {
            activeAllPage: 1,
            totalAllCount: 0,
            activePublishedPage: 1,
            totalPublishedCount: 0,
            activeUnpublishPage: 1,
            totalUnpublishCount: 0,
            activeHODCoursePage: 1,
            totalHODCourseCount: 0,
        };
    }

    handleAllPageChange(pageNumber) {
        this.setState({ activeAllPage: pageNumber, page_loading: true }, () => {
            this.loadHodData();
        });
    }

    handleStudentPageChange(pageNumber) {
        this.setState(
            { activeStudentPage: pageNumber, page_loading: true },
            () => {
                this.loadStudentData();
            }
        );
    }

    render() {
        return (
            <Tabs
                activeKey={this.props.activeTab}
                onSelect={(key) => this.props.toggleTab(key)}
            >
                <Tab eventKey="all" title="All">
                    <div className="row mt-3">
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="published" title="Published">
                    <div className="row mt-3">
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="unpublished" title="Ready for publishing">
                    <div className="row mt-3">
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <i className="fas fa-star ml-1 fa-sm"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="hod_course" title="HOD Course">
                    <div className="row mt-3">
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <span className="small">
                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div
                                className="card"
                                onClick={this.toggleCourseCard}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={courseimg}
                                    className="card-img-top"
                                    alt="Course"
                                />
                                <div className="card-body primary-bg text-white p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="mb-0">Course</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            4.{" "}
                                            <i className="fas fa-star ml-1 fa-sm"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            addCourseModal: false,
            showCourseCard: false,
            isTableView: true,
            activeTab: "all",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: false,
        };
        this.url = baseUrl + adminPathUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    toggleCourseView = () => {
        this.setState({
            isTableView: !this.state.isTableView,
        });
    };

    toggleCourseModal = () => {
        this.setState({
            addCourseModal: !this.state.addCourseModal,
        });
    };

    toggleCourseCard = () => {
        this.setState({
            showCourseCard: !this.state.showCourseCard,
        });
    };

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        document.title = "Dashboard - Admin | IQLabs";
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Admin" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

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
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => window.location.reload()}
                >
                    <SubscriptionModal
                        show={this.state.addCourseModal}
                        onHide={this.toggleCourseModal}
                    />
                </ErrorBoundary>

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onReset={() => window.location.reload()}
                    >
                        <div className="container-fluid">
                            <div className="row">
                                <div
                                    className={`${
                                        this.state.showCourseCard
                                            ? "col-md-9"
                                            : "col-12"
                                    }`}
                                >
                                    {/* Stats */}
                                    <p className="small font-weight-bold">
                                        Quick Stats
                                    </p>
                                    <div className="row mb-4">
                                        <div className="col-md-3 col-6 mb-3 mb-md-0">
                                            <div className="card shadow-sm p-2 h-100">
                                                <div className="card-body">
                                                    <p className="small font-weight-bold mb-2">
                                                        Total Courses
                                                    </p>
                                                    <h3 className="font-weight-bold">
                                                        28,345
                                                    </h3>
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
                                                            this.state
                                                                .isTableView
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
                                                            this.state
                                                                .isTableView
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
                                            <button
                                                className="btn btn-primary btn-sm shadow-none mr-1"
                                                onClick={this.toggleCourseModal}
                                            >
                                                Create Subscription
                                            </button>
                                            <button className="btn btn-primary btn-sm shadow-none mr-1">
                                                Delete
                                            </button>
                                            <button className="btn btn-primary btn-sm shadow-none mr-1">
                                                Enable
                                            </button>
                                            <button className="btn btn-primary btn-sm shadow-none">
                                                Disable
                                            </button>
                                        </div>
                                    </div>

                                    {/* Courses list */}
                                    {this.state.isTableView ? (
                                        <TableView
                                            activeTab={this.state.activeTab}
                                            toggleTab={(key) =>
                                                this.setState({
                                                    activeTab: key,
                                                })
                                            }
                                        />
                                    ) : (
                                        <CardView
                                            activeTab={this.state.activeTab}
                                            toggleTab={(key) =>
                                                this.setState({
                                                    activeTab: key,
                                                })
                                            }
                                        />
                                    )}
                                </div>

                                {this.state.showCourseCard ? (
                                    <div className="col-md-3">
                                        <CourseCard
                                            toggleCourseCard={
                                                this.toggleCourseCard
                                            }
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            {/* Loading component */}
                            {this.state.page_loading ? <Loading /> : ""}
                        </div>
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
