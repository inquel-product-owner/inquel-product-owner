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
// import tawkTo from "tawkto-react";

class Home extends React.Component {
    componentDidMount = () => {
        document.title = "IQ Labs Academy";

        // var Tawk_API = Tawk_API || {},
        //     Tawk_LoadStart = new Date();
        // (function () {
        //     var s1 = document.createElement("script"),
        //         s0 = document.getElementsByTagName("script")[0];
        //     s1.async = true;
        //     s1.src = "https://embed.tawk.to/60e83166649e0a0a5ccb5b03/1fa5g1ui2";
        //     s1.charset = "UTF-8";
        //     s1.id = "tawk-to-react";
        //     s1.setAttribute("crossorigin", "*");
        //     s0.parentNode.insertBefore(s1, s0);
        //     // document.getElementById("tawk-to-component").appendChild(s1);
        // })();

        // tawkTo('60e83166649e0a0a5ccb5b03', '1fa5g1ui2');
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
                    <PopularCourse
                        history={this.props.history}
                        match={this.props.match}
                    />
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
