import React from "react";
import { Navbar } from "react-bootstrap";

function Header(props) {
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
                        <p className="small font-weight-bold-600 primary-text text-truncate mb-0">
                            {props.chapter_name}
                        </p>
                    </div>
                    <div className="col-4">
                        <h5 className="text-center mb-0 primary-text font-weight-bold-600">
                            {props.name}
                        </h5>
                    </div>
                    <div className="col-4 text-right pr-0">
                        <button
                            className="btn btn-light bg-white border-0 shadow-none btn-sm"
                            onClick={props.goBack}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </Navbar>
        </>
    );
}

export default Header;
