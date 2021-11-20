import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import * as bd from "react-basic-design";
import * as bd2 from "../../../components/forms";
import * as icons from "../../../assets/icons";
import { gridBuilderApi } from "../../../api/grid-builder-api";
import { notify } from "../../../components/basic/notify";
import { TableTitlebar } from "../../../components/table";
import {
    useTable,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useFilters,
    useGroupBy,
    useExpanded,
    useRowSelect,
    //useBlockLayout,
    useFlexLayout,
    //useRowState,
    //useResizeColumns,
} from "react-table";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { DefaultEditor } from "../../../components/table/editors";
import { T } from "../../../components/basic/text";
import { msgbox } from "react-basic-design";
import { EditColumn } from "./edit-column";

//
export function GridBuilderEditGrid({ table, onChanged, onGoBack }) {
    const { t } = useTranslation();
    const [gridId, setGridId] = useState(table.id);
    const [data, setData] = useState(table.dataColumns);
    const [column, setColumn] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const insertMode = !table.id;
    const formRef = useRef();
    const newColumnObject = {
        isPK: false,
        isNull: true,
        filterRequired: true,
        showInList: true,
        showInEditor: true,
        isReadOnly: false,
    };

    useEffect(() => {
        if (gridId === table.id) return;
        setGridId(table.id);
        setData(table.dataColumns);
    }, [gridId, table]);

    const onSaveClick = () => {
        var values = formRef.current.values;
        setSaving(true);
        var dto = { ...values, dataColumns: data };
        gridBuilderApi
            .saveGrid(dto)
            .then((x) => {
                setSaving(false);
                notify.info(t("changes-are-saved"));
                onChanged(x, table);
            })
            .catch((ex) => {
                setSaving(false);
                notify.error(ex);
            });
    };

    const onDeleteClick = () => {
        msgbox(<T>deleting-current-grid</T>, null, [
            {
                title: <T>delete</T>,
                action: (hide) => {
                    hide();
                    setDeleting(true);
                    gridBuilderApi
                        .deleteGrid(table.id)
                        .then((x) => {
                            setDeleting(false);
                            notify.info(t("row-is-deleted"));
                            onChanged(null, table);
                        })
                        .catch((ex) => {
                            setDeleting(false);
                            notify.error(ex);
                        });
                },
            },
            { title: <T>close</T> },
        ]);
    };

    const defaultPageSize = 10;
    const skipReset = true;

    const updateData = (rowIndex, columnId, value) => {
        //setSkipPageReset(true);
        const new_row = { ...data[rowIndex], [columnId]: value };
        setData(data.map((row, index) => (index === rowIndex ? new_row : row)));
    };

    const tableApi = useTable(
        {
            initialState: {
                pageSize: defaultPageSize,
                minWidth: 200,
                hiddenColumns: ["defaultValue", "width", "validValues", "cellClassName", "controlClassName"],
            },
            defaultColumn: {
                Cell: DefaultEditor,
                minWidth: 10,
                disableGroupBy: true,
                //maxWidth: 200,
            },
            columns: useMemo(
                () => [
                    {
                        Header: "ID",
                        accessor: "id",
                        readOnly: true,
                        width: 50,
                    },
                    { Header: "NAME", accessor: "name", display: "text" },
                    {
                        Header: "TITLE",
                        accessor: "title",
                        readonly: (r, c) => r.values.isRequired,
                    },
                    { Header: "IsPK", accessor: "isPK", width: 50, display: "check" },
                    { Header: "Null", accessor: "isNull", display: "check", width: 80 },
                    {
                        Header: "Type",
                        id: "type",
                        readOnly: true,
                        width: 100,
                        Cell: ({ row }) => {
                            var r = row.original;
                            return !r.dataType ? "" : `${r.dataType}(${r.maxLen})`;
                        },
                    },
                    { Header: "DefaultValue", accessor: "defaultValue", width: 100 },
                    { Header: "Filter", accessor: "filter", display: "select", validValues: ",simple,range", width: 100 },
                    { Header: "Width", accessor: "width", display: "number", width: 80 },

                    { Header: "ReadOnly", accessor: "isReadOnly", display: "check", width: 80 },
                    { Header: "List", accessor: "showInList", display: "check", width: 50 },
                    { Header: "Editor", accessor: "showInEditor", display: "check", width: 50 },

                    {
                        Header: "Display",
                        accessor: "display",
                        width: 100,
                        display: "select",
                        validValues: ", text, email, url, number, amount, textarea, check, switch, select, shamsi",
                    },
                    {
                        Header: "Valid Values",
                        accessor: "validValues",
                        display: "textarea",
                        readOnly: (row) => row.values.display !== "select",
                    },
                    { Header: "Cell CSS", accessor: "cellClassName", display: "text", width: 90, disableGroupBy: true },
                    { Header: "Control CSS", accessor: "controlClassName", display: "text", width: 90, disableGroupBy: true },
                    { Header: "Category", accessor: "category", display: "text", width: 90 },
                    { Header: "Position", accessor: "ordinalPosition", display: "number", width: 65, disableGroupBy: true },
                ],
                []
            ),
            data: useMemo(() => data, [data]),
            //filterTypes: useMemo(() => reactTable.filterTypes, []),
            updateMyData: updateData,
            autoResetPage: !skipReset,
            autoResetFilters: !skipReset,
            autoResetSortBy: !skipReset,
            autoResetSelectedRows: !skipReset,
            autoResetGlobalFilter: !skipReset,
            disableMultiSort: false,
        },
        useGlobalFilter,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        //useBlockLayout,
        useFlexLayout
        //useResizeColumns
        //(hooks) => reactTable.addSelectionColumns(hooks)
    );

    const moreMenu = (
        <bd.Menu>
            <bd.MenuItem disabled={insertMode || saving || deleting} onClick={onDeleteClick}>
                {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                <span>{t("delete")}</span>
            </bd.MenuItem>
        </bd.Menu>
    );

    const canShowTab = (t) => true;

    if (column)
        return (
            <EditColumn
                column={column}
                table={table}
                onChanged={(row) => {
                    var i = data.findIndex((x) => x.name === row.name);
                    if (row.id === undefined) {
                        if (i >= 0) {
                            msgbox(<T>duplicate-column</T>, null, [{ title: <T>close</T> }]);
                            return;
                        }
                        row.id = 0;
                        setData([...data, row]);
                        tableApi.state.selectedRowIds = { [data.length]: true };
                    } else {
                        var new_data = data.map((item, index) => (index === i ? row : item));
                        setData(new_data);
                        tableApi.state.selectedRowIds = { [i]: true };
                    }
                    setColumn(null);
                }}
                onGoBack={() => {
                    setColumn(null);
                }}
            />
        );

    return (
        <>
            <div className="border-bottom bg-default" style={{ position: "sticky", top: -100, zIndex: 1 }}>
                <div className="bg-default" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    <bd.Toolbar>
                        <bd.Button variant="icon" onClick={onGoBack} size="md" edge="start" className="m-e-2">
                            <icons.ArrowBackIos className="rtl-rotate-180" />
                        </bd.Button>

                        <h5>{insertMode ? t("insert-grid") : t("edit-grid")}</h5>

                        <div className="flex-grow-1" />

                        <bd.Button color="primary" disabled={saving || deleting} onClick={() => formRef.current.submitForm()}>
                            {saving && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                            <span>{t("save-changes")}</span>
                        </bd.Button>

                        <bd.Button variant="icon" menu={moreMenu} edge="end" className="m-s-1">
                            <icons.MoreVert />
                        </bd.Button>
                    </bd.Toolbar>
                </div>

                <div className="m-s-4 mb-2 d-flex align-items-center">
                    <i>
                        <icons.TableView style={{ fontSize: 32 }} />
                    </i>
                    <div className="m-s-3 size-sm" style={{ lineHeight: 1.75 }}>
                        <b>{table.id}</b>
                        <div>Created by: {table.createdBy}</div>
                    </div>
                </div>
            </div>

            <div>
                <bd2.FormikForm
                    initialValues={table}
                    validationSchema={yup.object({
                        id: yup.string().max(50).required("Required"),
                        title: yup.string().max(50).required("Required"),
                        tableName: yup.string().max(50).required("Required"),
                    })}
                    enableReinitialize={true}
                    onSubmit={onSaveClick}
                    innerRef={formRef}
                    compact
                >
                    {canShowTab("general") && (
                        <div className="p-s-3 pt-3">
                            <div className="bd-form-flex">
                                <bd2.FormikInput name="id" label={<T>grid-id</T>} readOnly={!insertMode} width="12rem" />
                                <bd2.FormikInput name="groupId" label={<T>group-id</T>} width="6rem" />

                                <bd2.FormikInput name="title" label={<T>title</T>} width="15rem" />
                                <bd2.FormikSwitch name="flexLayout" label={<T>flex-layout</T>} size="sm" width="6rem" />
                                <bd2.FormikTextArea
                                    name="description"
                                    label={<T>description</T>}
                                    height="4rem"
                                    style={{ minWidth: 300 }}
                                    className="flex-grow-1"
                                />
                            </div>
                        </div>
                    )}

                    {canShowTab("filter") && (
                        <bd.Panel title={<T>filter</T>} size="md">
                            <div className="bd-form-flex p-s-3">
                                <bd2.FormikSwitch name="filterable" label={<T>filterable</T>} size="sm" width="6rem" />
                                <bd2.FormikSwitch name="hasFilterVariant" label={<T>filter-variant</T>} size="sm" width="6rem" />
                                <bd2.FormikInput name="defaultFilter" label={<T>default-filter</T>} width="12rem" className="flex-grow-1" />
                            </div>
                        </bd.Panel>
                    )}
                    {canShowTab("data") && (
                        <bd.Panel title={<T>data</T>} size="md">
                            <div className="p-s-3">
                                <bd2.FormikInput name="tableName" label={<T>table-name</T>} width="15rem" />
                                <div className="bd-form-flex">
                                    <div className="row g-0 w-100">
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <bd2.FormikTextArea name="selectQuery" label={t("select-query")} height="4rem" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <bd2.FormikTextArea name="insertQuery" label={t("insert-query")} height="4rem" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <bd2.FormikTextArea name="updateQuery" label={t("update-query")} height="4rem" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <bd2.FormikTextArea name="deleteQuery" label={t("delete-query")} height="4rem" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </bd.Panel>
                    )}

                    {canShowTab("authorization") && (
                        <bd.Panel title={<T>authorization</T>} size="md">
                            <div className="bd-form-flex p-s-3">
                                <div className="row g-0 w-100">
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <bd2.FormikInput name="azView" label={t("azView")} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <bd2.FormikInput name="azSelect" label={t("azSelect")} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <bd2.FormikInput name="azInsert" label={t("azInsert")} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <bd2.FormikInput name="azUpdate" label={t("azUpdate")} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <bd2.FormikInput name="azDelete" label={t("azDelete")} />
                                    </div>
                                </div>
                            </div>
                        </bd.Panel>
                    )}
                </bd2.FormikForm>
            </div>

            {canShowTab("columns") && (
                <>
                    <TableTitlebar
                        tableApi={tableApi}
                        hideSearch
                        hideSettings
                        title="Columns"
                        fixed
                        buttons={
                            <>
                                <bd.Button
                                    variant="icon"
                                    size="md"
                                    onClick={(e) => {
                                        var table_name = formRef.current.values["tableName"];
                                        gridBuilderApi
                                            .schemaColumn(table_name)
                                            .then((schemaColumns) => {
                                                let d = [...data];
                                                schemaColumns.forEach((x) => {
                                                    const f = d.find((z) => z.name === x.name);
                                                    if (!f) d = [...d, x];
                                                    else {
                                                        f.dataType = x.dataType;
                                                        f.maxLen = x.maxLen;
                                                        f.isPK = x.isPK;
                                                        f.isNull = x.isNull;
                                                        f.defaultValue = x.defaultValue;
                                                        f.ordinalPosition = x.ordinalPosition;
                                                    }
                                                });
                                                setData(d);
                                            })
                                            .catch((ex) => notify.error(ex));
                                    }}
                                >
                                    <icons.Sync />
                                </bd.Button>

                                <bd.Button variant="text" size="md" onClick={(e) => setColumn(newColumnObject)}>
                                    <icons.Add />
                                    <T>add</T>
                                </bd.Button>

                                <bd.Button
                                    variant="text"
                                    size="md"
                                    disabled={!tableApi.selectedFlatRows.length}
                                    onClick={(e) => {
                                        setColumn(tableApi.selectedFlatRows[0].original);
                                    }}
                                >
                                    <icons.Edit />
                                    <T>edit</T>
                                </bd.Button>

                                <bd.Button
                                    variant="text"
                                    size="md"
                                    disabled={!tableApi.selectedFlatRows.length}
                                    onClick={(e) => {
                                        const updatedRows = data.filter((x, index) => !tableApi.state.selectedRowIds[index]);
                                        setData(updatedRows);
                                        tableApi.state.selectedRowIds = {};
                                    }}
                                >
                                    <icons.Delete />
                                    <T>delete</T>
                                </bd.Button>
                            </>
                        }
                    />

                    <RenderTableDiv
                        tableApi={tableApi}
                        //resizable
                        //multiSelect
                        singleSelect
                        hideCheckbox
                        //hasSummary
                        showTableInfo
                        //showPageSize
                        //enablePaging
                        //enableGrouping
                        enableSorting
                        //editable
                        clickAction="select"
                        className="nano-scroll bg-default"
                        //style={{ minHeight: 400 }}
                        hover
                        //striped
                        //hasWhitespace
                        //stickyFooter
                        onShowMoreClick={(row) => {
                            tableApi.state.selectedRowIds = {};
                            setColumn(row.values);
                        }}
                    />
                </>
            )}
        </>
    );
}
