import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import { api } from "../../api/api";
import { gridsApi } from "../../api/grids-api";
import { notify } from "../basic/notify";
import { T } from "../basic/text";
import { FilterBox } from "../filters/filter-box";
import { TableTitlebar } from "../table";
import { RenderTableDiv } from "../table/render-table-div";
import { useReactTable } from "../table/use-react-table";

export const Grid = ({ grid, loadData, parameters, ...props }) => {
    const [data, setData] = useState(grid.data ?? []);
    const [editState, setEditState] = useState({ edit: false, row: null });

    const updateData = (rowIndex, columnId, value) => {
        const new_row = { ...grid.data[rowIndex], [columnId]: value };
        grid.data = grid.data.map((row, index) => (index === rowIndex ? new_row : row));
    };

    const tableApi = useReactTable({ columns: grid.columns, data, updateData, flexLayout: grid.flexLayout });

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
                notify.dark(<T>record-is-deleted</T>);
            })
            .catch((ex) => {
                shell.setBusyMode(false);
                notify.error(ex);
            });
    };*/

    useEffect(() => {
        if (grid.data || grid.filterable) return;
        grid.data = [];
        loadData(null, parameters)
            .then((x) => {
                tableApi.state.selectedRowIds = {};
                setData(x);
            })
            .catch(notify);
    }, [grid, loadData, parameters, tableApi]);

    return (
        <>
            {!editState.edit && (
                <>
                    {grid.filterable && (
                        <div className="border-bottom bg-default">
                            <div className="container">
                                <FilterBox
                                    grid={grid}
                                    initialFilters={{}}
                                    expanded
                                    showSettings
                                    systemIsBusy={false}
                                    onExecute={(filters) => {
                                        loadData(filters, parameters)
                                            .then((x) => {
                                                tableApi.state.selectedRowIds = {};
                                                setData(x);
                                            })
                                            .catch(notify);
                                    }}
                                ></FilterBox>
                            </div>
                        </div>
                    )}

                    <div className="container mt-2" style={{ marginBottom: 70 }}>
                        <TableTitlebar
                            title={grid.title}
                            tableApi={tableApi}
                            //hideSearch
                            //hideSettings
                            //title={<T>filters</T>}
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
                                            tableApi.state.selectedRowIds = { [grid.data.length]: true };
                                            setEditState({ edit: true, row: null });
                                        }}
                                    >
                                        <T>add</T>
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
                                        <T>edit</T>
                                    </bd.Button>
                                    <bd.Button
                                        variant="text"
                                        color="primary"
                                        size="md"
                                        disabled={!tableApi.selectedFlatRows.length}
                                        className="m-e-1"
                                        onClick={(e) => {
                                            // if (tableApi.selectedFlatRows.length !== 1) return;
                                            // msgbox(<T>deleting-selected-row</T>, null, [
                                            //     {
                                            //         title: "delete",
                                            //         action: (hide) => {
                                            //             hide();
                                            //             deleteTableRow(tableApi.selectedFlatRows[0]);
                                            //         },
                                            //     },
                                            //     { title: "cancel" },
                                            // ]);
                                        }}
                                    >
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
                            hasWhitespace={!grid.flexLayout}
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
