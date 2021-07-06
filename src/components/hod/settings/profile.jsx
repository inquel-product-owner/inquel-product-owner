import React from "react";
import dateFormat from "dateformat";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import Loading from "../../common/loader";
import AlertBox from "../../common/alert";
import { connect } from "react-redux";
import { country } from "../../../shared/countries.js";
import Select from "react-select";

const mapStateToProps = (state) => ({
    profile_data: state.user.profile,
});

class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.profile_data,
            isLoading: false,
            responseMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
        };
        this.url = baseUrl + hodUrl;
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
        };
    }

    handleInput = (event) => {
        let data = this.state.data;
        data[event.target.name] = event.target.value;
        this.setState({
            data: data,
        });
    };

    handleDate = (event) => {
        let data = this.state.data;
        data.date_of_birth = dateFormat(event.target.value, "yyyy-mm-dd");
        this.setState({
            data: data,
        });
    };

    handleSelect = (event) => {
        let data = this.state.data;
        data.country_code = event.value;
        this.setState({
            data: data,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            isLoading: true,
            showSuccessAlert: false,
            showErrorAlert: false,
        });
        let data = this.state.data;
        delete data.permissions;

        fetch(`${this.url}/hod/profile/`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(data),
            // body: JSON.stringify({
            //     first_name: data.first_name,
            //     last_name: data.last_name,
            //     username: data.username,
            //     phone_num: data.phone_num,
            //     date_of_birth: dateFormat(data.date_of_birth, "yyyy-mm-dd"),
            //     description: data.description,
            //     department_name: data.department_name,
            //     department_details: data.department_details,
            //     office_address: data.office_address,
            //     additional_details_1: data.additional_details_1,
            //     additional_details_2: data.additional_details_2,
            // }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        responseMsg: result.msg,
                        showSuccessAlert: true,
                        isLoading: false,
                    });
                    this.props.loadData();
                } else {
                    this.setState({
                        responseMsg: result.msg,
                        showErrorAlert: true,
                        isLoading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    responseMsg:
                        "There is a problem in saving the data, try again!",
                    showErrorAlert: true,
                    isLoading: false,
                });
            });
    };

    renderValue = (data) => {
        return (
            <span>
                <img
                    src={data.flag}
                    alt=""
                    className="img-fluid"
                    width="25px"
                    height="auto"
                />{" "}
                {data.isoCode} - {data.dialCode}
            </span>
        );
    };

    render() {
        return (
            <>
                {/* Alert message */}
                <AlertBox
                    errorMsg={this.state.responseMsg}
                    successMsg={this.state.responseMsg}
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={this.state.showSuccessAlert}
                    toggleSuccessAlert={() =>
                        this.setState({
                            showSuccessAlert: false,
                        })
                    }
                    toggleErrorAlert={() =>
                        this.setState({
                            showErrorAlert: false,
                        })
                    }
                />

                <div className="card-header h5">Update Profile</div>

                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="card-body">
                        <h6 className="primary-text mb-3">Personal Details</h6>
                        <div className="row gutters">
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="first_name">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        className="form-control border-secondary"
                                        value={this.state.data.first_name}
                                        onChange={this.handleInput}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        className="form-control border-secondary"
                                        value={this.state.data.last_name}
                                        onChange={this.handleInput}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="form-control border-secondary"
                                        value={this.state.data.username}
                                        onChange={this.handleInput}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="phone_num">Phone</label>
                                    <div className="d-flex border-secondary rounded-lg">
                                        <div
                                            style={{
                                                width: "35%",
                                            }}
                                        >
                                            <Select
                                                className="basic-single border-right"
                                                isSearchable={false}
                                                name="country_code"
                                                value={country.map((list) => {
                                                    return list.dialCode ===
                                                        this.state.data
                                                            .country_code
                                                        ? {
                                                              value: list.dialCode,
                                                              label: this.renderValue(
                                                                  list
                                                              ),
                                                          }
                                                        : "";
                                                })}
                                                options={country.map((list) => {
                                                    return {
                                                        value: list.dialCode,
                                                        label: this.renderValue(
                                                            list
                                                        ),
                                                    };
                                                })}
                                                onChange={this.handleSelect}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="phone_num"
                                                id="phone"
                                                className="form-control form-control-lg"
                                                onChange={this.handleInput}
                                                value={
                                                    this.state.data.phone_num
                                                }
                                                placeholder="Enter phone number"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="phone_num">
                                        Office phone
                                    </label>
                                    <div className="d-flex border-secondary rounded-lg">
                                        <div
                                            style={{
                                                width: "35%",
                                            }}
                                        >
                                            <Select
                                                className="basic-single border-right"
                                                isSearchable={false}
                                                name="country_code"
                                                value={country.map((list) => {
                                                    return list.dialCode ===
                                                        this.state.data
                                                            .country_code
                                                        ? {
                                                              value: list.dialCode,
                                                              label: this.renderValue(
                                                                  list
                                                              ),
                                                          }
                                                        : "";
                                                })}
                                                options={country.map((list) => {
                                                    return {
                                                        value: list.dialCode,
                                                        label: this.renderValue(
                                                            list
                                                        ),
                                                    };
                                                })}
                                                onChange={this.handleSelect}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="office_phone_num"
                                                id="office_phone_num"
                                                className="form-control form-control-lg"
                                                onChange={this.handleInput}
                                                value={
                                                    this.state.data
                                                        .office_phone_num
                                                }
                                                placeholder="Enter phone number"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="date_of_birth">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="date_of_birth"
                                        id="date_of_birth"
                                        className="form-control border-secondary"
                                        value={dateFormat(
                                            this.state.data.date_of_birth,
                                            "yyyy-mm-dd"
                                        )}
                                        onChange={this.handleDate}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ----- About description ----- */}

                        <div className="dropdown-divider"></div>
                        <h6 className="primary-text my-3">About Me</h6>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                rows="4"
                                className="form-control border-secondary"
                                onChange={this.handleInput}
                                value={this.state.data.description}
                            ></textarea>
                        </div>

                        {/* ----- Address section ----- */}

                        <div className="dropdown-divider"></div>
                        <h6 className="primary-text my-3">Address</h6>
                        <div className="row gutters">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        className="form-control border-secondary"
                                        value={this.state.data.city}
                                        onChange={this.handleInput}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="district">District</label>
                                    <input
                                        type="text"
                                        name="district"
                                        id="district"
                                        className="form-control border-secondary"
                                        value={this.state.data.district}
                                        onChange={this.handleInput}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        id="state"
                                        className="form-control border-secondary"
                                        value={this.state.data.state}
                                        onChange={this.handleInput}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        id="country"
                                        className="form-control border-secondary"
                                        value={this.state.data.country}
                                        onChange={this.handleInput}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ----- Institution details ----- */}

                        <div className="dropdown-divider my-4"></div>
                        <h6 className="primary-text mb-3">
                            Institution Details
                        </h6>
                        <div className="row gutters">
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="department_name">
                                        Department Name
                                    </label>
                                    <input
                                        type="text"
                                        name="department_name"
                                        id="department_name"
                                        className="form-control border-secondary"
                                        value={this.state.data.department_name}
                                        onChange={this.handleInput}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="department_details">
                                        Department details
                                    </label>
                                    <input
                                        type="text"
                                        name="department_details"
                                        id="department_details"
                                        className="form-control border-secondary"
                                        value={
                                            this.state.data.department_details
                                        }
                                        onChange={this.handleInput}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="office_address">
                                        Office address
                                    </label>
                                    <input
                                        type="text"
                                        name="office_address"
                                        id="office_address"
                                        className="form-control border-secondary"
                                        value={this.state.data.office_address}
                                        onChange={this.handleInput}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="additional_details_1">
                                        Additional details 1
                                    </label>
                                    <textarea
                                        name="additional_details_1"
                                        id="additional_details_1"
                                        rows="4"
                                        className="form-control border-secondary"
                                        onChange={this.handleInput}
                                        value={
                                            this.state.data.additional_details_1
                                        }
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="additional_details_2">
                                        Additional details 2
                                    </label>
                                    <textarea
                                        name="additional_details_2"
                                        id="additional_details_2"
                                        rows="4"
                                        className="form-control border-secondary"
                                        onChange={this.handleInput}
                                        value={
                                            this.state.data.additional_details_2
                                        }
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <button className="btn btn-primary btn-block shadow-none">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                
                {/* Loading component */}
                {this.state.isLoading ? <Loading /> : ""}
            </>
        );
    }
}

export default connect(mapStateToProps)(UpdateProfile);
