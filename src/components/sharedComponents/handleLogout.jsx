import React from "react";
import IdleTimer from "react-idle-timer";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 1000 * 60 * 30,
            showModal: false,
            userLoggedIn: false,
            isTimedOut: false,
            isLoggedOut: false,
        };
        this.idleTimer = null;
    }

    onAction = () => {
        this.setState({ isTimedOut: false });
    };

    onActive = () => {
        this.setState({ isTimedOut: false });
    };

    onIdle = () => {
        if (!this.state.isTimedOut) {
            this.setState({ showModal: true });
            this.idleTimer.reset();
            this.setState({ isTimedOut: true });
            var url = baseUrl + adminPathUrl;
            var authToken = localStorage.getItem("Inquel-Auth");
            var headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Inquel-Auth": authToken,
            };

            fetch(`${url}/logout/`, {
                headers: headers,
                method: "POST",
            })
                .then((res) => res.json())
                .then((result) => {
                    localStorage.clear();
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    handleLogout = () => {
        this.setState({
            isLoggedOut: true,
        });
    };

    render() {
        if (this.state.isLoggedOut) {
            return <Redirect to={`/${this.props.path}/login`} />;
        }
        return (
            <>
                <IdleTimer
                    ref={(ref) => {
                        this.idleTimer = ref;
                    }}
                    onActive={this.onActive}
                    onIdle={this.onIdle}
                    onAction={this.onAction}
                    debounce={250}
                    timeout={this.state.timeout}
                />

                {this.state.showModal ? (
                    <Modal show={this.state.showModal} size="md">
                        <Modal.Header>You have been logged out!</Modal.Header>
                        <Modal.Body>Please Login to continue...</Modal.Body>
                        <Modal.Footer>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.handleLogout}
                            >
                                Login
                            </button>
                        </Modal.Footer>
                    </Modal>
                ) : (
                    ""
                )}
            </>
        );
    }
}

export default Logout;
