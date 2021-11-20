import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import { notify } from "../basic/notify";
import { T } from "../basic/text";
import { FilterBox } from "../filters/filter-box";
import { TableTitlebar } from "../table";
import { RenderTableDiv } from "../table/render-table-div";
import { useReactTable } from "../table/use-react-table";
import { EditGridRow } from "./edit-grid-row";

const emptyData = [];

export const Grid = ({ grid, tableRef, loadData, parameters, multiSelect, ...props }) => {
    const [data, setData] = useState(grid.data ?? []);
    const [editState, setEditState] = useState({ edit: false, row: null });

    const updateData = (rowIndex, columnId, value) => {
        const new_row = { ...grid.data[rowIndex], [columnId]: value };
        grid.data = grid.data.map((row, index) => (index === rowIndex ? new_row : row));
    };

    const tableApi = useReactTable({
        columns: grid.columns,
        data: grid.data ?? emptyData,
        defaultPageSize: grid.pageSize,
        updateData,
        flexLayout: grid.flexLayout,
    });

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
                //setData(x);
            })
            .catch(notify.error);
    }, [grid, loadData, parameters, tableApi]);

    return (
        <>
            {!editState.edit && (
                <>
                    {grid.filterable && (
                        <div className="border-bottom bg-default px-3">
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
                                        .catch(notify.error);
                                }}
                            ></FilterBox>
                        </div>
                    )}

                    <div className="mt-2" style={{ marginBottom: 70 }}>
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
                                    {grid.canInsert && (
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
                                    )}
                                    {grid.canUpdate && (
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
                                    )}

                                    {grid.canDelete && (
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
                                    )}
                                </>
                            }
                        />

                        <RenderTableDiv
                            tableApi={tableApi}
                            //resizable
                            multiSelect={multiSelect}
                            singleSelect
                            hideCheckbox={grid.hideCheckbox}
                            //hasSummary
                            showTableInfo={grid.showTableInfo}
                            showPageSize={grid.pageSize > 0}
                            enablePaging={grid.pageSize > 0}
                            enableGrouping={grid.enableGrouping}
                            enableSorting
                            //editable
                            clickAction="toggle"
                            className="nano-scroll bg-default"
                            //style={{ minHeight: 400 }}
                            hover
                            //striped
                            hasWhitespace={!grid.flexLayout}
                            //stickyFooter
                            onShowMoreClick={
                                (grid.canInsert || grid.canUpdate) &&
                                ((row) => {
                                    setEditState({ edit: true, row: row.values });
                                })
                            }
                        />
                    </div>
                </>
            )}

            {editState.edit && (
                <EditGridRow
                    grid={grid}
                    row={editState.row}
                    onGoBack={() => setEditState({ edit: false })}
                    onChanged={(item, original) => {
                        let new_list;
                        // if (!item) new_list = grids.filter((x) => x.id !== original.id);
                        // else if (!original.id) new_list = [...grids, item];
                        // else new_list = grids.map((x) => (x.id !== original.id ? x : item));

                        // setGrids(new_list);
                        setEditState({ edit: false });
                        /*
                        if (!original) setData([...data, x]);
                        else {
                            var i = findIndex(original, data, table.schema.dataColumns);
                            data[i] = x;
                            setData(data.map((item, index) => (index === i ? x : item)));
                        }
                        setEditState({ edit: false });
                        */
                    }}
                />
            )}
        </>
    );
};
