import React from "react";
import "../shared/style.css";

const images = [
    "https://images.unsplash.com/photo-1491183672482-d0af0e44929d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    "https://images.unsplash.com/photo-1492999104346-cabaa757be8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
    "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
];

class Jumbotron extends React.Component {
    constructor() {
        super();
        this.state = { currentSlide: 0 };
        this.intervel = "";
        this.seconds = 10000;
    }

    componentDidMount = () => {
        this.intervel = setInterval(this.countdownTimer, this.seconds);
    };

    componentWillUnmount = () => {
        clearInterval(this.intervel);
    };

    handleNext = async () => {
        await clearInterval(this.intervel);
        await this.setState({
            currentSlide:
                this.state.currentSlide === images.length - 1
                    ? 0
                    : this.state.currentSlide + 1,
        });
        this.intervel = setInterval(this.countdownTimer, this.seconds);
    };

    handlePrev = async () => {
        await clearInterval(this.intervel);
        await this.setState({
            currentSlide:
                this.state.currentSlide === 0
                    ? images.length - 1
                    : this.state.currentSlide - 1,
        });
        this.intervel = setInterval(this.countdownTimer, this.seconds);
    };

    countdownTimer = () => {
        this.setState({
            currentSlide:
                this.state.currentSlide === images.length - 1
                    ? 0
                    : this.state.currentSlide + 1,
        });
    };

    render() {
        return (
            <section className="jumbotron-container">
                {images.map((image, index) => {
                    return index === this.state.currentSlide ? (
                        <div
                            key={index}
                            className="jumbotron-slide"
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                width: "100%",
                                height: "90vh",
                            }}
                        >
                            <div className="jumbotron-text">
                                <div className="jumbotron-heading">
                                    Become your most unstoppable yourself
                                </div>
                                <p className="jumbotron-subheading">
                                    Build skills with courses, certificates and
                                    degrees online from world-class universities
                                    and companies.
                                </p>
                                <div className="d-flex justify-content-start w-100">
                                    <button className="btn border-primary primary-text shadow-none mr-2">
                                        Get Started
                                    </button>
                                    <button className="btn btn-primary shadow-none px-4">
                                        Free Trial
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    );
                })}

                {/* ----- Arrow button ----- */}
                <button
                    className="jumbotron-arrow jumbotron-left-arrow"
                    onClick={this.handlePrev}
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <button
                    className="jumbotron-arrow jumbotron-right-arrow"
                    onClick={this.handleNext}
                >
                    <i className="fas fa-arrow-right"></i>
                </button>

                {/* ----- Dot button ----- */}
                <div className="jumbotron-dot">
                    {images.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`jumbotron-dot-btn ${
                                    index === this.state.currentSlide
                                        ? "active"
                                        : ""
                                }`}
                                onClick={async () => {
                                    await clearInterval(this.intervel);
                                    await this.setState({
                                        currentSlide: index,
                                    });
                                    this.intervel = setInterval(
                                        this.countdownTimer,
                                        this.seconds
                                    );
                                }}
                            ></div>
                        );
                    })}
                </div>
            </section>
        );
    }
}

export default Jumbotron;
