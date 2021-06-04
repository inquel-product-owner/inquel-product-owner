import React, { Component } from "react";
import Wrapper from "./wrapper";
import { Link } from "react-router-dom";
import dateformat from "dateformat";
import { Dropdown, Modal, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";

class DiscountModal extends Component {
    constructor() {
        super();
        this.state = {
            category: [],
            sub_category: [],
            discipline: [],
            levels: [],
            subjects: [],
            data: {
                coupon_id: "",
                coupon_name: "",
                title: "",
                valid_from: "",
                valid_to: "",
                category: "",
                sub_category: "",
                discipline: "",
                level: "",
                subject: "",

                max_points: "",
                min_points: "",
                deduction_points: "",
                points_in_decimal: "",

                fixed_price: "",
                percentage: "",

                currency: "",
                points_exists: false,
                percent_exists: false,
                price_exists: false,
            },

            subcategory_loading: false,
            content_loading: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
    }

    componentDidMount = () => {
        if (this.props.data && Object.keys(this.props.data).length !== 0) {
            this.setState({
                data: this.props.data,
            });
        }
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

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
            >
                <Modal.Header closeButton>Discount Configuration</Modal.Header>
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

                    {/* Coupon ID & Title */}
                    <div className="form-row">
                        <div className="col-md-6 form-group">
                            <label htmlFor="code">Coupon ID</label>
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
                        <div className="col-md-6 form-group">
                            <label htmlFor="title">Coupon Title</label>
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
                    </div>

                    {/* Category & Sub category */}
                    <div className="form-row">
                        <div className="col-md-6 form-group">
                            <label htmlFor="category">Category</label>
                            <Select
                                className="basic-single borders"
                                placeholder="Select category"
                                isSearchable={true}
                                name="category"
                                id="category"
                                options={(this.state.category || []).map(
                                    (list) => {
                                        return {
                                            value: list.code,
                                            label: list.title,
                                        };
                                    }
                                )}
                                value={(this.state.category || []).map(
                                    (list) => {
                                        return this.state.data.category ===
                                            list.code
                                            ? {
                                                  value: list.code,
                                                  label: list.title,
                                              }
                                            : "";
                                    }
                                )}
                                onChange={this.handleCategory}
                                required
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="sub_category">Sub category</label>
                            <Select
                                className="basic-single borders"
                                placeholder="Select subcategory"
                                isSearchable={true}
                                name="sub_category"
                                id="sub_category"
                                isLoading={
                                    this.state.subcategory_loading
                                        ? true
                                        : false
                                }
                                options={this.state.sub_category.map((list) => {
                                    return {
                                        value: list.code,
                                        label: list.title,
                                    };
                                })}
                                value={(this.state.sub_category || []).map(
                                    (list) => {
                                        return this.state.data.sub_category ===
                                            list.code
                                            ? {
                                                  value: list.code,
                                                  label: list.title,
                                              }
                                            : "";
                                    }
                                )}
                                isDisabled={
                                    this.state.data.category === ""
                                        ? true
                                        : false
                                }
                                onChange={this.handleSubcategory}
                                required
                            />
                        </div>
                    </div>

                    {/* Discipline, Level & Subject */}
                    <div className="form-row">
                        <div className="col-md-4 form-group">
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
                                    return this.state.data.discipline === key
                                        ? {
                                              value: key,
                                              label: value,
                                          }
                                        : "";
                                })}
                                isDisabled={
                                    this.state.data.sub_category === ""
                                        ? true
                                        : false
                                }
                                onChange={this.handleDiscipline}
                                required
                            />
                        </div>
                        <div className="col-md-4 form-group">
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
                                    return this.state.data.level === key
                                        ? {
                                              value: key,
                                              label: value,
                                          }
                                        : "";
                                })}
                                isDisabled={
                                    this.state.data.sub_category === ""
                                        ? true
                                        : false
                                }
                                onChange={this.handleLevel}
                                required
                            />
                        </div>
                        <div className="col-md-4 form-group">
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
                                    return this.state.data.subject === key
                                        ? {
                                              value: key,
                                              label: value,
                                          }
                                        : "";
                                })}
                                isDisabled={
                                    this.state.data.sub_category === ""
                                        ? true
                                        : false
                                }
                                onChange={this.handleSubject}
                                required
                            />
                        </div>
                    </div>

                    {/* Valid from & Valid to */}
                    <div className="form-row">
                        <div className="col-md-6 form-group">
                            <label htmlFor="valid_from">Valid from</label>
                            <input
                                type="date"
                                name="valid_from"
                                id="valid_from"
                                className="form-control borders"
                                onChange={this.handleInput}
                                required
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="valid_to">Valid to</label>
                            <input
                                type="date"
                                name="valid_to"
                                id="valid_to"
                                className="form-control borders"
                                onChange={this.handleInput}
                                required
                            />
                        </div>
                    </div>

                    {/* Min points, Max points & Points Decimal */}
                    <div className="form-row">
                        <div className="col-md-4 form-group">
                            <label htmlFor="min_points">Minimum Points</label>
                            <input
                                type="text"
                                name="min_points"
                                id="min_points"
                                className="form-control borders"
                                onChange={this.handleInput}
                                placeholder="Enter min points"
                                required
                            />
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor="max_points">Maximum Points</label>
                            <input
                                type="text"
                                name="max_points"
                                id="max_points"
                                className="form-control borders"
                                onChange={this.handleInput}
                                placeholder="Enter max points"
                                required
                            />
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor="points_in_decimal">
                                Points in Decimal
                            </label>
                            <input
                                type="text"
                                name="points_in_decimal"
                                id="points_in_decimal"
                                className="form-control borders"
                                onChange={this.handleInput}
                                placeholder="Enter points in decimal"
                                required
                            />
                        </div>
                    </div>

                    {/* Percentage, Fixed price & Currency */}
                    <div className="form-row">
                        <div className="col-md-4 form-group">
                            <label htmlFor="percentage">Percentage</label>
                            <input
                                type="text"
                                name="percentage"
                                id="percentage"
                                className="form-control borders"
                                onChange={this.handleInput}
                                placeholder="Enter percentage"
                                required
                            />
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor="fixed_price">Fixed Price</label>
                            <input
                                type="text"
                                name="fixed_price"
                                id="fixed_price"
                                className="form-control borders"
                                onChange={this.handleInput}
                                placeholder="Enter fixed price"
                                required
                            />
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor="currency">Currency</label>
                            <input
                                type="text"
                                name="currency"
                                id="currency"
                                className="form-control borders"
                                onChange={this.handleInput}
                                placeholder="Enter currency"
                                required
                            />
                        </div>
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
                        {this.state.data.coupon_id === "" ? "Save" : "Update"}
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const DiscountTable = (props) => {
    return (
        <table className="table table-hover">
            <thead className="text-white primary-bg">
                <tr style={{ whiteSpace: "nowrap" }}>
                    <th scope="col">Sl.No</th>
                    <th scope="col">Coupon ID</th>
                    <th scope="col">Coupon Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">Sub Category</th>
                    <th scope="col">Discipline</th>
                    <th scope="col">Levels</th>
                    <th scope="col">Subjects</th>
                    <th scope="col">Valid from</th>
                    <th scope="col">Valid to</th>
                    <th scope="col">Minimum points</th>
                    <th scope="col">Maximum points</th>
                    <th scope="col">Points value (Decimal)</th>
                    <th scope="col">Percentage</th>
                    <th scope="col">Fixed Price</th>
                    <th scope="col">Currency</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.state.data && props.state.data.length !== 0 ? (
                    (props.state.data || []).map((list, index) => {
                        return (
                            <tr
                                style={{
                                    whiteSpace: "nowrap",
                                }}
                                key={index}
                            >
                                <td>{index + 1}</td>
                                <td>{list.coupon_name}</td>
                                <td>{list.title}</td>
                                <td>{list.category}</td>
                                <td>{list.sub_category}</td>
                                <td>{list.discipline}</td>
                                <td>{list.level}</td>
                                <td>{list.subject}</td>
                                <td>
                                    {dateformat(list.valid_from, "dd/mm/yyyy")}
                                </td>
                                <td>
                                    {dateformat(list.valid_to, "dd/mm/yyyy")}
                                </td>
                                <td>{list.min_points}</td>
                                <td>{list.max_points}</td>
                                <td>{list.points_in_decimal}</td>
                                <td>{list.percentage}</td>
                                <td>{list.fixed_price}</td>
                                <td>{list.currency}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="Secondary"
                                            className="btn btn-outline-secondary btn-sm shadow-none caret-off"
                                        >
                                            <i className="fas fa-ellipsis-h"></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu
                                            className={`dropdown-menu-btn ${
                                                props.state.data.length <= 2
                                                    ? "position-fixed"
                                                    : "position-absolute"
                                            }`}
                                        >
                                            <Dropdown.Item
                                                disabled={
                                                    list.coupon_id !== ""
                                                        ? false
                                                        : true
                                                }
                                            >
                                                <i className="far fa-edit mr-1"></i>{" "}
                                                Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                disabled={
                                                    list.coupon_id !== ""
                                                        ? false
                                                        : true
                                                }
                                            >
                                                <i className="far fa-trash-alt mr-1"></i>{" "}
                                                Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr
                        style={{
                            whiteSpace: "nowrap",
                        }}
                    >
                        <td>No data to display...</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

class AdminDiscountConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: "",
            showModal: false,
            data: [],
            selectedData: {},
        };
    }

    loadDiscountData = () => {
        axios
            .get(`${this.wrapper.url}/inquel_admin/coupon/`, {
                headers: this.wrapper.headers,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
                this.wrapper.pageLoading(false);
                this.wrapper.errorAlert("Something went wrong!", true);
            });
    };

    componentDidMount = () => {
        document.title = "Discount Configuration - Admin | IQLabs";

        this.loadDiscountData();
    };

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showModal: false,
            });
        }, 1000);
        this.loadDiscountData();
    };

    render() {
        return (
            <Wrapper
                history={this.props.history}
                header="Discount Configuration"
                activeLink="course"
                ref={(ref) => (this.wrapper = ref)}
            >
                {/* ----- Discount Modal ----- */}
                {this.state.showModal ? (
                    <DiscountModal
                        show={this.state.showModal}
                        onHide={() =>
                            this.setState({
                                showModal: false,
                            })
                        }
                        data={this.state.selectedData}
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
                                    <Link to="/admin">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Discount Configuration
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-4 text-right">
                        <button
                            className="btn btn-primary btn-sm shadow-none"
                            onClick={() =>
                                this.setState({
                                    showModal: true,
                                })
                            }
                        >
                            Create Discount
                        </button>
                    </div>
                </div>

                {/* ----- Discount table ----- */}
                <div className="card shadow-sm">
                    <div className="table-responsive">
                        <DiscountTable state={this.state} />
                    </div>
                </div>
            </Wrapper>
        );
    }
}

export default AdminDiscountConfiguration;
