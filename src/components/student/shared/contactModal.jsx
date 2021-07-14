import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import sgMail from "@sendgrid/mail";

const ContactInquelModal = (props) => {
    const [showLoader, setLoader] = useState(false);

    const handleSend = () => {
        setLoader(true);
        sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);
        const msg = {
            to: process.env.REACT_APP_INQUEL_SUPPORT_EMAIL,
            from: process.env.REACT_APP_INQUEL_SUPPORT_EMAIL,
            subject: "Sending with Twilio SendGrid is Fun",
            text: "and easy to do anywhere, even with Node.js",
            html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        };

        sgMail
            .send(msg, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response[0].statusCode);
                console.log(response[0].headers);
            })
            .catch((error) => {
                console.error(error);
                if (error.response) {
                    console.error(error.response.body);
                }
            });
    };

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
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="form-control borders"
                        placeholder="Enter the subject"
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
