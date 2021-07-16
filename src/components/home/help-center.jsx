import React, { useState, useEffect } from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import Loading from "../common/loader";
import { Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const data = [
    {
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget est lorem ipsum dolor sit amet consectetur. Imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor. Amet porttitor eget dolor morbi non arcu risus quis varius",
    },
    {
        title: "Nulla pellentesque dignissim enim sit amet venenatis",
        description:
            "Nulla pellentesque dignissim enim sit amet venenatis. Malesuada proin libero nunc consequat interdum varius sit amet. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi",
    },
    {
        title: "Imperdiet sed euismod nisi porta lorem mollis aliquam",
        description:
            "Imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor. Amet porttitor eget dolor morbi non arcu risus quis varius. Nisl nisi scelerisque eu ultrices. Nulla pellentesque dignissim enim sit amet venenatis. Malesuada proin libero nunc consequat interdum varius sit amet",
    },
    {
        title: "Sociis natoque penatibus et magnis dis parturient montes",
        description:
            "Tristique senectus et netus et. Porttitor leo a diam sollicitudin. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus. Nunc sed id semper risus in. Dolor sit amet consectetur adipiscing elit. Tempus urna et pharetra pharetra massa massa ultricies. Aenean et tortor at risus",
    },
];

const HelpCenter = () => {
    const [activeKey, setActiveKey] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Help center | IQ Labs Academy";

        setLoading(false);
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />

            <header className="jumbotron">
                <h1 className="mb-0">Help center</h1>
            </header>

            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
            >
                <main className="container mb-5">
                    <div className="row justify-content-center mb-3">
                        <div className="col-lg-10 col-md-11">
                            <Accordion>
                                {data.map((list, index) => {
                                    return (
                                        <div
                                            className={`bg-white rounded-lg shadow-sm mb-2`}
                                            key={index}
                                        >
                                            <Accordion.Toggle
                                                as={Card}
                                                eventKey={index + 1}
                                                className={`${
                                                    activeKey === index + 1
                                                        ? "text-danger"
                                                        : "text-dark"
                                                }`}
                                                style={{
                                                    padding: "20px",
                                                    cursor: "default",
                                                }}
                                                onClick={() => {
                                                    if (
                                                        activeKey ===
                                                        index + 1
                                                    ) {
                                                        setActiveKey();
                                                    } else {
                                                        setActiveKey(index + 1);
                                                    }
                                                }}
                                            >
                                                <div className="d-flex align-items-center flex-nowrap">
                                                    <div className="w-100">
                                                        {list.title}
                                                    </div>
                                                    {activeKey === index + 1 ? (
                                                        <i className="fas fa-minus ml-1"></i>
                                                    ) : (
                                                        <i className="fas fa-plus ml-1"></i>
                                                    )}
                                                </div>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse
                                                eventKey={index + 1}
                                            >
                                                <Card.Body
                                                    className="text-dark pt-0"
                                                    style={{
                                                        fontSize: "15px",
                                                        lineHeight: "25px",
                                                    }}
                                                >
                                                    {list.description}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </div>
                                    );
                                })}
                            </Accordion>
                        </div>
                    </div>

                    <div className="text-center text-secondary">
                        Not sure what you are looking for?{" "}
                        <Link to="/contact" className="primary-text">
                            Contact Us
                        </Link>
                    </div>
                </main>

                {/* Loading component */}
                {isLoading ? <Loading /> : ""}
            </ErrorBoundary>

            <Footer />
        </>
    );
};

export default HelpCenter;
