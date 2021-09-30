import React, { useState } from "react";
import { Form } from "react-final-form";

import { FinalField } from "../../../components/basic/final-form";
import * as bd from "react-basic-design";
import { BasicModal } from "../../../components/basic/basic-modal";

import { messages } from "../../../components/messages";
import classNames from "classnames";
import { tableDesignerApi } from "../../../api/table-designer-api";
import { notify } from "../../../components/basic/notify";

//
export function TableDesignerEditGroup({ group, onChanged }) {
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeletingGroup, setShowDeletingGroup] = useState(false);

    const onSubmit = (values) => {
        setLoading(true);
        var insertMode = !group.id;
        tableDesignerApi
            .saveGroup(values, insertMode)
            .then((x) => {
                setLoading(false);
                notify.info(messages.ChangesAreSaved);
                x.items = group.items ? group.items : [];
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
            .deleteGroup(group.id)
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
            <Form
                initialValues={group}
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, invalid }) => (
                    <form onSubmit={handleSubmit}>
                        <bd.Toolbar className="p-0 border-bottom mb-3">
                            <h5>
                                Edit Group: <b className="text-primary-text">{group.title}</b>
                            </h5>

                            <div className="flex-grow-1" />

                            <bd.Button color="primary" type="submit" disabled={loading || deleting || invalid}>
                                {loading && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                                <span>Save Group</span>
                            </bd.Button>

                            <bd.Button
                                className={classNames("mx-2", {
                                    "d-none": !group.id,
                                })}
                                type="button"
                                variant="outline"
                                disabled={loading || deleting || (group.items && group.items.length)}
                                onClick={() => setShowDeletingGroup(true)}
                            >
                                {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                                <span>DELETE</span>
                            </bd.Button>
                        </bd.Toolbar>

                        <div style={{ maxWidth: 400 }}>
                            <FinalField name="title" label="Group Title:" type="text" autoComplete="off" autoFocus />
                        </div>

                        <BasicModal
                            show={showDeletingGroup}
                            setShow={setShowDeletingGroup}
                            renderBody={({ hide }) => (
                                <>
                                    Your going to delete the group
                                    <br />
                                    Are you sure?
                                    <div className="pt-2 text-end">
                                        <bd.Button variant="text" type="button" color="primary" onClick={hide} className="m-e-2">
                                            Cancel
                                        </bd.Button>

                                        <bd.Button type="button" color="secondary" disabled={deleting} onClick={onDeleteClick}>
                                            {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                                            <span>DELETE</span>
                                        </bd.Button>
                                    </div>
                                </>
                            )}
                        />
                    </form>
                )}
            />
        </div>
    );
}
