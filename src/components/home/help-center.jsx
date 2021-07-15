import React, { useState, useEffect } from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import Loading from "../common/loader";
import { Accordion, Card } from "react-bootstrap";

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
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-11">
                            <Accordion>
                                {data.map((list, index) => {
                                    return (
                                        <div
                                            className={`rounded-lg mb-2`}
                                            key={index}
                                        >
                                            <Accordion.Toggle
                                                as={Card}
                                                eventKey={index + 1}
                                                className={`${
                                                    activeKey === index + 1
                                                        ? "text-danger"
                                                        : "primary-text"
                                                }`}
                                                style={{ borderRadius: "4px" }}
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
                                                {list.title}
                                            </Accordion.Toggle>

                                            <Accordion.Collapse
                                                eventKey={index + 1}
                                            >
                                                <Card.Body className="bg-light">
                                                    {list.description}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </div>
                                    );
                                })}
                            </Accordion>
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

export default HelpCenter;
