import React, { Component } from "react";
import Header from "../shared/examNavbar";
import { baseUrl, studentUrl } from "../../../shared/baseUrl.js";
import AlertBox from "../../common/alert";
import Loading from "../../common/loader";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

const mapStateToProps = (state) => ({
    course_name: state.content.course_name,
    temp: state.storage.temp,
    simulation_name: state.content.simulation_name,
    paper_name: state.content.paper_name,
});

function InstructionModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >
            <Modal.Header closeButton>Exam instructions</Modal.Header>
            <Modal.Body>
                <div style={{ minHeight: "50vh" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut pharetra sit amet aliquam id diam maecenas
                    ultricies. Quis varius quam quisque id diam vel quam
                    elementum. Amet justo donec enim diam vulputate ut pharetra.
                    Dolor sit amet consectetur adipiscing elit pellentesque
                    habitant. Purus viverra accumsan in nisl nisi. Semper risus
                    in hendrerit gravida rutrum quisque non tellus orci.
                    Molestie ac feugiat sed lectus vestibulum. Magna fermentum
                    iaculis eu non diam phasellus vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque
                    purus. Nulla aliquet porttitor lacus luctus accumsan tortor
                    posuere ac. Tempus quam pellentesque nec nam aliquam sem et
                    tortor. At risus viverra adipiscing at in tellus integer
                    feugiat. Non sodales neque sodales ut etiam. Enim facilisis
                    gravida neque convallis a cras. Amet luctus venenatis lectus
                    magna fringilla urna porttitor. Tempus imperdiet nulla
                    malesuada pellentesque elit eget. Augue neque gravida in
                    fermentum et sollicitudin. Volutpat lacus laoreet non
                    curabitur gravida arcu ac. Et malesuada fames ac turpis.
                </div>
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
}

class SimulationSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simulation_data: [],
            showInstruction: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subscriptionId = this.props.match.params.subscriptionId;
        this.courseId = this.props.match.params.courseId;
        this.simulationId = this.props.match.params.simulationId;
        this.paperId = this.props.match.params.paperId;
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        document.title = `${this.props.simulation_name} - Student | IQLabs`;

        this.loadSimulationData();
    };

    loadSimulationData = () => {
        fetch(
            `${this.url}/student/sub/${this.subscriptionId}/course/${this.courseId}/simulation/${this.simulationId}/paper/${this.paperId}/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        simulation_data: result.data,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Cannot load simulation data at the moment!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    handleExamStart = () => {
        this.setState({
            page_loading: true,
        });

        fetch(
            `${this.url}/student/sub/${this.subscriptionId}/course/${this.courseId}/simulation/${this.simulationId}/paper/${this.paperId}/start/`,
            {
                method: "POST",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.props.history.push(`${this.props.match.url}/exam`);
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Cannot start test at the moment!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    render() {
        return (
            <>
                {/* Navbar */}
                <Header
                    name={this.props.course_name}
                    chapter_name={this.props.simulation_name}
                    goBack={this.props.history.goBack}
                />

                {/* ALert message */}
                <AlertBox
                    errorMsg={this.state.errorMsg}
                    successMsg={this.state.successMsg}
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={this.state.showSuccessAlert}
                    toggleSuccessAlert={() => {
                        this.setState({
                            showSuccessAlert: false,
                        });
                    }}
                    toggleErrorAlert={() => {
                        this.setState({
                            showErrorAlert: false,
                        });
                    }}
                />

                {/* Intruction modal */}
                <InstructionModal
                    show={this.state.showInstruction}
                    onHide={() =>
                        this.setState({
                            showInstruction: false,
                        })
                    }
                />

                <div className="exam-section">
                    <div
                        className="container-fluid"
                        style={{ marginBottom: "6rem" }}
                    >
                        {/* ----- Section details ----- */}
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="row align-items-center font-weight-bold-600 primary-text mb-3">
                                    <div className="col-md-6 text-center text-md-left mb-2 mb-md-0">
                                        {this.props.paper_name}
                                    </div>
                                    <div className="col text-center text-md-right">
                                        Duration:{" "}
                                        {this.props.temp.time_duration} mins
                                    </div>
                                    <div className="col text-center text-md-right">
                                        Total marks:{" "}
                                        {this.props.temp.total_marks}
                                    </div>
                                </div>

                                <div className="card card-body secondary-bg shadow-sm mb-3">
                                    <div className="row align-items-center font-weight-bold-600 small">
                                        <div className="col-md-5 text-center text-md-left font-weight-bold mb-2 mb-md-0">
                                            Section description
                                        </div>
                                        <div className="col-md-7">
                                            <div className="row align-items-center">
                                                <div className="col-4">
                                                    Total Questions
                                                </div>
                                                <div className="col-4">
                                                    Answer any
                                                </div>
                                                <div className="col-4">
                                                    Section wise marks
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {this.state.simulation_data &&
                                this.state.simulation_data.length !== 0
                                    ? this.state.simulation_data.map(
                                          (data, index) => {
                                              return (
                                                  <div
                                                      className="card card-body light-bg shadow-sm p-3 mb-2"
                                                      key={index}
                                                  >
                                                      <div className="row align-items-center small">
                                                          <div className="col-md-5 text-center text-md-left font-weight-bold-600 mb-2 mb-md-0">
                                                              {
                                                                  data.section_name
                                                              }
                                                          </div>
                                                          <div className="col-md-7">
                                                              <div className="row">
                                                                  <div className="col-4">
                                                                      {
                                                                          data.total_questions
                                                                      }{" "}
                                                                      Questions
                                                                  </div>
                                                                  <div className="col-4">
                                                                      {
                                                                          data.any_questions
                                                                      }{" "}
                                                                      Questions
                                                                  </div>
                                                                  <div className="col-4">
                                                                      {
                                                                          data.marks
                                                                      }{" "}
                                                                      Mark
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              );
                                          }
                                      )
                                    : ""}
                            </div>
                        </div>
                    </div>

                    {/* ----- Exam instruction ----- */}
                    <div className="light-bg fixed-bottom w-100 p-3">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-2 mb-md-0">
                                    <i className="fas fa-info-circle"></i>{" "}
                                    Please read the{" "}
                                    <span
                                        className="primary-text font-weight-bold-600"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            this.setState({
                                                showInstruction: true,
                                            })
                                        }
                                    >
                                        instructions{" "}
                                        <i className="fas fa-external-link-alt fa-xs mr-1"></i>
                                    </span>{" "}
                                    carefully before starting the exam
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                    {/* for large screen */}
                                    <button
                                        className="btn btn-primary shadow-none d-none d-md-block"
                                        onClick={this.handleExamStart}
                                    >
                                        Start Exam
                                    </button>
                                    {/* for small screen */}
                                    <button
                                        className="btn btn-primary btn-sm btn-block shadow-none d-block d-md-none"
                                        onClick={this.handleExamStart}
                                    >
                                        Start Exam
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </>
        );
    }
}

export default connect(mapStateToProps)(SimulationSection);
