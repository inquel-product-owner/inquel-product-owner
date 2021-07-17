import React, { useState } from "react";
import { Modal, Spinner, Alert } from "react-bootstrap";

const FeedbackModal = (props) => {
    const [message, setMessage] = useState("");

    const [showLoader, setLoader] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [showErrorAlert, setErrorAlert] = useState(false);
    const [showSuccessAlert, setSuccessAlert] = useState(false);

    const handleSend = () => {
        setLoader(true);
        setErrorAlert(false)
        setSuccessAlert(false)

        if (message === "") {
            setResponseMsg("Enter your feedback!");
            setErrorAlert(true);
            setLoader(false);
        } else {
            setResponseMsg("Your feedback has been sent!");
            setSuccessAlert(true);
            setLoader(false);
        }
    };

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>Feedback</Modal.Header>
            <Modal.Body>
                <Alert
                    variant="danger"
                    show={showErrorAlert}
                    onClose={() => setErrorAlert(false)}
                    dismissible
                >
                    {responseMsg}
                </Alert>
                <Alert
                    variant="success"
                    show={showSuccessAlert}
                    onClose={() => setSuccessAlert(false)}
                    dismissible
                >
                    {responseMsg}
                </Alert>

                <label htmlFor="message">Message</label>
                <textarea
                    name="message"
                    id="message"
                    rows="6"
                    className="form-control borders"
                    placeholder="Type your message here"
                    onChange={(event) => setMessage(event.target.value)}
                ></textarea>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-primary btn-block shadow-none"
                    onClick={handleSend}
                >
                    {showLoader ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="mr-2"
                        />
                    ) : (
                        <i className="far fa-paper-plane mr-2"></i>
                    )}{" "}
                    Send feedback
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default FeedbackModal;
