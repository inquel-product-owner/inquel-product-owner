import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import courseimg from "../../assets/code.jpg";
import { Link } from "react-router-dom";

class CarouselCard extends Component {
    constructor() {
        super();
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

    render() {
        return (
            <AliceCarousel
                mouseDragEnabled={true}
                responsive={this.responsive}
                infinite={true}
            >
                <div className="col-md-11">
                    <Link
                        to="/teacher"
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
                            <div className="card-body primary-bg text-white text-center p-2">
                                01
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-11">
                    <Link
                        to="/teacher"
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
                            <div className="card-body primary-bg text-white text-center p-2">
                                02
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-11">
                    <Link
                        to="/teacher"
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
                            <div className="card-body primary-bg text-white text-center p-2">
                                03
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-11">
                    <Link
                        to="/teacher"
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
                            <div className="card-body primary-bg text-white text-center p-2">
                                04
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-11">
                    <Link
                        to="/teacher"
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
                            <div className="card-body primary-bg text-white text-center p-2">
                                05
                            </div>
                        </div>
                    </Link>
                </div>
            </AliceCarousel>
        );
    }
}

export default CarouselCard;
