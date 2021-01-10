import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Link } from "react-router-dom";

class DiscountConfiguration extends Component {
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

    componentDidMount = () => {
        document.title = "Admin Discount Configuration | IQLabs";
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name="Discount Configuration"
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} activeLink="course" />

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

                        <div className="row mb-3">
                            <div className="col-md-6 order-md-1 order-2">
                                <h5 className="primary-text">
                                    Discount Configuration
                                </h5>
                            </div>
                            <div className="col-md-6 text-left text-md-right order-md-2 order-1 mb-4 mb-md-0">
                                <Link to="/admin/course-management">
                                    <button className="btn btn-outline-secondary btn-sm mr-1">
                                        Course Master Data{" "}
                                        <i className="fas fa-chevron-right fa-sm ml-2"></i>
                                    </button>
                                </Link>
                                <Link to="/admin/course-management/discounts">
                                    <button className="btn btn-outline-secondary btn-sm">
                                        Discounts Configuration{" "}
                                        <i className="fas fa-chevron-right fa-sm ml-2"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Discount data */}
                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table table-xl">
                                    <thead className="text-white primary-bg">
                                        <tr>
                                            <th scope="col">Sl.No</th>
                                            <th scope="col">Coupon ID</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Sub Category</th>
                                            <th scope="col">Discipline</th>
                                            <th scope="col">Levels</th>
                                            <th scope="col">Subjects</th>
                                            <th scope="col">
                                                Board / University
                                            </th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Course</th>
                                            <th scope="col">Valid from</th>
                                            <th scope="col">Valid to</th>
                                            <th scope="col">Minimum points</th>
                                            <th scope="col">maximum points</th>
                                            <th scope="col">
                                                Points value in Decimal
                                            </th>
                                            <th scope="col">Percentage</th>
                                            <th scope="col">Fixed Price</th>
                                            <th scope="col">Currency</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>MAT 10%</td>
                                            <td>
                                                Flat 10% off on Mathematics
                                                courses
                                            </td>
                                            <td>SCH</td>
                                            <td>000</td>
                                            <td>000</td>
                                            <td>ALL</td>
                                            <td>MAT</td>
                                            <td>ALL</td>
                                            <td>PRE</td>
                                            <td>ALL</td>
                                            <td>01.10.2020</td>
                                            <td>31.10.2020</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>10</td>
                                            <td>-</td>
                                            <td>INR</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-light btn-sm btn-block">
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

export default DiscountConfiguration;
