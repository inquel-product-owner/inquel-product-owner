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
        this.toolbarOptions = ["Search"];
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
                        width={'100%'}
                        ref={(g) => {
                            this.gridInstance = g;
                        }}
                        filterSettings={this.Filter}
                        allowFiltering={true}
                        allowSorting={true}
                        allowSelection={true}
                        allowTextWrap={true}
                        allowResizing={true}
                        selectionSettings={this.select}
                        toolbar={this.toolbarOptions}
                    >
                        <ColumnsDirective>
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
