import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function FlashCard({ name, lat, lng }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="wrapper">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header shadow-sm border-sm scorecycletest ">
                        <div className="row align-items-center">
                            <div className="col-md-1 text-right">
                                <h6 className="mr-2">STUD</h6>
                            </div>
                            <div className="col-md-1 text-left">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Concept
                                </button>
                            </div>
                            <div className="col-md-1">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Practice
                                </button>
                            </div>
                            <div className="col-md-1 text-right">
                                <h6 className="mr-2 ">Play</h6>
                            </div>
                            <div className="col-md-2 ">
                                {" "}
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Match
                                </button>
                            </div>
                            <div className="col-md-6 text-right align-items-center">
                                <button className="icon border-0  mr-2 buttton">
                                    <i class="fas fa-bookmark mr-2"></i>{" "}
                                </button>
                                <button className=" icon border-0 mr-2 buttton">
                                    <i class="fas fa-volume-up buttton"></i>
                                </button>
                                <button className="icon border-0 buttton">
                                    <i class="fas fa-volume-mute"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-3">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white border-0 text-right">
                            <button
                                className="border-0 bg-white"
                            >
                                <i class="fas fa-expand icon"></i>
                            </button>
                        </div>
                        <div className="card-body shadow-sm">
                            {/* npm add react-full-screen */}
                                <div className="card h-100 w-100 d-flex align-items-center">
                                    <div className="card-body align-items-center">
                                        <ReactCardFlip
                                            isFlipped={isFlipped}
                                            flipDirection="vertical"
                                        >
                                            <div
                                                className="card h-100 w-100 border-0 location-front-item text-center yrt"
                                                onClick={handleClick}
                                            >
                                                <h1 className="diaplay1">
                                                    Nice Work!
                                                </h1>
                                                <h3>
                                                    You Just Completed
                                                    "Course/Topic Name"
                                                </h3>
                                                <h3>
                                                    Study with your game
                                                    practice
                                                </h3>
                                                <button className="border-0 bg-white icon">
                                                    Learn
                                                </button>
                                                <h4>
                                                    Study again with flashcards
                                                </h4>
                                            </div>
                                            <div
                                                className="location-back-item text-center"
                                                onClick={handleClick}
                                            >
                                                <h3 className="icon text-left ml-2">
                                                    Definition/Title
                                                </h3>
                                                <p className="text-justify mr-2 ml-2">
                                                    Lorem Ipsum is simply dummy
                                                    text of the printing and
                                                    typesetting industry. Lorem
                                                    Ipsum has been the
                                                    industry's standard dummy
                                                    text ever since the 1500s,
                                                    when an unknown printer took
                                                    a galley of type and
                                                    scrambled it to make a type
                                                    specimen book. It has
                                                    survived not only five
                                                    centuries,
                                                </p>
                                                <p className="text-justify mr-2 ml-2">
                                                    Lorem Ipsum is simply dummy
                                                    text of the printing and
                                                    typesetting industry. Lorem
                                                    Ipsum has been the
                                                    industry's standard dummy
                                                    text ever since the 1500s,
                                                    when an unknown printer took
                                                    a galley of type and
                                                    scrambled it to make a type
                                                    specimen book. It has
                                                    survived not only five
                                                    centuries,
                                                </p>
                                            </div>
                                        </ReactCardFlip>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="card w-100 mt-5 mb-0">
                    <div className="card-footer shadow-sm buttton1">
                        <div className="row">
                            <div className="col-md-2">
                                <button className="border-0 mr-2 icon buttton1">
                                    <i class="fas fa-keyboard"></i>
                                </button>
                                <button className="border-0 icon buttton1">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                            <div className="col-md-8 ">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item disabled">
                                            <a
                                                className="page-link"
                                                href="activity"
                                                tabindex="-1"
                                                aria-disabled="true"
                                            >
                                                Previous
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a className="page-link" href="activity">
                                                1
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a className="page-link" href="activity">
                                                2
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a className="page-link" href="activity">
                                                3
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a className="page-link" href="5">
                                                Next
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-md-2 text-right">
                                <button className="border-0 buttton1">
                                    <i class="fas fa-play-circle icon border-0"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
