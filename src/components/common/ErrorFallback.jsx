import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
                <div
                    className="bg-light border-secondary rounded-lg d-flex align-items-center justify-content-center p-3"
                    style={{ height: "80px" }}
                >
                    <p className="text-dark text-center mb-0">
                        <i className="fas fa-exclamation-triangle fa-lg text-warning mr-1"></i>{" "}
                        There is a problem in showing this component! {" "}
                        <span
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={resetErrorBoundary}
                        >
                            Reload this page
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorFallback;

// <div className="row justify-content-center">
//     <div className="col-lg-8 col-md-10">
//         <div className="bg-light border-secondary rounded-lg">
//             <div className="card-header bg-light d-flex align-items-center justify-content-between">
//                 <p className="text-dark font-weight-bold-600 mb-0">
//                     <i className="fas fa-exclamation-triangle fa-lg text-warning mr-1"></i>{" "}
//                     Something went wrong!
//                 </p>
//                 <button
//                     className="btn btn-light btn-sm shadow-none"
//                     onClick={resetErrorBoundary}
//                 >
//                     <i className="fas fa-redo fa-sm mr-1"></i> Reload this page
//                 </button>
//             </div>
//             <div className="card-body">
//                 <div className="bg-dark p-3 rounded-lg">
//                     <pre className="text-danger mb-0">{error.message}</pre>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
