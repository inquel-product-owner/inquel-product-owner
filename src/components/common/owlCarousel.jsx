import React, { Component } from "react";
import Slider from "react-slick";
import courseimg from "../../assets/code.jpg";
import { Link } from "react-router-dom";

class CarouselCard extends Component {
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
            <Slider {...settings}>
                <div className="px-3">
                    <div className="card">
                        <img
                            src={courseimg}
                            className="card-img-top"
                            alt="Course"
                        />
                        <div
                            className="text-right mt-2"
                            style={{
                                position: "absolute",
                                right: "5px",
                            }}
                        >
                            <button className="btn btn-primary-invert btn-sm mr-1">
                                <i className="far fa-heart"></i>
                            </button>
                            <button className="btn btn-primary btn-sm mr-1">
                                <i className="fas fa-cart-plus"></i>
                            </button>
                        </div>
                        <Link to="" className="text-decoration-none">
                            <div
                                className="card-body primary-bg text-white p-2"
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <div className="row">
                                    <div className="col-9">01</div>
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
                <div className="px-3">
                    <div className="card">
                        <img
                            src={courseimg}
                            className="card-img-top"
                            alt="Course"
                        />
                        <div
                            className="text-right mt-2"
                            style={{
                                position: "absolute",
                                right: "5px",
                            }}
                        >
                            <button className="btn btn-primary-invert btn-sm mr-1">
                                <i className="far fa-heart"></i>
                            </button>
                            <button className="btn btn-primary btn-sm mr-1">
                                <i className="fas fa-cart-plus"></i>
                            </button>
                        </div>
                        <Link to="" className="text-decoration-none">
                            <div
                                className="card-body primary-bg text-white p-2"
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <div className="row">
                                    <div className="col-9">02</div>
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
                <div className="px-3">
                    <div className="card">
                        <img
                            src={courseimg}
                            className="card-img-top"
                            alt="Course"
                        />
                        <div
                            className="text-right mt-2"
                            style={{
                                position: "absolute",
                                right: "5px",
                            }}
                        >
                            <button className="btn btn-primary-invert btn-sm mr-1">
                                <i className="far fa-heart"></i>
                            </button>
                            <button className="btn btn-primary btn-sm mr-1">
                                <i className="fas fa-cart-plus"></i>
                            </button>
                        </div>
                        <Link to="" className="text-decoration-none">
                            <div
                                className="card-body primary-bg text-white p-2"
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <div className="row">
                                    <div className="col-9">03</div>
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
                <div className="px-3">
                    <div className="card">
                        <img
                            src={courseimg}
                            className="card-img-top"
                            alt="Course"
                        />
                        <div
                            className="text-right mt-2"
                            style={{
                                position: "absolute",
                                right: "5px",
                            }}
                        >
                            <button className="btn btn-primary-invert btn-sm mr-1">
                                <i className="far fa-heart"></i>
                            </button>
                            <button className="btn btn-primary btn-sm mr-1">
                                <i className="fas fa-cart-plus"></i>
                            </button>
                        </div>
                        <Link to="" className="text-decoration-none">
                            <div
                                className="card-body primary-bg text-white p-2"
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <div className="row">
                                    <div className="col-9">04</div>
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
                <div className="px-3">
                    <div className="card">
                        <img
                            src={courseimg}
                            className="card-img-top"
                            alt="Course"
                        />
                        <div
                            className="text-right mt-2"
                            style={{
                                position: "absolute",
                                right: "5px",
                            }}
                        >
                            <button className="btn btn-primary-invert btn-sm mr-1">
                                <i className="far fa-heart"></i>
                            </button>
                            <button className="btn btn-primary btn-sm mr-1">
                                <i className="fas fa-cart-plus"></i>
                            </button>
                        </div>
                        <Link to="" className="text-decoration-none">
                            <div
                                className="card-body primary-bg text-white p-2"
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <div className="row">
                                    <div className="col-9">05</div>
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
            </Slider>
        );
    }
}

export default CarouselCard;
