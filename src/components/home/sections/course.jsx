import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { baseUrl, homeURL } from "../../../shared/baseUrl";
import courseimg from "../../../assets/code.jpg";
import { TEMP } from "../../../redux/action";
import storeDispatch from "../../../redux/dispatch";
import DetailModal from "../../common/modal/courseDetail";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

const url = baseUrl + homeURL;
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const PopularCourse = () => {
    const [tab, setTab] = useState({ code: "ALL", title: "All" });
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState([]);
    const [showModal, toggleModal] = useState(false);
    const [selectedData, setData] = useState("");

    useEffect(() => {
        if (localStorage.getItem("Authorization")) {
            headers["Authorization"] = localStorage.getItem("Authorization");
        }
        loadCourses();
        loadCategory();
    }, []);

    const loadCourses = (tab) => {
        let path = tab
            ? `${url}/subscription/?category=${tab}`
            : `${url}/subscription/`;

        fetch(path, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    setCourses(result.data.results);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadCategory = () => {
        fetch(`${url}/subscription/category/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    setCategory(result.data.category);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            {showModal ? (
                <DetailModal
                    show={showModal}
                    onHide={() => toggleModal(false)}
                    data={selectedData}
                />
            ) : (
                ""
            )}

            <section className="course-container">
                <h1 className="section-heading">Popular course</h1>
                <div
                    className="container position-relative"
                    style={{ zIndex: 1 }}
                >
                    <div className="tabs">
                        {(category || []).map((list, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`tab ${
                                        tab.code === list.code ? "active" : ""
                                    }`}
                                    onClick={() => {
                                        setTab(list);
                                        loadCourses(list.code);
                                    }}
                                >
                                    <span className="icon">
                                        <i className="fas fa-layer-group fa-sm"></i>
                                    </span>{" "}
                                    {list.title}
                                </div>
                            );
                        })}
                    </div>
                    <div className="courses">
                        <Slider {...settings}>
                            {(courses || []).map((data, index) => {
                                return (
                                    <div
                                        className="px-md-2 px-2 mb-2"
                                        data-index={index}
                                        key={index}
                                    >
                                        <div className="card">
                                            <div className="px-2 pt-2">
                                                <img
                                                    src={
                                                        data
                                                            .subscription_file_link
                                                            .subscription_image_1
                                                            ? data
                                                                  .subscription_file_link
                                                                  .subscription_image_1
                                                            : courseimg
                                                    }
                                                    alt={data.title}
                                                    className="card-img-top shadow-sm"
                                                />
                                            </div>
                                            <div className="card-body p-3">
                                                <p className="title text-truncate">
                                                    {data.title}
                                                </p>
                                                <p className="description">
                                                    {data.description.substring(
                                                        0,
                                                        60
                                                    )}
                                                    {data.description
                                                        ? data.description
                                                              .length > 60
                                                            ? "..."
                                                            : ""
                                                        : ""}

                                                    <span
                                                        className="read-more ml-1"
                                                        onClick={() => {
                                                            toggleModal(true);
                                                            setData(data);
                                                        }}
                                                    >
                                                        Read more
                                                    </span>
                                                </p>
                                                <div className="d-flex align-items-center mb-3">
                                                    <span className="font-weight-bold light-bg primary-text rounded-pill small py-1 px-2 mr-2">
                                                        <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                                        {data.discounted_price}
                                                    </span>
                                                    {data.discounted_price <
                                                    data.total_price ? (
                                                        <span
                                                            className="text-muted small"
                                                            style={{
                                                                textDecoration:
                                                                    "line-through",
                                                            }}
                                                        >
                                                            <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                                            {data.total_price}
                                                        </span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                {data.added_to_cart ? (
                                                    <div className="mt-auto">
                                                        <Link className="text-decoration-none" to="/cart">
                                                            <button className="btn btn-primary btn-sm btn-block shadow-none">
                                                                Added to cart{" "}
                                                                <i className="fas fa-check-circle fa-sm ml-1"></i>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <div className="mt-auto enroll">
                                                        <button className="btn btn-primary btn-sm btn-block shadow-none">
                                                            Enroll now{" "}
                                                            <i className="fas fa-arrow-right fa-sm ml-1"></i>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    <div className="course-btn">
                        <Link to={`/catalog/${tab.code}`}>
                            <button
                                className="btn shadow-none"
                                onClick={() => storeDispatch(TEMP, tab)}
                            >
                                MORE COURSE{" "}
                                <i className="fas fa-arrow-right ml-1"></i>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="course-circle"></div>
            </section>
        </>
    );
};

export default PopularCourse;
