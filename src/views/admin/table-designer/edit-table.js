import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { messages } from "../../../components/messages";
import classNames from "classnames";
import { tableDesignerApi } from "../../../api/table-designer-api";
import { notify } from "../../../components/basic/notify";
import { Table, TableTitlebar } from "../../../components/table";
import { BasicInput } from "../../../components/basic-form/basic-input";
import { reactTable } from "../../../components/table/react-table-helper";
import {
    useTable,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useFilters,
    useGroupBy,
    useExpanded,
    useRowSelect,
    useBlockLayout,
    useFlexLayout,
    useResizeColumns,
} from "react-table";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { TextEditor } from "../../../components/table/editors";

//
export function TableDesignerEditTable({ table, group, onChanged, onGoBack }) {
    const { t } = useTranslation();
    const [columns] = useState(table.columns);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const insertMode = !table.name;
    const tableRef = React.useRef();
    const formRef = useRef();

    const onSaveClick = () => {
        var values = formRef.current.values;
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

    console.log("aa-=---");

    const data = columns;
    const updateData = () => {};
    const defaultPageSize = 14;
    const skipReset = true;

    const tableApi = useTable(
        {
            initialState: { pageSize: defaultPageSize },
            defaultColumn: { Cell: TextEditor, minWidth: 30, maxWidth: 200 },
            columns: useMemo(
                () => [
                    { Header: "ID", accessor: "id", width: 50 },
                    { Header: "NAME", accessor: "name" },
                    { Header: "TITLE", accessor: "title" },
                    { Header: "IsPK", accessor: "isPK", width: 50 },
                    { Header: "IsRequired", accessor: "isRequired" },
                    { Header: "DefaultValue", accessor: "defaultValue" },
                    { Header: "Editor", accessor: "editor" },
                    { Header: "ValidValues", accessor: "validValues" },
                ],
                []
            ),
            data: useMemo(() => data, [data]),
            filterTypes: useMemo(() => reactTable.filterTypes, []),
            updateMyData: updateData,
            autoResetPage: !skipReset,
            autoResetFilters: !skipReset,
            autoResetSortBy: !skipReset,
            autoResetSelectedRows: !skipReset,
            disableMultiSort: false,
        },
        useGlobalFilter,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        useBlockLayout,
        useFlexLayout
        //useResizeColumns
        //(hooks) => reactTable.addSelectionColumns(hooks)
    );

    console.log("> Render");
    return (
        <>
            <div className="border-bottom bg-gray-5 mb-3">
                <bd.Toolbar className="container">
                    <bd.Button variant="icon" onClick={onGoBack} size="md" edge="start" className="m-e-2">
                        <icons.ArrowBackIos className="rtl-rotate-180" />
                    </bd.Button>

                    <h5>
                        {t("edit-table")}: <b className="text-primary-text">{table.name}</b>
                    </h5>

                    <div className="flex-grow-1" />

                    <bd.Button color="primary" type="submit" disabled={loading || deleting} onClick={onSaveClick}>
                        {loading && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                        <span>{t("save-table")}</span>
                    </bd.Button>

                    <bd.Button
                        className={classNames("mx-2", {
                            "d-none": !group.id,
                        })}
                        type="button"
                        variant="outline"
                        disabled={loading || deleting || table.columns.length > 0}
                        onClick={onDeleteClick}
                    >
                        {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                        <span>{t("delete")}</span>
                    </bd.Button>
                </bd.Toolbar>
            </div>

            <div className="container" style={{ marginBottom: 70 }}>
                <div className="mt-4" style={{ maxWidth: 500 }}>
                    <Formik
                        initialValues={table.data || { name: "", title: "", singularTitle: "" }}
                        validationSchema={yup.object({
                            title: yup.string().min(3, t("msg-too-short")).max(100, t("msg-too-long")).required("Required"),
                        })}
                        onSubmit={onSaveClick}
                        innerRef={formRef}
                    >
                        <form>
                            {insertMode && <BasicInput name="name" label={t("table-designer-table-name")} labelSize="4" autoFocus />}
                            <BasicInput name="title" label={t("table-designer-table-title")} labelSize="4" autoComplete="off" autoFocus />
                            <BasicInput name="singularTitle" label={t("table-designer-singular")} labelSize="4" autoComplete="off" />
                        </form>
                    </Formik>
                </div>

                <TableTitlebar
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

                <RenderTableDiv
                    tableApi={tableApi}
                    //resizable
                    enableGrouping
                    enableSorting
                    multiSelect
                    //singleSelect
                    //hideCheckbox
                    hasSummary
                    showTableInfo
                    showPageSize
                    enablePaging
                    //editable
                    clickAction="toggle"
                    className="border"
                    style={{ height: 300, width: 500 }}
                    hover
                    striped
                    hasWhitespace
                    stickyFooter
                />
            </div>
        </>
    );
}
