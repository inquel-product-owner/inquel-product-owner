import React, { Component } from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import courseimg from "../../assets/code.jpg";
import { Link } from "react-router-dom";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import Loading from "../shared/loader";
import AlertBox from "../shared/alert";
import Slider from "react-slick";
import { connect } from "react-redux";
import { waterMark } from "../shared/watermark";
import storeDispatcher from "../../redux/dispatch";
import { SUBJECT } from "../../redux/action";

const mapStateToProps = (state) => ({
    group_name: state.content.group_name,
    profile: state.user.profile,
});

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectItems: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
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
        document.title = `${this.props.group_name} - Student | IQLabs`;

        fetch(`${this.url}/student/subject/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        subjectItems: result.data,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                    },
                },
            ],
        };
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.group_name}
                    togglenav={this.toggleSideNav}
                />

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
                    style={waterMark(this.props.profile)}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-3">
                                <li className="breadcrumb-item">
                                    <Link to="/student">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    <span className="font-weight-bold-600">
                                        Group:{" "}
                                    </span>
                                    {this.props.group_name}
                                </li>
                            </ol>
                        </nav>

                        {/* Assigned subjects */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <h5>Subjects</h5>
                            </div>
                            <div className="card-body">
                                {this.state.subjectItems.length > 0 ? (
                                    <Slider {...settings}>
                                        {this.state.subjectItems.map(
                                            (data, index) => {
                                                return (
                                                    <div
                                                        className="px-3"
                                                        data-index={index}
                                                        key={index}
                                                    >
                                                        <div className="card">
                                                            <img
                                                                src={courseimg}
                                                                className="card-img-top"
                                                                alt="Course"
                                                            />
                                                            <div
                                                                className="text-right mt-2"
                                                                style={{
                                                                    position:
                                                                        "absolute",
                                                                    right: "5px",
                                                                }}
                                                            >
                                                                <button className="btn btn-primary-invert btn-sm">
                                                                    <i className="far fa-heart"></i>
                                                                </button>
                                                            </div>
                                                            <Link
                                                                to={`/student/subject/${data.id}`}
                                                                className="text-decoration-none"
                                                                onClick={() =>
                                                                    storeDispatcher(
                                                                        SUBJECT,
                                                                        data.subject_name
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className="card-body primary-bg text-white p-2"
                                                                    style={{
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    <div className="row">
                                                                        <div className="col-9">
                                                                            {
                                                                                data.subject_name
                                                                            }
                                                                        </div>
                                                                        <div className="col-3 text-right">
                                                                            4.{" "}
                                                                            <span className="small">
                                                                                <i className="fas fa-star ml-1 fa-sm"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </Slider>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Group);
