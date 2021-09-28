import React from "react";
import { useTable, usePagination, useSortBy, useFilters, useGroupBy, useExpanded, useRowSelect } from "react-table";
import { matchSorter } from "match-sorter";
import "./basic-table.scss";

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

//
//
// Be sure to pass our updateMyData and the skipReset option
export function BasicTable({
    columns,
    defaultColumn,
    data,
    enablePaging,
    maxDisplayRow,
    updateData,
    skipReset,
    showTableInfo,
    showSummary,
    showFooter,
}) {
    if (!maxDisplayRow || maxDisplayRow < 1) maxDisplayRow = 100;
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        []
    );

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        prepareRow,
        rows,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData: updateData,
            // We also need to pass this so the page doesn't change
            // when we edit the data.
            autoResetPage: !skipReset,
            autoResetSelectedRows: !skipReset,
            disableMultiSort: false,
        },
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        // Here we will use a plugin to add our selection column
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: "selection",
                        // Make this column a groupByBoundary. This ensures that groupBy columns
                        // are placed after it
                        groupByBoundary: true,
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ];
            });
        }
    );

    const { pageIndex, pageSize, sortBy, groupBy, expanded, filters, selectedRowIds } = state;
    let list = enablePaging ? page : rows;
    if (list.length > maxDisplayRow) list = list.slice(0, maxDisplayRow);

    function getTableInfo() {
        var n = rows.length;
        var a = pageIndex * pageSize + 1;
        var b = a + pageSize - 1;
        if (b > n) b = n;

        var s = `showing ${a} to ${b} of ${n}`;
        if (!enablePaging) s = `showing ${1} to ${list.length} of ${n}`;
        return state.filters.length === 0 ? s : s + ` (filtered from ${data.length} rows)`;
    }

    function getSummary(col) {
        return col._summary;
    }

    // Render the UI for your table
    return (
        <>
            <div className={"basic-table"}>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        <div>
                                            {column.canGroupBy ? (
                                                // If the column can be grouped, let's add a toggle
                                                <span {...column.getGroupByToggleProps()}>
                                                    {column.isGrouped ? "🛑 " : "👊 "}
                                                </span>
                                            ) : null}
                                            <span {...column.getSortByToggleProps()}>
                                                {column.render("Header")}
                                                {/* Add a sort direction indicator */}
                                                {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                            </span>
                                        </div>
                                        {/* Render the columns filter UI */}
                                        <div>{column.canFilter ? column.render("Filter") : null}</div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {list.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.isGrouped ? (
                                                    // If it's a grouped cell, add an expander and row count
                                                    <>
                                                        <span {...row.getToggleRowExpandedProps()}>
                                                            {row.isExpanded ? "👇" : "👉"}
                                                        </span>{" "}
                                                        {cell.render("Cell", { editable: false })} ({row.subRows.length}
                                                        )
                                                    </>
                                                ) : cell.isAggregated ? (
                                                    // If the cell is aggregated, use the Aggregated
                                                    // renderer for cell
                                                    cell.render("Aggregated")
                                                ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                                    // Otherwise, just render the regular cell
                                                    cell.render("Cell", { editable: true })
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>

                    {(showFooter || showSummary) && (
                        <tfoot>
                            {showSummary && (
                                <tr {...footerGroups[0].getFooterGroupProps()}>
                                    {footerGroups[0].headers.map((column) => (
                                        <th {...column.getFooterProps()}>{getSummary(column)}</th>
                                    ))}
                                </tr>
                            )}
                            {showFooter &&
                                footerGroups.map((footerGroup) => (
                                    <tr {...footerGroup.getFooterGroupProps()}>
                                        {footerGroup.headers.map((column) => (
                                            <th {...column.getFooterProps()}>{column.render("Footer")}</th>
                                        ))}
                                    </tr>
                                ))}
                        </tfoot>
                    )}
                </table>
            </div>
            {/*
                Pagination can be built however you'd like.
                This is just a very basic UI implementation:
            */}

            <div className="bas">
                {showTableInfo && <div className="basic-table-info">{getTableInfo()}</div>}

                {enablePaging && (
                    <div className="basic-table-pagination">
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {"<<"}
                        </button>{" "}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {"<"}
                        </button>{" "}
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            {">"}
                        </button>{" "}
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {">>"}
                        </button>{" "}
                        <span>
                            Page{" "}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{" "}
                        </span>
                        <span>
                            | Go to page:{" "}
                            <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    gotoPage(page);
                                }}
                                style={{ width: "100px" }}
                            />
                        </span>{" "}
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                            sortBy,
                            groupBy,
                            expanded: expanded,
                            filters,
                            selectedRowIds: selectedRowIds,
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    );
}

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
    );
});
