import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import courseimg from "../../assets/code.jpg";
import { Link } from "react-router-dom";

class CarouselCard extends Component {
    constructor() {
        super();
        this.state = { width: "" };
        this.responsive = {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1024: {
                items: 4,
            },
        };
    }

    componentDidMount = () => {
        this.setState({
            width: window.innerWidth,
        });
    };

    render() {
        return (
            <AliceCarousel
                mouseDragEnabled={true}
                disableDotsControls={this.state.width < 768 ? true : false}
                responsive={this.responsive}
                infinite={true}
            >
                <div className="col-md-11">
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <div
                            className="card"
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={courseimg}
                                className="card-img-top"
                                alt="Course"
                            />
                            <div className="card-body primary-bg text-white p-2">
                                <div className="row">
                                    <div className="col-9">Subject</div>
                                    <div className="col-3 text-right">
                                        4.{" "}
                                        <span className="small">
                                            <i className="fas fa-star ml-1 fa-sm"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-11">
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <div
                            className="card"
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={courseimg}
                                className="card-img-top"
                                alt="Course"
                            />
                            <div className="card-body primary-bg text-white p-2">
                                <div className="row">
                                    <div className="col-9">Subject</div>
                                    <div className="col-3 text-right">
                                        4.{" "}
                                        <span className="small">
                                            <i className="fas fa-star ml-1 fa-sm"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-11">
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <div
                            className="card"
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={courseimg}
                                className="card-img-top"
                                alt="Course"
                            />
                            <div className="card-body primary-bg text-white p-2">
                                <div className="row">
                                    <div className="col-9">Subject</div>
                                    <div className="col-3 text-right">
                                        4.{" "}
                                        <span className="small">
                                            <i className="fas fa-star ml-1 fa-sm"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-11">
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <div
                            className="card"
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={courseimg}
                                className="card-img-top"
                                alt="Course"
                            />
                            <div className="card-body primary-bg text-white p-2">
                                <div className="row">
                                    <div className="col-9">Subject</div>
                                    <div className="col-3 text-right">
                                        4.{" "}
                                        <span className="small">
                                            <i className="fas fa-star ml-1 fa-sm"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-11">
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <div
                            className="card"
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={courseimg}
                                className="card-img-top"
                                alt="Course"
                            />
                            <div className="card-body primary-bg text-white p-2">
                                <div className="row">
                                    <div className="col-9">Subject</div>
                                    <div className="col-3 text-right">
                                        4.{" "}
                                        <span className="small">
                                            <i className="fas fa-star ml-1 fa-sm"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </AliceCarousel>
        );
    }
}

export default CarouselCard;
