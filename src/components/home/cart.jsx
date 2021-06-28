import React, { useState, useEffect } from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import Select from "react-select";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import { Link } from "react-router-dom";
import { baseUrl, studentUrl } from "../../shared/baseUrl";
import Loading from "../common/loader";
import AlertBox from "../common/alert";
import courseimg from "../../assets/code.jpg";

// const data = [
//     {
//         title: "Lorem ipsum is placeholder text",
//         price: "1000",
//         duration: "3 Months 10 Days",
//         category: "Degree",
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacinia quis vel eros donec ac odio tempor. Quis ipsum suspendisse ultrices gravida dictum.",
//         image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
//     },
//     {
//         title: "Lorem ipsum is placeholder text",
//         price: "1500",
//         duration: "2 Months 20 Days",
//         category: "Medical Course",
//         text: "Never trust a computer you can’t throw out a window. (Steve Wozniak) Hardware: The parts of a computer system that can be kicked. (Jeff Pesis) The only people who have anything to fear from free software are those whose products are worth even less.",
//         image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
//     },
// ];

const CartEmpty = () => {
    return (
        <div
            style={{
                height: "60vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div className="display-1 text-muted mb-3">
                <i className="fas fa-shopping-cart"></i>
            </div>
            <p className="mb-2" style={{ fontSize: "24px" }}>
                Looks like your cart is empty!
            </p>
            <p>
                <Link className="primary-text" to="/catalog">
                    Click here
                </Link>{" "}
                to browse course catalog
            </p>
        </div>
    );
};

const url = baseUrl + studentUrl;
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const Cart = () => {
    const [courses, setCourses] = useState([]);
    const [coupon, setCoupon] = useState("");
    const [subtotal, setSubtotal] = useState(0);
    const [discount_amount, setDiscountAmount] = useState(0);
    const [total, setTotal] = useState(0);

    const [isLoading, setLoading] = useState(true);
    const [responseMsg, setResponseMsg] = useState("");
    const [showErrorAlert, setErrorAlert] = useState(false);
    const [showSuccessAlert, setSuccessAlert] = useState(false);
    const [isCouponApplied, setCouponStatus] = useState(false);

    useEffect(() => {
        document.title = "Cart | IQ Labs Academy";
        if (localStorage.getItem("Authorization")) {
            headers["Authorization"] = localStorage.getItem("Authorization");
        }
        window.scrollTo(0, 0);
        loadCartData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadCartData = () => {
        fetch(`${url}/student/cart/checkout/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    setCourses(result.data.cart_items);
                    setSubtotal(result.data.total_cart_price);
                    setTotal(result.data.total_cart_price);
                    setLoading(false);
                } else {
                    setResponseMsg(result.msg);
                    setErrorAlert(true);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setResponseMsg("Something went wrong!");
                setErrorAlert(true);
                setLoading(false);
            });
    };

    const handleRemove = (data) => {
        setLoading(true);
        setErrorAlert(false);
        setSuccessAlert(false);

        fetch(`${url}/student/cart/${data.cart_item_id}/`, {
            headers: headers,
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    setResponseMsg(result.msg);
                    setSuccessAlert(true);
                    loadCartData();
                } else {
                    setResponseMsg(result.msg);
                    setErrorAlert(true);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setResponseMsg("Something went wrong!");
                setErrorAlert(true);
                setLoading(false);
            });
    };

    const handleCoupon = () => {
        setErrorAlert(false);

        fetch(`${url}/student/cart/discount/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                coupon_name: coupon,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    setCouponStatus(true);
                } else {
                    setResponseMsg(result.msg);
                    setErrorAlert(true);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setResponseMsg("Something went wrong!");
                setErrorAlert(true);
                setLoading(false);
            });
    };

    const returnImage = (list) => {
        let URL = "";
        if (list.subscription_file_link) {
            if (list.subscription_file_link.subscription_image_1) {
                URL = list.subscription_file_link.subscription_image_1;
            } else {
                URL = courseimg;
            }
        } else {
            URL = courseimg;
        }

        return URL;
    };

    return (
        <>
            <Header activeLink="cart" />

            {/* Alert message */}
            <AlertBox
                errorMsg={responseMsg}
                successMsg={responseMsg}
                showErrorAlert={showErrorAlert}
                showSuccessAlert={showSuccessAlert}
                toggleSuccessAlert={() => {
                    setSuccessAlert(false);
                }}
                toggleErrorAlert={() => {
                    setErrorAlert(false);
                }}
            />

            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
            >
                <main className="container">
                    <div className="cart shadow-sm">
                        {courses && courses.length !== 0 ? (
                            <>
                                <h1 className="section-heading">Your cart</h1>
                                <div className="cart-header">
                                    <div className="row mb-2">
                                        <div className="col-8">Courses</div>
                                        <div className="col-2"></div>
                                        <div className="col-2 pl-0">Price</div>
                                    </div>
                                </div>
                                <div className="cart-body">
                                    {(courses || []).map((item, index) => {
                                        return (
                                            <div
                                                className="cart-row"
                                                key={index}
                                            >
                                                <div className="row align-items-center justify-content-center">
                                                    <div className="col-8 row align-items-center px-0">
                                                        <div className="col-2 d-none d-md-block">
                                                            <img
                                                                src={returnImage(
                                                                    item.subscription
                                                                )}
                                                                alt={
                                                                    item
                                                                        .subscription
                                                                        .title
                                                                }
                                                                className="img-fluid rounded-lg shadow"
                                                            />
                                                        </div>
                                                        <div className="col-md-10 col-12">
                                                            <p className="title text-truncate">
                                                                {
                                                                    item
                                                                        .subscription
                                                                        .title
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <i
                                                            className="far fa-trash-alt fa-lg text-muted"
                                                            onClick={() =>
                                                                handleRemove(
                                                                    item
                                                                )
                                                            }
                                                        ></i>
                                                    </div>
                                                    <div className="col-2 pr-0">
                                                        <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                                        {
                                                            item.subscription
                                                                .discounted_price
                                                        }
                                                        {item.subscription
                                                            .discounted_price <
                                                        item.subscription
                                                            .total_price ? (
                                                            <span
                                                                className="text-muted ml-2"
                                                                style={{
                                                                    textDecoration:
                                                                        "line-through",
                                                                }}
                                                            >
                                                                <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                                                {
                                                                    item
                                                                        .subscription
                                                                        .total_price
                                                                }
                                                            </span>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="cart-footer">
                                    <div className="row align-items-center justify-content-end">
                                        <div className="col-md-4 col-12 pl-md-0">
                                            <div className="form-row align-items-center justify-content-center">
                                                <div className="col-6">
                                                    Subtotal
                                                </div>
                                                <div className="col-6 text-right text-md-left">
                                                    <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                                    {subtotal}
                                                </div>
                                            </div>
                                            <div className="form-row align-items-center justify-content-center">
                                                <div className="col-6">
                                                    Coupon
                                                </div>
                                                <div className="col-6 text-right text-md-left">
                                                    <div className="input-group input-group-sm border-secondary rounded-lg overflow-hidden">
                                                        <input
                                                            type="text"
                                                            name="coupon"
                                                            className="form-control"
                                                            placeholder="Enter coupon code"
                                                            onChange={(e) =>
                                                                setCoupon(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            autoComplete="off"
                                                        />
                                                        <div className="input-group-prepend">
                                                            <button
                                                                className="btn btn-light btn-sm shadow-none"
                                                                onClick={() =>
                                                                    handleCoupon()
                                                                }
                                                            >
                                                                <i className="fas fa-save"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {isCouponApplied ? (
                                                        <p className="small text-success mb-0">
                                                            Coupon applied successfully!
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-row align-items-center justify-content-center">
                                                <div className="col-6">
                                                    Discount Amount
                                                </div>
                                                <div className="col-6 text-right text-md-left">
                                                    <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                                    {discount_amount}
                                                </div>
                                            </div>
                                            <div className="form-row align-items-center justify-content-center">
                                                <div className="col-6">
                                                    Total Amount
                                                </div>
                                                <div className="col-6 text-right text-md-left">
                                                    <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                                    {total}
                                                </div>
                                            </div>
                                            <div className="form-row align-items-center justify-content-center mt-3 mb-0">
                                                <div className="col-6"></div>
                                                <div className="col-6 text-right text-md-left">
                                                    <button className="btn btn-primary btn-sm shadow-none">
                                                        Checkout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : !isLoading ? (
                            <>
                                <CartEmpty />
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </main>

                {/* Loading component */}
                {isLoading ? <Loading /> : ""}
            </ErrorBoundary>

            <Footer />
        </>
    );
};

export default Cart;
