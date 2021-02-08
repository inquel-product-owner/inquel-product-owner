import React, { Component } from "react";
import { Modal, Alert, Spinner } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import GroupTable from "../table/groupTable";
import Paginations from "../sharedComponents/pagination";

class GroupModal extends Component {
    constructor() {
        super();
        this.state = {
            groupName: "",
            groupDesc: "",
            valid_to: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
    }

    handleGroupName = (event) => {
        this.setState({
            groupName: event.target.value,
        });
    };

    handleGroupDesc = (event) => {
        this.setState({
            groupDesc: event.target.value,
        });
    };

    handleValid_to = (event) => {
        this.setState({
            valid_to: `${event.target.value} 00:00:00`,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${url}/hod/create/group/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                group_name: this.state.groupName,
                group_description: this.state.groupDesc,
                valid_to: this.state.valid_to,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
                    this.props.formSubmission(true);
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
                <Modal.Header closeButton>Create Group</Modal.Header>
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
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="gname">Group name</label>
                            <input
                                type="text"
                                name="gname"
                                id="gname"
                                className="form-control borders"
                                onChange={this.handleGroupName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gdescription">Description</label>
                            <textarea
                                name="gdescription"
                                id="gdescription"
                                rows="5"
                                className="form-control borders"
                                onChange={this.handleGroupDesc}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="valid_to">Valid to</label>
                            <input
                                type="date"
                                name="valid_to"
                                id="valid_to"
                                className="form-control borders"
                                onChange={this.handleValid_to}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-sm btn-block">
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
                                Create Group
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

class GroupConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupModalShow: false,
            groupItem: [],
            activeGroupPage: 1,
            totalGroupCount: 0,
            page_loading: true,
            is_formSubmited: false,
        };
        this.url = baseUrl + hodUrl;
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

    addGroupModal = () => {
        this.setState({
            groupModalShow: !this.state.groupModalShow,
        });
    };

    loadGroupData = () => {
        fetch(`${this.url}/hod/groups/?page=${this.state.activeGroupPage}`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    groupItem: result.data.results,
                    totalGroupCount: result.data.count,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = "Group Configurations - HOD | IQLabs";

        this.loadGroupData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.is_formSubmited !== this.state.is_formSubmited &&
            this.state.is_formSubmited === true
        ) {
            this.loadGroupData();
            this.setState({
                is_formSubmited: false,
            });
        }

        if (prevState.activeGroupPage !== this.state.activeGroupPage) {
            this.loadGroupData();
            this.setState({
                page_loading: true,
            });
        }
    };

    formSubmission = (is_formSubmited) => {
        if (is_formSubmited) {
            this.setState({
                is_formSubmited: true,
            });
            setTimeout(() => {
                this.setState({
                    groupModalShow: false,
                });
            }, 1000);
        }
    };

    handleGroupPageChange(pageNumber) {
        this.setState({ activeGroupPage: pageNumber });
    }

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Groups" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Add Subject modal */}
                <GroupModal
                    show={this.state.groupModalShow}
                    onHide={this.addGroupModal}
                    formSubmission={this.formSubmission}
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

                        <div className="row align-items-center mb-3 mt-2">
                            <div className="col-6">
                                <h5 className="primary-text">Configuration</h5>
                            </div>
                            <div className="col-6 text-right">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={this.addGroupModal}
                                >
                                    Add new
                                </button>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <GroupTable
                                groupItems={this.state.groupItem}
                                path="hod"
                                valid_from={true}
                                valid_to={true}
                                teacher={true}
                                student={true}
                                details={true}
                            />
                            <div className="card-body p-3">
                                {this.state.totalGroupCount >= 10 ? (
                                    <Paginations
                                        activePage={this.state.activeGroupPage}
                                        totalItemsCount={
                                            this.state.totalGroupCount
                                        }
                                        onChange={this.handleGroupPageChange.bind(
                                            this
                                        )}
                                    />
                                ) : null}
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

export default GroupConfiguration;
