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
import "./grid-overview.css";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import storeDispatch from "../../../redux/dispatch";
import { COURSE } from "../../../redux/action";

function dateTemplate(props) {
    return dateFormat(props.created_on, "dd/mm/yyyy");
}

class CourseTable extends Component {
    constructor() {
        super(...arguments);
        this.fields = { text: "text", value: "value" };
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
        this.toolbarOptions = ["Search"];
    }

    onQueryCellInfo(args) {
        if (args.column.field === "status") {
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
            const selectedrecords = this.gridInstance.getSelectedRecords();
            let element = [];
            for (let index = 0; index < selectedrecords.length; index++) {
                element.push(selectedrecords[index].course_id);
            }
            if (this.props.handleID) {
                this.props.handleID(element);
            }
        }
    }

    rowDeselected() {
        if (this.gridInstance) {
            const selectedrecords = this.gridInstance.getSelectedRecords();
            let element = [];
            for (let index = 0; index < selectedrecords.length; index++) {
                element.push(selectedrecords[index].course_id);
            }
            if (this.props.handleID) {
                this.props.handleID(element);
            }
        }
    }

    viewTemplate = (props) => {
        return (
            <Link to={`/${this.props.path}/course/${props.course_id}`}>
                <button
                    className="btn btn-link btn-sm shadow-none"
                    onClick={() => storeDispatch(COURSE, props.course_name)}
                >
                    <i className="fas fa-eye"></i>
                </button>
            </Link>
        );
    };

    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <GridComponent
                        id="overviewgrid"
                        dataSource={this.props.data}
                        enableHover={true}
                        rowHeight={50}
                        width={"100%"}
                        ref={(g) => {
                            this.gridInstance = g;
                        }}
                        queryCellInfo={this.onQueryCellInfo.bind(this)}
                        dataBound={this.dataBound.bind(this)}
                        filterSettings={this.Filter}
                        allowFiltering={true}
                        allowSorting={true}
                        allowSelection={true}
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
                                field="course_id"
                                headerText="Course ID"
                                isPrimaryKey={true}
                                visible={false}
                            ></ColumnDirective>
                            <ColumnDirective
                                field="course_name"
                                headerText="Course title"
                                clipMode="EllipsisWithTooltip"
                                filter={this.excel}
                            />
                            <ColumnDirective
                                field="search_id"
                                headerText="Course key"
                                clipMode="EllipsisWithTooltip"
                                filter={this.excel}
                            />
                            <ColumnDirective
                                field="board"
                                headerText="Board"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            />
                            <ColumnDirective
                                field="type"
                                headerText="Type"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            />
                            <ColumnDirective
                                field="hod.hod_username"
                                headerText="Created By"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            />
                            <ColumnDirective
                                field="created_on"
                                headerText="Created On"
                                clipMode="EllipsisWithTooltip"
                                template={dateTemplate}
                                allowFiltering={false}
                            />
                            {this.props.path ? (
                                <ColumnDirective
                                    headerText="Action"
                                    allowSorting={false}
                                    allowFiltering={false}
                                    template={this.viewTemplate}
                                    width="130"
                                />
                            ) : (
                                ""
                            )}
                        </ColumnsDirective>
                        <Inject services={[Filter, Sort, Toolbar, Resize]} />
                    </GridComponent>
                </div>
                <style>@import 'src/grid/Grid/style.css';</style>
            </div>
        );
    }
}

export default CourseTable;
