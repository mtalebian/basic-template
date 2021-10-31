import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { gridBuilderApi } from "../../../api/grid-builder-api";
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
import { Text } from "../../../components/basic/text";
import { TabContainer } from "react-bootstrap";
import { msgbox } from "react-basic-design";
import { BasicSwitch } from "../../../components/basic-form/basic-switch";
import { EditColumn } from "./edit-column";

//
export function TableDesignerEditTable({ table, group, onChanged, onGoBack }) {
    const { t } = useTranslation();
    const [data, setData] = useState(table.dataColumns);
    const [column, setColumn] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const insertMode = !table.id;
    const formRef = useRef();
    const newColumnObject = {
        isPK: false,
        isNull: true,
        useInVariant: true,
        showInList: true,
        showInEditor: true,
        isReadOnly: false,
    };

    const onSaveClick = () => {
        var values = formRef.current.values;
        setSaving(true);
        var dto = { ...values, dataColumns: data };
        gridBuilderApi
            .saveGrid(group.id, dto, insertMode)
            .then((x) => {
                setSaving(false);
                notify.info(t("changes-are-saved"));
                onChanged(x, table, group);
            })
            .catch((ex) => {
                setSaving(false);
                notify.error(ex);
            });
    };

    const onDeleteClick = () => {
        msgbox(<Text>deleting-current-grid</Text>, null, [
            {
                title: <Text>delete</Text>,
                action: (hide) => {
                    hide();
                    setDeleting(true);
                    gridBuilderApi
                        .deleteGrid(table.id)
                        .then((x) => {
                            setDeleting(false);
                            notify.info(t("row-is-deleted"));
                            onChanged(null, table, group);
                        })
                        .catch((ex) => {
                            setDeleting(false);
                            notify.error(ex);
                        });
                },
            },
            { title: <Text>close</Text> },
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

    const [tab, setTab] = useState();

    const canShowTab = (t) => !tab || tab === t;

    if (column)
        return (
            <EditColumn
                column={column}
                table={table}
                onChanged={(row) => {
                    var i = data.findIndex((x) => x.name === row.name);
                    if (row.id === undefined) {
                        if (i >= 0) {
                            msgbox(<Text>duplicate-column</Text>, null, [{ title: <Text>close</Text> }]);
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
            <div className="border-bottom bg-gray-5 mb-3">
                <div className="container">
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

                    <div className="m-s-4 mb-2 d-flex align-items-center">
                        <i>
                            <icons.TableView style={{ fontSize: 32 }} />
                        </i>
                        <div className="m-s-3 size-sm" style={{ lineHeight: 1.75 }}>
                            <div>{table.id}</div>
                            <div>Created by: {table.createdBy}</div>
                        </div>
                    </div>

                    <bd.TabStrip textColor="primary" indicatorColor="primary">
                        <bd.TabStripItem eventKey="general" onClick={(e) => setTab("general")}>
                            <Text>general</Text>
                        </bd.TabStripItem>
                        <bd.TabStripItem eventKey="data" onClick={(e) => setTab("data")}>
                            <Text>data</Text>
                        </bd.TabStripItem>
                        <bd.TabStripItem eventKey="columns" onClick={(e) => setTab("columns")}>
                            <Text>columns</Text>
                        </bd.TabStripItem>
                    </bd.TabStrip>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 70 }}>
                <div className="mt-4" style={{ maxWidth: 1000 }}>
                    <Formik
                        initialValues={table}
                        validationSchema={yup.object({
                            id: yup.string().max(50).required("Required"),
                            title: yup.string().max(50).required("Required"),
                            tableName: yup.string().max(50).required("Required"),
                        })}
                        onSubmit={onSaveClick}
                        innerRef={formRef}
                    >
                        <form>
                            {canShowTab("general") && (
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <BasicInput name="id" label={<Text>grid-id</Text>} labelSize="4" readOnly={!insertMode} autoFocus />
                                        <BasicInput name="title" label={<Text>title</Text>} labelSize="4" />
                                        <BasicSwitch name="flexLayout" label={<Text>flex-layout</Text>} labelSize="4" />
                                    </div>
                                    <div className="col-md-6">
                                        <BasicTextArea name="description" label={<Text>description</Text>} className="h-100" />
                                    </div>
                                </div>
                            )}

                            {canShowTab("data") && (
                                <bd.Panel title={<Text>data</Text>} expanded fixed>
                                    <BasicInput name="tableName" label={<Text>table-name</Text>} labelSize="2" style={{ maxWidth: 300 }} />
                                    <BasicTextArea name="selectQuery" label={t("select-query")} labelSize="2" />
                                    <BasicTextArea name="insertQuery" label={t("insert-query")} labelSize="2" />
                                    <BasicTextArea name="updateQuery" label={t("update-query")} labelSize="2" />
                                    <BasicTextArea name="deleteQuery" label={t("delete-query")} labelSize="2" />
                                </bd.Panel>
                            )}
                        </form>
                    </Formik>
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
                                        <Text>add</Text>
                                    </bd.Button>

                                    <bd.Button
                                        variant="text"
                                        size="md"
                                        disabled={!tableApi.selectedFlatRows.length}
                                        onClick={(e) => {
                                            setColumn(tableApi.selectedFlatRows[0].values);
                                        }}
                                    >
                                        <icons.Edit />
                                        <Text>edit</Text>
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
                                        <Text>delete</Text>
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
                            className="border nano-scroll bg-default"
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
            </div>
        </>
    );
}
