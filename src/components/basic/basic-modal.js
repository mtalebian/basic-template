import React from "react";
import { Modal } from "react-bootstrap";

export const BasicModal = ({ show, setShow, title, renderBody, ...props }) => {
    const hide = () => setShow(false);

    return (
        <Modal show={show} onHide={hide} size="md">
            <Modal.Header className="py-2">
                {title && <Modal.Title className="h4">{title}</Modal.Title>}
            </Modal.Header>
            <Modal.Body>{renderBody({ hide, ...props })}</Modal.Body>
        </Modal>
    );
};
