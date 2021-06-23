import React, { useEffect } from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";

const data = [
    {
        title: "Lorem ipsum is placeholder text",
        price: "1000",
        duration: "3 Months 10 Days",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacinia quis vel eros donec ac odio tempor. Quis ipsum suspendisse ultrices gravida dictum.",
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        price: "1000",
        duration: "3 Months 10 Days",
        text: "Never trust a computer you can’t throw out a window. (Steve Wozniak) Hardware: The parts of a computer system that can be kicked. (Jeff Pesis) The only people who have anything to fear from free software are those whose products are worth even less.",
        image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        price: "1000",
        duration: "3 Months 10 Days",
        text: "Godfather ipsum dolor sit amet. Don't you know that I would use all of my power to prevent something like that from happening? I know it was you, Fredo. You broke my heart.",
        image: "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        price: "1000",
        duration: "3 Months 10 Days",
        text: "Leading growth channels with the possibility to make the logo bigger. Synchronising core competencies while remembering to build ROI. Take thought leadership in order to funnel users.",
        image: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        price: "1000",
        duration: "3 Months 10 Days",
        text: "Growing dark social and then be transparent. Drive bleeding edge with the aim to take this offline. Consider awareness and try to be on brand. Inform below the fold to in turn create a better customer experience.",
        image: "https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=747&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        price: "1000",
        duration: "3 Months 10 Days",
        text: "Lead branding and above all, use best practice. Targeting custom solutions so that as an end result, we get buy in. Synchronising bleeding edge in order to innovate. Generate dark social and finally get buy in.",
        image: "https://images.unsplash.com/photo-1589884629000-60c572c6ba7a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
];

const Catalog = () => {
    useEffect(() => {
        document.title = "Course catalog | IQ Labs Academy";
    }, []);

    return (
        <>
            <Header activeLink="course" />

            <header className="jumbotron">
                <h1 className="mb-0">Degree Courses</h1>
            </header>

            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
            >
                <main className="catalog container">
                    <div className="row">
                        {data.map((item, index) => {
                            return (
                                <div className="col-md-4 mb-5" key={index}>
                                    <div className="card shadow-sm h-100">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="card-img-top"
                                        />
                                        <p className="title">{item.title}</p>
                                        <div
                                            className="card-body p-3"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div className="d-flex mb-2">
                                                <span className="font-weight-bold light-bg primary-text rounded-pill small py-1 px-2 mr-1">
                                                    <i className="fas fa-rupee-sign"></i>{" "}
                                                    {item.price}
                                                </span>
                                                <span className="font-weight-bold light-bg primary-text rounded-pill small py-1 px-2">
                                                    <i className="far fa-clock"></i>{" "}
                                                    {item.duration}
                                                </span>
                                            </div>
                                            <p className="description">
                                                {item.text}
                                            </p>
                                            <div className="form-row mt-auto">
                                                <div className="col-6">
                                                    <button className="btn btn-primary font-weight-bold-600 shadow-none btn-block">
                                                        Buy Now
                                                    </button>
                                                </div>
                                                <div className="col-6">
                                                    <button className="btn bg-transparent border-primary primary-text font-weight-bold-600 shadow-none btn-block">
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-hover"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </ErrorBoundary>

            <Footer />
        </>
    );
};

export default Catalog;
