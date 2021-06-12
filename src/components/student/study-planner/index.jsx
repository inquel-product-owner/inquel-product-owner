import React, { Component } from "react";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { baseUrl, studentUrl } from "../../../shared/baseUrl.js";
import Loading from "../../common/loader";
import AlertBox from "../../common/alert";
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
import "./planner.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../common/ErrorFallback";

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
                eventId: 1,
                subject: "Explosion of Betelgeuse Star",
                startTime: "2021-06-12T04:00:00.000Z",
                endTime: "2021-06-12T04:00:00.000Z",
                description: "Some text",
                isAllDay: true,
                reminder: "5",
            },
            {
                eventId: 2,
                subject: "Thule Air Crash Report",
                startTime: new Date(2021, 5, 11, 12, 0),
                endTime: new Date(2021, 5, 11, 14, 0),
                description: "Some text",
            },
            {
                eventId: 3,
                subject: "Blue Moon Eclipse",
                startTime: new Date(2021, 5, 13, 9, 30),
                endTime: new Date(2021, 5, 13, 11, 0),
                description: "Some text",
            },
            {
                eventId: 4,
                subject: "Meteor Showers in 2018",
                startTime: new Date(2021, 5, 14, 13, 0),
                endTime: new Date(2021, 5, 14, 14, 30),
                description: "Some text",
                recurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=2",
            },
        ];
        this.fields = {
            id: "eventId",
            subject: { name: "subject", validation: { required: true } },
            description: {
                name: "description",
            },
            startTime: { name: "startTime" },
            endTime: { name: "endTime" },
            isAllDay: { name: "isAllDay" },
            recurrenceRule: { name: "recurrenceRule" },
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

    onPopupOpen(args) {
        if (args.type === "Editor") {
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
                    attrs: { name: "reminder" },
                });
                container.appendChild(inputEle);
                row.appendChild(container);
                let checkBox = new DropDownList({
                    dataSource: [
                        { text: "None", value: "none" },
                        { text: "0 Minutes", value: "0" },
                        { text: "5 Minutes", value: "5" },
                        { text: "15 Minutes", value: "15" },
                        { text: "30 Minutes", value: "30" },
                        { text: "60 Minutes", value: "60" },
                    ],
                    fields: { text: "text", value: "value" },
                    value: args.data.reminder,
                    floatLabelType: "Always",
                    placeholder: "Reminder",
                });
                checkBox.appendTo(inputEle);
                inputEle.setAttribute("name", "reminder");
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
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onReset={() => window.location.reload()}
                        >
                            <ScheduleComponent
                                currentView="Month"
                                height="90vh"
                                rowAutoHeight={true}
                                ref={(schedule) =>
                                    (this.scheduleObj = schedule)
                                }
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
                        </ErrorBoundary>

                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default StudyPlanner;
