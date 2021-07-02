import React, { Component } from "react";
import Wrapper from "./wrapper";
import { paginationCount } from "../../shared/constant.js";
import Paginations from "../common/pagination";
import StatisticsTable from "../common/table/statistics";
import { Link } from "react-router-dom";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import Loading from "../common/loader";
import AlertBox from "../common/alert";

class AdminStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activePage: 1,
            totalCount: 0,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: false, // change it to true after integration
        };
        this.url = baseUrl + adminPathUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    componentDidMount = () => {
        document.title = "Statistics - Admin | IQLabs";
    };

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber, page_loading: true });
    }

    render() {
        return (
            <Wrapper
                history={this.props.history}
                header="Statistics"
                activeLink="dashboard"
            >
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

                {/* Breadcrumb */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-3">
                        <li className="breadcrumb-item">
                            <Link to="/admin">
                                <i className="fas fa-home fa-sm"></i>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Statistics</li>
                    </ol>
                </nav>

                {/* Student List */}
                <div className="card shadow-sm">
                    <StatisticsTable data={this.state.data} />
                    <div className="card-body p-3">
                        {this.state.totalCount > paginationCount ? (
                            <Paginations
                                activePage={this.state.activePage}
                                totalItemsCount={this.state.totalCount}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        ) : null}
                    </div>
                </div>

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default AdminStatistics;
