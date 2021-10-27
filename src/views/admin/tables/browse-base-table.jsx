import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";

import { RenderTableDiv } from "../../../components/table/render-table-div";
import { notify } from "../../../components/basic/notify";
import { TableTitlebar } from "../../../components/table";
import { useReactTable } from "../../../components/table/use-react-table";
import { Text } from "../../../components/basic/text";
import { tablesApi } from "../../../api/tables-api";
import { FilterBox } from "../../../components/filters/filter-box";

/*
 *
 */
export const BrowseTable = ({ shell, table, onGoBack }) => {
    const [data, setData] = useState(table.data);

    useEffect(() => shell.setApp("browse-table", onGoBack));

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

    const tableApi = useReactTable({ columns: table.schemaColumns, data, updateData, flexLayout: table.flexLayout });

    return (
        <>
            <div className="border-bottom bg-default pt-2 pb-4">
                <div className="container">
                    <FilterBox
                        fields={[{ title: "F1" }, { title: "F2" }, { title: "F3" }]}
                        variants={null}
                        systemIsBusy={false}
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
                    />
                </div>
            </div>

            <div className="container mt-2" style={{ marginBottom: 70 }}>
                <TableTitlebar
                    title={table.title}
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
