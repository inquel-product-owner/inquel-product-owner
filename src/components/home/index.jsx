import React from "react";
import Header from "./shared/navbar";
import Jumbotron from "./home_components/jumbotron";
import Features from "./home_components/features";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";

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
                </ErrorBoundary>
            </>
        );
    }
}

export default Home;
