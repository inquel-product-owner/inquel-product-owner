import React, { Component } from "react";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, inquelAdminUrl } from "../../shared/baseUrl";
import Select from "react-select";
import axios from "axios";

export default class SubscriptionModal extends Component {
    constructor() {
        super();
        this.state = {
            filter: {
                category: [],
                sub_category: [],
                discipline: [],
                levels: [],
                subjects: [],
                type: [],
                board: [],
                hod: [],
            },
            selected: {
                category: "",
                sub_category: "",
                discipline: "",
                levels: "",
                subjects: "",
                type: "",
                board: "",
                hod: "",
            },
            subscription_data: {
                title: "",
                description: "",
                months: 0,
                days: 0,
                discounted_price: "",
                courses: [],
                search_terms: [],
                recommend_course: [],
                discount_applicable: false,
            },
            total_price: 0,

            course_list: [],
            discounts: [],

            file: "",
            filename: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + inquelAdminUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    componentDidMount = () => {
        this.loadCategory();
    };

    // ----- Filter data -----
    loadCategory = () => {
        fetch(`${this.url}/subscription/filter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    let filter = this.state.filter;
                    filter.category = result.data.category;
                    this.setState({
                        filter: filter,
                        course_list: [],
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                });
            });
    };

    loadSubCategory = (event) => {
        let data = this.state.selected;
        data.category = event.value;
        data.sub_category = "";
        data.discipline = "";
        data.levels = "";
        data.subjects = "";
        data.board = "";
        data.type = "";
        data.hod = "";
        let filter = this.state.filter;
        filter.sub_category = [];
        filter.discipline = [];
        filter.levels = [];
        filter.subjects = [];
        filter.type = [];
        filter.board = [];
        filter.hod = [];
        this.setState({
            selected: data,
            filter: filter,
            course_list: [],
        });

        if (event.value !== "") {
            fetch(`${this.url}/subscription/filter/?category=${event.value}`, {
                headers: this.headers,
                method: "GET",
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        let filter = this.state.filter;
                        filter.sub_category = result.data.sub_category;
                        this.setState({
                            filter: filter,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        errorMsg: "Something went wrong!",
                        showErrorAlert: true,
                    });
                });
        }
    };

    loadDiscipline = (event) => {
        let data = this.state.selected;
        data.sub_category = event.value;
        data.discipline = "";
        data.levels = "";
        data.subjects = "";
        data.board = "";
        data.type = "";
        data.hod = "";
        let filter = this.state.filter;
        filter.discipline = [];
        filter.levels = [];
        filter.subjects = [];
        filter.type = [];
        filter.board = [];
        filter.hod = [];
        this.setState({
            selected: data,
            filter: filter,
            course_list: [],
        });

        if (event.value !== "") {
            fetch(
                `${this.url}/subscription/filter/?category=${data.category}&sub_category=${event.value}`,
                {
                    headers: this.headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        let filter = this.state.filter;
                        filter.discipline = result.data.discipline;
                        this.setState({
                            filter: filter,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        errorMsg: "Something went wrong!",
                        showErrorAlert: true,
                    });
                });
        }
    };

    loadLevels = (event) => {
        let data = this.state.selected;
        data.discipline = event.value;
        data.levels = "";
        data.subjects = "";
        data.board = "";
        data.type = "";
        data.hod = "";
        let filter = this.state.filter;
        filter.levels = [];
        filter.subjects = [];
        filter.type = [];
        filter.board = [];
        filter.hod = [];
        this.setState({
            selected: data,
            filter: filter,
            course_list: [],
        });

        if (event.value !== "") {
            fetch(
                `${this.url}/subscription/filter/?category=${data.category}&sub_category=${data.sub_category}&discipline=${event.value}`,
                {
                    headers: this.headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        let filter = this.state.filter;
                        filter.levels = result.data.level;
                        this.setState({
                            filter: filter,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        errorMsg: "Something went wrong!",
                        showErrorAlert: true,
                    });
                });
        }
    };

    loadSubjects = (event) => {
        let data = this.state.selected;
        data.levels = event.value;
        data.subjects = "";
        data.board = "";
        data.type = "";
        data.hod = "";
        let filter = this.state.filter;
        filter.subjects = [];
        filter.type = [];
        filter.board = [];
        filter.hod = [];
        this.setState({
            selected: data,
            filter: filter,
            course_list: [],
        });

        if (event.value !== "") {
            fetch(
                `${this.url}/subscription/filter/?category=${data.category}&sub_category=${data.sub_category}&discipline=${data.discipline}&level=${event.value}`,
                {
                    headers: this.headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        let filter = this.state.filter;
                        filter.subjects = result.data.subject;
                        this.setState({
                            filter: filter,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        errorMsg: "Something went wrong!",
                        showErrorAlert: true,
                    });
                });
        }
    };

    loadBoard = (event) => {
        let data = this.state.selected;
        data.subjects = event.value;
        data.board = "";
        data.type = "";
        data.hod = "";
        let filter = this.state.filter;
        filter.type = [];
        filter.board = [];
        filter.hod = [];
        this.setState({
            selected: data,
            filter: filter,
            course_list: [],
        });

        if (event.value !== "") {
            fetch(
                `${this.url}/subscription/filter/?category=${data.category}&sub_category=${data.sub_category}&discipline=${data.discipline}&level=${data.levels}&subject=${event.value}`,
                {
                    headers: this.headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        let filter = this.state.filter;
                        filter.board = result.data.board;
                        this.setState({
                            filter: filter,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        errorMsg: "Something went wrong!",
                        showErrorAlert: true,
                    });
                });
        }
    };

    loadType = (event) => {
        let data = this.state.selected;
        data.board = event.value;
        data.type = "";
        data.hod = "";
        let filter = this.state.filter;
        filter.type = [];
        filter.hod = [];
        this.setState({
            selected: data,
            filter: filter,
            course_list: [],
        });

        if (event.value !== "") {
            fetch(
                `${this.url}/subscription/filter/?category=${data.category}&sub_category=${data.sub_category}&discipline=${data.discipline}&level=${data.levels}&subject=${data.subjects}&board=${event.value}`,
                {
                    headers: this.headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        let filter = this.state.filter;
                        filter.type = result.data.type;
                        this.setState({
                            filter: filter,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        errorMsg: "Something went wrong!",
                        showErrorAlert: true,
                    });
                });
        }
    };

    loadHOD = (event) => {
        let data = this.state.selected;
        data.type = event.value;
        data.hod = "";
        let filter = this.state.filter;
        filter.hod = [];
        this.setState({
            selected: data,
            filter: filter,
            course_list: [],
        });

        if (event.value !== "") {
            fetch(
                `${this.url}/subscription/filter/?category=${data.category}&sub_category=${data.sub_category}&discipline=${data.discipline}&level=${data.levels}&subject=${data.subjects}&board=${data.board}&type=${event.value}`,
                {
                    headers: this.headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        let filter = this.state.filter;
                        filter.hod = result.data;
                        this.setState({
                            filter: filter,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        errorMsg: "Something went wrong!",
                        showErrorAlert: true,
                    });
                });
        }
    };

    // ----- Course data -----
    loadCourseList = (event) => {
        let data = this.state.selected;
        data.hod = event.value;
        this.setState(
            {
                selected: data,
                course_list: [],
            },
            () => {
                if (event.value !== "") {
                    this.courseAPI("");
                }
            }
        );
    };

    courseAPI = (path) => {
        let selected = this.state.selected;
        let URL = path
            ? path
            : `${this.url}/subscription/filter/course/?category=${selected.category}&sub_category=${selected.sub_category}&discipline=${selected.discipline}&level=${selected.levels}&subject=${selected.subjects}&board=${selected.board}&type=${selected.type}&hod_id=${selected.hod}`;

        fetch(URL, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    let data = [...this.state.course_list];
                    if (
                        result.data.results &&
                        result.data.results.length !== 0
                    ) {
                        data.push(...result.data.results);
                        this.setState(
                            {
                                course_list: data,
                            },
                            () => {
                                if (result.data.next !== null) {
                                    this.courseAPI(result.data.next);
                                }
                            }
                        );
                    } else {
                        this.setState({
                            errorMsg: "No data to load...",
                            showErrorAlert: true,
                        });
                    }
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                });
            });
    };

    // ----- Subscription & Recommend course adding, removing -----
    handleDragStart = (event, data) => {
        event.dataTransfer.setData("data", JSON.stringify(data));
        var node = document.getElementById(event.target.id);
        if (node !== null) {
            var crt = node.cloneNode(true);
            crt.id = event.target.id + "-copy";
            crt.classList.add("ghost-card");
            document.getElementById("root").appendChild(crt);
            event.dataTransfer.setDragImage(crt, 0, 0);
        }
    };

    handleDragEnd = (event) => {
        var id = event.target.id + "-copy";
        var node = document.getElementById(id);
        if (node !== null) {
            node.parentNode.removeChild(node);
        }
    };

    handleSubscriptionDrop = (event) => {
        let data = JSON.parse(event.dataTransfer.getData("data")) || null;
        let subscription = this.state.subscription_data;

        if (data !== null) {
            const found = subscription.courses.some(
                (el) => el.course_id === data.course_id
            );
            if (!found) {
                subscription.courses.push({
                    course_id: data.course_id,
                    course_name: data.course_name,
                    price: "",
                });
            } else {
                this.setState({
                    errorMsg: "Course already added!",
                    showErrorAlert: true,
                });
            }
        }

        this.setState({
            subscription_data: subscription,
        });
    };

    handleRecommendDrop = (event) => {
        let data = JSON.parse(event.dataTransfer.getData("data")) || null;
        let subscription = this.state.subscription_data;

        if (data !== null) {
            const found = subscription.recommend_course.some(
                (el) => el === data.course_id
            );
            if (!found) {
                subscription.recommend_course.push(data.course_id);
            } else {
                this.setState({
                    errorMsg: "Course already added!",
                    showErrorAlert: true,
                });
            }
        }

        this.setState({
            subscription_data: subscription,
        });
    };

    handleRemoveCourse = (index) => {
        let data = this.state.subscription_data;
        let total_price = 0;

        data.courses.splice(index, 1);

        this.setState(
            {
                subscription_data: data,
            },
            () => {
                data.courses.forEach((data) => {
                    total_price += data.price;
                });

                this.setState({
                    total_price: total_price,
                });
            }
        );
    };

    handleRemoveRecommendCourse = (index) => {
        let data = this.state.subscription_data;

        data.recommend_course.splice(index, 1);

        this.setState({
            subscription_data: data,
        });
    };

    // ----- Subscription user inputs -----
    handleInput = (event, type) => {
        let data = this.state.subscription_data;
        if (type === "months" || type === "days") {
            data[event.target.name] = Number(event.target.value);
        } else if (type === "discounted_price") {
            data[event.target.name] = parseFloat(event.target.value);
        } else {
            data[event.target.name] = event.target.value;
        }

        this.setState({
            subscription_data: data,
        });
    };

    handleCoursePrice = (event, index) => {
        let data = this.state.subscription_data;
        data.courses[index].price = parseFloat(event.target.value);
        let total_price = 0;

        this.setState(
            {
                subscription_data: data,
            },
            () => {
                data.courses.forEach((data) => {
                    total_price += data.price;
                });

                this.setState({
                    total_price: total_price,
                });
            }
        );
    };

    // ----- Image upload -----
    handleImageFile = (event) => {
        let extension = event.target.files[0].name.split(".");
        let format = ["jpg", "jpeg", "png", "webp"];

        if (!format.includes(extension[extension.length - 1].toLowerCase())) {
            this.setState({
                errorMsg: "Invalid file format!",
                showErrorAlert: true,
            });
        } else if (event.target.files[0].size > 5242880) {
            this.setState({
                errorMsg: "File size exceeds more then 5MB!",
                showErrorAlert: true,
            });
        } else {
            this.setState({
                file: event.target.files[0],
                filename: event.target.files[0].name,
            });
        }
    };

    // ----- Discounts -----
    discountsAPI = (path) => {
        let selected = this.state.selected;
        let URL = path
            ? path
            : `${this.url}/subscription/filter/coupon/?category=${selected.category}&sub_category=${selected.sub_category}&discipline=${selected.discipline}&level=${selected.levels}&subject=${selected.subjects}`;

        fetch(URL, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    let data = [...this.state.discounts];
                    if (
                        result.data.results &&
                        result.data.results.length !== 0
                    ) {
                        data.push(...result.data.results);
                        this.setState(
                            {
                                discounts: data,
                            },
                            () => {
                                if (result.data.next !== null) {
                                    this.discountsAPI(result.data.next);
                                }
                            }
                        );
                    } else {
                        this.setState({
                            errorMsg: "No data to load...",
                            showErrorAlert: true,
                        });
                    }
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                });
            });
    };

    loadDiscounts = (event) => {
        let data = this.state.subscription_data;

        if (event.target.checked) {
            data.discount_applicable = true;
            if (this.state.discounts && this.state.discounts.length === 0) {
                this.discountsAPI();
            }
        } else {
            data.discount_applicable = false;
        }

        this.setState({
            subscription_data: data,
        });
    };

    // ----- Search terms -----
    handleSearchTerms = (event) => {
        let data = this.state.subscription_data;
        if (event.key === "Enter") {
            if (event.target.value !== "") {
                data.search_terms.push(event.target.value.trim());
                this.setState(
                    {
                        subscription_data: data,
                    },
                    () => (document.getElementById("search_terms").value = "")
                );
            }
        }
    };

    handleRemoveSearchTerms = (index) => {
        let data = this.state.subscription_data;
        data.search_terms.splice(index, 1);

        this.setState({
            subscription_data: data,
        });
    };

    // ----- Handle Submit -----
    handleSubmit = () => {
        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                "Inquel-Auth": this.authToken,
            },
        };

        let form_data = new FormData();
        form_data.append("subscription_image_1", this.state.file);
        form_data.append(
            "subscription_data",
            JSON.stringify({
                subscription_data: this.state.subscription_data,
            })
        );

        axios
            .post(`${this.url}/subscription/`, form_data, options)
            .then((result) => {
                if (result.data.sts === true) {
                    this.setState({
                        successMsg: result.data.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
                    this.props.formSubmission();
                } else {
                    this.setState({
                        errorMsg: result.data.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    showLoader: false,
                });
            });
    };

    render() {
        const data = this.state.subscription_data;
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                backdrop="static"
            >
                <Modal.Header closeButton>Create subscription</Modal.Header>
                <Modal.Body>
                    <Alert
                        variant="danger"
                        show={this.state.showErrorAlert}
                        onClose={() => {
                            this.setState({
                                showErrorAlert: false,
                            });
                        }}
                        className="sticky-top"
                        dismissible
                    >
                        {this.state.errorMsg}
                    </Alert>
                    <Alert
                        variant="success"
                        show={this.state.showSuccessAlert}
                        onClose={() => {
                            this.setState({
                                showSuccessAlert: false,
                            });
                        }}
                        className="sticky-top"
                        dismissible
                    >
                        {this.state.successMsg}
                    </Alert>

                    <div className="row">
                        {/* ---------- Left column ---------- */}
                        <div className="col-md-6">
                            <h6 className="primary-text mb-3">Configuration</h6>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="form-row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">
                                                Category ID
                                            </p>
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                className="basic-single border-secondary"
                                                placeholder="Select"
                                                isSearchable={true}
                                                name="category"
                                                id="category"
                                                options={(
                                                    this.state.filter
                                                        .category || []
                                                ).map((list) => {
                                                    return {
                                                        value: list.code,
                                                        label: list.title,
                                                    };
                                                })}
                                                value={(
                                                    this.state.filter
                                                        .category || []
                                                ).map((list) => {
                                                    return this.state.selected
                                                        .category === list.code
                                                        ? {
                                                              value: list.code,
                                                              label: list.title,
                                                          }
                                                        : "";
                                                })}
                                                onChange={this.loadSubCategory}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">
                                                Discipline
                                            </p>
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                className="basic-single border-secondary"
                                                placeholder="Select"
                                                isSearchable={true}
                                                name="discipline"
                                                id="discipline"
                                                options={(
                                                    this.state.filter
                                                        .discipline || []
                                                ).map((list) => {
                                                    return {
                                                        value: list.code,
                                                        label: list.title,
                                                    };
                                                })}
                                                value={(
                                                    this.state.filter
                                                        .discipline || []
                                                ).map((list) => {
                                                    return this.state.selected
                                                        .discipline ===
                                                        list.code
                                                        ? {
                                                              value: list.code,
                                                              label: list.title,
                                                          }
                                                        : "";
                                                })}
                                                isDisabled={
                                                    this.state.selected
                                                        .sub_category === ""
                                                        ? true
                                                        : false
                                                }
                                                onChange={this.loadLevels}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">
                                                Subjects
                                            </p>
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                className="basic-single border-secondary"
                                                placeholder="Select"
                                                isSearchable={true}
                                                name="subject"
                                                id="subject"
                                                options={(
                                                    this.state.filter
                                                        .subjects || []
                                                ).map((list) => {
                                                    return {
                                                        value: list.code,
                                                        label: list.title,
                                                    };
                                                })}
                                                value={(
                                                    this.state.filter
                                                        .subjects || []
                                                ).map((list) => {
                                                    return this.state.selected
                                                        .subjects === list.code
                                                        ? {
                                                              value: list.code,
                                                              label: list.title,
                                                          }
                                                        : "";
                                                })}
                                                isDisabled={
                                                    this.state.selected
                                                        .levels === ""
                                                        ? true
                                                        : false
                                                }
                                                onChange={this.loadBoard}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">Type</p>
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                className="basic-single border-secondary"
                                                placeholder="Select"
                                                isSearchable={true}
                                                name="type"
                                                id="type"
                                                options={(
                                                    this.state.filter.type || []
                                                ).map((list) => {
                                                    return {
                                                        value: list.code,
                                                        label: list.title,
                                                    };
                                                })}
                                                value={(
                                                    this.state.filter.type || []
                                                ).map((list) => {
                                                    return this.state.selected
                                                        .type === list.code
                                                        ? {
                                                              value: list.code,
                                                              label: list.title,
                                                          }
                                                        : "";
                                                })}
                                                isDisabled={
                                                    this.state.selected
                                                        .board === ""
                                                        ? true
                                                        : false
                                                }
                                                onChange={this.loadHOD}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">
                                                Sub Category
                                            </p>
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                className="basic-single border-secondary"
                                                placeholder="Select"
                                                isSearchable={true}
                                                name="sub_category"
                                                id="sub_category"
                                                options={this.state.filter.sub_category.map(
                                                    (list) => {
                                                        return {
                                                            value: list.code,
                                                            label: list.title,
                                                        };
                                                    }
                                                )}
                                                value={(
                                                    this.state.filter
                                                        .sub_category || []
                                                ).map((list) => {
                                                    return this.state.selected
                                                        .sub_category ===
                                                        list.code
                                                        ? {
                                                              value: list.code,
                                                              label: list.title,
                                                          }
                                                        : "";
                                                })}
                                                isDisabled={
                                                    this.state.selected
                                                        .category === ""
                                                        ? true
                                                        : false
                                                }
                                                onChange={this.loadDiscipline}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">Levels</p>
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                className="basic-single border-secondary"
                                                placeholder="Select"
                                                isSearchable={true}
                                                name="level"
                                                id="level"
                                                options={(
                                                    this.state.filter.levels ||
                                                    []
                                                ).map((list) => {
                                                    return {
                                                        value: list.code,
                                                        label: list.title,
                                                    };
                                                })}
                                                value={(
                                                    this.state.filter.levels ||
                                                    []
                                                ).map((list) => {
                                                    return this.state.selected
                                                        .levels === list.code
                                                        ? {
                                                              value: list.code,
                                                              label: list.title,
                                                          }
                                                        : "";
                                                })}
                                                isDisabled={
                                                    this.state.selected
                                                        .discipline === ""
                                                        ? true
                                                        : false
                                                }
                                                onChange={this.loadSubjects}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center mb-3">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">
                                                Board / University
                                            </p>
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                className="basic-single border-secondary"
                                                placeholder="Select"
                                                isSearchable={true}
                                                name="board"
                                                id="board"
                                                options={(
                                                    this.state.filter.board ||
                                                    []
                                                ).map((list) => {
                                                    return {
                                                        value: list.code,
                                                        label: list.title,
                                                    };
                                                })}
                                                value={(
                                                    this.state.filter.board ||
                                                    []
                                                ).map((list) => {
                                                    return this.state.selected
                                                        .board === list.code
                                                        ? {
                                                              value: list.code,
                                                              label: list.title,
                                                          }
                                                        : "";
                                                })}
                                                isDisabled={
                                                    this.state.selected
                                                        .subjects === ""
                                                        ? true
                                                        : false
                                                }
                                                onChange={this.loadType}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <p className="small mb-0">HOD</p>
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                className="basic-single border-secondary"
                                                placeholder="Select"
                                                isSearchable={true}
                                                name="hod"
                                                id="hod"
                                                options={(
                                                    this.state.filter.hod || []
                                                ).map((list) => {
                                                    return {
                                                        value: list.id,
                                                        label: list.full_name
                                                            ? list.full_name
                                                            : list.username,
                                                    };
                                                })}
                                                value={(
                                                    this.state.filter.hod || []
                                                ).map((list) => {
                                                    return this.state.selected
                                                        .hod === list.id
                                                        ? {
                                                              value: list.id,
                                                              label: list.full_name
                                                                  ? list.full_name
                                                                  : list.username,
                                                          }
                                                        : "";
                                                })}
                                                isDisabled={
                                                    this.state.selected.type ===
                                                    ""
                                                        ? true
                                                        : false
                                                }
                                                onChange={this.loadCourseList}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ----- Course list ----- */}
                            <div
                                className="card border-secondary"
                                style={{
                                    minHeight: "150px",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                }}
                            >
                                <div className="card-header p-2 font-weight-bold-600">
                                    Course List
                                </div>
                                <div className="card-body px-2 pb-2 pt-0">
                                    {(this.state.course_list || []).map(
                                        (list, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="p-1 rounded-lg"
                                                    id={list.course_id}
                                                    onDragStart={(e) =>
                                                        this.handleDragStart(
                                                            e,
                                                            list
                                                        )
                                                    }
                                                    onDragEnd={(e) =>
                                                        this.handleDragEnd(e)
                                                    }
                                                    draggable
                                                >
                                                    <p className="small font-weight-bold-600 w-100 mb-0">
                                                        {list.course_name}
                                                    </p>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            <div className="row mt-3">
                                {/* ----- Image upload ----- */}
                                <div className="col-md-6">
                                    <p className="primary-text font-weight-bold-600 small">
                                        Upload image
                                    </p>
                                    <div className="custom-file mb-3">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="img1"
                                            accept="image/*"
                                            aria-describedby="inputGroupFileAddon01"
                                            onChange={(event) =>
                                                this.handleImageFile(event)
                                            }
                                        />
                                        <label
                                            className="custom-file-label"
                                            htmlFor="img1"
                                        >
                                            {this.state.filename
                                                ? this.state.filename
                                                : "Choose file"}
                                        </label>
                                    </div>
                                </div>

                                {/* ----- Search terms ----- */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="searchterms">
                                            Search terms
                                        </label>
                                        <div className="border-secondary rounded-lg p-1">
                                            <div className="d-flex flex-wrap font-weight-bold-600">
                                                {data.search_terms.map(
                                                    (list, index) => {
                                                        return (
                                                            <div
                                                                className="d-flex align-items-center light-bg borders primary-text mr-1 mb-1 p-1 rounded-lg"
                                                                key={index}
                                                                style={{
                                                                    fontSize:
                                                                        "11px",
                                                                }}
                                                            >
                                                                <span>
                                                                    {list}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() =>
                                                                        this.handleRemoveSearchTerms(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-times ml-2"></i>
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name="search_terms"
                                                id="search_terms"
                                                className="form-control form-control-sm w-100 p-0"
                                                onKeyUp={this.handleSearchTerms}
                                            />
                                        </div>
                                        <small className="text-muted">
                                            Press Enter to create search terms
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {/* ----- Discounts ----- */}
                                <div className="col-md-4">
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="discounts"
                                            checked={
                                                data.discount_applicable
                                                    ? true
                                                    : false
                                            }
                                            onChange={this.loadDiscounts}
                                            disabled={
                                                this.state.selected.subjects ===
                                                ""
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="discounts"
                                        >
                                            Discounts applicable
                                        </label>
                                    </div>
                                    <div className="d-flex flex-wrap small text-secondary">
                                        {data.discount_applicable
                                            ? (this.state.discounts || []).map(
                                                  (list, index) => {
                                                      return (
                                                          <span
                                                              className="bg-light border-secondary m-1 px-2 py-1 rounded-lg"
                                                              key={index}
                                                          >
                                                              {list.coupon_name}
                                                          </span>
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </div>
                                </div>

                                {/* ----- Recommend course ----- */}
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <div
                                            className="card border-secondary"
                                            style={{ minHeight: "100px" }}
                                            onDragOver={(e) =>
                                                e.preventDefault()
                                            }
                                            onDrop={(e) =>
                                                this.handleRecommendDrop(e)
                                            }
                                        >
                                            <div className="card-header small font-weight-bold-600 p-2">
                                                Recommend courses
                                            </div>
                                            <div className="card-body pt-0 px-2">
                                                {(
                                                    data.recommend_course || []
                                                ).map((list, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="d-flex align-items-center mb-1"
                                                        >
                                                            <p className="small font-weight-bold-600 w-100 mr-2 mb-0">
                                                                {(
                                                                    this.state
                                                                        .course_list ||
                                                                    []
                                                                )
                                                                    .filter(
                                                                        (id) =>
                                                                            id.course_id ===
                                                                            list
                                                                    )
                                                                    .map(
                                                                        (
                                                                            name
                                                                        ) => {
                                                                            return name.course_name;
                                                                        }
                                                                    )}
                                                            </p>
                                                            <span
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => {
                                                                    this.handleRemoveRecommendCourse(
                                                                        index
                                                                    );
                                                                }}
                                                            >
                                                                <i className="fas fa-minus-circle fa-sm"></i>
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------- Right column ---------- */}
                        <div className="col-md-6">
                            <h6 className="primary-text mb-3">Subscription</h6>
                            <div className="form-row form-group">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0 small">
                                        Subscription Title
                                    </p>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter title"
                                        value={data.title}
                                        className="form-control border-secondary"
                                        onChange={(event) =>
                                            this.handleInput(event, "title")
                                        }
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0 small">
                                        Subscription Description
                                    </p>
                                </div>
                                <div className="col-md-8">
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows="4"
                                        placeholder="Enter description"
                                        className="form-control border-secondary"
                                        value={data.description}
                                        onChange={(event) =>
                                            this.handleInput(
                                                event,
                                                "description"
                                            )
                                        }
                                        autoComplete="off"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0 small">Duration</p>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-row align-items-center">
                                        <div className="col-md-4 col-6">
                                            <select
                                                name="months"
                                                id="months"
                                                className="form-control border-secondary"
                                                onChange={(event) =>
                                                    this.handleInput(
                                                        event,
                                                        "months"
                                                    )
                                                }
                                            >
                                                <option value="">Months</option>
                                                {Array(12)
                                                    .fill()
                                                    .map((element, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    index + 1
                                                                }
                                                            >
                                                                {index + 1}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <select
                                                name="days"
                                                id="days"
                                                className="form-control border-secondary"
                                                onChange={(event) =>
                                                    this.handleInput(
                                                        event,
                                                        "days"
                                                    )
                                                }
                                            >
                                                <option value="">Days</option>
                                                {Array(31)
                                                    .fill()
                                                    .map((element, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    index + 1
                                                                }
                                                            >
                                                                {index + 1}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                        <div className="col-5 mt-2 mt-md-0">
                                            <p className="mb-0">
                                                {data.months && data.days
                                                    ? `${data.months} Months ${data.days}
                                                Days`
                                                    : ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0 small">Pricing</p>
                                </div>
                                <div className="col-md-8">
                                    <form action="">
                                        <input
                                            type="number"
                                            name="discounted_price"
                                            id="discounted_price"
                                            placeholder="Enter pricing"
                                            value={data.discounted_price}
                                            className="form-control border-secondary"
                                            onChange={(event) =>
                                                this.handleInput(
                                                    event,
                                                    "discounted_price"
                                                )
                                            }
                                            autoComplete="off"
                                        />
                                    </form>
                                </div>
                            </div>

                            <div
                                className="card border-secondary"
                                style={{ minHeight: "180px" }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => this.handleSubscriptionDrop(e)}
                            >
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="primary-text">
                                            <tr
                                                style={{ whiteSpace: "nowrap" }}
                                            >
                                                <th scope="col">Sl.No</th>
                                                <th scope="col">Course name</th>
                                                <th scope="col">Price(INR)</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.courses &&
                                            data.courses.length !== 0
                                                ? (data.courses || []).map(
                                                      (list, index) => {
                                                          return (
                                                              <tr
                                                                  key={index}
                                                                  style={{
                                                                      whiteSpace:
                                                                          "nowrap",
                                                                  }}
                                                              >
                                                                  <td>
                                                                      {index +
                                                                          1}
                                                                  </td>
                                                                  <td>
                                                                      {
                                                                          list.course_name
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      <input
                                                                          type="number"
                                                                          name="price"
                                                                          id="price"
                                                                          className="form-control form-control-sm border-secondary"
                                                                          value={
                                                                              list.price
                                                                          }
                                                                          onChange={(
                                                                              event
                                                                          ) =>
                                                                              this.handleCoursePrice(
                                                                                  event,
                                                                                  index
                                                                              )
                                                                          }
                                                                          autoComplete="off"
                                                                      />
                                                                  </td>
                                                                  <td>
                                                                      <span
                                                                          style={{
                                                                              cursor: "pointer",
                                                                          }}
                                                                          onClick={() =>
                                                                              this.handleRemoveCourse(
                                                                                  index
                                                                              )
                                                                          }
                                                                      >
                                                                          <i className="fas fa-minus-circle"></i>
                                                                      </span>
                                                                  </td>
                                                              </tr>
                                                          );
                                                      }
                                                  )
                                                : null}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer text-right mt-auto">
                                    <span className="primary-text font-weight-bold mr-3">
                                        Total:
                                    </span>
                                    {this.state.total_price}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end flex-wrap">
                        <button
                            className="btn btn-link btn-sm shadow-none mr-2"
                            onClick={this.props.onHide}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary btn-sm shadow-none"
                            onClick={this.handleSubmit}
                        >
                            {this.state.showLoader ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="mr-2"
                                />
                            ) : (
                                ""
                            )}
                            Save
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

export class SubscriptionUpdateModal extends Component {
    constructor() {
        super();
        this.state = {
            data: {},

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + inquelAdminUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    componentDidMount = () => {
        fetch(`${this.url}/subscription/${this.props.data.subscription_id}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        data: result,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                });
            });
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                backdrop="static"
            >
                <Modal.Header closeButton>Update subscription</Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-5 mb-3 mb-md-0">
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0">Title</p>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="form-control form-control-sm form-shadow"
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0">Duration / Validity</p>
                                </div>
                                <div className="col-md-8">
                                    <select
                                        name="duration"
                                        id="duration"
                                        className="form-control form-control-sm form-shadow"
                                    >
                                        <option value="05">05</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0">Pricing</p>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        name="pricing"
                                        id="pricing"
                                        className="form-control form-control-sm form-shadow"
                                    />
                                </div>
                            </div>
                            <div className="form-check mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="discount"
                                    name="discount"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="discount"
                                >
                                    Discounts applicable
                                </label>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <p className="mb-0">Search terms</p>
                                </div>
                                <div className="col-md-8">
                                    <textarea
                                        name="searchterm"
                                        id="searchterm"
                                        rows="5"
                                        className="form-control form-control-sm form-shadow"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="card shadow-sm h-100">
                                <div className="card-header">
                                    <h6>Subscription ID SP2020210001</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="primary-text">
                                                <tr>
                                                    <th scope="col">Sl.No</th>
                                                    <th scope="col">
                                                        Course ID
                                                    </th>
                                                    <th scope="col">
                                                        Assigned course list
                                                    </th>
                                                    <th scope="col">
                                                        Price(INR)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01</td>
                                                    <td>SJBDIHENKD885858</td>
                                                    <td>
                                                        CBSE 10th Maths -
                                                        Premium
                                                    </td>
                                                    <td>2000.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button className="btn btn-light btn-block btn-sm my-3">
                                        Add
                                    </button>
                                    <div className="text-right">
                                        <span className="primary-text font-weight-bold mr-3">
                                            Total:
                                        </span>
                                        2000.00
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-link btn-sm shadow-none mr-1"
                        onClick={this.props.onHide}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm shadow-none"
                        onClick={this.handleSubmit}
                    >
                        Update
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}
