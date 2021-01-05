import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";

class GroupDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupItem: [],
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        fetch(`${url}/hod/group/${this.props.match.params.groupId}`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    groupItem: result.data,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        document.title =
            this.state.groupItem.length !== 0
                ? this.state.groupItem.group_name + " Details | IQLabs"
                : "Group Details | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.groupItem.group_name}
                    togglenav={this.toggleSideNav}
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
                        <div className="row">
                            <div className="col-md-8">
                                <h5 className="primary-text mb-3">Details</h5>
                                <div className="card shadow-sm">
                                    <div className="table-responsive">
                                        <table className="table table-xl">
                                            <thead className="text-white primary-bg">
                                                <tr>
                                                    <th scope="col">Sl.No</th>
                                                    <th scope="col">Subject</th>
                                                    <th scope="col">Teacher</th>
                                                    <th scope="col">
                                                        Description
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Maths</td>
                                                    <td>Teacher 1</td>
                                                    <td>
                                                        CBSE Maths - Geometry
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Maths</td>
                                                    <td>Teacher 2</td>
                                                    <td>
                                                        CBSE Maths - Algebra
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Maths</td>
                                                    <td>Teacher 3</td>
                                                    <td>
                                                        CBSE Maths - Trignometry
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="card-body">
                                        <button className="btn btn-light btn-sm btn-block shadow-sm">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupDetails;
