import React from "react";
import { Modal } from "react-bootstrap";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

export default function VideoModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="card">
                    <Player>
                        <source src={props.video.path} />
                    </Player>
                    <p className="mt-3 mb-0">
                        If video doesn't start playing,{" "}
                        <a
                            href={props.video.path}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Click here
                        </a>{" "}
                        to view the video in a seperate tab
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
}
