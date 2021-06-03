import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className="card my-5">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
};

export default ErrorFallback;
