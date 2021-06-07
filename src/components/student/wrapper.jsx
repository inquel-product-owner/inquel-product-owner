import React from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import { waterMark } from "../common/function/watermark";

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.header}
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink={this.props.activeLink}
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                    style={
                        this.props.waterMark ? waterMark(this.props.waterMark) : {}
                    }
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* Children component */}
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onReset={() => window.location.reload()}
                        >
                            {this.props.children}
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wrapper;
