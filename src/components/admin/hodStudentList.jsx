import React, { Component } from "react";
import { Link } from "react-router-dom";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import { Helmet } from "react-helmet";
import ProfileLoader from "../../shared/profileLoader";

function Loading() {
    return (
        <tr>
            <td>Loading...</td>
        </tr>
    );
}

function EmptyData() {
    return (
        <tr>
            <td>Data not available</td>
        </tr>
    );
}

class HodStudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            studentItems: [],
            hodItems: [],
            isLoaded: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        const hodId = this.props.match.params.hodId;
        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        Promise.all([
            fetch(`${url}/hod/${hodId}/`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
            fetch(`${url}/hod/${hodId}/student/`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
        ])
            .then((result) => {
                this.setState({
                    hodItems: result[0].data,
                    studentItems: result[1].data.results,
                    isLoaded: true,
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
                <Helmet>
                    <title>Admin Profile | IQLabs</title>
                </Helmet>
                {/* Navbar */}
                <Header name="User Profiles" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="profiles"
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* HOD Details */}
                        {this.state.isLoaded ? (
                            <div className="row align-items-center mb-4">
                                <div className="col-md-6">
                                    <div className="row align-items-center">
                                        <div className="col-md-2 col-3">
                                            <img
                                                src={
                                                    this.state.hodItems
                                                        .profile_link !== null
                                                        ? this.state.hodItems
                                                              .profile_link
                                                        : profilepic
                                                }
                                                alt={`${this.state.hodItems.first_name} ${this.state.hodItems.last_name}`}
                                                className="img-fluid profile-pic"
                                            />
                                        </div>
                                        <div className="col-md-10 col-9 pl-0">
                                            <h5 className="primary-text">
                                                {`${this.state.hodItems.first_name} ${this.state.hodItems.last_name}`}
                                            </h5>
                                            <p className="mb-0">
                                                {this.props.match.params.hodId}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <ProfileLoader />
                        )}

                        {/* Student List */}
                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="primary-text">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Registered on</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.isLoaded ? (
                                            this.state.studentItems.length !==
                                            0 ? (
                                                this.state.studentItems.map(
                                                    (list, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {list.id}
                                                                </td>
                                                                <td>
                                                                    {/* <img
                                                                    src={
                                                                        list.profile_link !==
                                                                        null
                                                                            ? list.profile_link
                                                                            : profilepic
                                                                    }
                                                                    alt="User profile pic"
                                                                    width="20"
                                                                />{" "} */}
                                                                    {`${list.first_name} ${list.last_name}`}
                                                                </td>
                                                                <td>
                                                                    {list.email}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        list.contact
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        list.category
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {this.dateConversion(
                                                                        list.date_joined
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/hod/${this.props.match.params.hodId}/student/${list.id}`}
                                                                    >
                                                                        <button className="btn btn-sm btn-primary">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <EmptyData />
                                            )
                                        ) : (
                                            <Loading />
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HodStudentList;
