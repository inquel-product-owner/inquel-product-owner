import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Switch from "react-switch";

export default class SubscriptionModal extends Component {
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
                                                className="form-control form-control-sm form-shadow"
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
                                                className="form-control form-control-sm form-shadow"
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
                                                className="form-control form-control-sm form-shadow"
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
                                                className="form-control form-control-sm form-shadow"
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
                                                className="form-control form-control-sm form-shadow"
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
                                                className="form-control form-control-sm form-shadow"
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
                                                className="form-control form-control-sm form-shadow"
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
                                                className="form-control form-control-sm form-shadow"
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
                                className="form-control form-shadow"
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
                                            className="form-control form-shadow"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="input2"
                                            id="input2"
                                            className="form-control form-shadow"
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
                                            className="form-control form-shadow"
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
                                            className="form-control form-shadow"
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
                                        className="form-control form-shadow"
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
                                        className="form-control form-shadow"
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
                                        className="form-control form-shadow"
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
                                                className="form-control form-shadow"
                                            >
                                                <option value="05">05</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <select
                                                name="durationday"
                                                id="durationday"
                                                className="form-control form-shadow"
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
                                            className="form-control form-shadow"
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

export class SubscriptionUpdateModal extends Component {
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
                                        className="form-control form-control-sm form-shadow"
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
                                        className="form-control form-control-sm form-shadow"
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
                                        className="form-control form-control-sm form-shadow"
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
                                        className="form-control form-control-sm form-shadow"
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
                                        className="form-control form-control-sm form-shadow"
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
