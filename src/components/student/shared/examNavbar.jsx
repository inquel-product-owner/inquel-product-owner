import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <Navbar
                    variant="light"
                    className="shadow-sm bg-white justify-content-center py-3"
                >
                    <div
                        className="row align-items-center"
                        style={{ width: "100%" }}
                    >
                        <div className="col-4 pl-0">
                            <p className="small font-weight-bold-600 primary-text mb-0">
                                {this.props.chapter_name}
                            </p>
                        </div>
                        <div className="col-4">
                            <h5 className="text-center mb-0 primary-text font-weight-bold">
                                {this.props.name}
                            </h5>
                        </div>
                        <div className="col-4 d-flex justify-content-end pr-0">
                            <button className="btn btn-light bg-white border-0 btn-sm mr-3">
                                <i className="fas fa-cog"></i>
                            </button>
                            <button
                                className="btn btn-light bg-white border-0 btn-sm"
                                onClick={this.props.goBack}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </Navbar>
            </>
        );
    }
}

export default Header;
