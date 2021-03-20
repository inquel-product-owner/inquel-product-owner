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
import userimage from "../../assets/user-v1.png";

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
                    alt={props.full_name}
                    width="23"
                    className="profile-pic"
                />
            </div>
        </div>
    );
}

class LeaderboardTable extends Component {
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
    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <GridComponent
                        id="overviewgrid"
                        dataSource={this.props.leaderBoard}
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
                        // allowResizing={true}
                        selectionSettings={this.select}
                        toolbar={this.toolbarOptions}
                    >
                        <ColumnsDirective>
                            <ColumnDirective
                                field="id"
                                visible={false}
                                headerText="ID"
                                isPrimaryKey={true}
                            ></ColumnDirective>
                            <ColumnDirective
                                field="profile_link"
                                headerText=""
                                allowSorting={false}
                                allowFiltering={false}
                                template={nameTemplate}
                            />
                            <ColumnDirective
                                field="full_name"
                                headerText="Name"
                                clipMode="EllipsisWithTooltip"
                                filter={this.excel}
                            />
                            <ColumnDirective
                                field="grade"
                                headerText="Grade"
                                clipMode="EllipsisWithTooltip"
                                filter={this.excel}
                            />
                            <ColumnDirective
                                field="points"
                                headerText="Points"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            />
                            <ColumnDirective
                                field="subject_name"
                                headerText="Subject"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            ></ColumnDirective>
                            <ColumnDirective
                                field="institution_name"
                                headerText="Institution"
                                filter={this.excel}
                                clipMode="EllipsisWithTooltip"
                            />
                        </ColumnsDirective>
                        <Inject services={[Filter, Sort, Toolbar, Resize]} />
                    </GridComponent>
                </div>
                <style>@import 'src/grid/Grid/style.css';</style>
            </div>
        );
    }
}

export default LeaderboardTable;
