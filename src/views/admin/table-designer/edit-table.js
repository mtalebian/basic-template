import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { tableDesignerApi } from "../../../api/table-designer-api";
import { notify } from "../../../components/basic/notify";
import { TableTitlebar } from "../../../components/table";
import { BasicInput } from "../../../components/basic-form/basic-input";
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
import { BasicTextArea } from "../../../components/basic-form/basic-textarea";

//
export function TableDesignerEditTable({ table, group, onChanged, onGoBack }) {
    const { t } = useTranslation();
    const [data, setData] = useState(table.dataColumns);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const insertMode = !table.name;
    const formRef = useRef();

    const onSaveClick = () => {
        var values = formRef.current.values;
        setSaving(true);
        var dto = { ...values, dataColumns: data };
        tableDesignerApi
            .saveTable(group.id, dto, insertMode)
            .then((x) => {
                setSaving(false);
                notify.info(t("changes-are-saved"));
                onChanged(x);
            })
            .catch((ex) => {
                setSaving(false);
                notify.error(ex);
            });
    };

    const onDeleteClick = () => {
        setDeleting(true);
        tableDesignerApi
            .deleteTable(table.name)
            .then((x) => {
                setSaving(false);
                notify.info(t("row-is-deleted"));
                onChanged(null, table.name);
            })
            .catch((ex) => {
                setSaving(false);
                notify.error(ex);
            });
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
            initialState: { pageSize: defaultPageSize },
            defaultColumn: {
                Cell: DefaultEditor,
                minWidth: 30,
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

    const newRow = () => ({ id: 0 });

    return (
        <>
            <div className="border-bottom bg-gray-5 mb-3">
                <div className="container">
                    <bd.Toolbar>
                        <bd.Button variant="icon" onClick={onGoBack} size="md" edge="start" className="m-e-2">
                            <icons.ArrowBackIos className="rtl-rotate-180" />
                        </bd.Button>

                        <h5>{insertMode ? t("insert-table") : t("edit-table")}</h5>

                        <div className="flex-grow-1" />

                        <bd.Button color="primary" disabled={saving || deleting} onClick={onSaveClick}>
                            {saving && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                            <span>{t("save-changes")}</span>
                        </bd.Button>

                        <bd.Button variant="icon" menu={moreMenu} edge="end" className="m-s-1">
                            <icons.MoreVert />
                        </bd.Button>
                    </bd.Toolbar>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 70 }}>
                <div className="mt-4" style={{ maxWidth: 1000 }}>
                    <Formik
                        initialValues={table || { name: "", title: "", singularTitle: "" }}
                        validationSchema={yup.object({
                            title: yup.string().min(3, t("msg-too-short")).max(100, t("msg-too-long")).required("Required"),
                        })}
                        onSubmit={onSaveClick}
                        innerRef={formRef}
                    >
                        <form>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <BasicInput name="name" label={t("table-name")} labelSize="4" readOnly={!insertMode} autoFocus />
                                    <BasicInput name="title" label={t("table-title")} labelSize="4" />
                                    <BasicInput name="singularTitle" label={t("singular-title")} labelSize="4" />
                                </div>
                                <div className="col-md-6">
                                    <BasicTextArea name="description" placeholder={t("description")} controlClassName="h-100" />
                                </div>
                            </div>
                        </form>
                    </Formik>
                </div>

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
                                    tableDesignerApi
                                        .schemaColumn(table.name)
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

                            <bd.Button
                                variant="icon"
                                size="md"
                                onClick={(e) => {
                                    var r = newRow();
                                    setData([...data, r]);
                                    tableApi.state.selectedRowIds = { [data.length]: true };
                                }}
                            >
                                <icons.Add />
                            </bd.Button>

                            <bd.Button
                                variant="icon"
                                size="md"
                                disabled={!tableApi.selectedFlatRows.length}
                                onClick={(e) => {
                                    const updatedRows = data.filter((x, index) => !tableApi.state.selectedRowIds[index]);
                                    setData(updatedRows);
                                    tableApi.state.selectedRowIds = {};
                                }}
                            >
                                <icons.Delete />
                            </bd.Button>
                        </>
                    }
                />

                <RenderTableDiv
                    tableApi={tableApi}
                    //resizable
                    //multiSelect
                    singleSelect
                    //hideCheckbox
                    //hasSummary
                    showTableInfo
                    //showPageSize
                    //enablePaging
                    //enableGrouping
                    enableSorting
                    editable
                    clickAction="select"
                    className="border nano-scroll bg-default"
                    //style={{ minHeight: 400 }}
                    hover
                    //striped
                    //hasWhitespace
                    //stickyFooter
                />
            </div>
        </>
    );
}
