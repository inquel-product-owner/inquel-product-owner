import React, { Component } from "react";
import Wrapper from "./wrapper";
import { Tabs, Tab, OverlayTrigger, Tooltip, Dropdown } from "react-bootstrap";
import courseimg from "../../assets/code.jpg";
import { baseUrl, adminPathUrl, inquelAdminUrl } from "../../shared/baseUrl";
import Loading from "../common/loader";
import AlertBox from "../common/alert";
import SubscriptionTable from "../common/table/subscription";
import { paginationCount } from "../../shared/constant";
import Paginations from "../common/pagination";
import SubscriptionModal from "./subscriptionModal";
import CourseTable from "../common/table/course";
import { SingleContentDeleteModal } from "../common/modal/contentManagementModal";

const Statistics = (props) => {
    return (
        <>
            <p className="small font-weight-bold">Quick Stats</p>
            <div className="row mb-4">
                <div className="col-md-3 col-6 mb-3 mb-md-0">
                    <div className="card shadow-sm p-2 h-100">
                        <div className="card-body">
                            <p className="small font-weight-bold mb-2">
                                Total Courses
                            </p>
                            <h3 className="font-weight-bold">28,345</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3 mb-md-0">
                    <div className="card shadow-sm p-2 h-100">
                        <div className="card-body">
                            <p className="small font-weight-bold mb-2">
                                Pending Approval
                            </p>
                            <h3
                                className="font-weight-bold"
                                style={{
                                    color: "tomato",
                                }}
                            >
                                120
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3 mb-md-0">
                    <div className="card shadow-sm p-2 h-100">
                        <div className="card-body">
                            <p className="small font-weight-bold mb-2">
                                New Courses this month
                            </p>
                            <h3 className="font-weight-bold">
                                89{" "}
                                <span className="text-success">
                                    <i className="fas fa-angle-double-up ml-2 fa-sm"></i>
                                </span>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3 mb-md-0">
                    <div className="card shadow-sm p-2 h-100">
                        <div className="card-body">
                            <p className="small font-weight-bold mb-2">
                                Online learning
                            </p>
                            <h3 className="font-weight-bold">
                                46%{" "}
                                <span className="text-danger">
                                    <i className="fas fa-angle-double-down ml-2 fa-sm"></i>
                                </span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const CourseCard = (props) => {
    const returnImage = (list) => {
        let URL = "";
        if (list.subscription_file_link) {
            if (list.subscription_file_link.subscription_image_1) {
                URL = list.subscription_file_link.subscription_image_1;
            } else {
                URL = courseimg;
            }
        } else if (list.course_thumbnail_url) {
            URL = list.course_thumbnail_url;
        } else {
            URL = courseimg;
        }

        return URL;
    };

    return (
        <>
            <div className="row mt-3">
                {props.data.results && props.data.results.length !== 0
                    ? props.data.results.map((list, index) => {
                          return (
                              <div
                                  className="col-md-3 col-sm-6 mb-3"
                                  key={index}
                              >
                                  <div className="card shadow-sm h-100">
                                      <img
                                          src={returnImage(list)}
                                          className="card-img-top"
                                          alt={
                                              list.course_name
                                                  ? list.course_name
                                                  : list.title
                                          }
                                      />
                                      <div className="card-body primary-bg text-white p-3">
                                          <p className="mb-0">
                                              {list.course_name
                                                  ? list.course_name
                                                  : list.title}
                                          </p>
                                          {!props.course ? (
                                              <div className="mt-2">
                                                  <div className="d-flex small mb-1">
                                                      <span className="font-weight-bold bg-white primary-text rounded-pill small py-1 px-2 mr-1">
                                                          ₹{" "}
                                                          {
                                                              list.discounted_price
                                                          }
                                                      </span>
                                                      <span className="font-weight-bold bg-white primary-text rounded-pill small py-1 px-2">
                                                          <i className="far fa-clock"></i>{" "}
                                                          {`${list.duration_in_months} Months ${list.duration_in_days} Days`}
                                                      </span>
                                                  </div>
                                                  <p
                                                      className="small mb-0"
                                                      title={list.description}
                                                  >
                                                      {list.description.substring(
                                                          0,
                                                          200
                                                      )}
                                                      {list.description
                                                          ? list.description
                                                                .length > 200
                                                              ? "..."
                                                              : ""
                                                          : ""}
                                                  </p>
                                              </div>
                                          ) : (
                                              ""
                                          )}
                                      </div>
                                      <div
                                          className="text-right mt-2"
                                          style={{
                                              position: "absolute",
                                              right: "7px",
                                          }}
                                      >
                                          <Dropdown>
                                              <Dropdown.Toggle
                                                  variant="white"
                                                  className="btn text-dark bg-light btn-sm shadow-none caret-off"
                                              >
                                                  <i className="fas fa-ellipsis-v"></i>
                                              </Dropdown.Toggle>

                                              <Dropdown.Menu>
                                                  {props.course ? (
                                                      <Dropdown.Item
                                                          onClick={async () => {
                                                              await props.handleID(
                                                                  list.course_id
                                                              );
                                                              props.handlePublishUnpublish();
                                                          }}
                                                      >
                                                          <i className="fas fa-sign-out-alt mr-1"></i>{" "}
                                                          Unpublish
                                                      </Dropdown.Item>
                                                  ) : props.published ? (
                                                      <Dropdown.Item
                                                          onClick={async () => {
                                                              await props.handleID(
                                                                  list.subscription_id
                                                              );
                                                              props.handlePublishUnpublish();
                                                          }}
                                                      >
                                                          <i className="fas fa-sign-out-alt mr-1"></i>{" "}
                                                          Unpublish
                                                      </Dropdown.Item>
                                                  ) : (
                                                      <>
                                                          <Dropdown.Item
                                                              onClick={async () => {
                                                                  await props.handleID(
                                                                      list.subscription_id
                                                                  );
                                                                  props.handlePublishUnpublish();
                                                              }}
                                                          >
                                                              <i className="fas fa-upload mr-1"></i>{" "}
                                                              Publish
                                                          </Dropdown.Item>
                                                          <Dropdown.Item
                                                              onClick={() =>
                                                                  props.toggleEdit(
                                                                      list
                                                                  )
                                                              }
                                                          >
                                                              <i className="far fa-edit mr-1"></i>{" "}
                                                              Edit
                                                          </Dropdown.Item>
                                                          <Dropdown.Item
                                                              onClick={() =>
                                                                  props.toggleDelete(
                                                                      list
                                                                  )
                                                              }
                                                          >
                                                              <i className="far fa-trash-alt mr-1"></i>{" "}
                                                              Delete
                                                          </Dropdown.Item>
                                                      </>
                                                  )}
                                              </Dropdown.Menu>
                                          </Dropdown>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : "No data to display..."}
            </div>
            {props.data.count > paginationCount ? (
                <div className="d-flex justify-content-center w-100 mt-3">
                    <Paginations
                        activePage={props.activePage}
                        totalItemsCount={props.data.count}
                        onChange={props.handleOnChange.bind(this)}
                    />
                </div>
            ) : null}
        </>
    );
};

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubscriptionModal: false,
            showSubscriptionEditModal: false,
            showSubscriptionDeleteModal: false,
            isTableView: true,
            activeTab: "published",

            hod_courses: {},
            published: {},
            unpublished: {},
            selectedData: {},

            activePublishedPage: 1,
            activeUnpublishPage: 1,
            activeHODCoursePage: 1,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.url = baseUrl + adminPathUrl;
        this.inquelURL = baseUrl + inquelAdminUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    toggleSubscriptionModal = () => {
        this.setState({
            showSubscriptionModal: !this.state.showSubscriptionModal,
        });
    };

    // ----- Data loading -----
    loadPublishedSubscription = (page) => {
        let URL =
            page && page > 1
                ? `${this.inquelURL}/subscription/list/publish/?page=${page}`
                : `${this.inquelURL}/subscription/list/publish/`;
        fetch(URL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        published: result.data,
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
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    loadUnpublishedSubscription = (page) => {
        let URL =
            page && page > 1
                ? `${this.inquelURL}/subscription/?page=${page}`
                : `${this.inquelURL}/subscription/`;
        fetch(URL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        unpublished: result.data,
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
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    loadHODCourses = (page) => {
        let URL =
            page && page > 1
                ? `${this.inquelURL}/hod/course/?page=${page}`
                : `${this.inquelURL}/hod/course/`;
        fetch(URL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        hod_courses: result.data,
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
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    componentDidMount = () => {
        document.title = "Dashboard - Admin | IQLabs";

        this.loadPublishedSubscription();
        this.loadUnpublishedSubscription();
        this.loadHODCourses();
    };

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showSubscriptionModal: false,
                showSubscriptionEditModal: false,
                showSubscriptionDeleteModal: false,
            });
        }, 1000);
        this.loadUnpublishedSubscription();
    };

    // ----- Publish & Unpublish -----
    handleID = (id) => {
        this.setState({
            selectedData: [],
        });
        try {
            let temp = [];

            if (Array.isArray(id)) {
                temp = id;
            } else {
                temp.push(id);
            }

            this.setState({
                selectedData: temp,
            });
        } catch (error) {
            console.log(error);
            this.setState({
                errorMsg: "Something went wrong!",
                showErrorAlert: true,
                page_loading: false,
            });
        }
    };

    handlePublishUnpublish = async () => {
        this.setState({
            page_loading: true,
        });

        await (this.state.selectedData || []).forEach(async (id, index) => {
            let URL =
                this.state.activeTab === "published"
                    ? `${this.inquelURL}/subscription/${id}/unpublish/`
                    : this.state.activeTab === "unpublished"
                    ? `${this.inquelURL}/subscription/${id}/publish/`
                    : `${this.inquelURL}/hod/course/${id}/unpublish/`;

            await fetch(URL, {
                method: "POST",
                headers: this.headers,
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        this.setState({
                            successMsg: result.msg,
                            showSuccessAlert: true,
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
                        errorMsg: "Something went wrong!",
                        showErrorAlert: true,
                        page_loading: false,
                    });
                });
        });

        if (this.state.activeTab === "hod_course") {
            setTimeout(() => {
                this.loadHODCourses(this.state.activeHODCoursePage);
            }, 1000);
        } else {
            setTimeout(() => {
                this.loadPublishedSubscription(this.state.activePublishedPage);
                this.loadUnpublishedSubscription(
                    this.state.activeUnpublishPage
                );
            }, 1000);
        }
    };

    // ----- Pagination -----
    handlePublishedPageChange(pageNumber) {
        this.setState(
            { activePublishedPage: pageNumber, page_loading: true },
            () => {
                this.loadPublishedData(this.state.activePublishedPage);
            }
        );
    }

    handleUnpublishPageChange(pageNumber) {
        this.setState(
            { activeUnpublishPage: pageNumber, page_loading: true },
            () => {
                this.loadUnpublishedData(this.state.activeUnpublishPage);
            }
        );
    }

    handleHODCoursePageChange(pageNumber) {
        this.setState(
            { activeHODCoursePage: pageNumber, page_loading: true },
            () => {
                this.loadHODCourses(this.state.activeHODCoursePage);
            }
        );
    }

    render() {
        return (
            <Wrapper
                history={this.props.history}
                header="Admin"
                activeLink="dashboard"
                hideBackButton={true}
            >
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

                {/* Subscription create modal */}
                {this.state.showSubscriptionModal ? (
                    <SubscriptionModal
                        show={this.state.showSubscriptionModal}
                        onHide={this.toggleSubscriptionModal}
                        formSubmission={this.formSubmission}
                    />
                ) : (
                    ""
                )}

                {/* Subscription update modal */}
                {this.state.showSubscriptionEditModal ? (
                    <SubscriptionModal
                        show={this.state.showSubscriptionEditModal}
                        onHide={() =>
                            this.setState({
                                showSubscriptionEditModal: false,
                            })
                        }
                        formSubmission={this.formSubmission}
                        data={this.state.selectedData}
                    />
                ) : (
                    ""
                )}

                {/* Subscription delete modal */}
                <SingleContentDeleteModal
                    show={this.state.showSubscriptionDeleteModal}
                    onHide={() =>
                        this.setState({
                            showSubscriptionDeleteModal: false,
                        })
                    }
                    formSubmission={this.formSubmission}
                    url={`${this.inquelURL}/subscription/${this.state.selectedData.subscription_id}/`}
                    name={this.state.selectedData.title}
                    type="subscription"
                />

                {/* Stats */}
                <Statistics />

                {/* Filter area */}
                <div className="row align-items-center mb-3">
                    <div className="col-6">
                        <div
                            className="btn-group btn-group-toggle"
                            data-toggle="buttons"
                        >
                            <OverlayTrigger
                                key="top1"
                                placement="top"
                                overlay={
                                    <Tooltip id="tooltip" className="text-left">
                                        Table View
                                    </Tooltip>
                                }
                            >
                                <label
                                    className={`btn btn-light ${
                                        this.state.isTableView ? "active" : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="options"
                                        id="tableview"
                                        onChange={() => {
                                            this.setState({
                                                isTableView: true,
                                            });
                                        }}
                                    />{" "}
                                    <i className="fas fa-th-list"></i>
                                </label>
                            </OverlayTrigger>
                            <OverlayTrigger
                                key="top2"
                                placement="top"
                                overlay={
                                    <Tooltip id="tooltip" className="text-left">
                                        Card View
                                    </Tooltip>
                                }
                            >
                                <label
                                    className={`btn btn-light ${
                                        this.state.isTableView ? "" : "active"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="options"
                                        id="cardview"
                                        onChange={() => {
                                            this.setState({
                                                isTableView: false,
                                            });
                                        }}
                                    />{" "}
                                    <i className="fas fa-th-large"></i>
                                </label>
                            </OverlayTrigger>
                        </div>
                    </div>
                    <div className="col-6 text-right">
                        {this.state.activeTab === "hod_course" ? (
                            <button
                                className="btn btn-primary btn-sm shadow-none"
                                onClick={this.toggleSubscriptionModal}
                                disabled={
                                    this.state.hod_courses.results &&
                                    this.state.hod_courses.results.length === 0
                                        ? true
                                        : false
                                }
                            >
                                Create Subscription
                            </button>
                        ) : (
                            ""
                        )}
                        {this.state.isTableView ? (
                            this.state.activeTab === "published" ? (
                                <button
                                    className="btn btn-primary btn-sm shadow-none"
                                    onClick={this.handlePublishUnpublish}
                                    disabled={
                                        this.state.published.results &&
                                        this.state.published.results.length ===
                                            0
                                            ? true
                                            : false
                                    }
                                >
                                    Unpublish
                                </button>
                            ) : this.state.activeTab === "hod_course" ? (
                                <button
                                    className="btn btn-primary btn-sm shadow-none ml-1"
                                    onClick={this.handlePublishUnpublish}
                                    disabled={
                                        this.state.hod_courses.results &&
                                        this.state.hod_courses.results
                                            .length === 0
                                            ? true
                                            : false
                                    }
                                >
                                    Unpublish
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary btn-sm shadow-none"
                                    onClick={this.handlePublishUnpublish}
                                    disabled={
                                        this.state.unpublished.results &&
                                        this.state.unpublished.results
                                            .length === 0
                                            ? true
                                            : false
                                    }
                                >
                                    Publish
                                </button>
                            )
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                {/* ---------- Table view ---------- */}
                {this.state.isTableView ? (
                    <Tabs
                        activeKey={this.state.activeTab}
                        onSelect={(key) =>
                            this.setState({
                                activeTab: key,
                            })
                        }
                    >
                        {/* ----- Published subscription table ----- */}
                        <Tab eventKey="published" title="Published">
                            <div className="card shadow-sm">
                                <SubscriptionTable
                                    data={this.state.published.results || []}
                                    handleID={this.handleID}
                                />
                                <div className="card-body p-3">
                                    {this.state.published.count >
                                    paginationCount ? (
                                        <Paginations
                                            activePage={
                                                this.state.activePublishedPage
                                            }
                                            totalItemsCount={
                                                this.state.published.count
                                            }
                                            onChange={this.handlePublishedPageChange.bind(
                                                this
                                            )}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </Tab>

                        {/* ----- Unpublished subscription table ----- */}
                        <Tab
                            eventKey="unpublished"
                            title="Ready for publishing"
                        >
                            <div className="card shadow-sm">
                                <SubscriptionTable
                                    data={this.state.unpublished.results || []}
                                    handleID={this.handleID}
                                    toggleEdit={(data) => {
                                        this.setState({
                                            showSubscriptionEditModal:
                                                !this.state
                                                    .showSubscriptionEditModal,
                                            selectedData: data,
                                        });
                                    }}
                                    toggleDelete={(data) =>
                                        this.setState({
                                            showSubscriptionDeleteModal:
                                                !this.state
                                                    .showSubscriptionDeleteModal,
                                            selectedData: data,
                                        })
                                    }
                                    showAction={true}
                                />
                                <div className="card-body p-3">
                                    {this.state.unpublished.count >
                                    paginationCount ? (
                                        <Paginations
                                            activePage={
                                                this.state.activeUnpublishPage
                                            }
                                            totalItemsCount={
                                                this.state.unpublished.count
                                            }
                                            onChange={this.handleUnpublishPageChange.bind(
                                                this
                                            )}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </Tab>

                        {/* ----- HOD Courses table ----- */}
                        <Tab eventKey="hod_course" title="HOD Course">
                            <div className="card shadow-sm">
                                <CourseTable
                                    data={this.state.hod_courses.results || []}
                                    handleID={this.handleID}
                                />
                                <div className="card-body p-3">
                                    {this.state.hod_courses.count >
                                    paginationCount ? (
                                        <Paginations
                                            activePage={
                                                this.state.activeHODCoursePage
                                            }
                                            totalItemsCount={
                                                this.state.hod_courses.count
                                            }
                                            onChange={this.handleHODCoursePageChange.bind(
                                                this
                                            )}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                ) : (
                    // --------------- Card view ---------------
                    <Tabs
                        activeKey={this.state.activeTab}
                        onSelect={(key) =>
                            this.setState({
                                activeTab: key,
                            })
                        }
                    >
                        {/* ----- Published subscription card ----- */}
                        <Tab eventKey="published" title="Published">
                            <CourseCard
                                data={this.state.published}
                                activePage={this.state.activePublishedPage}
                                handleOnChange={this.handlePublishedPageChange}
                                handleID={this.handleID}
                                handlePublishUnpublish={
                                    this.handlePublishUnpublish
                                }
                                published={true}
                            />
                        </Tab>

                        {/* ----- Unpublished subscription card ----- */}
                        <Tab
                            eventKey="unpublished"
                            title="Ready for publishing"
                        >
                            <CourseCard
                                data={this.state.unpublished}
                                activePage={this.state.activeUnpublishPage}
                                handleOnChange={this.handleUnpublishPageChange}
                                handleID={this.handleID}
                                handlePublishUnpublish={
                                    this.handlePublishUnpublish
                                }
                                toggleEdit={(data) => {
                                    this.setState({
                                        showSubscriptionEditModal:
                                            !this.state
                                                .showSubscriptionEditModal,
                                        selectedData: data,
                                    });
                                }}
                                toggleDelete={(data) =>
                                    this.setState({
                                        showSubscriptionDeleteModal:
                                            !this.state
                                                .showSubscriptionDeleteModal,
                                        selectedData: data,
                                    })
                                }
                                unpublished={true}
                            />
                        </Tab>

                        {/* ----- HOD Courses card ----- */}
                        <Tab eventKey="hod_course" title="HOD Course">
                            <CourseCard
                                data={this.state.hod_courses}
                                activePage={this.state.activeHODCoursePage}
                                handleOnChange={this.handleHODCoursePageChange}
                                handleID={this.handleID}
                                handlePublishUnpublish={
                                    this.handlePublishUnpublish
                                }
                                course={true}
                            />
                        </Tab>
                    </Tabs>
                )}

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default AdminDashboard;
