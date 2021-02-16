import React from "react";
import { Modal } from "react-bootstrap";

function AlertModal(props) {
    return (
        <Modal
            show={props.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className="text-center py-5">
                <h2 className="display-4 text-danger mb-3">
                    <i className="fas fa-times-circle"></i>
                </h2>
                <h5 className="mb-4">{props.msg}</h5>
                <div className="row justify-content-center">
                    <div className="col-6 col-md-4">
                        <button
                            className="btn btn-primary btn-block btn-sm"
                            onClick={props.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm mr-2"></i>Back
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AlertModal;
