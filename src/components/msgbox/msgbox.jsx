import React from "react";
import * as bd from "react-basic-design";
import { Modal } from "react-bootstrap";

let msgBoxList = [];

export const msgbox = (title, body, buttons) => {
    if (msgBoxList.length > 0) msgBoxList[0].show(title, body, buttons);
};

export class MsgBox extends React.Component {
    constructor({ size }) {
        super();
        this.state = { open: false, title: "", body: "", buttons: "" };
        this.size = "";
    }

    handleClose = () => this.setState({ open: false });

    show = (title, body, buttons) => {
        if (typeof buttons === "string")
            buttons = (
                <bd.Button variant="text" color="primary" onClick={this.handleClose}>
                    {buttons}
                </bd.Button>
            );
        this.setState({ open: true, title, body, buttons });
    };

    componentDidMount() {
        msgBoxList.push(this);
    }

    componentWillUnmount() {
        const index = msgBoxList.indexOf(this);
        if (index > -1) {
            msgBoxList.splice(index, 1);
        }
    }

    renderButtons = () => {
        if (!this.state.buttons) return null;
        if (typeof this.state.buttons === "function") return this.state.buttons(this.handleClose);
        return <>{this.state.buttons}</>;
    };

    render() {
        if (!this.state.open) return null;
        return (
            <>
                <Modal show={this.state.open} onHide={this.handleClose} size={this.size}>
                    {this.state.title && (
                        <Modal.Header className="p-4 pb-0 mb-n2">
                            <Modal.Title className="h5">{this.state.title}</Modal.Title>
                        </Modal.Header>
                    )}
                    <Modal.Body className="p-4">
                        <div className="text-secondary-text">{this.state.body}</div>
                        {this.state.buttons && <div className="pt-4 mb-n2 text-end">{this.renderButtons()}</div>}
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
