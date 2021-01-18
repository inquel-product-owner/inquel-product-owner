import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import Switch from "react-switch";
import { Accordion, Card, Dropdown } from "react-bootstrap";

class SubjectType1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            limited: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    handleSwitch = () => {
        this.setState({
            limited: !this.state.limited,
        });
    };

    componentDidMount = () => {
        document.title = "Type 1 - Teacher | IQLabs";
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Subject name" togglenav={this.toggleSideNav} />

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

                        <div className="row ">
                            {/* MCQ Column */}
                            <div className="col-md-9 mb-4 mb-md-0">
                                {/* Header area */}
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <h5 className="primary-text">
                                            Chapter name - MCQ
                                        </h5>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="d-flex flex-wrap justify-content-end mb-4">
                                            <button className="btn btn-primary btn-sm mr-1">
                                                Publish
                                            </button>
                                            <button className="btn btn-primary btn-sm mr-1">
                                                Download template
                                            </button>
                                            <button className="btn btn-primary btn-sm mr-1">
                                                Upload template
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Edit, Copy, Remove button */}
                                <div className="text-right mb-1">
                                    <button
                                        type="button"
                                        className="btn btn-light shadow-sm mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light shadow-sm mr-1"
                                    >
                                        Copy
                                    </button>{" "}
                                    <button
                                        type="button"
                                        className="btn btn-light shadow-sm"
                                    >
                                        Remove
                                    </button>
                                </div>

                                {/* MCQ */}
                                <div className="row mb-3">
                                    <div className="col-md-1 col-2 mb-1 mb-md-0">
                                        <div className="card shadow-sm">
                                            <div className="card-body text-center p-1">
                                                01
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-11 pl-md-0">
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="question"
                                                        id="question"
                                                        className="form-control form-shadow"
                                                        placeholder="Question goes here"
                                                    />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                className="form-control form-shadow"
                                                                type="text"
                                                                placeholder="option 01"
                                                            />
                                                        </div>
                                                        <div className="form-group mb-md-0">
                                                            <input
                                                                className="form-control form-shadow"
                                                                type="text"
                                                                placeholder="option 02"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                className="form-control form-shadow"
                                                                type="text"
                                                                placeholder="option 03"
                                                            />
                                                        </div>
                                                        <div className="form-group mb-0">
                                                            <input
                                                                className="form-control form-shadow"
                                                                type="text"
                                                                placeholder="option 04"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-1 col-2 mb-1 mb-md-0">
                                        <div className="card shadow-sm">
                                            <div className="card-body text-center p-1">
                                                02
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-11 pl-md-0">
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="question"
                                                        id="question"
                                                        className="form-control form-shadow"
                                                        placeholder="Question goes here"
                                                    />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                className="form-control form-shadow"
                                                                type="text"
                                                                placeholder="option 01"
                                                            />
                                                        </div>
                                                        <div className="form-group mb-md-0">
                                                            <input
                                                                className="form-control form-shadow"
                                                                type="text"
                                                                placeholder="option 02"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                className="form-control form-shadow"
                                                                type="text"
                                                                placeholder="option 03"
                                                            />
                                                        </div>
                                                        <div className="form-group mb-0">
                                                            <input
                                                                className="form-control form-shadow"
                                                                type="text"
                                                                placeholder="option 04"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-primary btn-block">
                                    Add +
                                </button>
                            </div>

                            {/* Settings column */}
                            <div className="col-md-3">
                                <div className="d-flex justify-content-between mb-3">
                                    <button className="btn btn-primary btn-sm">
                                        Edit
                                    </button>
                                    <button className="btn btn-primary btn-sm">
                                        Publish
                                    </button>
                                </div>

                                <Accordion defaultActiveKey="0">
                                    {/* Content | image / video */}
                                    <Card
                                        className="shadow-sm mb-2"
                                    >
                                        <Card style={{ cursor: "pointer" }}>
                                            <Card.Body>
                                                <Accordion.Toggle
                                                    as={Card}
                                                    variant="link"
                                                    eventKey="0"
                                                    className="text-dark d-flex"
                                                >
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        Content | Image \ Video
                                                        <i className="fas fa-angle-right "></i>
                                                    </div>
                                                </Accordion.Toggle>
                                            </Card.Body>
                                        </Card>

                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body className="p-3">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="addquestionormControlTextarea1">
                                                            Add Questions
                                                        </label>
                                                        <textarea
                                                            className="form-control shadow-sm bg-light"
                                                            id="addquestionormControlTextarea1"
                                                            rows="3"
                                                        ></textarea>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="d-flex justify-content-between align-items-center ">
                                                            Option
                                                            <Switch
                                                                onColor="#efd2ac"
                                                                onHandleColor="#621012"
                                                                handleDiameter={
                                                                    12
                                                                }
                                                                uncheckedIcon={
                                                                    false
                                                                }
                                                                checkedIcon={
                                                                    false
                                                                }
                                                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                height={15}
                                                                width={30}
                                                                className="react-switch"
                                                                name="type1"
                                                            />
                                                            Fill in
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="addquestionormControlTextarea1">
                                                            Explaination
                                                        </label>
                                                        <textarea
                                                            className="form-control shadow-sm bg-light"
                                                            id="addquestionormControlTextarea1"
                                                            rows="3"
                                                        ></textarea>
                                                    </div>
                                                </form>
                                                <form>
                                                    Image/video
                                                    <div className="form-group d-flex justify-content-between">
                                                        Add Image 01 Title
                                                        <Switch
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={15}
                                                            width={30}
                                                            className="react-switch"
                                                            name="type1"
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="custom-file">
                                                            <label
                                                                className="custom-file btn shadow-sm bg-light"
                                                                htmlFor="inputGroupFile01"
                                                            >
                                                                Choose file
                                                            </label>
                                                            <input
                                                                type="file"
                                                                className="custom-file-input "
                                                                id="inputGroupFile01"
                                                                aria-describedby="inputGroupFileAddon01"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group d-flex justify-content-between">
                                                        Add Image 02 Title
                                                        <Switch
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={15}
                                                            width={30}
                                                            className="react-switch"
                                                            name="type1"
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="custom-file">
                                                            <label
                                                                className="custom-file btn shadow-sm bg-light"
                                                                htmlFor="inputGroupFile01"
                                                            >
                                                                Choose file
                                                            </label>
                                                            <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                id="inputGroupFile01"
                                                                aria-describedby="inputGroupFileAddon01"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group d-flex justify-content-between">
                                                        Add Image 03 Title
                                                        <Switch
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={15}
                                                            width={30}
                                                            className="react-switch"
                                                            name="type1"
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="custom-file">
                                                            <label
                                                                className="custom-file btn shadow-sm bg-light"
                                                                htmlFor="inputGroupFile01"
                                                            >
                                                                Choose file
                                                            </label>
                                                            <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                id="inputGroupFile01"
                                                                aria-describedby="inputGroupFileAddon01"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group d-flex justify-content-between">
                                                        Add Image 04 Title
                                                        <Switch
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={15}
                                                            width={30}
                                                            className="react-switch"
                                                            name="type1"
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="custom-file">
                                                            <label
                                                                className="custom-file btn shadow-sm bg-light"
                                                                htmlFor="inputGroupFile01"
                                                            >
                                                                Choose file
                                                            </label>
                                                            <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                id="inputGroupFile01"
                                                                aria-describedby="inputGroupFileAddon01"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                                <form>
                                                    <div className="form-group d-flex justify-content-between">
                                                        Video
                                                        <Switch
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={15}
                                                            width={30}
                                                            className="react-switch"
                                                            name="type1"
                                                        />
                                                    </div>
                                                    <div className="input-group shadow-sm mb-3">
                                                        <div className="custom-file ">
                                                            <label
                                                                className="custom-file btn shadow-sm bg-light"
                                                                htmlFor="inputGroupFile01"
                                                            >
                                                                Choose file
                                                            </label>
                                                            <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                id="inputGroupFile01"
                                                                aria-describedby="inputGroupFileAddon01"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <p className="text-center">
                                                        or
                                                    </p>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control shadow-sm bg-light"
                                                            id="exampleInputtext"
                                                        />
                                                        <small
                                                            id="exampleInputtext"
                                                            className="form-text text-muted"
                                                        >
                                                            Upload only Mp4
                                                            format
                                                        </small>
                                                    </div>
                                                </form>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <div className="mb-2">
                                        <Card>
                                            <Card.Header className="bg-white">
                                                <Accordion.Toggle
                                                    as={Card.Header}
                                                    variant="link"
                                                    eventKey="1"
                                                    className="text-dark bg-white border-0"
                                                >
                                                    {" "}
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        Properties
                                                        <i className="fas fa-angle-right "></i>
                                                    </div>
                                                </Accordion.Toggle>
                                            </Card.Header>

                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>
                                                    <form>
                                                        <div className="form-group row">
                                                            <label
                                                                htmlFor="marks"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                Marks
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    readonly
                                                                    className="form-control-plaintext shadow-sm bg-light"
                                                                    id="marks"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group d-flex justify-content-between">
                                                            <label
                                                                htmlFor="marks"
                                                                className="col-sm-4 row p-3 col-form-label"
                                                            >
                                                                Complexity
                                                            </label>
                                                            <div className="col-sm-8 ">
                                                                <Dropdown>
                                                                    <Dropdown.Toggle
                                                                        variant="success"
                                                                        id="dropdown-basic"
                                                                        className="bg-white border-0 text-dark"
                                                                    >
                                                                        Easy
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item href="#/action-1">
                                                                            Action
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item href="#/action-2">
                                                                            Another
                                                                            action
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item href="#/action-3">
                                                                            Something
                                                                            else
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label
                                                                htmlFor="marks"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                Priority
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    readonly
                                                                    className="form-control-plaintext shadow-sm bg-light"
                                                                    id="marks"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label
                                                                htmlFor="marks"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                Theme
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    readonly
                                                                    className="form-control-plaintext shadow-sm bg-light"
                                                                    id="marks"
                                                                />
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <div className="form ">
                                                        <p>Attempt Sequence</p>
                                                        <div className="card shadow-sm bg-light">
                                                            <div className="row justify-content-center ">
                                                                <div className="col-md-8 d-flex shadow-sm bg-light">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    Test
                                                                </div>
                                                            </div>
                                                            <div className="row justify-content-center ">
                                                                <div className="col-md-8 d-flex shadow-sm bg-light">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    Semester
                                                                </div>
                                                            </div>
                                                            <div className="row justify-content-center ">
                                                                <div className="col-md-8 d-flex shadow-sm bg-light">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    Quiz
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="d-flex justify-content-between align-items-center ">
                                                                Learn
                                                                <Switch
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={15}
                                                                    width={30}
                                                                    className="react-switch"
                                                                    name="type1"
                                                                />
                                                            </div>
                                                            <div className="text">
                                                                Audio
                                                                <input
                                                                    type="checkbox"
                                                                    className="mr-2"
                                                                    aria-label="Checkbox for following text input"
                                                                />
                                                            </div>
                                                            <form>
                                                                <div className="form-group d-flex justify-content-between">
                                                                    Audio 02
                                                                    <Switch
                                                                        onColor="#efd2ac"
                                                                        onHandleColor="#621012"
                                                                        handleDiameter={
                                                                            12
                                                                        }
                                                                        uncheckedIcon={
                                                                            false
                                                                        }
                                                                        checkedIcon={
                                                                            false
                                                                        }
                                                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                        height={
                                                                            15
                                                                        }
                                                                        width={
                                                                            30
                                                                        }
                                                                        className="react-switch"
                                                                        name="type1"
                                                                    />
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <div className="custom-file">
                                                                        <label
                                                                            className="custom-file btn shadow-sm bg-light"
                                                                            htmlFor="inputGroupFile01"
                                                                        >
                                                                            Choose
                                                                            file
                                                                        </label>
                                                                        <input
                                                                            type="file"
                                                                            className="custom-file-input "
                                                                            id="inputGroupFile01"
                                                                            aria-describedby="inputGroupFileAddon01"
                                                                            style={{
                                                                                display:
                                                                                    "none",
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group d-flex justify-content-between">
                                                                    Audio 02
                                                                    <Switch
                                                                        onColor="#efd2ac"
                                                                        onHandleColor="#621012"
                                                                        handleDiameter={
                                                                            12
                                                                        }
                                                                        uncheckedIcon={
                                                                            false
                                                                        }
                                                                        checkedIcon={
                                                                            false
                                                                        }
                                                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                        height={
                                                                            15
                                                                        }
                                                                        width={
                                                                            30
                                                                        }
                                                                        className="react-switch"
                                                                        name="type1"
                                                                    />
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <div className="custom-file">
                                                                        <label
                                                                            className="custom-file btn shadow-sm bg-light"
                                                                            htmlFor="inputGroupFile01"
                                                                        >
                                                                            Choose
                                                                            file
                                                                        </label>
                                                                        <input
                                                                            type="file"
                                                                            className="custom-file-input "
                                                                            id="inputGroupFile01"
                                                                            aria-describedby="inputGroupFileAddon01"
                                                                            style={{
                                                                                display:
                                                                                    "none",
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </div>
                                    <div className="mb-2">
                                        <Card>
                                            <Card.Header className="bg-white ">
                                                <Accordion.Toggle
                                                    as={Card.Header}
                                                    variant="link"
                                                    eventKey="2"
                                                    className="text-dark bg-white border-0"
                                                >
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        Settings
                                                        <i className="fas fa-angle-right "></i>
                                                    </div>
                                                </Accordion.Toggle>
                                            </Card.Header>

                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body>
                                                    <div className="card d-flex justify-content-center mb-2">
                                                        <div className="form">
                                                            <div className="form-group d-flex justify-content-between">
                                                                Virtual Keyboard
                                                                <Switch
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={15}
                                                                    width={30}
                                                                    className="react-switch"
                                                                    name="type1"
                                                                />
                                                            </div>
                                                            <div className="container">
                                                                <div className="row justify-content-center justify-content-between">
                                                                    All{" "}
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                </div>
                                                                <div className="row justify-content-center justify-content-between">
                                                                    Chemistry{" "}
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                </div>
                                                                <div className="row justify-content-center justify-content-between">
                                                                    Maths{" "}
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                </div>
                                                                <div className="row justify-content-center justify-content-between">
                                                                    Physics{" "}
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        aria-label="Checkbox for following text input"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="form-group d-flex justify-content-between">
                                                            Limited
                                                            <Switch
                                                                onColor="#efd2ac"
                                                                onHandleColor="#621012"
                                                                handleDiameter={
                                                                    12
                                                                }
                                                                uncheckedIcon={
                                                                    false
                                                                }
                                                                checkedIcon={
                                                                    false
                                                                }
                                                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                height={15}
                                                                width={30}
                                                                className="react-switch"
                                                                name="type1"
                                                            />
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </div>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubjectType1;
