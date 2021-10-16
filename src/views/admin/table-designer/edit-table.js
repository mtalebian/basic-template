import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { messages } from "../../../components/messages";
import { tableDesignerApi } from "../../../api/table-designer-api";
import { notify } from "../../../components/basic/notify";
import { TableTitlebar } from "../../../components/table";
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

    const [data, setData] = useState(columns);
    const updateData = () => {};
    const defaultPageSize = 14;
    const skipReset = true;

    const tableApi = useTable(
        {
            initialState: { pageSize: defaultPageSize },
            defaultColumn: {
                Cell: DefaultEditor,
                minWidth: 30,
                maxWidth: 200,
            },
            columns: useMemo(
                () => [
                    { Header: "ID", accessor: "id", readonly: true, width: 50 },
                    { Header: "NAME", accessor: "name" },
                    {
                        Header: "TITLE",
                        accessor: "title",
                        readonly: (r, c) => r.values.isRequired,
                    },
                    { Header: "IsPK", accessor: "isPK", width: 50 },
                    { Header: "IsRequired", accessor: "isRequired" },
                    { Header: "DefaultValue", accessor: "defaultValue" },
                    { Header: "Editor", accessor: "editor" },
                    { Header: "ValidValues", accessor: "validValues" },

                    { Header: "Expression", accessor: "expression" },
                    // { Header: "Alias", accessor: "alias" },
                    { Header: "ToggleOnClick", accessor: "toggleOnClick" },
                    { Header: "CellStyle", accessor: "cellStyle" },
                    { Header: "CellClassName", accessor: "cellClassName" },
                    { Header: "HiddenInTable", accessor: "hiddenInTable" },
                    { Header: "HiddenInEditor", accessor: "hiddenInEditor" },
                    { Header: "Category", accessor: "category" },
                    { Header: "Dir", accessor: "dir" },
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
        //useBlockLayout,
        useFlexLayout
        //useResizeColumns
        //(hooks) => reactTable.addSelectionColumns(hooks)
    );

    const moreMenu = (
        <bd.Menu>
            <bd.MenuItem disabled={!group.id || loading || deleting || table.columns.length > 0} onClick={onDeleteClick}>
                {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                <span>{t("delete")}</span>
            </bd.MenuItem>
        </bd.Menu>
    );

    const newRow = () => ({ id: null });

    console.log("> Render");
    return (
        <>
            <div className="border-bottom bg-gray-5 mb-3">
                <div className="container">
                    <bd.Toolbar>
                        <bd.Button variant="icon" onClick={onGoBack} size="md" edge="start" className="m-e-2">
                            <icons.ArrowBackIos className="rtl-rotate-180" />
                        </bd.Button>

                        <h5>{t("edit-table")}</h5>

                        <div className="flex-grow-1" />

                        <bd.Button color="primary" disabled={loading || deleting} onClick={onSaveClick}>
                            {loading && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                            <span>{t("save-table")}</span>
                        </bd.Button>

                        <bd.Button variant="icon" menu={moreMenu} edge="end" className="m-s-1">
                            <icons.MoreVert />
                        </bd.Button>
                    </bd.Toolbar>

                    <div className="d-flex">
                        <div className="p-3 rounded-circle bg-shade-10 mx-4 mb-3">
                            <icons.TableView className="size-xl" />
                        </div>
                        <div>
                            <p className="my-2 text-primary-text">{table.name}</p>
                            <p className="my-2 text-secondary-text">{table.title}</p>
                        </div>
                    </div>
                    <bd.TabStrip indicatorColor="primary" textColor="primary" className="d-none">
                        <bd.TabStripItem eventKey="t1" href="#info">
                            Table Info{" "}
                        </bd.TabStripItem>
                        <bd.TabStripItem eventKey="t2" href="#columns">
                            Columns
                        </bd.TabStripItem>
                    </bd.TabStrip>
                </div>
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
                            <BasicInput name="title" label={t("table-designer-table-title")} labelSize="4" />
                            <BasicInput name="singularTitle" label={t("table-designer-singular")} labelSize="4" />
                            <BasicTextArea name="description" label={t("description")} labelSize="4" />
                        </form>
                    </Formik>
                </div>

                <TableTitlebar
                    title="Columns"
                    tableRef={tableRef}
                    fixed
                    buttons={
                        <>
                            <bd.Button
                                variant="icon"
                                size="md"
                                onClick={(e) => {
                                    var r = newRow();
                                    setData([...data, r]);
                                    console.log(tableApi.state);
                                    tableApi.state.selectedRowIds[data.length] = true;
                                }}
                            >
                                <icons.Add />
                            </bd.Button>
                            <bd.Button
                                variant="icon"
                                size="md"
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
                    multiSelect
                    singleSelect
                    hideCheckbox
                    //hasSummary
                    //showTableInfo
                    //showPageSize
                    //enableGrouping
                    enableSorting
                    enablePaging
                    editable
                    clickAction="select"
                    className="border nano-scroll"
                    //style={{ minHeight: 400 }}
                    hover
                    //striped
                    //hasWhitespace
                    //stickyFooter
                />
                <br />
                <br />
                <br />
                <br />

                <div className="d-flex border bg-default">
                    <bd.List
                        dense
                        variant="menu"
                        className="rounded-0 border-end p-0 m-0 nano-scroll w-sm-100"
                        style={{ width: 300, maxHeight: 300 }}
                    >
                        <bd.Toolbar size="md" className="border-bottom">
                            <h5>{t("columns")}</h5>
                            <div className="flex-grow-1"></div>
                            <bd.Button variant="icon" size="md" edge="end">
                                <icons.Add />
                            </bd.Button>
                        </bd.Toolbar>
                        {/* <bd.ListDivider /> */}
                        {data.length === 0 && <div className="text-center text-secondary-text py-4">{t("nothing-found")}</div>}
                        {data.map((x) => (
                            <bd.ListItem style={{ width: 300, maxHeight: 400 }} primary={x.name} />
                        ))}
                    </bd.List>

                    <div className="flex-grow-1">
                        <bd.Toolbar size="md" className="border-bottom">
                            <h5>{t("edit-column")}</h5>
                            <div className="flex-grow-1"></div>
                            <bd.Button variant="icon" size="md" edge="end" color="secondary">
                                <icons.Delete />
                            </bd.Button>
                        </bd.Toolbar>
                        <div className="p-3">
                            <Formik
                                initialValues={table.data || { name: "", title: "", singularTitle: "" }}
                                validationSchema={yup.object({
                                    title: yup.string().min(3, t("msg-too-short")).max(100, t("msg-too-long")).required("Required"),
                                })}
                                onSubmit={onSaveClick}
                                innerRef={formRef}
                            >
                                <form>
                                    {insertMode && (
                                        <BasicInput name="name" label={t("table-designer-table-name")} labelSize="4" autoFocus />
                                    )}
                                    <BasicInput name="title" label={t("table-designer-table-title")} labelSize="4" />
                                    <BasicInput name="singularTitle" label={t("table-designer-singular")} labelSize="4" />
                                    <BasicTextArea name="description" label={t("description")} labelSize="4" />
                                </form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
