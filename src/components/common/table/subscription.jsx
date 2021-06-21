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
import dateFormat from "dateformat";

function dateTemplate(props) {
    return dateFormat(props.created_on, "dd/mm/yyyy");
}

function durationTemplate(props) {
    return `${props.duration_in_months} Months ${props.duration_in_days} Days`;
}

class SubscriptionTable extends Component {
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
                element.push(selectedrecords[index].subscription_id.toString());
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
                element.push(selectedrecords[index].subscription_id.toString());
            }
            if (this.props.handleID) {
                this.props.handleID(element);
            }
        }
    }

    viewTemplate = (props) => {
        return (
            <div className="d-flex">
                <button
                    className="btn btn-link btn-sm shadow-none"
                    onClick={() => this.props.toggleEdit(props)}
                >
                    <i className="fas fa-edit fa-sm"></i>
                </button>
                <button
                    className="btn btn-link btn-sm shadow-none"
                    onClick={() => this.props.toggleDelete(props)}
                >
                    <i className="fas fa-trash fa-sm"></i>
                </button>
            </div>
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
                                field="subscription_id"
                                headerText="Subscription ID"
                                isPrimaryKey={true}
                                visible={false}
                            ></ColumnDirective>
                            <ColumnDirective
                                field="title"
                                headerText="Name"
                                clipMode="EllipsisWithTooltip"
                                filter={this.excel}
                            />
                            <ColumnDirective
                                field="search_id"
                                headerText="Subscription ID"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            />
                            <ColumnDirective
                                field="discounted_price"
                                headerText="Pricing"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            />
                            <ColumnDirective
                                field="duration"
                                headerText="Duration"
                                clipMode="EllipsisWithTooltip"
                                template={durationTemplate}
                                allowFiltering={false}
                            />
                            <ColumnDirective
                                field="created_on"
                                headerText="Created On"
                                clipMode="EllipsisWithTooltip"
                                template={dateTemplate}
                                allowFiltering={false}
                            />
                            {this.props.showAction ? (
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

export default SubscriptionTable;