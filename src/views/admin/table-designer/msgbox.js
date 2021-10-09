import React from "react";
import { Modal } from "react-bootstrap";

//let MsgBox_Counter = 0;

export class MsgBox extends React.Component {
    constructor(props) {
        super();
        this.state = { open: false, title: "", body: "", buttons: "" };
    }

    handleClose = () => this.setState({ open: false });

    show = (title, body, buttons) => {
        this.setState({ open: true, title, body, buttons });
    };

    renderButtons = () => {
        if (!this.state.buttons) return null;
        debugger;
        if (typeof this.state.buttons === "function") return this.state.buttons(this.handleClose);
        return <>{this.state.buttons}</>;
    };

    render() {
        //console.log("MsgBox_Counter", ++MsgBox_Counter);
        if (!this.state.open) return null;
        return (
            <>
                <Modal show={this.state.open} onHide={this.handleClose} size="md">
                    <Modal.Header>{this.state.title && <Modal.Title className="h4">{this.state.title}</Modal.Title>}</Modal.Header>
                    <Modal.Body>
                        <div>{this.state.body}</div>
                        <div className="mt-3">{this.renderButtons()}</div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
