import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { useAccount } from "../../../app/account-context";
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
    //useFlexLayout,
    //useRowState,
    //useResizeColumns,
} from "react-table";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { DefaultEditor } from "../../../components/table/editors";
import { notify } from "../../../components/basic/notify";
import { TableTitlebar } from "../../../components/table";
import { useReactTable } from "../../../components/table/use-react-table";
import { Text } from "../../../components/basic/text";
import { tablesApi } from "../../../api/tables-api";

/*
 *
 */
export const BrowseTable = ({ table, onGoBack }) => {
    const { t } = useTranslation();
    const account = useAccount();
    const [data, setData] = useState(table.data);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const insertMode = false;
    const onSaveClick = () => {
        // var values = formRef.current.values;
        // var dto = { ...values, dataColumns: data };
        setSaving(true);
        // tableDesignerApi
        //     .saveTable(group.id, dto, insertMode)
        //     .then((x) => {
        //         setSaving(false);
        //         notify.info(t("changes-are-saved"));
        //         onChanged(x);
        //     })
        //     .catch((ex) => {
        //         setSaving(false);
        //         notify.error(ex);
        //     });
    };

    const onDeleteClick = () => {
        setDeleting(true);
        // tableDesignerApi
        //     .deleteTable(table.name)
        //     .then((x) => {
        //         setSaving(false);
        //         notify.info(t("row-is-deleted"));
        //         onChanged(null, table.name);
        //     })
        //     .catch((ex) => {
        //         setSaving(false);
        //         notify.error(ex);
        //     });
    };

    if (!table.schemaColumns) {
        table.schemaColumns = table.schema.dataColumns
            .filter((x) => x.showInList)
            .map((x) => ({
                accessor: x.name,
                Header: x.title,
                isPK: x.isPK,
                isNull: x.isNull,
                dataType: x.dataType,
                maxLen: x.maxLen,
                defaultValue: x.defaultValue,
                filter: x.filter,
                readOnly: x.isReadOnly,
                direction: x.direction,
                display: x.display,
                validValues: x.validValues,
                width:
                    x.width > 10
                        ? x.width
                        : x.display === "number"
                        ? 120
                        : x.display === "amount"
                        ? 120
                        : x.display === "check"
                        ? 60
                        : x.display === "switch"
                        ? 80
                        : x.maxLen <= 30
                        ? 150
                        : 250,
            }));
    }

    const updateData = (rowIndex, columnId, value) => {
        const new_row = { ...data[rowIndex], [columnId]: value };
        setData(data.map((row, index) => (index === rowIndex ? new_row : row)));
    };

    /*
    const tableApi = useTable(
        {
            initialState: { pageSize: defaultPageSize },
            defaultColumn: {
                Cell: DefaultEditor,
                minWidth: 30,
                disableGroupBy: true,
                //maxWidth: 200,
            },
            columns: useMemo(() => table.schemaColumns, [table.schemaColumns]),
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
        useBlockLayout
        //useFlexLayout
        //useResizeColumns
        //(hooks) => reactTable.addSelectionColumns(hooks)
    );
*/

    const tableApi = useReactTable({ columns: table.schemaColumns, data, updateData, flexLayout: table.flexLayout });

    const moreMenu = (
        <bd.Menu>
            <bd.MenuItem disabled={insertMode || saving || deleting} onClick={onDeleteClick}>
                {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                <span>{t("delete")}</span>
            </bd.MenuItem>
        </bd.Menu>
    );

    return (
        <>
            <div className="border-bottom bg-gray-5 mb-1">
                <div className="container">
                    <bd.Toolbar>
                        <bd.Button variant="icon" onClick={onGoBack} size="md" edge="start" className="m-e-2">
                            <icons.ArrowBackIos className="rtl-rotate-180" />
                        </bd.Button>

                        {/* <h5>{t(table.title)}</h5> */}
                        <h5>
                            <Text>{table.title}</Text>
                        </h5>

                        <div className="flex-grow-1" />

                        <bd.Button
                            variant="text"
                            size="md"
                            onClick={(e) => {
                                tablesApi
                                    .browseTable(table.name)
                                    .then((x) => {
                                        table.data = x.data;
                                        tableApi.state.selectedRowIds = {};
                                        setData(x.data);
                                    })
                                    .catch((ex) => {
                                        notify.error(ex);
                                    });
                            }}
                        >
                            <icons.Sync />
                            <Text>refresh</Text>
                        </bd.Button>

                        <bd.Button
                            variant="text"
                            size="md"
                            onClick={(e) => {
                                //     var r = newRow();
                                //     setData([...data, r]);
                                tableApi.state.selectedRowIds = { [data.length]: true };
                            }}
                        >
                            <icons.Add />
                            <Text>add</Text>
                        </bd.Button>
                    </bd.Toolbar>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 70 }}>
                <div className="container" style={{ marginBottom: 70 }}>
                    <TableTitlebar
                        tableApi={tableApi}
                        hideSearch
                        hideSettings
                        title={<Text>filters</Text>}
                        expanded
                        fixed
                        buttons={
                            <bd.Button color="primary" disabled={saving || deleting} onClick={onSaveClick}>
                                {saving && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                                <span>{t("apply-filter")}</span>
                            </bd.Button>
                        }
                    >
                        <div className="row" style={{ maxWidth: 500 }}>
                            {table.schema.dataColumns
                                .filter((x) => x.filter)
                                .map((x) => (
                                    <bd.FormRow label={x.title} labelSize="3">
                                        <input className="form-control" />
                                    </bd.FormRow>
                                ))}
                        </div>
                    </TableTitlebar>

                    <TableTitlebar
                        tableApi={tableApi}
                        //hideSearch
                        //hideSettings
                        //title={<Text>filters</Text>}
                        expanded
                        fixed
                        buttons={
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
                        }
                    />

                    <RenderTableDiv
                        tableApi={tableApi}
                        //resizable
                        //multiSelect
                        singleSelect
                        //hideCheckbox
                        //hasSummary
                        //showTableInfo
                        showPageSize
                        enablePaging
                        //enableGrouping
                        enableSorting
                        //editable
                        clickAction="toggle"
                        className="border nano-scroll"
                        //style={{ minHeight: 400 }}
                        hover
                        //striped
                        hasWhitespace={!table.flexLayout}
                        //stickyFooter
                    />
                </div>
            </div>
        </>
    );
};
