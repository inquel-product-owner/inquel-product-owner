import React, { Component } from "react";
import Wrapper from "./wrapper";
import { Link } from "react-router-dom";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import CarouselCard from "../common/owlCarousel";
import Footer from "../home/shared/footer";
import Loading from "../common/loader";
import AlertBox from "../common/alert";
import { connect } from "react-redux";
import storeDispatch from "../../redux/dispatch";
import { GROUP, SUBSCRIPTION } from "../../redux/action";
import Slider from "react-slick";
import { GROUP_THUMBNAIL, SUBJECT_THUMBNAIL } from "../../shared/constant";

const mapStateToProps = (state) => ({
    profile: state.user.profile,
});

const Group = (props) => {
    return props.group && Object.keys(props.group).length !== 0 ? (
        props.profile && Object.entries(props.profile).length !== 0 ? (
            props.profile.is_independent_student === false ? (
                <div className="card shadow-sm mb-4">
                    <div className="card-header">
                        <h5 className="mb-0">Group</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <Link
                                    to={`/dashboard/group/${props.group.id}`}
                                    className="text-decoration-none"
                                    onClick={() =>
                                        storeDispatch(
                                            GROUP,
                                            props.group.group_name
                                        )
                                    }
                                >
                                    <div className="card">
                                        <img
                                            src={GROUP_THUMBNAIL}
                                            className="card-img-top"
                                            alt={props.group.group_name}
                                        />
                                        <div
                                            className="card-body primary-bg text-white p-2"
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            {props.group.group_name}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null
        ) : null
    ) : null;
};

class Courses extends Component {
    constructor() {
        super();
        this.state = {
            subscriptions: [],

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

    componentDidMount = () => {
        this.fetchCourses();
    };

    fetchCourses = (path) => {
        let API = path ? path : `${this.url}/student/sub/`;
        fetch(API, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    let data = [...this.state.subscriptions];
                    data.push(...result.data.results);
                    this.setState(
                        {
                            subscriptions: data,
                        },
                        () => {
                            if (result.data.next !== null) {
                                this.fetchCourses(result.data.next);
                            } else {
                                this.setState({
                                    page_loading: false,
                                });
                            }
                        }
                    );
                } else {
                    this.setState({
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Cannot show courses at the moment!",
                    showErrorAlert: true,
                    page_loading: false,
                });
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
            ],
        };
        return (
            <>
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

                {this.state.subscriptions &&
                this.state.subscriptions.length !== 0 ? (
                    <div className="card shadow-sm mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">Subscribed Course</h5>
                        </div>
                        <div className="card-body">
                            <Slider {...settings}>
                                {(this.state.subscriptions || []).map(
                                    (data, index) => {
                                        return (
                                            <div
                                                className="px-3"
                                                data-index={index}
                                                key={index}
                                            >
                                                <Link
                                                    to={`/dashboard/subscription/${data.subscription_id}`}
                                                    className="text-decoration-none"
                                                    onClick={() =>
                                                        storeDispatch(
                                                            SUBSCRIPTION,
                                                            data.title
                                                        )
                                                    }
                                                >
                                                    <div className="card">
                                                        <img
                                                            src={
                                                                data
                                                                    .subscription_file_link
                                                                    .subscription_image_1
                                                                    ? data
                                                                          .subscription_file_link
                                                                          .subscription_image_1
                                                                    : SUBJECT_THUMBNAIL
                                                            }
                                                            className="card-img-top"
                                                            alt={data.title}
                                                        />
                                                        <div
                                                            className="card-body primary-bg text-white p-2"
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            {data.title}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    }
                                )}
                            </Slider>
                        </div>
                    </div>
                ) : null}

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </>
        );
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupData: {},

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

    componentDidMount = () => {
        document.title = "Dashboard - Student | IQLabs";

        window.scrollTo(0, 0);

        this.fetchGroup();
    };

    fetchGroup = () => {
        fetch(`${this.url}/student/group/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        groupData: result.data,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Cannot show group data at the moment!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    render() {
        return (
            <>
                <Wrapper
                    header="Dashboard"
                    activeLink="dashboard"
                    history={this.props.history}
                    hideBackButton={true}
                >
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
                    {/* Welcome */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-body text-center p-4">
                            <h3 className="primary-text mb-0">WELCOME BACK</h3>
                        </div>
                    </div>

                    {/* Courses */}
                    <Courses />

                    {/* Group section */}
                    <Group
                        profile={this.props.profile}
                        group={this.state.groupData}
                    />

                    {/* Recommended course */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col-md-3">
                                    <h5 className="mb-0">Recommended Course</h5>
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
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h5 className="mb-0">Featured Topics</h5>
                        </div>
                        <div className="card-body"></div>
                    </div>

                    {/* Loading component */}
                    {this.state.page_loading ? <Loading /> : ""}
                </Wrapper>

                {/* Footer */}
                <Footer />
            </>
        );
    }
}

export default connect(mapStateToProps)(Dashboard);
