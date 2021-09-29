import React, { useState } from "react";
import { Form } from "react-final-form";

import { FinalCheck, FinalField } from "../../../components/basic/final-form";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { BasicModal } from "../../../components/basic/basic-modal";

import { messages } from "../../../components/messages";
import classNames from "classnames";
import { tableDesignerApi } from "../../../api/table-designer-api";
import { notify } from "../../../components/basic/notify";
import { Table } from "../../../components/table";

//
export function TableDesignerEditTable({ table, group, onChanged }) {
    const [columns] = useState(table.columns);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeletingGroup, setShowDeletingGroup] = useState(false);
    const insertMode = !table.name;
    const tableRef = React.useRef();

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

    const table_columns = React.useMemo(
        () => [
            { Header: "Id", accessor: "id" },
            { Header: "Name", accessor: "name" },
            { Header: "Expression", accessor: "expression" },
            // { Header: "Alias", accessor: "alias" },
            { Header: "Title", accessor: "tile" },
            { Header: "IsPK", accessor: "isPk" },
            { Header: "IsRequired", accessor: "isRequired" },
            { Header: "DefaultValue", accessor: "defaultValue" },
            { Header: "ToggleOnClick", accessor: "toggleOnClick" },
            { Header: "Editor", accessor: "editor" },
            { Header: "ValidValues", accessor: "validValues" },
            { Header: "CellStyle", accessor: "cellStyle" },
            { Header: "CellClassName", accessor: "cellClassName" },
            { Header: "HiddenInTable", accessor: "hiddenInTable" },
            { Header: "HiddenInEditor", accessor: "hiddenInEditor" },
            { Header: "Category", accessor: "category" },
            { Header: "Dir", accessor: "dir" },
        ],
        []
    );

    return (
        <div className="container" style={{ marginBottom: 70 }}>
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
                                    <div></div>
                                </div>
                            </div>

                            <bd.AppBar className="bg-default" position="bottom">
                                <bd.Toolbar>
                                    <div className="flex-grow-1"></div>
                                    <bd.Button color="primary" type="submit" disabled={loading || deleting || invalid}>
                                        {loading && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                                        <span>Save Table</span>
                                    </bd.Button>

                                    <bd.Button
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
                                    </bd.Button>
                                </bd.Toolbar>
                            </bd.AppBar>

                            <BasicModal
                                show={showDeletingGroup}
                                setShow={setShowDeletingGroup}
                                renderBody={({ hide }) => (
                                    <>
                                        Your going to delete the table
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

            <bd.TableTitlebar
                title="My Table"
                tableRef={tableRef}
                fixed
                buttons={
                    <>
                        <bd.Button variant="icon" size="md">
                            <icons.Add />
                        </bd.Button>
                        <bd.Button variant="icon" size="md">
                            <icons.Delete />
                        </bd.Button>
                    </>
                }
            />

            <Table
                //className="w-100"
                columns={table_columns}
                //defaultColumn={defaultColumn}
                data={columns}
                //updateData={updateMyData}
                //skipReset={skipResetRef.current}
                //enablePaging={enablePaging}
                //enableGrouping={enableGrouping}
                //enableSorting={enableSorting}
                //showTableInfo={showTableInfo}
                //showSummary={showSummary}
                //showColumnFilter={showColumnFilter}
                //hideColumns={}
                //showFooter={showFooter}
                //showPageSize={true}
                //border=""
                editable={true}
                //clickAction="toggle"
                //hideCheckbox={hideCheckbox}
                //selectionMode="single"
                //messages={messages}
                tableRef={tableRef}
                //tableClassName="w-100"
                //
                title="Columns"
                expandableTitlebar={true}
                showRowsCount={true}
                titlebarSize="md"
                titlebarColor="secondary"
                //
                defaultPageSize={5}
                onStateChanged={(state) => {
                    console.log(state);
                }}
            />
        </div>
    );
}
