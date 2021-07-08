import React, { Component } from "react";
import Wrapper from "../wrapper";
import { Link } from "react-router-dom";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import Loading from "../../common/loader";
import AlertBox from "../../common/alert";
import { connect } from "react-redux";
import UpdateProfile from "./profile";
import UpdatePassword from "./password";
import { PROFILE } from "../../../redux/action";
import storeDispatch from "../../../redux/dispatch";

const mapStateToProps = (state) => ({
    profileData: state.user.profile,
});

class AdminSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "profile",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: false,
        };
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        document.title = "Settings - Admin | IQLabs";
    };

    fetchProfile = () => {
        fetch(`${this.url}/hod/profile/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    storeDispatch(PROFILE, result.data);
                    this.setState({
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    render() {
        return (
            <Wrapper
                header="Settings"
                activeLink="setting"
                history={this.props.history}
                hideBackButton={true}
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
                            <Link to="/hod">
                                <i className="fas fa-home fa-sm"></i>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Settings</li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-2 mb-2 mb-md-0 pr-md-0">
                        <div className="card h-100 settings">
                            <div
                                className={`settings-tab ${
                                    this.state.tab === "profile" ? "active" : ""
                                }`}
                                onClick={() =>
                                    this.setState({
                                        tab: "profile",
                                    })
                                }
                            >
                                <i className="fas fa-user-edit mr-2"></i>{" "}
                                Profile
                            </div>
                            <div
                                className={`settings-tab ${
                                    this.state.tab === "password"
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    this.setState({
                                        tab: "password",
                                    })
                                }
                            >
                                <i className="fas fa-unlock-alt mr-2"></i>{" "}
                                Password
                            </div>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <div className="card" style={{ minHeight: "75vh" }}>
                            {this.state.tab === "profile" ? (
                                <UpdateProfile loadData={this.fetchProfile} />
                            ) : this.state.tab === "password" ? (
                                <UpdatePassword loadData={this.fetchProfile} />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </Wrapper>
        );
    }
}

export default connect(mapStateToProps)(AdminSettings);
