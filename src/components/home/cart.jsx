import React, { useEffect } from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import Select from "react-select";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";

const data = [
    {
        title: "Lorem ipsum is placeholder text",
        price: "1000",
        duration: "3 Months 10 Days",
        category: "Degree",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacinia quis vel eros donec ac odio tempor. Quis ipsum suspendisse ultrices gravida dictum.",
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    {
        title: "Lorem ipsum is placeholder text",
        price: "1500",
        duration: "2 Months 20 Days",
        category: "Medical Course",
        text: "Never trust a computer you can’t throw out a window. (Steve Wozniak) Hardware: The parts of a computer system that can be kicked. (Jeff Pesis) The only people who have anything to fear from free software are those whose products are worth even less.",
        image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
];

const Cart = () => {
    useEffect(() => {
        document.title = "Cart | IQ Labs Academy";
    }, []);

    return (
        <>
            <Header />

            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
            >
                <main className="container">
                    <div className="cart shadow-sm">
                        <h1 className="section-heading">Your cart</h1>
                        <div className="cart-header">
                            <div className="row mb-2">
                                <div className="col-8">Courses</div>
                                <div className="col-2"></div>
                                <div className="col-2 pl-0">Price</div>
                            </div>
                        </div>
                        <div className="cart-body">
                            {data.map((item, index) => {
                                return (
                                    <div className="cart-row" key={index}>
                                        <div className="row align-items-center justify-content-center">
                                            <div className="col-8 row align-items-center px-0">
                                                <div className="col-2 d-none d-md-block">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="img-fluid rounded-lg shadow"
                                                    />
                                                </div>
                                                <div className="col-md-10 col-12">
                                                    <p className="title text-truncate">
                                                        {item.title}
                                                    </p>
                                                    <div className="d-flex">
                                                        <span className="bg-light rounded-pill small py-1 px-2 mr-1">
                                                            <i className="fas fa-tag mr-1"></i>{" "}
                                                            {item.category}
                                                        </span>
                                                        <span className="bg-light rounded-pill small py-1 px-2">
                                                            <i className="far fa-clock mr-1"></i>{" "}
                                                            {item.duration}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <i className="far fa-trash-alt fa-lg text-muted"></i>
                                            </div>
                                            <div className="col-2 pr-0">
                                                <i className="fas fa-rupee-sign"></i>{" "}
                                                {item.price}
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
                                        <div className="col-6">Subtotal</div>
                                        <div className="col-6 text-right text-md-left">
                                            <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                            2500
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center justify-content-center">
                                        <div className="col-6">Coupon</div>
                                        <div className="col-6 text-right text-md-left">
                                            <Select
                                                className="basic-single border-secondary"
                                                placeholder="Apply coupon"
                                                isSearchable={true}
                                                name="coupon"
                                                id="coupon"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center justify-content-center">
                                        <div className="col-6">
                                            Discount Amount
                                        </div>
                                        <div className="col-6 text-right text-md-left">
                                            <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                            2500
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center justify-content-center">
                                        <div className="col-6">
                                            Total Amount
                                        </div>
                                        <div className="col-6 text-right text-md-left">
                                            <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                            2500
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
                    </div>
                </main>
            </ErrorBoundary>

            <Footer />
        </>
    );
};

export default Cart;
