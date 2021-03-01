import React, { Component } from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import courseimg from "../../assets/code.jpg";
import { Link } from "react-router-dom";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import CarouselCard from "../sharedComponents/owlCarousel";
import Footer from "./shared/footer";
import Loading from "../sharedComponents/loader";
import AlertModal from "../sharedComponents/alertModal";
import Slider from "react-slick";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectItems: [],
            page_loading: true,
            showAlertModal: false,
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

        fetch(`${this.url}/student/subject`, {
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
                        alertMsg: result.detail ? result.detail : result.msg,
                        showAlertModal: true,
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
                <Header name="Dashboard" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* ALert modal */}
                {this.state.showAlertModal ? (
                    <AlertModal
                        show={this.state.showAlertModal}
                        msg={this.state.alertMsg}
                        goBack={this.props.history.goBack}
                    />
                ) : null}

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

                        {/* Assigned subjects */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>Assigned subjects</h5>
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
                                                                  src={
                                                                      courseimg
                                                                  }
                                                                  className="card-img-top"
                                                                  alt="Course"
                                                              />
                                                              <div
                                                                  className="text-right mt-2"
                                                                  style={{
                                                                      position:
                                                                          "absolute",
                                                                      right:
                                                                          "5px",
                                                                  }}
                                                              >
                                                                  <button className="btn btn-primary-invert btn-sm">
                                                                      <i className="far fa-heart"></i>
                                                                  </button>
                                                              </div>
                                                              <Link
                                                                  to={`/student/subject/${data.id}`}
                                                                  className="text-decoration-none"
                                                              >
                                                                  <div
                                                                      className="card-body primary-bg text-white p-2"
                                                                      style={{
                                                                          cursor:
                                                                              "pointer",
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
                                </Slider>):null}
                            </div>
                        </div>

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

export default Dashboard;
