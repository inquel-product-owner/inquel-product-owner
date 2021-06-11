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
import store from "../../../redux/store";
import dateFormat from "dateformat";

function valid_fromDate(props) {
    return dateFormat(props.valid_from, "dd/mm/yyyy");
}

function valid_toDate(props) {
    return dateFormat(props.valid_to, "dd/mm/yyyy");
}

function teacherView(props) {
    return (
        <>
            <span>{props.teachers.length}</span>
            <Link to={`/hod/group/${props.id}/teacher`}>
                <button className="btn btn-light btn-sm ml-2 shadow-sm shadow-none">
                    <i className="fas fa-eye fa-sm"></i>
                </button>
            </Link>
        </>
    );
}

function studentView(props) {
    return (
        <>
            <span>{props.students.length}</span>
            <Link to={`/hod/group/${props.id}/student`}>
                <button className="btn btn-light btn-sm ml-2 shadow-sm shadow-none">
                    <i className="fas fa-eye fa-sm"></i>
                </button>
            </Link>
        </>
    );
}

function detailsView(props) {
    return (
        <Link to={`/hod/group/${props.id}/details`}>
            <button className="btn btn-light btn-sm shadow-sm shadow-none">
                <i className="fas fa-eye fa-sm"></i>
            </button>
        </Link>
    );
}

class GroupTable extends Component {
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
        this.valid_from = {
            type: "Excel",
            itemTemplate: valid_fromDate,
        };
        this.valid_to = {
            type: "Excel",
            itemTemplate: valid_toDate,
        };
        this.toolbarOptions = ["Search"];
    }

    rowSelected() {
        if (this.gridInstance) {
            const selectedrecords = this.gridInstance.getSelectedRecords();
            let element = [];
            for (let index = 0; index < selectedrecords.length; index++) {
                element.push(selectedrecords[index].id.toString());
            }
            if (this.props.handleGroupId) this.props.handleGroupId(element);
        }
    }

    rowDeselected() {
        if (this.gridInstance) {
            const selectedrecords = this.gridInstance.getSelectedRecords();
            let element = [];
            for (let index = 0; index < selectedrecords.length; index++) {
                element.push(selectedrecords[index].id.toString());
            }
            if (this.props.handleGroupId) this.props.handleGroupId(element);
        }
    }

    dispatch = (data) => {
        store.dispatch({ type: "GROUP", payload: data });
    };

    viewTemplate = (props) => {
        return (
            <Link to={`/${this.props.path}/group/${props.id}`}>
                <button
                    className="btn btn-link btn-sm shadow-none"
                    onClick={() => this.dispatch(props.group_name)}
                >
                    <i className="fas fa-eye"></i>
                </button>
            </Link>
        );
    };

    dataBound() {
        this.gridInstance.autoFitColumns();
    }

    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <GridComponent
                        id="overviewgrid"
                        dataSource={this.props.groupItems}
                        enableHover={true}
                        rowHeight={50}
                        width={"100%"}
                        ref={(g) => {
                            this.gridInstance = g;
                        }}
                        dataBound={this.dataBound.bind(this)}
                        filterSettings={this.Filter}
                        allowFiltering={true}
                        allowSorting={true}
                        allowSelection={true}
                        allowTextWrap={true}
                        selectionSettings={this.select}
                        toolbar={this.toolbarOptions}
                        rowSelected={this.rowSelected.bind(this)}
                        rowDeselected={this.rowDeselected.bind(this)}
                    >
                        <ColumnsDirective>
                            {this.props.check ? (
                                <ColumnDirective
                                    type="checkbox"
                                    allowSorting={false}
                                    allowFiltering={false}
                                ></ColumnDirective>
                            ) : (
                                ""
                            )}
                            <ColumnDirective
                                field="id"
                                headerText="Group ID"
                                isPrimaryKey={true}
                                visible={false}
                            ></ColumnDirective>
                            <ColumnDirective
                                field="group_name"
                                headerText="Group Name"
                                clipMode="EllipsisWithTooltip"
                                filter={this.excel}
                            />
                            <ColumnDirective
                                field="group_description"
                                headerText="Description"
                                clipMode="EllipsisWithTooltip"
                                allowSorting={false}
                                allowFiltering={false}
                            />
                            <ColumnDirective
                                field="level"
                                headerText="Level"
                                clipMode="EllipsisWithTooltip"
                                filter={this.excel}
                            />
                            {this.props.valid_from ? (
                                <ColumnDirective
                                    field="valid_from"
                                    headerText="Valid from"
                                    filter={this.valid_from}
                                    clipMode="EllipsisWithTooltip"
                                    template={valid_fromDate}
                                />
                            ) : (
                                ""
                            )}
                            {this.props.valid_to ? (
                                <ColumnDirective
                                    field="valid_to"
                                    headerText="Valid to"
                                    filter={this.valid_to}
                                    clipMode="EllipsisWithTooltip"
                                    template={valid_toDate}
                                />
                            ) : (
                                ""
                            )}
                            {this.props.teacher ? (
                                <ColumnDirective
                                    headerText="Teacher"
                                    allowSorting={false}
                                    allowFiltering={false}
                                    template={teacherView}
                                    width="130"
                                />
                            ) : (
                                ""
                            )}
                            {this.props.student ? (
                                <ColumnDirective
                                    headerText="Student"
                                    allowSorting={false}
                                    allowFiltering={false}
                                    template={studentView}
                                    width="130"
                                />
                            ) : (
                                ""
                            )}
                            {this.props.details ? (
                                <ColumnDirective
                                    headerText="Details"
                                    allowSorting={false}
                                    allowFiltering={false}
                                    template={detailsView}
                                    width="130"
                                />
                            ) : (
                                ""
                            )}
                            {this.props.view ? (
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

export default GroupTable;
