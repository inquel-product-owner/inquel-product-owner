import React, { Component } from "react";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { baseUrl, studentUrl } from "../../../shared/baseUrl.js";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import {
    Inject,
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    ViewsDirective,
    ViewDirective,
    Resize,
    DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { createElement } from "@syncfusion/ej2-base";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import "../../table/material.css";
import "./planner.css";

class StudyPlanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            data: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: false,
        };
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
        this.data = [
            {
                Id: 1,
                Subject: "Explosion of Betelgeuse Star",
                StartTime: "2021-05-06T04:00:00.000Z",
                EndTime: "2021-05-06T04:00:00.000Z",
                Description: "Some text",
                IsAllDay: true,
                Alert: false,
            },
            {
                Id: 2,
                Subject: "Thule Air Crash Report",
                StartTime: new Date(2021, 4, 12, 12, 0),
                EndTime: new Date(2021, 4, 12, 14, 0),
                Description: "Some text",
            },
            {
                Id: 3,
                Subject: "Blue Moon Eclipse",
                StartTime: new Date(2021, 4, 13, 9, 30),
                EndTime: new Date(2021, 4, 13, 11, 0),
                Description: "Some text",
            },
            {
                Id: 4,
                Subject: "Meteor Showers in 2018",
                StartTime: new Date(2021, 4, 14, 13, 0),
                EndTime: new Date(2021, 4, 14, 14, 30),
                Description: "Some text",
            },
        ];
        this.fields = {
            subject: { name: "Subject", validation: { required: true } },
            description: {
                name: "Description",
            },
            startTime: { name: "StartTime" },
            endTime: { name: "EndTime" },
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        document.title = "Study Planner - Student | IQLabs";

        var elem = document.querySelector(".e-location-container");
        elem.parentNode.removeChild(elem);
    };

    onChange() {
        console.log("triggered");
    }

    onPopupOpen(args) {
        if (args.type === "Editor") {
            console.log(this.scheduleObj);

            if (!args.element.querySelector(".custom-field-row")) {
                let row = createElement("div", {
                    className: "custom-field-row",
                });
                let formElement =
                    args.element.querySelector(".e-schedule-form");
                formElement.lastChild.insertBefore(
                    row,
                    document.querySelector(".e-time-zone-row")
                );
                let container = createElement("div", {
                    className: "custom-field-container",
                });
                let inputEle = createElement("input", {
                    className: "e-field",
                    attrs: { name: "Alert" },
                });
                container.appendChild(inputEle);
                row.appendChild(container);
                let checkBox = new DropDownList({
                    dataSource: [
                        { text: "Enable", value: true },
                        { text: "Disable", value: false },
                    ],
                    fields: { text: "text", value: "value" },
                    value: args.data.Alert,
                    floatLabelType: "Always",
                    placeholder: "Notification",
                    index: 0,
                });
                checkBox.appendTo(inputEle);
                inputEle.setAttribute("name", "Alert");
            }
        }
    }

    actionBegin(args) {
        console.log(args);
    }

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Study Planner" togglenav={this.toggleSideNav} />

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
                    activeLink="calendar"
                />

                <div
                    className={`section content pb-2 ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <ScheduleComponent
                            currentView="Month"
                            rowAutoHeight={true}
                            ref={(schedule) => (this.scheduleObj = schedule)}
                            popupOpen={this.onPopupOpen.bind(this)}
                            eventSettings={{
                                dataSource: this.data,
                                fields: this.fields,
                                enableTooltip: true,
                            }}
                            quickInfoOnSelectionEnd={true}
                            actionBegin={this.actionBegin.bind(this)}
                        >
                            <ViewsDirective>
                                <ViewDirective option="Day" />
                                <ViewDirective option="Week" />
                                <ViewDirective option="Month" />
                                <ViewDirective option="Agenda" />
                            </ViewsDirective>
                            <Inject
                                services={[
                                    Day,
                                    Week,
                                    WorkWeek,
                                    Month,
                                    Agenda,
                                    Resize,
                                    DragAndDrop,
                                ]}
                            />
                        </ScheduleComponent>

                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default StudyPlanner;
