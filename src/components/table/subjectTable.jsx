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
import { Link } from "react-router-dom";

class SubjectTable extends Component {
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
        this.state = {
            subjectId: [],
        };
    }

    rowSelected() {
        if (this.gridInstance) {
            const selectedrecords = this.gridInstance.getSelectedRecords();
            let element = [];
            for (let index = 0; index < selectedrecords.length; index++) {
                element.push(selectedrecords[index].id.toString());
            }
            console.log(element);
            this.setState({
                subjectId: element,
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
                subjectId: element,
            });
        }
    }

    viewTemplate = (props) => {
        return (
            <Link to={`/${this.props.path}/subject/${props.id}`}>
                <button className="btn btn-link btn-sm">
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
                        dataSource={this.props.subjectItems}
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
                        // allowResizing={true}
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
                                headerText="Subject ID"
                                isPrimaryKey={true}
                                visible={false}
                            ></ColumnDirective>
                            <ColumnDirective
                                field="subject_name"
                                headerText="Subject Name"
                                clipMode="EllipsisWithTooltip"
                                filter={this.excel}
                            />
                            <ColumnDirective
                                headerText="Action"
                                allowSorting={false}
                                allowFiltering={false}
                                template={this.viewTemplate}
                                width="130"
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

export default SubjectTable;
