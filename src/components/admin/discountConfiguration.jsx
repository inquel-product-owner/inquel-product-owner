import React, { Component } from "react";
import Wrapper from "./wrapper";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import { Link } from "react-router-dom";

class AdminDiscountConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: "",
            showEdit: false,
            data: [
                {
                    coupon_name: "FLAT50",
                    title: "Get a 50% offer",
                    valid_from: "2021-06-02 00:00:00",
                    valid_to: "2021-12-31 00:00:00",
                    category: "DEG",
                    sub_category: "ENG",
                    discipline: "",
                    level: "",
                    subject: "ALL",

                    max_points: 0,
                    min_points: 0,
                    deduction_points: 0,
                    points_in_decimal: 0,

                    fixed_price: 0,
                    percentage: 50,

                    currency: "INR",
                    points_exists: false,
                    percent_exists: true,
                    price_exists: false,
                },
            ],
        };
    }

    componentDidMount = () => {
        document.title = "Discount Configuration - Admin | IQLabs";
    };

    Bomb = () => {
        throw new Error("💥 CABOOM 💥");
    };

    render() {
        return (
            <Wrapper
                history={this.props.history}
                header="Discount Configuration"
                activeLink="course"
                ref={(ref) => (this.wrapper = ref)}
            >
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <div className="row align-items-center mb-3">
                        <div className="col-8">
                            {/* Breadcrumb */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/admin">
                                            <i className="fas fa-home fa-sm"></i>
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Discount Configuration
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="col-4 text-right">
                            <button className="btn btn-primary btn-sm shadow-none">
                                Create Discount
                            </button>
                        </div>
                    </div>

                    <button onClick={() => this.Bomb()}>toggle explode</button>

                    {/* ----- Discount table ----- */}
                    <div className="card shadow-sm">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead className="text-white primary-bg">
                                    <tr style={{ whiteSpace: "nowrap" }}>
                                        <th scope="col">Sl.No</th>
                                        <th scope="col">Coupon ID</th>
                                        <th scope="col">Coupon Title</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Sub Category</th>
                                        <th scope="col">Discipline</th>
                                        <th scope="col">Levels</th>
                                        <th scope="col">Subjects</th>
                                        <th scope="col">Valid from</th>
                                        <th scope="col">Valid to</th>
                                        <th scope="col">Minimum points</th>
                                        <th scope="col">Maximum points</th>
                                        <th scope="col">
                                            Points value (Decimal)
                                        </th>
                                        <th scope="col">Percentage</th>
                                        <th scope="col">Fixed Price</th>
                                        <th scope="col">Currency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ whiteSpace: "nowrap" }}>
                                        <td>1</td>
                                        <td>MAT 10%</td>
                                        <td>
                                            Flat 10% off on Mathematics courses
                                        </td>
                                        <td>SCH</td>
                                        <td>000</td>
                                        <td>000</td>
                                        <td>ALL</td>
                                        <td>MAT</td>
                                        <td>01.10.2020</td>
                                        <td>31.10.2020</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>10</td>
                                        <td>-</td>
                                        <td>INR</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ErrorBoundary>
            </Wrapper>
        );
    }
}

export default AdminDiscountConfiguration;
