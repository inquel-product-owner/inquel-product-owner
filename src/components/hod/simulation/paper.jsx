import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import Loading from "../../common/loader";
import AlertBox from "../../common/alert";
import storeDispatch from "../../../redux/dispatch";
import { PAPER } from "../../../redux/action";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
    simulation_name: state.content.simulation_name,
});

class HODSimulationPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            papers: [],
            simulationData: [
                {
                    paper_id: "",
                    paper_name: "",
                    paper_type: "",
                    total_marks: "",
                    time_duration: "",
                },
            ],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.simulationId = this.props.match.params.simulationId;
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    loadSimulationData = () => {
        fetch(
            `${this.url}/hod/subject/${this.subjectId}/simulation/${this.simulationId}/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    if (result.data.length !== 0) {
                        this.setState({
                            simulationData: result.data,
                            page_loading: false,
                        });
                    } else {
                        this.setState({
                            page_loading: false,
                        });
                    }
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    loadFilterData = () => {
        fetch(`${this.url}/hod/subject/${this.subjectId}/simulation/filters/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    papers: result.data.paper_type,
                    page_loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = `${this.props.simulation_name} - HOD | IQLabs`;

        this.loadFilterData();
        this.loadSimulationData();
    };

    handleInput = (index, event, type) => {
        let simulation = [...this.state.simulationData];
        if (type === "name") {
            simulation[index].paper_name = event.target.value;
        } else if (type === "paper") {
            simulation[index].paper_type = event.target.value;
        } else if (type === "marks") {
            simulation[index].total_marks = event.target.value;
        } else if (type === "duration") {
            simulation[index].time_duration = event.target.value;
        }

        this.setState({
            simulationData: simulation,
        });
    };

    handleSubmit = (index, event) => {
        event.preventDefault();

        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        });

        const simulation = [...this.state.simulationData];

        if (simulation[index].paper_name === "") {
            this.setState({
                errorMsg: "Enter the simulation exam paper name",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (simulation[index].paper_type === "") {
            this.setState({
                errorMsg: "Select a paper type",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (simulation[index].total_marks === "") {
            this.setState({
                errorMsg: "Enter total marks",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (simulation[index].time_duration === "") {
            this.setState({
                errorMsg: "Enter the duration",
                showErrorAlert: true,
                page_loading: false,
            });
        } else {
            if (simulation[index].paper_id === "") {
                this.handlePOST(simulation, index);
            } else {
                this.handlePATCH(simulation, index);
            }
        }
    };

    handlePOST = (simulation, index) => {
        fetch(
            `${this.url}/hod/subject/${this.subjectId}/simulation/${this.simulationId}/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    paper_name: simulation[index].paper_name,
                    paper_type: simulation[index].paper_type,
                    total_marks: Number(simulation[index].total_marks),
                    duration: Number(simulation[index].time_duration),
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            page_loading: true,
                        },
                        () => {
                            this.loadSimulationData();
                        }
                    );
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handlePATCH = (simulation, index) => {
        fetch(
            `${this.url}/hod/subject/${this.subjectId}/simulation/${this.simulationId}/`,
            {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    paper_id: simulation[index].paper_id,
                    paper_name: simulation[index].paper_name,
                    paper_type: simulation[index].paper_type,
                    total_marks: Number(simulation[index].total_marks),
                    duration: Number(simulation[index].time_duration),
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            page_loading: true,
                        },
                        () => {
                            this.loadSimulationData();
                        }
                    );
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleAdd = () => {
        let simulation = [...this.state.simulationData];
        simulation.push({
            paper_id: "",
            paper_name: "",
            paper_type: "",
            total_marks: "",
            time_duration: "",
        });
        this.setState({
            simulationData: simulation,
        });
    };

    handleDelete = (index, paper_id) => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            page_loading: true,
        });

        if (paper_id !== "") {
            fetch(
                `${this.url}/hod/subject/${this.subjectId}/simulation/${this.simulationId}/`,
                {
                    method: "DELETE",
                    headers: this.headers,
                    body: JSON.stringify({
                        paper_id: paper_id,
                    }),
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        this.setState({
                            successMsg: result.msg,
                            showSuccessAlert: true,
                        });

                        const simulation = [...this.state.simulationData];
                        simulation.splice(index, 1);
                        this.setState(
                            {
                                simulationData: simulation,
                            },
                            () => {
                                if (this.state.simulationData.length === 0) {
                                    simulation.push({
                                        paper_id: "",
                                        paper_name: "",
                                        paper_type: "",
                                        total_marks: "",
                                        time_duration: "",
                                    });
                                    this.setState({
                                        simulationData: simulation,
                                    });
                                }
                                this.loadSimulationData();
                            }
                        );
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            page_loading: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            const simulation = [...this.state.simulationData];
            simulation.splice(index, 1);
            this.setState(
                {
                    simulationData: simulation,
                    page_loading: false,
                },
                () => {
                    if (this.state.simulationData.length === 0) {
                        simulation.push({
                            paper_id: "",
                            paper_name: "",
                            paper_type: "",
                            total_marks: "",
                            time_duration: "",
                        });
                        this.setState({
                            simulationData: simulation,
                        });
                    }
                }
            );
        }
    };

    handlePublish = () => {
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        });

        fetch(`${this.url}/hod/subject/${this.subjectId}/simulation/publish/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                simulation_id: this.simulationId,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
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
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.subject_name}
                    togglenav={this.toggleSideNav}
                />

                {/* Alert message */}
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

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* ----- Breadcrumb ----- */}
                        <div className="row align-items-center mb-3">
                            <div className="col-md-6">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/hod">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link
                                                to="#"
                                                onClick={
                                                    this.props.history.goBack
                                                }
                                            >
                                                {this.props.subject_name}
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            {this.props.simulation_name}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6 text-right">
                                <button
                                    className="btn btn-primary btn-sm shadow-none"
                                    onClick={this.handlePublish}
                                    disabled={
                                        this.state.simulationData.length !== 0
                                            ? this.state.simulationData[0]
                                                  .paper_id === ""
                                                ? true
                                                : false
                                            : true
                                    }
                                >
                                    Publish
                                </button>
                            </div>
                        </div>

                        <div
                            className="card shadow-sm mb-3"
                            style={{ overflowX: "auto" }}
                        >
                            <div
                                className="table-responsive"
                                style={{ minWidth: "1000px" }}
                            >
                                <table className="table table-hover">
                                    <thead className="primary-bg text-white">
                                        <tr style={{ whiteSpace: "nowrap" }}>
                                            <th scope="col">
                                                Simulation Exams
                                            </th>
                                            <th scope="col">Papers</th>
                                            <th scope="col">Total Marks</th>
                                            <th scope="col">Time Duration</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.simulationData.length !== 0
                                            ? this.state.simulationData.map(
                                                  (item, index) => {
                                                      return (
                                                          <tr key={index}>
                                                              <td>
                                                                  <input
                                                                      type="text"
                                                                      className="form-control form-control-sm border-secondary"
                                                                      placeholder={`Simulation exam paper ${
                                                                          index +
                                                                          1
                                                                      }`}
                                                                      value={
                                                                          item.paper_name
                                                                      }
                                                                      onChange={(
                                                                          event
                                                                      ) =>
                                                                          this.handleInput(
                                                                              index,
                                                                              event,
                                                                              "name"
                                                                          )
                                                                      }
                                                                      autoFocus
                                                                      required
                                                                  />
                                                              </td>
                                                              <td>
                                                                  <select
                                                                      name="type"
                                                                      id="type"
                                                                      className="form-control form-control-sm border-secondary"
                                                                      onChange={(
                                                                          event
                                                                      ) =>
                                                                          this.handleInput(
                                                                              index,
                                                                              event,
                                                                              "paper"
                                                                          )
                                                                      }
                                                                      value={
                                                                          item.paper_type
                                                                      }
                                                                      required
                                                                  >
                                                                      <option value="">
                                                                          Select
                                                                          paper
                                                                      </option>
                                                                      {this
                                                                          .state
                                                                          .papers
                                                                          .length !==
                                                                      0
                                                                          ? this.state.papers.map(
                                                                                (
                                                                                    data,
                                                                                    index
                                                                                ) => {
                                                                                    return (
                                                                                        <option
                                                                                            value={
                                                                                                data
                                                                                            }
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                data
                                                                                            }
                                                                                        </option>
                                                                                    );
                                                                                }
                                                                            )
                                                                          : null}
                                                                  </select>
                                                              </td>
                                                              <td>
                                                                  <input
                                                                      className="form-control form-control-sm border-secondary"
                                                                      type="text"
                                                                      value={
                                                                          item.total_marks
                                                                      }
                                                                      onChange={(
                                                                          event
                                                                      ) =>
                                                                          this.handleInput(
                                                                              index,
                                                                              event,
                                                                              "marks"
                                                                          )
                                                                      }
                                                                      placeholder="Enter total marks"
                                                                  />
                                                              </td>
                                                              <td>
                                                                  <div
                                                                      className="input-group input-group-sm border-secondary rounded-lg"
                                                                      style={{
                                                                          overflow:
                                                                              "hidden",
                                                                      }}
                                                                  >
                                                                      <input
                                                                          className="form-control form-control-sm"
                                                                          type="text"
                                                                          value={
                                                                              item.time_duration
                                                                          }
                                                                          onChange={(
                                                                              event
                                                                          ) =>
                                                                              this.handleInput(
                                                                                  index,
                                                                                  event,
                                                                                  "duration"
                                                                              )
                                                                          }
                                                                          placeholder="Duration (Minutes)"
                                                                      />
                                                                      <div className="input-group-prepend">
                                                                          <span className="input-group-text border-0">
                                                                              Minutes
                                                                          </span>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                              <td className="d-flex justify-content-end">
                                                                  {item.paper_id !==
                                                                  "" ? (
                                                                      <Link
                                                                          to={`${this.props.match.url}/paper/${item.paper_id}`}
                                                                      >
                                                                          <button
                                                                              className="btn btn-primary-invert btn-sm shadow-sm"
                                                                              onClick={() => {
                                                                                  storeDispatch(
                                                                                      PAPER,
                                                                                      item.paper_name
                                                                                  );
                                                                              }}
                                                                          >
                                                                              Add
                                                                              +
                                                                          </button>
                                                                      </Link>
                                                                  ) : null}

                                                                  <Dropdown>
                                                                      <Dropdown.Toggle
                                                                          variant="white"
                                                                          className="btn btn-link btn-sm shadow-none caret-off ml-2"
                                                                      >
                                                                          <i className="fas fa-ellipsis-v"></i>
                                                                      </Dropdown.Toggle>

                                                                      <Dropdown.Menu
                                                                          className={`${
                                                                              this
                                                                                  .state
                                                                                  .simulationData
                                                                                  .length <=
                                                                              2
                                                                                  ? "position-fixed"
                                                                                  : "position-absolute"
                                                                          }`}
                                                                      >
                                                                          <Dropdown.Item
                                                                              onClick={(
                                                                                  event
                                                                              ) =>
                                                                                  this.handleSubmit(
                                                                                      index,
                                                                                      event
                                                                                  )
                                                                              }
                                                                          >
                                                                              <i className="far fa-save fa-sm mr-1"></i>{" "}
                                                                              Save
                                                                          </Dropdown.Item>
                                                                          <Dropdown.Item
                                                                              onClick={() =>
                                                                                  this.handleDelete(
                                                                                      index,
                                                                                      item.paper_id
                                                                                  )
                                                                              }
                                                                          >
                                                                              <i className="far fa-trash-alt fa-sm mr-1"></i>{" "}
                                                                              Delete
                                                                          </Dropdown.Item>
                                                                      </Dropdown.Menu>
                                                                  </Dropdown>
                                                              </td>
                                                          </tr>
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <button
                            className="btn btn-light bg-white btn-block shadow-sm shadow-none"
                            onClick={this.handleAdd}
                        >
                            Add Paper +
                        </button>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(HODSimulationPaper);
