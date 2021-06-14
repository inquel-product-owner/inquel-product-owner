import React from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import Jumbotron from "./shared/sections/jumbotron";
import Features from "./shared/sections/features";
import StudyPlanner from "./shared/sections/studyPlanner";
import Testimonial from "./shared/sections/testimonial";
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
                    <Features />
                    <StudyPlanner />
                    <Testimonial />
                </ErrorBoundary>
                <Footer />
            </>
        );
    }
}

export default Home;
