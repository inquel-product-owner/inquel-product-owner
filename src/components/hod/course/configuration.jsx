import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
    data: state.user.profile,
});

class HODCourseConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectItem: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: false, // make it true
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    render() {
        document.title = `${this.props.subject_name} : Course configuration - HOD | IQLabs`;
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.subject_name}
                    togglenav={this.toggleSideNav}
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
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-2"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-3">
                                <li className="breadcrumb-item">
                                    <Link to="/hod">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        {this.props.subject_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Course configuration
                                </li>
                            </ol>
                        </nav>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="card shadow-sm mb-3">
                                    <div className="card-header">
                                        Item Ready For Course Creation
                                    </div>
                                    <div className="card-body pt-0">
                                        <div className="d-flex flex-wrap justify-content-between">
                                            <Button className="btn btn-primary-invert">
                                                Chapter 1
                                            </Button>
                                            <Button className="btn btn-primary-invert">
                                                Chapter 2
                                            </Button>
                                            <Button className="btn btn-primary-invert">
                                                Chapter 3
                                            </Button>
                                        </div>
                                        <div className="d-flex">
                                            <Button className="btn btn-primary-invert">
                                                <strong> Chapter 4</strong>
                                            </Button>
                                            <Button
                                                style={{
                                                    marginRight: "10px",
                                                    marginTop: "10px",
                                                    backgroundColor: "#efd2ac",
                                                    color: "#621012",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                <strong> Chapter 5</strong>
                                            </Button>
                                            <Button
                                                style={{
                                                    marginRight: "10px",
                                                    marginTop: "10px",
                                                    backgroundColor: "#efd2ac",
                                                    color: "#621012",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                <strong> Chapter 6</strong>
                                            </Button>
                                        </div>
                                        <div className="d-flex">
                                            <Button
                                                style={{
                                                    marginRight: "10px",
                                                    marginTop: "10px",
                                                    backgroundColor: "#efd2ac",
                                                    color: "#621012",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                <strong> Chapter 7</strong>
                                            </Button>
                                            <Button
                                                style={{
                                                    marginRight: "10px",
                                                    marginTop: "10px",
                                                    backgroundColor: "#efd2ac",
                                                    color: "#621012",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                <strong> Chapter 8</strong>
                                            </Button>
                                            <Button
                                                style={{
                                                    marginRight: "10px",
                                                    marginTop: "10px",
                                                    backgroundColor: "#efd2ac",
                                                    color: "#621012",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                <strong> Chapter 9</strong>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card shadow p-3 mb-5 bg-white rounded">
                                    <div className="d-flex">
                                        <div className="col-md-3">
                                            {" "}
                                            <h5 style={{ color: "#621012" }}>
                                                Course Title
                                            </h5>
                                        </div>

                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="usr"
                                            ></input>
                                        </div>

                                        <div className="col-md-3">
                                            <form>
                                                <label
                                                    for="cars"
                                                    style={{ color: "#621012" }}
                                                >
                                                    <h5>Board: </h5>
                                                </label>
                                                <select
                                                    name="cars"
                                                    id="cars"
                                                    style={{
                                                        marginLeft: "0px",
                                                        height: "35px",
                                                    }}
                                                >
                                                    <option value="volvo">
                                                        Select Here
                                                    </option>
                                                    <option value="saab">
                                                        Saab
                                                    </option>
                                                    <option value="opel">
                                                        Opel
                                                    </option>
                                                    <option value="audi">
                                                        Audi
                                                    </option>
                                                </select>
                                            </form>
                                        </div>
                                    </div>
                                    <div
                                        className="card  no-border"
                                        style={{ paddingTop: "15px" }}
                                    >
                                        <div className="d-flex">
                                            <div className="col-md-6">
                                                <Button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    style={{
                                                        backgroundColor:
                                                            "#621012",
                                                        marginLeft: "15px",
                                                        borderRadius: "5px",
                                                    }}
                                                >
                                                    Course Configuration
                                                </Button>

                                                <select
                                                    name="cars"
                                                    id="cars"
                                                    style={{
                                                        marginLeft: "20px",
                                                        height: "35px",
                                                        backgroundColor:
                                                            "#621012",
                                                        color: "white",
                                                        borderRadius: "5px",
                                                    }}
                                                >
                                                    <option value="volvo">
                                                        Type
                                                    </option>
                                                    <option value="saab">
                                                        Saab
                                                    </option>
                                                    <option value="opel">
                                                        Opel
                                                    </option>
                                                    <option value="audi">
                                                        Audi
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex">
                                                    <Button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        style={{
                                                            marginLeft: "15px",
                                                        }}
                                                    >
                                                        Quisck Pass Tips
                                                    </Button>
                                                    {/* <ScorecardConif
                                                show={modalShow}
                                                onHide={() =>
                                                    setModalShow(false)
                                                }
                                            /> */}
                                                    {/* <Button
                                                onClick={() =>
                                                    setModalShow(true)
                                                }
                                                type="button"
                                                className="btn btn-primary"
                                                style={{
                                                    marginLeft: "15px",
                                                }}
                                            >
                                                Add Unit
                                            </Button> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="card"
                                            style={{ paddingTop: "25px" }}
                                        >
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <div className="card ">
                                                            <div
                                                                className="card-header"
                                                                style={{
                                                                    borderBottom:
                                                                        "0",
                                                                }}
                                                            >
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <th>
                                                                            Sl.No
                                                                        </th>
                                                                        <th>
                                                                            Course
                                                                            Structure
                                                                        </th>
                                                                    </div>
                                                                    <div className="col-md-6 ">
                                                                        <div className="row">
                                                                            <div className="col-md-8 "></div>
                                                                            <div className="col-md-4 ">
                                                                                {" "}
                                                                                <th>
                                                                                    Weightage
                                                                                </th>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </tr>
                                                </thead>
                                                <tbody
                                                    style={{ height: "50%" }}
                                                ></tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps)(HODCourseConfig);
