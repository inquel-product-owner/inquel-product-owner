import React, { useState, useEffect } from "react";
import Header from "./shared/navbar";
import Footer from "./shared/footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import { connect } from "react-redux";
import { baseUrl, homeURL, studentUrl } from "../../shared/baseUrl";
import courseimg from "../../assets/code.jpg";
import Loading from "../common/loader";
import Paginations from "../common/pagination";
import { paginationCount } from "../../shared/constant";
import AlertBox from "../common/alert";
import DetailModal from "../common/modal/courseDetail";
import { Link } from "react-router-dom";
import storeDispatch from "../../redux/dispatch";
import { TEMP } from "../../redux/action";

const mapStateToProps = (state) => ({
    temp: state.storage.temp,
});

const url = baseUrl + homeURL;
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const Catalog = (props) => {
    const [tab, setTab] = useState(props.match.params.category || "ALL");
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const [isLoading, setLoading] = useState(true);
    const [responseMsg, setResponseMsg] = useState("");
    const [showErrorAlert, setErrorAlert] = useState(false);
    const [showSuccessAlert, setSuccessAlert] = useState(false);
    const [showModal, toggleModal] = useState(false);
    const [selectedData, setData] = useState("");

    useEffect(() => {
        document.title = "Buy a course | IQ Labs Academy";
        if (localStorage.getItem("Authorization")) {
            headers["Authorization"] = localStorage.getItem("Authorization");
        }
        loadCourses(page, tab);
        loadCategory();
        window.scrollTo(0, 0);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (props.match.params.category) {
            if (props.match.params.category !== tab) {
                setTab(props.match.params.category);
                setLoading(true);
                loadCourses(page, props.match.params.category);
            }
        }
    }, [props.match.params.category]); // eslint-disable-line react-hooks/exhaustive-deps

    const getPath = (page, tab) => {
        let path = "";

        if (page > 1) {
            path = `${url}/subscription/?category=${tab}&page=${page}`;
        } else {
            path = `${url}/subscription/?category=${tab}`;
        }

        return path;
    };

    const loadCourses = (page, tab) => {
        fetch(getPath(page, tab), {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    setCourses(result.data.results);
                    setCount(result.data.count);
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

    const loadCategory = () => {
        fetch(`${url}/subscription/category/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    setCategory(result.data.category);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handle_AddToCart = (id) => {
        setLoading(true);
        setErrorAlert(false);
        setSuccessAlert(false);

        if (
            localStorage.getItem("Authorization") &&
            localStorage.getItem("is_student")
        ) {
            fetch(`${baseUrl}${studentUrl}/student/cart/`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({
                    subscription_id: id,
                }),
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        setResponseMsg(result.msg);
                        setSuccessAlert(true);
                        loadCourses(page, tab);
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
        } else {
            props.history.push(`/login?redirect=${props.match.url}`);
        }
    };

    return (
        <>
            <Header activeLink="course" />

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

            {showModal ? (
                <DetailModal
                    show={showModal}
                    onHide={() => toggleModal(false)}
                    data={selectedData}
                />
            ) : (
                ""
            )}

            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
            >
                <main className="catalog">
                    <div className="row">
                        {/* ----------- Filter column ----------- */}
                        <div className="col-md-3 mb-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-3">
                                    <li className="breadcrumb-item">
                                        <Link to="/">
                                            <i className="fas fa-home fa-sm"></i>{" "}
                                            Home
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Catalog
                                    </li>
                                </ol>
                            </nav>

                            <div className="search">
                                <div className="form-row align-items-center">
                                    <div className="col-10 pr-0">
                                        <input
                                            type="search"
                                            name="search"
                                            id="search"
                                            placeholder="Search..."
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-2 pr-0">
                                        <button className="btn bg-transparent btn-sm shadow-none">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom mt-3 mb-1"></div>
                            <div className="category border-bottom">
                                <p className="text-muted font-weight-bold-600">
                                    Category
                                </p>
                                {(category || []).map((list, index) => {
                                    return (
                                        <p
                                            className={`tab ${
                                                tab === list.code
                                                    ? "active"
                                                    : ""
                                            }`}
                                            key={index}
                                            onClick={async () => {
                                                props.history.push(
                                                    `/catalog/${list.code}`
                                                );
                                                storeDispatch(TEMP, list);
                                            }}
                                        >
                                            {tab === list.code ? (
                                                <i className="fas fa-check-circle fa-sm mr-1"></i>
                                            ) : (
                                                <i className="far fa-circle fa-sm mr-1"></i>
                                            )}{" "}
                                            {list.title}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ---------- Course list column ---------- */}
                        <div className="col-md-9">
                            {courses && courses.length !== 0 ? (
                                <>
                                    <div className="header border-bottom">
                                        <div className="row">
                                            <div className="col-md-6">
                                                {tab !== "ALL"
                                                    ? props.temp.title
                                                    : "All"}{" "}
                                                Courses
                                            </div>
                                            <div className="col-md-6"></div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        {(courses || []).map((item, index) => {
                                            return (
                                                <div
                                                    className="col-lg-4 col-md-6 col-12 mb-4"
                                                    key={index}
                                                >
                                                    <div className="card">
                                                        <div className="px-2 pt-2">
                                                            <img
                                                                src={
                                                                    item
                                                                        .subscription_file_link
                                                                        .subscription_image_1
                                                                        ? item
                                                                              .subscription_file_link
                                                                              .subscription_image_1
                                                                        : courseimg
                                                                }
                                                                alt={item.title}
                                                                className="card-img-top shadow-sm"
                                                            />
                                                        </div>
                                                        <div className="card-body p-3">
                                                            <p className="title text-truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="description">
                                                                {item.description.substring(
                                                                    0,
                                                                    60
                                                                )}
                                                                {item.description
                                                                    ? item
                                                                          .description
                                                                          .length >
                                                                      60
                                                                        ? "..."
                                                                        : ""
                                                                    : ""}

                                                                <span
                                                                    className="read-more ml-1"
                                                                    onClick={() => {
                                                                        toggleModal(
                                                                            true
                                                                        );
                                                                        setData(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Read more
                                                                </span>
                                                            </p>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <span className="font-weight-bold light-bg primary-text rounded-pill small py-1 px-2 mr-2">
                                                                    <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                                                    {
                                                                        item.discounted_price
                                                                    }
                                                                </span>
                                                                {item.discounted_price <
                                                                item.total_price ? (
                                                                    <span
                                                                        className="text-muted small"
                                                                        style={{
                                                                            textDecoration:
                                                                                "line-through",
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-rupee-sign fa-sm"></i>{" "}
                                                                        {
                                                                            item.total_price
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                            <div className="form-row align-items-center justify-content-center mt-auto">
                                                                <div className="col-6">
                                                                    <button className="btn btn-primary btn-sm btn-block shadow-none">
                                                                        Buy now
                                                                    </button>
                                                                </div>
                                                                <div className="col-6">
                                                                    {item.added_to_cart ? (
                                                                        <Link
                                                                            className="text-decoration-none"
                                                                            to="/cart"
                                                                        >
                                                                            <button className="btn bg-transparent primary-text border-primary btn-sm btn-block shadow-none">
                                                                                Added{" "}
                                                                                <i className="fas fa-check-circle fa-sm ml-1 text-success"></i>
                                                                            </button>
                                                                        </Link>
                                                                    ) : (
                                                                        <button
                                                                            className="btn bg-transparent primary-text border-primary btn-sm btn-block shadow-none"
                                                                            onClick={() => {
                                                                                handle_AddToCart(
                                                                                    item.subscription_id
                                                                                );
                                                                            }}
                                                                        >
                                                                            Add
                                                                            to
                                                                            cart
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {count > paginationCount ? (
                                        <div className="d-flex justify-content-center w-100 mb-5">
                                            <Paginations
                                                activePage={page}
                                                totalItemsCount={count}
                                                onChange={(page) => {
                                                    setPage(page);
                                                    setLoading(true);
                                                    loadCourses(page, tab);
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </>
                            ) : (
                                <div
                                    className="mb-3"
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {!isLoading ? (
                                        <>
                                            <h1 className="text-center display-4">
                                                <i className="far fa-folder-open"></i>
                                            </h1>
                                            <h4 className="text-center">
                                                No data to display...
                                            </h4>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Loading component */}
                {isLoading ? <Loading /> : ""}
            </ErrorBoundary>

            <Footer />
        </>
    );
};

export default connect(mapStateToProps)(Catalog);
