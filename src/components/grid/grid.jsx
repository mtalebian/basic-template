import classNames from "classnames";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import * as bd from "react-basic-design";
import { msgbox } from "react-basic-design";
import { gridsApi } from "../../api/grids-api";
import { useShell } from "../../views/shared/use-shell";
import { notify } from "../basic/notify";
import { T } from "../basic/text";
import { FilterBox } from "../filters/filter-box";
import { TableTitlebar } from "../table";
import { RenderTableDiv } from "../table/render-table-div";
import { useReactTable } from "../table/use-react-table";
import { EditGridRow } from "./edit-grid-row";

export const Grid = forwardRef(({ grid, tableRef, loadData, parameters, multiSelect, onSelectionChanged, ...props }, ref) => {
    const [data, setData] = useState(grid.data ?? []);
    const [editState, setEditState] = useState({ edit: false, row: null });
    const shell = useShell();

    const updateData = (rowIndex, columnId, value) => {
        const new_row = { ...data[rowIndex], [columnId]: value };
        grid.data = data.map((x, xIndex) => (xIndex === rowIndex ? new_row : x));
        setData(grid.data);
    };

    const tableApi = useReactTable({
        columns: grid.columns,
        data: grid.data,
        defaultPageSize: grid.pageSize,
        updateData,
        flexLayout: grid.flexLayout,
        onSelectionChanged,
    });

    const deleteTableRow = (row) => {
        shell.setBusyMode(true);
        gridsApi
            .delete(grid.id, row)
            .then(() => {
                shell.setBusyMode(false);
                tableApi.state.selectedRowIds = {};
                const pks = grid.dataColumns.filter((x) => x.isPK);
                const eq = (a, b) => pks.every((k) => a[k.name] === b[k.name]);
                const lst = data.filter((x) => !eq(x, row));
                grid.data = lst;
                setData(lst);
                notify.dark(<T>record-is-deleted</T>);
            })
            .catch((ex) => {
                shell.setBusyMode(false);
                notify.error(ex);
            });
    };

    useImperativeHandle(ref, () => ({
        getSelectedRows: () => tableApi.selectedFlatRows,
    }));

    useEffect(() => {
        if (grid.data || grid.filterable) return;
        grid.data = [];
        loadData(null, parameters)
            .then((x) => {
                tableApi.state.selectedRowIds = {};
                grid.data = x;
                setData(x);
            })
            .catch(notify.error);
    }, [grid, loadData, parameters, tableApi]);

    return (
        <>
            <div className={classNames({ "d-none": editState.edit })}>
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
                                            tableApi.state.selectedRowIds = { [data?.length ?? 0]: true };
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
                                            if (tableApi.selectedFlatRows.length !== 1) return;
                                            msgbox(<T>deleting-selected-row</T>, null, [
                                                { title: "cancel" },
                                                {
                                                    title: <T>delete</T>,
                                                    action: (hide) => {
                                                        hide();
                                                        deleteTableRow(tableApi.selectedFlatRows[0].original);
                                                    },
                                                },
                                            ]);
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
                        singleSelect={!multiSelect}
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
            </div>

            {editState.edit && (
                <EditGridRow
                    grid={grid}
                    row={editState.row}
                    onGoBack={() => setEditState({ edit: false })}
                    onChanged={(item, original) => {
                        let new_list;
                        if (!item) new_list = data.filter((x) => x.id !== original.id);
                        else if (!original) new_list = [...data, item];
                        else new_list = data.map((x) => (x.id !== original.id ? x : item));

                        grid.data = new_list;
                        setData(new_list);
                        setEditState({ edit: false });
                    }}
                />
            )}
        </>
    );
});
