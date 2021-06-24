import React from "react";
import { Modal } from "react-bootstrap";

const DetailModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >
            <Modal.Header closeButton>Course details</Modal.Header>
            <Modal.Body>
                <h6 className="mb-2">{props.data.title}</h6>
                <p className="mb-0">{props.data.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-link btn-sm shadow-none"
                    onClick={props.onHide}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailModal;
