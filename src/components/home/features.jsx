import React, { useEffect } from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";

const data = [
    {
        title: "Lorem ipsum is placeholder text",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacinia quis vel eros donec ac odio tempor. Quis ipsum suspendisse ultrices gravida dictum. Egestas dui id ornare arcu odio. Eleifend donec pretium vulputate sapien nec sagittis. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Vestibulum sed arcu non odio euismod lacinia. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Id nibh tortor id aliquet lectus. Sollicitudin nibh sit amet commodo. Dictum non consectetur a erat nam at.",
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        text: "Never trust a computer you can’t throw out a window. (Steve Wozniak) Hardware: The parts of a computer system that can be kicked. (Jeff Pesis) The only people who have anything to fear from free software are those whose products are worth even less. (David Emery) It would appear that we have reached the limits of what it is possible to achieve with computer technology, although one should be careful with such statements, as they tend to sound pretty silly in 5 years. (John Von Neumann, circa 1949)",
        image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        text: "Godfather ipsum dolor sit amet. Don't you know that I would use all of my power to prevent something like that from happening? I know it was you, Fredo. You broke my heart. You broke my heart! Don Corleone, I am honored and grateful that you have invited me to your home on the wedding day of your daughter. And may their first child be a masculine child. Friends and money ",
        image: "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        text: "Leading growth channels with the possibility to make the logo bigger. Synchronising core competencies while remembering to build ROI. Take thought leadership in order to funnel users. Grow growth hacking and try to build ROI. Funneling blue-sky thinking and then make the logo bigger.",
        image: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        text: "Growing dark social and then be transparent. Drive bleeding edge with the aim to take this offline. Consider awareness and try to be on brand. Inform below the fold to in turn create a better customer experience. Generating social but come up with a bespoke solution. Growing stakeholder engagement to target the low hanging fruit.",
        image: "https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=747&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        text: "Lead branding and above all, use best practice. Targeting custom solutions so that as an end result, we get buy in. Synchronising bleeding edge in order to innovate. Generate dark social and finally get buy in. Creating outside the box thinking to re-target key demographics. Create mobile-first design in order to target the low hanging fruit. Synchronising mobile-first design in order to make users into advocates.",
        image: "https://images.unsplash.com/photo-1589884629000-60c572c6ba7a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
];

const Features = () => {
    useEffect(() => {
        document.title = "Features | IQ Labs Academy";

        window.scrollTo(0, 0);
    }, []);

    const getTextOrderClass = (index) => {
        let className = "";

        if (index === 0) {
            className = "order-md-1";
        } else if (index % 2 === 0) {
            className = "order-md-1";
        } else {
            className = "order-md-2";
        }

        return className;
    };

    const getImageOrderClass = (index) => {
        let className = "";

        if (index === 0) {
            className = "order-md-2";
        } else if (index % 2 === 0) {
            className = "order-md-2";
        } else {
            className = "order-md-1";
        }

        return className;
    };

    return (
        <>
            <Header activeLink="features" />

            <header className="jumbotron">
                <h1>Feature Listing</h1>
                <p>Achieve your goals with Inquel</p>
            </header>

            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
            >
                <main className="container mb-5">
                    {data.map((item, index) => {
                        return (
                            <div
                                className="features-section shadow-sm"
                                key={index}
                            >
                                <div
                                    className={`features-text ${getTextOrderClass(
                                        index
                                    )}`}
                                >
                                    <div className="features-heading">
                                        {item.title}
                                    </div>
                                    <div className="features-subheading">
                                        {item.text}
                                    </div>
                                </div>
                                <div
                                    className={`feature-images ${getImageOrderClass(
                                        index
                                    )}`}
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                    }}
                                ></div>
                            </div>
                        );
                    })}
                </main>
            </ErrorBoundary>

            <Footer />
        </>
    );
};

export default Features;
