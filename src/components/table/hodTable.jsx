import React, { Component } from "react";
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Filter,
    Inject,
    Sort,
    Toolbar,
    Resize,
} from "@syncfusion/ej2-react-grids";
import "./material.css";
import "./grid-overview.css";
import userimage from "../../assets/user.png";
import { Link } from "react-router-dom";

function statusTemplate(props) {
    return (
        <div id="status" className="statustemp">
            <span className="statustxt">
                {props.is_active ? "Active" : "Inactive"}
            </span>
        </div>
    );
}

function statusdetails(props) {
    if (props.is_active) {
        return (
            <div className="statustemp e-activecolor">
                <span className="statustxt e-activecolor">Active</span>
            </div>
        );
    } else {
        return (
            <div className="statustemp e-inactivecolor">
                <span className="statustxt e-inactivecolor">Inactive</span>
            </div>
        );
    }
}

function nameTemplate(props) {
    return (
        <div>
            <div className="empimg">
                <img
                    src={
                        props.profile_link !== null
                            ? props.profile_link
                            : userimage
                    }
                    alt="HOD profile"
                    width="23"
                    className="profile-pic"
                />
            </div>
            <span id="Emptext">{props.full_name}</span>
        </div>
    );
}

function dateTemplate(props) {
    var newDate = new Date(props.date_joined).toLocaleDateString();
    var datearray = newDate.split("/");
    return datearray[1] + "/" + datearray[0] + "/" + datearray[2];
}

function viewTemplate(props) {
    return (
        <Link to={`/admin/hod/${props.id}`}>
            <button className="btn btn-link btn-sm">
                <i className="fas fa-eye"></i>
            </button>
        </Link>
    );
}

class HODTable extends Component {
    constructor() {
        super(...arguments);
        this.fields = { text: "text", value: "value" };
        this.check = {
            type: "CheckBox",
        };
        this.excel = {
            type: "Excel",
        };
        this.Filter = {
            type: "Menu",
        };
        this.select = {
            persistSelection: true,
            type: "Multiple",
            checkboxOnly: true,
        };
        this.status = {
            type: "CheckBox",
            itemTemplate: statusdetails,
        };
        this.date = {
            type: "Excel",
            itemTemplate: dateTemplate,
        };
        this.toolbarOptions = ["Search"];
        this.state = { hodItems: [], hodId: [] };
    }

    showConsole = () => {
        console.log("I'm triggered");
    };

    onQueryCellInfo(args) {
        if (args.column.field === "is_active") {
            if (args.cell.textContent === "Active") {
                args.cell
                    .querySelector(".statustxt")
                    .classList.add("e-activecolor");
                args.cell
                    .querySelector(".statustemp")
                    .classList.add("e-activecolor");
            }
            if (args.cell.textContent === "Inactive") {
                args.cell
                    .querySelector(".statustxt")
                    .classList.add("e-inactivecolor");
                args.cell
                    .querySelector(".statustemp")
                    .classList.add("e-inactivecolor");
            }
        }
    }

    dataBound() {
        this.gridInstance.autoFitColumns();
    }

    rowSelected() {
        if (this.gridInstance) {
            // const selectedrowindex = this.gridInstance.getSelectedRowIndexes();
            const selectedrecords = this.gridInstance.getSelectedRecords();
            let element = [];
            for (let index = 0; index < selectedrecords.length; index++) {
                element.push(selectedrecords[index].id.toString());
            }
            console.log(element);
            this.setState({
                hodId: element,
            });
        }
    }

    rowDeselected() {
        if (this.gridInstance) {
            const selectedrecords = this.gridInstance.getSelectedRecords();
            let element = [];
            for (let index = 0; index < selectedrecords.length; index++) {
                element.push(selectedrecords[index].id.toString());
            }
            console.log(element);
            this.setState({
                hodId: element,
            });
        }
    }

    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <GridComponent
                        id="overviewgrid"
                        dataSource={this.props.hodItems}
                        enableHover={true}
                        rowHeight={50}
                        ref={(g) => {
                            this.gridInstance = g;
                        }}
                        queryCellInfo={this.onQueryCellInfo.bind(this)}
                        dataBound={this.dataBound.bind(this)}
                        filterSettings={this.Filter}
                        allowFiltering={true}
                        allowSorting={true}
                        allowSelection={true}
                        allowResizing={true}
                        selectionSettings={this.select}
                        toolbar={this.toolbarOptions}
                        rowSelected={this.rowSelected.bind(this)}
                        rowDeselected={this.rowDeselected.bind(this)}
                    >
                        <ColumnsDirective>
                            <ColumnDirective
                                type="checkbox"
                                allowSorting={false}
                                allowFiltering={false}
                            ></ColumnDirective>
                            <ColumnDirective
                                field="id"
                                visible={false}
                                headerText="HOD ID"
                                isPrimaryKey={true}
                            ></ColumnDirective>
                            <ColumnDirective
                                field="full_name"
                                headerText="Name"
                                clipMode="EllipsisWithTooltip"
                                filter={this.excel}
                                template={nameTemplate}
                            />
                            <ColumnDirective
                                field="username"
                                headerText="Username"
                                clipMode="EllipsisWithTooltip"
                                filter={this.excel}
                            />
                            <ColumnDirective
                                field="category"
                                headerText="Category"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            />
                            <ColumnDirective
                                field="sub_category"
                                headerText="Sub category"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            ></ColumnDirective>
                            <ColumnDirective
                                field="discipline"
                                headerText="Discipline"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            ></ColumnDirective>
                            <ColumnDirective
                                field="board"
                                headerText="Board University"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            ></ColumnDirective>
                            <ColumnDirective
                                field="date_joined"
                                filter={this.date}
                                headerText="Registered On"
                                clipMode="EllipsisWithTooltip"
                                template={dateTemplate}
                            ></ColumnDirective>
                            <ColumnDirective
                                field="is_active"
                                headerText="Status"
                                filter={this.status}
                                clipMode="EllipsisWithTooltip"
                                template={statusTemplate}
                            />
                            <ColumnDirective
                                headerText="Action"
                                allowSorting={false}
                                allowFiltering={false}
                                template={viewTemplate}
                                clipMode="EllipsisWithTooltip"
                                width="130"
                            />
                        </ColumnsDirective>
                        <Inject
                            services={[Filter, Sort, Toolbar, Resize]}
                        />
                    </GridComponent>
                </div>
                <style>@import 'src/grid/Grid/style.css';</style>
            </div>
        );
    }
}

export default HODTable;
