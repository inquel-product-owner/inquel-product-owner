import React, { useState, useEffect } from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import Loading from "../common/loader";

const Asterik = () => {
    return <span className="text-danger">*</span>;
};

const ContactUs = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Contact Us | IQ Labs Academy";

        setLoading(false);
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />

            <header className="jumbotron">
                <h1>Contact us</h1>
                <p>Get in touch and let us know how we can help!</p>
            </header>

            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
            >
                <main className="container mb-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="card">
                                <div className="card-body">
                                    <form autoComplete="off">
                                        <div className="row">
                                            <div className="col-12 form-group">
                                                <label htmlFor="name">
                                                    Name <Asterik />
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="form-control form-control-lg borders"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="email">
                                                    Email <Asterik />
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="form-control form-control-lg borders"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="phone">
                                                    Phone number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    className="form-control form-control-lg borders"
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="location">
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    id="location"
                                                    className="form-control form-control-lg borders"
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="qualification">
                                                    Qualification
                                                </label>
                                                <input
                                                    type="text"
                                                    name="qualification"
                                                    id="qualification"
                                                    className="form-control form-control-lg borders"
                                                />
                                            </div>
                                            <div className="col-12 form-group">
                                                <label htmlFor="subject">
                                                    Subject <Asterik />
                                                </label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    id="subject"
                                                    className="form-control form-control-lg borders"
                                                    required
                                                />
                                            </div>
                                            <div className="col-12 form-group">
                                                <label htmlFor="message">
                                                    Message <Asterik />
                                                </label>
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    rows="10"
                                                    className="form-control form-control-lg borders"
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="col-md-6 mb-1">
                                                <button className="btn btn-primary btn-block shadow-none">
                                                    <i className="fas fa-paper-plane mr-1"></i>{" "}
                                                    Send message
                                                </button>
                                            </div>
                                        </div>
                                        <small className="text-muted">
                                            Field marked as{" "}
                                            <span className="text-danger font-weight-bold-600">
                                                *
                                            </span>{" "}
                                            are mandatory fields
                                        </small>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Loading component */}
                {isLoading ? <Loading /> : ""}
            </ErrorBoundary>

            <Footer />
        </>
    );
};

export default ContactUs;
