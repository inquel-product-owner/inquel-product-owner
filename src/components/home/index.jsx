import React from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import Jumbotron from "./sections/jumbotron";
import Features from "./sections/features";
import PopularCourse from "./sections/course";
import StudyPlanner from "./sections/studyPlanner";
import Testimonial from "./sections/testimonial";
import Banner from "./sections/banner";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import "./shared/style.css";

class Home extends React.Component {
    componentDidMount = () => {
        document.title = "IQ Labs Academy";
    };

    render() {
        return (
            <>
                <Header />
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => window.location.reload()}
                >
                    <Jumbotron />
                </ErrorBoundary>
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => window.location.reload()}
                >
                    <Features />
                </ErrorBoundary>
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => window.location.reload()}
                >
                    <PopularCourse />
                </ErrorBoundary>
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => window.location.reload()}
                >
                    <StudyPlanner />
                </ErrorBoundary>
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => window.location.reload()}
                >
                    <Testimonial />
                </ErrorBoundary>
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => window.location.reload()}
                >
                    <Banner />
                </ErrorBoundary>
                <Footer />
            </>
        );
    }
}

export default Home;
