import React from "react";
import { Alert } from "react-bootstrap";

class AlertBox extends React.Component {
    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevProps.showSuccessAlert !== this.props.showSuccessAlert &&
            this.props.showSuccessAlert === true
        ) {
            setTimeout(() => {
                this.props.toggleAlert();
            }, 5000);
        }
        // if (
        //     prevProps.showErrorAlert !== this.props.showErrorAlert &&
        //     this.props.showErrorAlert === true
        // ) {
        //     setTimeout(() => {
        //         this.props.toggleAlert();
        //     }, 10000);
        // }
    };

    render() {
        return (
            <>
                <Alert
                    variant="danger"
                    className="fixed-top alert-top shadow-sm"
                    show={this.props.showErrorAlert}
                    onClose={() => {
                        this.props.toggleAlert();
                    }}
                    dismissible
                >
                    <div className="d-flex justify-content-center align-items-center">
                        <i className="far fa-times-circle mr-2"></i>
                        <p className="mb-0">{this.props.errorMsg}</p>
                    </div>
                </Alert>
                <Alert
                    variant="success"
                    className="fixed-top alert-top shadow-sm"
                    show={this.props.showSuccessAlert}
                    onClose={() => {
                        this.props.toggleAlert();
                    }}
                    dismissible
                >
                    <div className="d-flex justify-content-center align-items-center">
                        <i className="far fa-check-circle mr-2"></i>
                        <p className="mb-0">{this.props.successMsg}</p>
                    </div>
                </Alert>
            </>
        );
    }
}

export default AlertBox;