import React, { useState } from "react";
import * as bd from "react-basic-design";

import { RenderTableDiv } from "../../../components/table/render-table-div";
import { notify } from "../../../components/basic/notify";
import { TableTitlebar } from "../../../components/table";
import { useReactTable } from "../../../components/table/use-react-table";
import { Text } from "../../../components/basic/text";
import { tablesApi } from "../../../api/tables-api";
import { FilterBox } from "../../../components/filters/filter-box";
import { EditTableRow } from "./edit-table-row";
import { useShell } from "../../shared/use-shell";
import { msgbox } from "react-basic-design";

function findIndex(x, data, columns) {
    for (let i = 0; i < data.length; i++) {
        const r = data[i];
        let is_eq = true;
        for (let k = 0; is_eq && k < columns.length; k++) {
            const c = columns[k];
            if (c.isPK && r[c.name] !== x[c.name]) is_eq = false;
        }
        if (is_eq) return i;
    }
}

/*
 *
 */
export const BrowseTable = ({ table, onGoBack }) => {
    const [data, setData] = useState(table.data);
    const [editState, setEditState] = useState({ edit: false, row: null });

    const shell = useShell();

    shell.setApp("browse-table", onGoBack);

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
        const new_data = data.map((row, index) => (index === rowIndex ? new_row : row));
        setData(new_data);
        table.data = new_data;
    };

    const tableApi = useReactTable({ columns: table.schemaColumns, data, updateData, flexLayout: table.flexLayout });

    const deleteTableRow = (row) => {
        shell.setBusyMode(true);
        tablesApi
            .delete(table.name, row.values)
            .then((x) => {
                shell.setBusyMode(false);
                var i = findIndex(row.values, data, table.schema.dataColumns);
                setData(data.filter((x, index) => index !== i));
                tableApi.state.selectedRowIds = {};
                notify.dark(<Text>record-is-deleted</Text>);
            })
            .catch((ex) => {
                shell.setBusyMode(false);
                notify.error(ex);
            });
    };

    return (
        <>
            {!editState.edit && (
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
                                            setEditState({ edit: true, row: null });
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
                                        className="m-e-1"
                                        onClick={(e) => {
                                            if (tableApi.selectedFlatRows.length !== 1) return;
                                            msgbox(<Text>deleting-selected-row</Text>, null, [
                                                {
                                                    title: "delete",
                                                    action: (hide) => {
                                                        hide();
                                                        deleteTableRow(tableApi.selectedFlatRows[0]);
                                                    },
                                                },
                                                { title: "cancel" },
                                            ]);
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
                            onShowMoreClick={(row) => {
                                setEditState({ edit: true, row: row.values });
                            }}
                        />
                    </div>
                </>
            )}

            {editState.edit && (
                <EditTableRow
                    table={table}
                    onGoBack={() => setEditState({ edit: false })}
                    onChanged={(x, original) => {
                        console.log(x, original);

                        if (!original) setData([...data, x]);
                        else {
                            var i = findIndex(original, data, table.schema.dataColumns);
                            data[i] = x;
                            console.log(i, data);
                            setData(data.map((item, index) => (index === i ? x : item)));
                        }
                        setEditState({ edit: false });
                    }}
                    row={editState.row}
                />
            )}
        </>
    );
};
