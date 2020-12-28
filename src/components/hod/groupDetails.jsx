import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";

class GroupDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Group A" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} />

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
