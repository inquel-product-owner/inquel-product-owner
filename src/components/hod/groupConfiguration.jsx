import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";

class GroupModal extends Component {
    constructor() {
        super();
        this.state = {
            groupName: "",
            groupDesc: "",
            valid_to: "",
            errortext: "",
            successtext: "",
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
        var d = new Date(event.target.value).toLocaleDateString();
        var datearray = d.split("/");
        var year = datearray[2];
        var month = datearray[0];
        var day = datearray[1];
        this.setState({
            valid_to: `${year}-${month}-${day} 00:00:00`,
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
                if (result.sts) {
                    this.setState({
                        successtext: result.msg,
                        errortext: "",
                    });
                } else {
                    this.setState({
                        errortext: result.msg,
                        successtext: "",
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
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
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
                                Create Group
                            </button>
                        </div>
                    </form>
                    {this.state.errortext !== "" ? (
                        <div className="form-group">
                            <p className="text-danger text-center small mb-0">
                                {this.state.errortext}
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
                    {this.state.successtext !== "" ? (
                        <div className="form-group">
                            <p className="text-success text-center small mb-0">
                                {this.state.successtext}
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
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

    componentDidMount = () => {
        document.title = "HOD Group Configurations | IQLabs";

        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        fetch(`${url}/hod/groups/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    groupItem: result.data.results,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    dateConversion = (date) => {
        var newDate = new Date(date).toLocaleDateString();
        var datearray = newDate.split("/");
        return datearray[1] + "/" + datearray[0] + "/" + datearray[2];
    };

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
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <h5 className="primary-text mb-3">Configuration</h5>
                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table table-xl">
                                    <thead className="text-white primary-bg">
                                        <tr>
                                            <th scope="col">Sl.No</th>
                                            <th scope="col">Group Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Valid From</th>
                                            <th scope="col">Valid To</th>
                                            <th scope="col">Teachers</th>
                                            <th scope="col">Students</th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.groupItem.length !== 0 ? (
                                            this.state.groupItem.map(
                                                (list, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {
                                                                    list.group_name
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    list.group_description
                                                                }
                                                            </td>
                                                            <td>
                                                                {this.dateConversion(
                                                                    list.valid_from
                                                                )}
                                                            </td>
                                                            <td>
                                                                {this.dateConversion(
                                                                    list.valid_to
                                                                )}
                                                            </td>
                                                            <td>
                                                                {
                                                                    list
                                                                        .teachers
                                                                        .length
                                                                }{" "}
                                                                <Link
                                                                    to={`/hod/group/${list.id}/teacher`}
                                                                >
                                                                    <button className="btn btn-light btn-sm ml-1">
                                                                        <i className="fas fa-eye fa-sm"></i>
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                {
                                                                    list
                                                                        .students
                                                                        .length
                                                                }{" "}
                                                                <Link
                                                                    to={`/hod/group/${list.id}/student`}
                                                                >
                                                                    <button className="btn btn-light btn-sm ml-1">
                                                                        <i className="fas fa-eye fa-sm"></i>
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                            <td className="text-center">
                                                                <Link
                                                                    to={`/hod/group/${list.id}/details`}
                                                                >
                                                                    <button className="btn btn-sm btn-light shadow-sm">
                                                                        <i className="fas fa-eye"></i>
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <tr>
                                                <td>Data not available</td>
                                            </tr>
                                        )}
                                        {/* <tr>
                                            <td>2</td>
                                            <td>B</td>
                                            <td>Group B</td>
                                            <td>dd/mm/yyyy</td>
                                            <td>dd/mm/yyyy</td>
                                            <td>
                                                12{" "}
                                                <Link to="/hod/group/002/teacher">
                                                    <button className="btn btn-light btn-sm ml-1">
                                                        <i className="fas fa-eye fa-sm"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                            <td>
                                                56{" "}
                                                <Link to="/hod/group/002/student">
                                                    <button className="btn btn-light btn-sm ml-1">
                                                        <i className="fas fa-eye fa-sm"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                            <td className="text-center">
                                                <Link to="/hod/group/002/details">
                                                    <button className="btn btn-sm btn-light shadow-sm">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>C</td>
                                            <td>Group C</td>
                                            <td>dd/mm/yyyy</td>
                                            <td>dd/mm/yyyy</td>
                                            <td>
                                                12{" "}
                                                <Link to="/hod/group/003/teacher">
                                                    <button className="btn btn-light btn-sm ml-1">
                                                        <i className="fas fa-eye fa-sm"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                            <td>
                                                56{" "}
                                                <Link to="/hod/group/003/student">
                                                    <button className="btn btn-light btn-sm ml-1">
                                                        <i className="fas fa-eye fa-sm"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                            <td className="text-center">
                                                <Link to="/hod/group/003/details">
                                                    <button className="btn btn-sm btn-light shadow-sm">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-body">
                                <button
                                    className="btn btn-light btn-sm btn-block shadow-sm"
                                    onClick={this.addGroupModal}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupConfiguration;
