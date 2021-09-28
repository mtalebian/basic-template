import React, { useState, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import { notify } from "../notify";
import { BasicTable1 } from "./basic-table-1";
import { tableMessages } from "./table-messages";
import { Form } from "react-final-form";
import BasicValidator from "basic-data-validator";
import { GenerateEditControls } from "./generate-edit-controls";

/*
   Columns Fields:
        Header: '���',
        accessor: 'city',
        _toggleOnClick: true,
        _editor: 'select | number | checkbox | radio',
        _validValues: [ { code: "1", title: "" }, ... ],
        _validValues: ["Tehran", "Karaj", "Isfahan", "Sari"],
*/

export function DataTable({
    title,
    singularTitle,
    columns,
    data,
    onRefresh,
    onInsert,
    onUpdate,
    onDelete,
    messages,
    ...props
}) {
    messages = { ...tableMessages, ...messages };
    columns = useMemo(() => columns, [columns]);

    const [busy, setBusy] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [insertMode, setInsertMode] = useState(false);
    const [entity, setEntity] = useState({});

    const handleClose = () => {
        setShowEditForm(false);
        setShowDeleteForm(false);
    };

    const deleteRowsClick = () => {
        var selection = selectedRows.map((x) => x.original);
        setBusy(true);
        onDelete(selection)
            .then((x) => {
                setShowDeleteForm(false);
                notify.info(format(messages.RowIsDeleted));
                setBusy(false);
            })
            .catch((ex) => {
                notify.error(ex);
                setBusy(false);
            });
    };

    const onSubmit = (values) => {
        setBusy(true);
        var task = insertMode ? onInsert(values) : onUpdate(values);
        task.then((result) => {
            setShowEditForm(false);
            notify.success(format(messages.ChangesAreSaved));
            setBusy(false);
        }).catch((ex) => {
            notify.error(ex);
            setBusy(false);
        });
    };

    function onOpenEditor(data) {
        setInsertMode(!data);
        setEntity(!data ? {} : data);
        setShowEditForm(true);
    }

    function onAskForDelete(rows) {
        setSelectedRows(rows);
        setShowDeleteForm(true);
    }

    function format(message, args) {
        if (!message) return message;
        if (typeof message === "string" && message.indexOf("{") === -1) return message;
        if (!args) args = {};
        args = {
            count: selectedRows.length,
            plural: title,
            singular: singularTitle,
            ...args,
        };
        if (typeof message === "function") {
            args = {
                original: entity,
                insertMode,
                selection: selectedRows.map((x) => x.original),
                ...args,
            };
            return message(args);
        }
        return messages.format(message, args);
    }

    const myValidator = BasicValidator((builder) =>
        builder.object({
            //userName: builder.string().required().userName(),
            //password: builder.string().required().password(),
            //captcha: builder.string().required().length(4),
        })
    );

    return (
        <>
            <BasicTable1
                title={title}
                columns={columns}
                data={data}
                onAdd={onOpenEditor}
                onEdit={onOpenEditor}
                onDelete={onAskForDelete}
                onRefresh={onRefresh}
                messages={messages}
                {...props}
            />

            {/* EDIT FORM */}
            <Modal show={showEditForm} onHide={handleClose} size="md">
                <Modal.Header closeButton className="py-2">
                    <Modal.Title className="h4">
                        {format(insertMode ? messages.New : messages.Edit)} {singularTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        initialValues={entity}
                        onSubmit={onSubmit}
                        validate={myValidator.validate}
                        render={({ handleSubmit, form, submitting, pristine, invalid, values }) => (
                            <form onSubmit={handleSubmit} className="form register">
                                <GenerateEditControls
                                    columns={columns}
                                    data={entity}
                                    insertMode={insertMode}
                                    size="sm"
                                />
                                <div className="text-end mt-4">
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="text-decoration-none"
                                        onClick={handleClose}
                                    >
                                        {format(messages.Cancel)}
                                    </Button>
                                    <Button variant="warning" size="sm" type="submit" disabled={busy || invalid}>
                                        {busy && <div className="me-2 spinner-border spinner-border-sm"></div>}
                                        {format(messages.Save)}
                                    </Button>
                                </div>
                            </form>
                        )}
                    />
                </Modal.Body>
            </Modal>

            {/* DELETE FORM */}
            <Modal show={showDeleteForm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{format(messages.YouAreGoingToDeleteRows)}</Modal.Body>
                <Modal.Footer>
                    <Button variant="link" size="sm" className="text-decoration-none" onClick={handleClose}>
                        {format(messages.Cancel)}
                    </Button>
                    <Button variant="danger" size="sm" className="text-white" onClick={deleteRowsClick} disabled={busy}>
                        {busy && <div className="me-2 spinner-border spinner-border-sm"></div>}
                        {format(messages.Delete)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
