import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Tabs, Tab, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import courseimg from "../../assets/code.jpg";

class SubscriptionModal extends Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5 className="primary-text">Subscription Plans</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-5 mb-3 mb-md-0">
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0">Subscription ID</p>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        name="subscriptionid"
                                        id="subscriptionid"
                                        className="form-control form-control-sm shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0">Title</p>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="form-control form-control-sm shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0">Duration / Validity</p>
                                </div>
                                <div className="col-md-8">
                                    <select
                                        name="duration"
                                        id="duration"
                                        className="form-control form-control-sm shadow-sm"
                                    >
                                        <option value="05">05</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0">Pricing</p>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        name="pricing"
                                        id="pricing"
                                        className="form-control form-control-sm shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="form-check mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="discount"
                                    name="discount"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="discount"
                                >
                                    Discounts applicable
                                </label>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0">Search terms</p>
                                </div>
                                <div className="col-md-8">
                                    <textarea
                                        name="searchterm"
                                        id="searchterm"
                                        rows="5"
                                        className="form-control form-control-sm shadow-sm"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="card shadow-sm h-100">
                                <div className="card-header">
                                    <h6>Subscription ID SP2020210001</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="primary-text">
                                                <tr>
                                                    <th scope="col">Sl.No</th>
                                                    <th scope="col">
                                                        Course ID
                                                    </th>
                                                    <th scope="col">
                                                        Assigned course list
                                                    </th>
                                                    <th scope="col">
                                                        Price(INR)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01</td>
                                                    <td>SJBDIHENKD885858</td>
                                                    <td>
                                                        CBSE 10th Maths -
                                                        Premium
                                                    </td>
                                                    <td>2000.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button className="btn btn-light btn-block btn-sm my-3">
                                        Add
                                    </button>
                                    <div className="text-right">
                                        <span className="primary-text font-weight-bold mr-3">
                                            Total:
                                        </span>
                                        2000.00
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

class AddCourse extends Component {
    constructor() {
        super();
        this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <h6 className="primary-text mb-3">Configuration</h6>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">
                                                Category ID
                                            </p>
                                        </div>
                                        <div className="col-md-8">
                                            <select
                                                name="category"
                                                id="category"
                                                className="form-control form-control-sm shadow-sm"
                                            >
                                                <option value="school">
                                                    School
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">
                                                Discipline
                                            </p>
                                        </div>
                                        <div className="col-md-8">
                                            <select
                                                name="discipline"
                                                id="discipline"
                                                className="form-control form-control-sm shadow-sm"
                                            >
                                                <option value="none">
                                                    None
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">
                                                Subjects
                                            </p>
                                        </div>
                                        <div className="col-md-8">
                                            <select
                                                name="subject"
                                                id="subject"
                                                className="form-control form-control-sm shadow-sm"
                                            >
                                                <option value="maths">
                                                    Maths
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">Type</p>
                                        </div>
                                        <div className="col-md-8">
                                            <select
                                                name="type"
                                                id="type"
                                                className="form-control form-control-sm shadow-sm"
                                            >
                                                <option value="premium">
                                                    Premium
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">
                                                Sub Category
                                            </p>
                                        </div>
                                        <div className="col-md-8">
                                            <select
                                                name="subcategory"
                                                id="subcategory"
                                                className="form-control form-control-sm shadow-sm"
                                            >
                                                <option value="sch">SCH</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">Levels</p>
                                        </div>
                                        <div className="col-md-8">
                                            <select
                                                name="level"
                                                id="level"
                                                className="form-control form-control-sm shadow-sm"
                                            >
                                                <option value="10">10th</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">
                                                Board / University
                                            </p>
                                        </div>
                                        <div className="col-md-8">
                                            <select
                                                name="university"
                                                id="university"
                                                className="form-control form-control-sm shadow-sm"
                                            >
                                                <option value="cbse">
                                                    CBSE
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">HOD</p>
                                        </div>
                                        <div className="col-md-8">
                                            <select
                                                name="assignedhod"
                                                id="assignedhod"
                                                className="form-control form-control-sm shadow-sm"
                                            >
                                                <option value="ram">Ram</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="courses">Courses</label>
                            <textarea
                                name="courses"
                                id="courses"
                                rows="5"
                                className="form-control shadow-sm"
                            ></textarea>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="d-flex justify-content-between mb-2">
                                        <p className="primary-text small">
                                            Add image 01 Title
                                        </p>
                                        <Switch
                                            checked={this.state.checked}
                                            onChange={this.handleChange}
                                            onColor="#efd2ac"
                                            onHandleColor="#621012"
                                            handleDiameter={12}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                            height={18}
                                            width={35}
                                            className="react-switch"
                                            id="material-switch"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="discount"
                                            name="discount"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="discount"
                                        >
                                            Discounts applicable
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="input1"
                                            id="input1"
                                            className="form-control shadow-sm"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="input2"
                                            id="input2"
                                            className="form-control shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="searchterms">
                                            Search terms
                                        </label>
                                        <textarea
                                            name="searchterms"
                                            id="searchterms"
                                            rows="3"
                                            className="form-control shadow-sm"
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recommendedcourse">
                                            Recommended courses
                                        </label>
                                        <textarea
                                            name="recommendedcourse"
                                            id="recommendedcourse"
                                            rows="3"
                                            className="form-control shadow-sm"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h6 className="primary-text mb-3">Subscription</h6>
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="small mb-0">
                                        Subscription ID
                                    </p>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        name="subscriptionid"
                                        id="subscriptionid"
                                        className="form-control shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0 small">
                                        Subscription Title
                                    </p>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        name="subscriptiontitle"
                                        id="subscriptiontitle"
                                        className="form-control shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0 small">
                                        Subscription Description
                                    </p>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        name="subscriptiondescription"
                                        id="subscriptiondescription"
                                        className="form-control shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0 small">Duration</p>
                                </div>
                                <div className="col-md-8">
                                    <div className="row align-items-center">
                                        <div className="col-md-3 col-6">
                                            <select
                                                name="durationmonth"
                                                id="durationmonth"
                                                className="form-control shadow-sm"
                                            >
                                                <option value="05">05</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <select
                                                name="durationday"
                                                id="durationday"
                                                className="form-control shadow-sm"
                                            >
                                                <option value="10">10</option>
                                            </select>
                                        </div>
                                        <div className="col-6 mt-2 mt-md-0">
                                            <p className="mb-0">
                                                05 Months 10 Days
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0 small">Pricing</p>
                                </div>
                                <div className="col-md-8">
                                    <form action="">
                                        <input
                                            type="text"
                                            name="pricing"
                                            id="pricing"
                                            className="form-control shadow-sm"
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className="card shadow-sm">
                                <div className="card-header">
                                    <h6>Subscription ID SP2020210001</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="primary-text">
                                                <tr>
                                                    <th scope="col">Sl.No</th>
                                                    <th scope="col">
                                                        Course ID
                                                    </th>
                                                    <th scope="col">
                                                        Assigned course list
                                                    </th>
                                                    <th scope="col">
                                                        Price(INR)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01</td>
                                                    <td>SJBDIHENKD885858</td>
                                                    <td>
                                                        CBSE 10th Maths -
                                                        Premium
                                                    </td>
                                                    <td>2000.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button className="btn btn-light btn-block btn-sm my-3">
                                        Add
                                    </button>
                                    <div className="text-right">
                                        <span className="primary-text font-weight-bold mr-3">
                                            Total:
                                        </span>
                                        2000.00
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end flex-wrap">
                        <button
                            className="btn btn-outline-dark btn-sm mr-2"
                            onClick={this.props.onHide}
                        >
                            Cancel
                        </button>
                        <button className="btn btn-primary btn-sm mr-2">
                            Save
                        </button>
                        <button className="btn btn-primary btn-sm">
                            Publish
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

class ReminderCard extends Component {
    render() {
        return (
            <div className="card shadow-sm">
                <div className="card-body">
                    <form action="">
                        <input
                            type="search"
                            name="searchreminder"
                            id="searchreminder"
                            className="form-control  form-control-lg mb-4"
                            placeholder="Search..."
                            style={{
                                borderRadius: "20px",
                                border: "1px solid #621012",
                            }}
                        />
                    </form>
                    <div className="row mb-3 align-items-center">
                        <div className="col-6">
                            <h6>Reminders</h6>
                        </div>
                        <div className="col-6 text-right">
                            <Link to="/admin" className="text-warning small">
                                View all{" "}
                                <i className="fas fa-chevron-right ml-2"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="row align-items-center mb-4">
                        <div className="col-2">
                            <div
                                className="card bg-danger text-white text-center justify-content-center"
                                style={{
                                    height: "30px",
                                    width: "30px",
                                }}
                            >
                                <i className="fas fa-exclamation"></i>
                            </div>
                        </div>
                        <div className="col-10">
                            <p className="small mb-0">
                                Course Publishing Remainder
                            </p>
                            <p className="small text-muted mb-0">
                                Lorem ipsum dolor ipsamit
                            </p>
                        </div>
                    </div>
                    <div className="row align-items-center mb-4">
                        <div className="col-2">
                            <div
                                className="card bg-warning text-white text-center justify-content-center"
                                style={{
                                    height: "30px",
                                    width: "30px",
                                }}
                            >
                                <i className="fas fa-envelope"></i>
                            </div>
                        </div>
                        <div className="col-10">
                            <p className="small mb-0">
                                Course Publishing Remainder
                            </p>
                            <p className="small text-muted mb-0">
                                Lorem ipsum dolor ipsamit
                            </p>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-2">
                            <div
                                className="card bg-danger text-white text-center justify-content-center"
                                style={{
                                    height: "30px",
                                    width: "30px",
                                }}
                            >
                                <i className="fas fa-exclamation"></i>
                            </div>
                        </div>
                        <div className="col-10">
                            <p className="small mb-0">
                                Course Publishing Remainder
                            </p>
                            <p className="small text-muted mb-0">
                                Lorem ipsum dolor ipsamit
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class VewCourseCard extends Component {
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
                <SubscriptionModal
                    show={this.state.subscriptionModalShow}
                    onHide={this.toggleSubscriptionModal}
                />
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h6 className="primary-text font-weight-bold mb-3">
                            Course Name
                        </h6>
                        <p className="primary-text small">Configuration</p>
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
                                        className="form-control form-control-sm shadow-sm"
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
                                        className="form-control form-control-sm shadow-sm"
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
                                        className="form-control form-control-sm shadow-sm"
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
                                        className="form-control form-control-sm shadow-sm"
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
                                        className="form-control form-control-sm shadow-sm"
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
                                        className="form-control form-control-sm shadow-sm"
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
                                        className="form-control form-control-sm shadow-sm"
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
                                        className="form-control form-control-sm shadow-sm"
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
                                        className="form-control form-control-sm shadow-sm"
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

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCourseModal: false,
            viewCourseCard: false,
            tableView: true,
            showSideNav: false,
        };
    }

    toggleCourseView = () => {
        this.setState({
            tableView: !this.state.tableView,
        });
    };

    toggleCourseModal = () => {
        this.setState({
            addCourseModal: !this.state.addCourseModal,
        });
    };

    showViewCourseCard = () => {
        this.setState({
            viewCourseCard: true,
        });
    };

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        document.title = "Admin Dashboard | IQLabs";
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

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <AddCourse
                            show={this.state.addCourseModal}
                            onHide={this.toggleCourseModal}
                        />
                        <div className="row">
                            <div className="col-md-9">
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
                                                    style={{ color: "tomato" }}
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
                                <div className="row justify-content-center justify-content-md-end mb-4">
                                    <div className="col-md-4 pr-md-0">
                                        <form>
                                            <div className="form-group">
                                                <input
                                                    type="search"
                                                    name="search"
                                                    id="search"
                                                    className="form-control mb-md-0 mb-2"
                                                    placeholder="Search"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-6 text-md-right text-center">
                                        <button className="btn btn-primary-invert mr-md-3 mr-1">
                                            Filter{" "}
                                            <i className="fas fa-filter ml-1"></i>
                                        </button>
                                        <button
                                            className="btn btn-primary mr-md-3 mr-1"
                                            onClick={this.toggleCourseModal}
                                        >
                                            Add
                                        </button>
                                        <button className="btn btn-primary mr-md-3 mr-1">
                                            Delete
                                        </button>
                                        <button className="btn btn-primary mr-md-3 mr-1">
                                            Enable
                                        </button>
                                        <button className="btn btn-primary">
                                            Disable
                                        </button>
                                    </div>
                                </div>

                                {/* Change view */}
                                <div className="text-right mb-2">
                                    <div
                                        className="btn-group btn-group-toggle"
                                        data-toggle="buttons"
                                    >
                                        <label
                                            className={`btn btn-light ${
                                                this.state.tableView
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
                                                        tableView: true,
                                                    });
                                                }}
                                            />{" "}
                                            <i className="fas fa-th-list"></i>
                                        </label>
                                        <label
                                            className={`btn btn-light ${
                                                this.state.tableView
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
                                                        tableView: false,
                                                    });
                                                }}
                                            />{" "}
                                            <i className="fas fa-th-large"></i>
                                        </label>
                                    </div>
                                </div>

                                {/* Courses list */}
                                {this.state.tableView ? (
                                    <Tabs
                                        defaultActiveKey="all"
                                        id="uncontrolled-tab-example"
                                    >
                                        <Tab eventKey="all" title="All">
                                            <div className="card shadow-sm mb-3 mb-md-0">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead className="primary-text">
                                                            <tr>
                                                                <th scope="col"></th>
                                                                <th scope="col">
                                                                    Course name
                                                                </th>
                                                                <th scope="col">
                                                                    Subject
                                                                </th>
                                                                <th scope="col">
                                                                    Category
                                                                </th>
                                                                <th scope="col">
                                                                    Sub Category
                                                                </th>
                                                                <th scope="col">
                                                                    Subscription
                                                                    ID
                                                                </th>
                                                                <th scope="col">
                                                                    Pricing
                                                                </th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Mathematics
                                                                    10th CBSE
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    2000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>Physics</td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    3000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Chemistry
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    5000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>Biology</td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    8000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Industrial
                                                                    electronics
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    7000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Micro
                                                                    processors
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    2000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Software
                                                                    Engineering
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    2000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>C, C++</td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    1000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab
                                            eventKey="published"
                                            title="Courses published"
                                        >
                                            <div className="card shadow-sm mb-3 mb-md-0">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead className="primary-text">
                                                            <tr>
                                                                <th scope="col"></th>
                                                                <th scope="col">
                                                                    Course name
                                                                </th>
                                                                <th scope="col">
                                                                    Subject
                                                                </th>
                                                                <th scope="col">
                                                                    Category
                                                                </th>
                                                                <th scope="col">
                                                                    Sub Category
                                                                </th>
                                                                <th scope="col">
                                                                    Subscription
                                                                    ID
                                                                </th>
                                                                <th scope="col">
                                                                    Pricing
                                                                </th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Mathematics
                                                                    10th CBSE
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    2000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>Physics</td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    3000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Chemistry
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    5000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>Biology</td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    8000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Industrial
                                                                    electronics
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    7000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Micro
                                                                    processors
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    2000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Software
                                                                    Engineering
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    2000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>C, C++</td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    1000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab
                                            eventKey="publishing"
                                            title="Ready for publishing"
                                        >
                                            <div className="card shadow-sm mb-3 mb-md-0">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead className="primary-text">
                                                            <tr>
                                                                <th scope="col"></th>
                                                                <th scope="col">
                                                                    Course name
                                                                </th>
                                                                <th scope="col">
                                                                    Subject
                                                                </th>
                                                                <th scope="col">
                                                                    Category
                                                                </th>
                                                                <th scope="col">
                                                                    Sub Category
                                                                </th>
                                                                <th scope="col">
                                                                    Subscription
                                                                    ID
                                                                </th>
                                                                <th scope="col">
                                                                    Pricing
                                                                </th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Mathematics
                                                                    10th CBSE
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    2000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>Physics</td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    3000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Chemistry
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    5000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>Biology</td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    8000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Industrial
                                                                    electronics
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    7000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Micro
                                                                    processors
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    2000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>
                                                                    Software
                                                                    Engineering
                                                                </td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    2000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">
                                                                    <form>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            id="enable"
                                                                        />
                                                                    </form>
                                                                </td>
                                                                <td>C, C++</td>
                                                                <td>Degree</td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    Engineering
                                                                </td>
                                                                <td>
                                                                    SP202021001
                                                                </td>
                                                                <td>
                                                                    1000 INR
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .showViewCourseCard
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                ) : (
                                    <Tabs
                                        defaultActiveKey="all"
                                        id="uncontrolled-tab-example"
                                    >
                                        <Tab eventKey="all" title="All">
                                            <div className="row mt-3">
                                                <div className="col-md-3 col-sm-6 mb-3">
                                                    <div
                                                        className="card"
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                        <Tab
                                            eventKey="published"
                                            title="Courses published"
                                        >
                                            <div className="row mt-3">
                                                <div className="col-md-3 col-sm-6 mb-3">
                                                    <div
                                                        className="card"
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                        <Tab
                                            eventKey="publishing"
                                            title="Ready for publishing"
                                        >
                                            <div className="row mt-3">
                                                <div className="col-md-3 col-sm-6 mb-3">
                                                    <div
                                                        className="card"
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                                        onClick={
                                                            this
                                                                .showViewCourseCard
                                                        }
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
                                                                    <p className="mb-0">
                                                                        Course
                                                                    </p>
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
                                )}
                            </div>

                            <div className="col-md-3">
                                {this.state.viewCourseCard ? (
                                    <VewCourseCard />
                                ) : (
                                    <ReminderCard />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
