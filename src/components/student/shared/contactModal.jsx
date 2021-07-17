import React, { useState } from "react";
import { Modal, Spinner, Alert } from "react-bootstrap";
// import sgMail from "@sendgrid/mail";

const ContactInquelModal = (props) => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [showLoader, setLoader] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [showErrorAlert, setErrorAlert] = useState(false);
    const [showSuccessAlert, setSuccessAlert] = useState(false);

    const handleSend = () => {
        setLoader(true);
        setErrorAlert(false);
        setSuccessAlert(false);

        if (subject === "") {
            setResponseMsg("Subject field is required!");
            setErrorAlert(true);
            setLoader(false);
        } else if (message === "") {
            setResponseMsg("Message field is required!");
            setErrorAlert(true);
            setLoader(false);
        } else {
            setResponseMsg("Your message has been sent!");
            setSuccessAlert(true);
            setLoader(false);
        }
    };

    // const handleSend = () => {
    //     setLoader(true);

    //     sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);
    //     const msg = {
    //         to: process.env.REACT_APP_INQUEL_SUPPORT_EMAIL,
    //         from: process.env.REACT_APP_INQUEL_SUPPORT_EMAIL,
    //         subject: "Sending with Twilio SendGrid is Fun",
    //         text: "and easy to do anywhere, even with Node.js",
    //         html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    //     };

    //     sgMail
    //         .send(msg, {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //         .then((response) => {
    //             console.log(response[0].statusCode);
    //             console.log(response[0].headers);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             if (error.response) {
    //                 console.error(error.response.body);
    //             }
    //         });
    // };

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>Contact Inquel</Modal.Header>
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

                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="form-control borders"
                        placeholder="Enter the subject"
                        onChange={(event) => setSubject(event.target.value)}
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows="6"
                        className="form-control borders"
                        placeholder="Type your message here"
                        onChange={(event) => setMessage(event.target.value)}
                    ></textarea>
                </div>
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
                    Send message
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ContactInquelModal;
