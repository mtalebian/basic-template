import React, { useState } from "react";
import { Filter } from "../filters/filter";
import { FilterBox } from "../filters/filter-box";
import { useReactTable } from "../table/use-react-table";
import * as bd from "react-basic-design";
import { RenderTableDiv } from "../table/render-table-div";
import { TableTitlebar } from "../table";
import { Text } from "../basic/text";
import { msgbox } from "react-basic-design";

export const ReactGrid = ({ title, columns, rows, flexLayout, onExecuteFilter }) => {
    const [data, setData] = useState(rows);
    const [editState, setEditState] = useState({ edit: false, row: null });

    const updateData = (rowIndex, columnId, value) => {
        const new_row = { ...data[rowIndex], [columnId]: value };
        const new_data = data.map((row, index) => (index === rowIndex ? new_row : row));
        setData(new_data);
    };

    const tableApi = useReactTable({ columns, data, updateData, flexLayout });

    /*
    const deleteTableRow = (row) => {
        shell.setBusyMode(true);
        gridsApi
            .delete(table.id, row.values)
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
    };*/

    return (
        <>
            {!editState.edit && (
                <>
                    <div className="border-bottom bg-default">
                        <div className="container">
                            <FilterBox
                                initialFilters={{ f1: 1, f2: "tow", f3: true }}
                                expanded
                                showSettings
                                //variants={[{ title: "standard" }]}
                                variants={null}
                                systemIsBusy={false}
                                onExecute={(filters) => onExecuteFilter(filters, tableApi)}
                            >
                                <Filter name="f1" label="F1" onBlur={(e) => 0} width="12rem" />
                                <Filter name="f2" label="F2" onBlur={(e) => 0} width="12rem" />
                                <Filter name="f3" label="F3" onBlur={(e) => 0} width="12rem" />
                                <Filter name="f4" label="F4" onBlur={(e) => 0} width="12rem" />
                                <Filter name="f5" label="F5" onBlur={(e) => 0} width="12rem" />
                            </FilterBox>
                        </div>
                    </div>

                    <div className="container mt-2" style={{ marginBottom: 70 }}>
                        {/* <TableTitlebar
                            title={title}
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
                                        <Text>add</Text>
                                    </bd.Button>
                                    <bd.Button
                                        variant="text"
                                        color="primary"
                                        size="md"
                                        disabled={!tableApi.selectedFlatRows.length}
                                        onClick={(e) => {
                                            setEditState({ edit: true, row: tableApi.selectedFlatRows[0].original });
                                        }}
                                    >
                                        <Text>edit</Text>
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
                                        <Text>delete</Text>
                                    </bd.Button>
                                </>
                            }
                        /> */}

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
                            hasWhitespace={!flexLayout}
                            //stickyFooter
                            onShowMoreClick={(row) => {
                                setEditState({ edit: true, row: row.values });
                            }}
                        />
                    </div>
                </>
            )}

            {/* {editState.edit && (
                <EditTableRow
                    table={table}
                    onGoBack={() => setEditState({ edit: false })}
                    onChanged={(x, original) => {
                        if (!original) setData([...data, x]);
                        else {
                            var i = findIndex(original, data, table.schema.dataColumns);
                            data[i] = x;
                            setData(data.map((item, index) => (index === i ? x : item)));
                        }
                        setEditState({ edit: false });
                    }}
                    row={editState.row}
                />
            )} */}
        </>
    );
};