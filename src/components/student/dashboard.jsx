import React, { Component } from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import courseimg from "../../assets/code.jpg";
import { Link } from "react-router-dom";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import CarouselCard from "../shared/owlCarousel";
import Footer from "./shared/footer";
import Loading from "../shared/loader";
import AlertBox from "../shared/alert";
import { connect } from "react-redux";
import store from "../../redux/store";

const mapStateToProps = (state) => ({
    profile: state.user.profile,
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupData: "",
            page_loading: true,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
        };
        this.url = baseUrl + studentUrl;
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

    componentDidMount = () => {
        document.title = "Dashboard - Student | IQLabs";

        fetch(`${this.url}/student/group/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        groupData: result.data,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        page_loading: false,
                    });
                    console.log(result.msg);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Dashboard" togglenav={this.toggleSideNav} />

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

                <div
                    className={`section content pb-0 ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Welcome */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body text-center p-4">
                                <h3 className="primary-text mb-0">
                                    WELCOME BACK
                                </h3>
                            </div>
                        </div>

                        {/* Continue learning */}
                        <h6 className="primary-text mb-3">Continue learning</h6>
                        <div className="row mb-4">
                            <div className="col-md-2">
                                <div
                                    className="card light-bg shadow-sm"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <div className="card-body p-3">
                                        <img
                                            src={courseimg}
                                            className="img-fluid rounded shadow-sm mb-2"
                                            alt="Course"
                                        />
                                        <p className="primary-text font-weight-bold-600 text-center mb-0">
                                            Course
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="card light-bg shadow-sm"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <div className="card-body p-3">
                                        <img
                                            src={courseimg}
                                            className="img-fluid rounded shadow-sm mb-2"
                                            alt="Course"
                                        />
                                        <p className="primary-text font-weight-bold-600 text-center mb-0">
                                            Course
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="card light-bg shadow-sm"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <div className="card-body p-3">
                                        <img
                                            src={courseimg}
                                            className="img-fluid rounded shadow-sm mb-2"
                                            alt="Course"
                                        />
                                        <p className="primary-text font-weight-bold-600 text-center mb-0">
                                            Course
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="card light-bg shadow-sm"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <div className="card-body p-3">
                                        <img
                                            src={courseimg}
                                            className="img-fluid rounded shadow-sm mb-2"
                                            alt="Course"
                                        />
                                        <p className="primary-text font-weight-bold-600 text-center mb-0">
                                            Course
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="card light-bg shadow-sm"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <div className="card-body p-3">
                                        <img
                                            src={courseimg}
                                            className="img-fluid rounded shadow-sm mb-2"
                                            alt="Course"
                                        />
                                        <p className="primary-text font-weight-bold-600 text-center mb-0">
                                            Course
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="card light-bg shadow-sm"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <div className="card-body p-3">
                                        <img
                                            src={courseimg}
                                            className="img-fluid rounded shadow-sm mb-2"
                                            alt="Course"
                                        />
                                        <p className="primary-text font-weight-bold-600 text-center mb-0">
                                            Course
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Group section */}
                        {this.props.profile !== null ? (
                            this.props.profile.is_independent_student ===
                            false ? (
                                <div className="card shadow-sm mb-4">
                                    <div className="card-header">
                                        <h5>Group</h5>
                                    </div>
                                    <div className="card-body">
                                        {this.state.groupData !== "" ? (
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Group name</th>
                                                            <th>
                                                                Group
                                                                description
                                                            </th>
                                                            <th>View</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    this.state
                                                                        .groupData
                                                                        .group_name
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    this.state
                                                                        .groupData
                                                                        .group_description
                                                                }
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/student/group/${this.state.groupData.id}`}
                                                                >
                                                                    <button
                                                                        className="btn btn-primary btn-sm shadow-none"
                                                                        onClick={() => {
                                                                            store.dispatch(
                                                                                {
                                                                                    type: "GROUP",
                                                                                    payload:
                                                                                        this
                                                                                            .state
                                                                                            .groupData
                                                                                            .group_name,
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-eye"></i>
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            "No data to display..."
                                        )}
                                    </div>
                                </div>
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}

                        {/* Courses */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>Courses</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <Link to="">
                                            <button className="btn btn-primary btn-sm">
                                                View all
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <CarouselCard />
                            </div>
                        </div>

                        {/* What to learn next */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>What to learn next</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <Link to="">
                                            <button className="btn btn-primary btn-sm">
                                                View all
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <CarouselCard />
                            </div>
                        </div>

                        {/* Topics recommended */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <h5>Topic Recommended For You</h5>
                            </div>
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-md-3 mb-3">
                                        <Link
                                            to=""
                                            className="text-decoration-none"
                                        >
                                            <div className="card primary-bg text-white">
                                                <div className="card-body text-center p-3">
                                                    Topics 01
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <Link
                                            to=""
                                            className="text-decoration-none"
                                        >
                                            <div className="card primary-bg text-white">
                                                <div className="card-body text-center p-3">
                                                    Topics 02
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <Link
                                            to=""
                                            className="text-decoration-none"
                                        >
                                            <div className="card primary-bg text-white">
                                                <div className="card-body text-center p-3">
                                                    Topics 03
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <Link
                                            to=""
                                            className="text-decoration-none"
                                        >
                                            <div className="card primary-bg text-white">
                                                <div className="card-body text-center p-3">
                                                    Topics 04
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <Link
                                            to=""
                                            className="text-decoration-none"
                                        >
                                            <div className="card primary-bg text-white">
                                                <div className="card-body text-center p-3">
                                                    Topics 05
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <Link
                                            to=""
                                            className="text-decoration-none"
                                        >
                                            <div className="card primary-bg text-white">
                                                <div className="card-body text-center p-3">
                                                    Topics 06
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <Link
                                            to=""
                                            className="text-decoration-none"
                                        >
                                            <div className="card primary-bg text-white">
                                                <div className="card-body text-center p-3">
                                                    Topics 07
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <Link
                                            to=""
                                            className="text-decoration-none"
                                        >
                                            <div className="card primary-bg text-white">
                                                <div className="card-body text-center p-3">
                                                    Topics 08
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary btn-sm">
                                        View all topics
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Featured */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>Featured</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <Link to="">
                                            <button className="btn btn-primary btn-sm">
                                                View all
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <CarouselCard />
                            </div>
                        </div>
                    </div>

                    <div className="light-bg p-3">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-4">
                                <h5 className="primary-text text-md-right text-center mb-0">
                                    Subscribe for New updates
                                </h5>
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="email"
                                    name="subscribe"
                                    id="subscribe"
                                    placeholder="Your email ID"
                                    className="form-control borders"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <Footer />

                    {/* Loading component */}
                    {this.state.page_loading ? <Loading /> : ""}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Dashboard);
