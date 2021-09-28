import React, { useState } from "react";
import { Form } from "react-final-form";

import { FinalCheck, FinalField } from "../../../components/basic/final-form";
import * as bs from "react-basic-design";
import * as tables from "../../../data";
import { BasicModal } from "../../../components/basic/basic-modal";

import { messages } from "../../../components/messages";
import classNames from "classnames";
import { tableDesignerApi } from "../../../api/table-designer-api";
import { notify } from "../../../components/basic/notify";
import { tableMessages } from "../../../components/basic/table/table-messages";
import { BasicTable } from "../../../components/basic/table/basic-table";

//
export function TableDesignerEditTable({ table, group, onChanged }) {
    const [columns] = useState(table.columns);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeletingGroup, setShowDeletingGroup] = useState(false);
    const insertMode = !table.name;

    const onSubmit = (values) => {
        setLoading(true);
        tableDesignerApi
            .saveTable(group.id, values, insertMode)
            .then((x) => {
                setLoading(false);
                notify.info(messages.ChangesAreSaved);
                table.data = x;
                onChanged(x);
            })
            .catch((ex) => {
                setLoading(false);
                notify.error(ex);
            });
    };

    const onDeleteClick = () => {
        setDeleting(true);
        tableDesignerApi
            .deleteTable(table.name)
            .then((x) => {
                setLoading(false);
                notify.info(messages.RowIsDeleted);
                onChanged(null);
            })
            .catch((ex) => {
                setLoading(false);
                notify.error(ex);
            });
    };

    return (
        <div className="container">
            <div className="mt-4" style={{ maxWidth: 500 }}>
                <Form
                    initialValues={table.data}
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitting, invalid }) => (
                        <form onSubmit={handleSubmit} className="ltr" spellCheck="false">
                            <FinalField name="name" label="Name:" type="text" autoComplete="off" autoFocus labelSize="3" />

                            <FinalField name="title" label="Title:" type="text" autoComplete="off" labelSize="3" />

                            <FinalField name="singularTitle" label="Singular Title:" type="text" autoComplete="off" labelSize="3" />
                            <FinalCheck inline name="sortable" label="Sortable" labelSize="3" />
                            <FinalCheck inline name="filterable" label="Filterable" labelSize="3" />

                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-9">
                                    <div>
                                        <bs.Button color="primary" type="submit" disabled={loading || deleting || invalid}>
                                            {loading && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                                            <span>Save Table</span>
                                        </bs.Button>

                                        <bs.Button
                                            className={classNames("mx-2", {
                                                "d-none": !group.id,
                                            })}
                                            type="button"
                                            variant="outline"
                                            disabled={loading || deleting || table.columns.length > 0}
                                            onClick={() => setShowDeletingGroup(true)}
                                        >
                                            {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                                            <span>DELETE</span>
                                        </bs.Button>
                                    </div>
                                </div>
                            </div>

                            <BasicModal
                                show={showDeletingGroup}
                                setShow={setShowDeletingGroup}
                                renderBody={({ hide }) => (
                                    <>
                                        Your going to delete the table
                                        <br />
                                        Are you sure?
                                        <div className="pt-2 text-end">
                                            <bs.Button variant="text" type="button" color="primary" onClick={hide} className="m-e-2">
                                                Cancel
                                            </bs.Button>

                                            <bs.Button type="button" color="secondary" disabled={deleting} onClick={onDeleteClick}>
                                                {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                                                <span>DELETE</span>
                                            </bs.Button>
                                        </div>
                                    </>
                                )}
                            />
                        </form>
                    )}
                />
            </div>

            <div className={`overflow-auto nano-scroll ${insertMode ? "d-none" : ""}`}>
                <BasicTable
                    title="Columns"
                    singularTitle="Columns"
                    columns={tables.columns.getReactTableColumns()}
                    data={columns}
                    // onRefresh={onRefresh}
                    // onInsert={onInsertApp}
                    // onUpdate={onUpdateApp}
                    // onDelete={onDeleteApp}
                    messages={tableMessages}
                />
            </div>
        </div>
    );
}
