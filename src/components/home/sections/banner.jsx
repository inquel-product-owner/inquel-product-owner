import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <section className="banner-container">
            <div className="container">
                <Link to="/">
                    <img
                        src="https://mk0bannerflowss888vj.kinstacdn.com/app/uploads/blogpost_header_display_ad-1536x429.jpg"
                        alt="Banner"
                        className="img-fluid img-responsive"
                    />
                </Link>
            </div>
        </section>
    );
};

export default Banner;
