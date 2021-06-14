import React from "react";
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
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

const data = [
    {
        rank: 1,
        name: "Jhon Cristal",
        role: "PHP Developer",
        image: "https://randomuser.me/api/portraits/men/78.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut venenatis tellus in. Viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.",
    },
    {
        rank: 2,
        name: "Priya Crista",
        role: "SME Expert",
        image: "https://randomuser.me/api/portraits/women/85.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut venenatis tellus in. Viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.",
    },
    {
        rank: 3,
        name: "Alen joseph",
        role: "CEO",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut venenatis tellus in. Viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.",
    },
    {
        rank: 4,
        name: "John wick",
        role: "Doctor",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut venenatis tellus in. Viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.",
    },
    {
        rank: 5,
        name: "Harry lane",
        role: "Engineer",
        image: "https://randomuser.me/api/portraits/men/34.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut venenatis tellus in. Viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.",
    },
];

const Testimonial = () => {
    return data.length !== 0 ? (
        <section className="testimonial-container">
            <h1 className="section-heading">Testimonials</h1>
            <div className="container position-relative" style={{ zIndex: 1 }}>
                <Slider {...settings}>
                    {data.map((data, index) => {
                        return (
                            <div
                                className="px-md-4 px-2"
                                data-index={index}
                                key={index}
                            >
                                <div className="card card-body border-primary">
                                    <div className="d-flex align-items-center mb-3">
                                        <img
                                            src={data.image}
                                            alt="testimonial users"
                                            className="testimonial-user-img shadow"
                                        />
                                        <div className="ml-3">
                                            <p className="testimonial-rank">
                                                Rank {data.rank}
                                            </p>
                                            <p className="testimonial-role">
                                                {data.role}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="testimonial-text">
                                        <q>{data.text}</q>
                                    </p>
                                    <p className="testimonial-name">
                                        - {data.name}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <div className="testimonial-circle testimonial-top-left-circle"></div>
            <div className="testimonial-circle testimonial-bottom-right-circle"></div>
        </section>
    ) : (
        <></>
    );
};

export default Testimonial;
