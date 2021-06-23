import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const category = [
    {
        code: "ALL",
        title: "all",
    },
    {
        code: "DEG",
        title: "degree",
    },
    {
        code: "SCH",
        title: "school",
    },
    {
        code: "MED",
        title: "Medical course",
    },
    {
        code: "UG",
        title: "Under graduate",
    },
];

const data = [
    {
        course_name: "Jhon Cristal",
        price: "1000",
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut venenatis tellus in. Viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.",
    },
    {
        course_name: "Priya Crista",
        price: "1000",
        image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut venenatis tellus in. Viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.",
    },
    {
        course_name: "Alen joseph",
        price: "1000",
        image: "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut venenatis tellus in. Viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.",
    },
    {
        course_name: "John wick",
        price: "1000",
        image: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut venenatis tellus in. Viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.",
    },
    {
        course_name: "Harry lane",
        price: "1000",
        image: "https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=747&q=80",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut venenatis tellus in. Viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.",
    },
];

const PopularCourse = () => {
    const [tab, setTab] = useState(category[0].code);

    return (
        <section className="course-container">
            <h1 className="section-heading">Popular course</h1>
            <div className="container position-relative" style={{ zIndex: 1 }}>
                <div className="tabs">
                    {category.map((list, index) => {
                        return (
                            <div
                                key={index}
                                className={`tab ${
                                    tab === list.code ? "active" : ""
                                }`}
                                onClick={() => setTab(list.code)}
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
                        {data.map((data, index) => {
                            return (
                                <div
                                    className="px-md-4 px-2 mb-2 h-100"
                                    data-index={index}
                                    key={index}
                                >
                                    <div className="card">
                                        <img
                                            src={data.image}
                                            alt={data.course_name}
                                            className="card-img-top"
                                        />
                                        <p className="title">
                                            {data.course_name}
                                        </p>
                                        <p className="description">
                                            {data.description}
                                        </p>
                                        <p className="enroll">
                                            Enroll now{" "}
                                            <i className="fas fa-arrow-right fa-sm ml-1"></i>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                <div className="course-btn">
                    <Link to={`/catalog/${tab}`}>
                        <button className="btn shadow-none">
                            MORE COURSE{" "}
                            <i className="fas fa-arrow-right ml-1"></i>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="course-circle"></div>
        </section>
    );
};

export default PopularCourse;
