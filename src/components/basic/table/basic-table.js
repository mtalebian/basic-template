import React from "react";
import { useGlobalFilter, useSortBy, useRowSelect, useTable } from "react-table";
import * as bs from "react-basic-design";
import { Checkbox } from "./checkbox";

import "./basic-table.scss";
import * as icons from "../../../assets/icons";

export function BasicTable({ columns, data, title, enablePaging, filtrable, selectable, onAdd, onEdit, onDelete, onRefresh, ...props }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        setPageSize,
        state,
        toggleAllRowsSelected,
    } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        useRowSelect,
        (hooks) => {
            if (!selectable) return;

            hooks.allColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <label className="d-block m-0 text-center">
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        </label>
                    ),
                    Cell: ({ row }) => (
                        <label className="d-block m-0 text-center">
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        </label>
                    ),
                },
                ...columns,
            ]);
        }
    );

    const { pageIndex, pageSize } = state;

    const onTdClick = (row, cell) => {
        if (!cell.column._toggleOnClick) return;
        var is_selected = row.isSelected;
        toggleAllRowsSelected(false);
        if (!is_selected) row.toggleRowSelected();
    };

    const getRecordsInfoText = () => {
        return null;
        //Showing _START_ to _END_ of _TOTAL_ entries
        //Showing _START_ to _END_ of _TOTAL_ entries (filtered from _MAX_ total entries)
        if (state.filters.length === 0) return `Show {1} to {2} from {3}`;
        else return `Show {1} to {2} from {3} (filtered from {4} rows)`;
    };

    return (
        <div class="basic-table-container">
            <div className="">
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    {[10, 25, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

            <div className="basic-table-wrapper">
                <table className="basic-table table table-striped0 table-bordered table-hover0 table-sm" {...getTableProps()} {...props}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => {
                                    var size = 17;
                                    return (
                                        // Add the sorting props to control sorting. For this example
                                        // we can add them into the header props
                                        <th {...column.getHeaderProps(column._isSortable && column.getSortByToggleProps())}>
                                            {column.render("Header")}
                                            <span>
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <icons.ArrowDropDown width={size} height={size} />
                                                    ) : (
                                                        <icons.ArrowDropUp width={size} height={size} />
                                                    )
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className={row.isSelected ? "table-selected" : ""}>
                                    {row.cells.map((cell) => {
                                        var tdprops = cell.getCellProps();
                                        var p = cell.column._cellProps;
                                        if (!!p) {
                                            if (typeof p === "function") p = p(row, cell);
                                            tdprops = {
                                                ...tdprops,
                                                ...p,
                                            };
                                        }
                                        return (
                                            <td {...tdprops} onClick={() => onTdClick(row, cell)}>
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="records-info">{getRecordsInfoText()}</div>
            {enablePaging && (
                <>
                    <div className="basic-table-pagination">
                        Go to page
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(pageNumber);
                            }}
                        />
                        <button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
                            First
                        </button>
                        <button disabled={!canPreviousPage} onClick={() => previousPage()}>
                            Prev
                        </button>
                        <button disabled={!canNextPage} onClick={() => nextPage()}>
                            Next
                        </button>
                        <button disabled={!canNextPage} onClick={() => gotoPage(pageOptions.length - 1)}>
                            Last
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
