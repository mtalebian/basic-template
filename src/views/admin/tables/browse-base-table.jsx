import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import * as bd2 from "../../../components/forms";
import { useAccount } from "../../../app/account-context";

import { RenderTableDiv } from "../../../components/table/render-table-div";
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

    const viewsMenu = (
        <bd.Menu>
            <div style={{ minWidth: 300 }}>
                <bd.MenuItem>
                    <Text>delete</Text>
                </bd.MenuItem>
                <div className="text-end px-2 pt-2 border-top mt-2">
                    <bd.Button color="primary" className="m-s-2" variant="text">
                        <Text>manage</Text>
                    </bd.Button>
                    <bd.Button color="primary">
                        <Text>save</Text>
                    </bd.Button>
                </div>
            </div>
        </bd.Menu>
    );

    return (
        <>
            <div className="border-bottom bg-gray-5">
                <div className="container">
                    <bd.Toolbar>
                        <bd.Button variant="icon" onClick={onGoBack} edge="start" className="m-e-2">
                            <icons.ArrowBackIos className="rtl-rotate-180" />
                        </bd.Button>

                        {/* <h5>{t(table.title)}</h5> */}
                        <h5>
                            <Text>{table.title}</Text>:
                        </h5>

                        <div className="flex-grow-1" />
                    </bd.Toolbar>
                </div>
            </div>

            <div className="border-bottom bg-default0 pt-2 pb-4">
                <bd.Panel
                    className="container"
                    tableApi={tableApi}
                    hideSearch
                    hideSettings
                    title={
                        <bd.Button variant="text" className="btn-lg" color="primary" menu={viewsMenu}>
                            Standard
                        </bd.Button>
                    }
                    expanded
                    fixed
                    controls={
                        <>
                            <bd.Button
                                color="primary"
                                size="md"
                                disabled={saving || deleting}
                                className="m-e-2"
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
                                {saving && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                                <Text>apply-filter</Text>
                            </bd.Button>

                            <bd.Button variant="outline" color="primary" size="md" disabled={saving || deleting}>
                                <Text>Filters</Text>
                            </bd.Button>
                        </>
                    }
                >
                    <bd2.Form>
                        {table.schema.dataColumns
                            //.filter((x) => x.filter)
                            .map((x) => (
                                <bd2.FormInput label={x.title} btnIcon={<icons.OpenInNew />} onBtnClick={() => alert("ccc")} />
                            ))}
                    </bd2.Form>
                </bd.Panel>
            </div>

            <div className="container mt-2" style={{ marginBottom: 70 }}>
                <TableTitlebar
                    tableApi={tableApi}
                    //hideSearch
                    //hideSettings
                    //title={<Text>filters</Text>}
                    expanded
                    fixed
                    buttons={
                        <>
                            <bd.Button
                                variant="text"
                                color="primary"
                                size="md"
                                onClick={(e) => {
                                    //     var r = newRow();
                                    //     setData([...data, r]);
                                    tableApi.state.selectedRowIds = { [data.length]: true };
                                }}
                            >
                                {/* <icons.Add /> */}
                                <Text>add</Text>
                            </bd.Button>
                            <bd.Button
                                variant="text"
                                color="primary"
                                size="md"
                                disabled={!tableApi.selectedFlatRows.length}
                                onClick={(e) => {
                                    const updatedRows = data.filter((x, index) => !tableApi.state.selectedRowIds[index]);
                                    setData(updatedRows);
                                    tableApi.state.selectedRowIds = {};
                                }}
                            >
                                {/* <icons.Delete /> */}
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
                    //hideCheckbox
                    //hasSummary
                    //showTableInfo
                    showPageSize
                    enablePaging
                    //enableGrouping
                    enableSorting
                    //editable
                    clickAction="toggle"
                    className="border nano-scroll bg-default"
                    //style={{ minHeight: 400 }}
                    hover
                    //striped
                    hasWhitespace={!table.flexLayout}
                    //stickyFooter
                />
            </div>
        </>
    );
};
