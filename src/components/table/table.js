/*
column._breakPoint          :  "sm" | "md" | "lg" | "xl"
column._popinCss            :  sample: "col-12 col-md-6" 
column._headerProps         :  {}  |  (column) => {}
column._cellProps           :  {}  |  (row, cell) => {}
column._ignoreToggleOnClick :  boolean
column._summary             : {}  |  (rows, col) => {}


*/
import React, { MutableRefObject, useState } from "react";
import classNames from "classnames";
import * as bd from "react-basic-design";
import defaultMessages, { TableMessages } from "./messages";
import { useTable, useGlobalFilter, usePagination, useSortBy, useFilters, useGroupBy, useExpanded, useRowSelect } from "react-table";
import * as icons from "../../assets/icons";
/*
interface ToggleProps {
    className?: string;
    tableClassName?: string;
    columns?: any;
    defaultColumn?: any;
    data?: any;
    enablePaging?: boolean;
    enableGrouping?: boolean;
    enableSorting?: boolean;
    maxDisplayRow?: number;
    skipReset?: boolean;
    showColumnFilter?: boolean;
    hideColumns?: boolean;
    showTableInfo?: boolean;
    showPageSize?: boolean;
    showSummary?: boolean;
    showFooter?: boolean;
    border?: "" | "none" | "full" | "row" | "table-row" | "column";
    editable?: boolean;
    hideCheckbox?: boolean;
    clickAction?: "" | "select" | "toggle";
    selectionMode?: "" | "single" | "multiple";
    messages?: TableMessages;
    tableRef?: MutableRefObject<any>;
    title?: string;
    expandableTitlebar?: boolean;
    showRowsCount?: boolean;
    titlebarButtons?: any;
    titlebarSize?: "" | "sm" | "md";
    titlebarColor?: "" | "primary" | "secondary";
    hideGlobalFilter?: boolean;
    defaultPageSize?: number;
    updateData: (rowIndex: number, columnId: number, value: any) => void;
    [x: string]: any;
}
*/
//
// Be sure to pass our updateMyData and the skipReset option
export function Table({
    className,
    tableClassName,
    columns,
    defaultColumn,
    data,
    enablePaging,
    enableGrouping,
    enableSorting,
    maxDisplayRow,
    skipReset,
    showColumnFilter,
    hideColumns,
    showTableInfo,
    showPageSize,
    showSummary,
    showFooter,
    border = "row",
    editable,
    hideCheckbox,
    clickAction,
    selectionMode,
    messages,
    tableRef,

    defaultPageSize,

    updateData,
}) {
    messages = { ...defaultMessages, ...messages };
    if (!maxDisplayRow || maxDisplayRow < 1) maxDisplayRow = 100;
    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase()) : true;
                });
            },
        }),
        []
    );

    // Use the state and functions returned from useTable to build your UI
    const tableApi = useTable(
        {
            initialState: {
                pageSize: defaultPageSize ?? 10,
            },
            defaultColumn,
            columns,
            data,
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
            autoResetFilters: !skipReset,
            autoResetSortBy: !skipReset,
            autoResetSelectedRows: !skipReset,
            disableMultiSort: false,
        },
        useGlobalFilter,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,

        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: "_multi_select_",
                        groupByBoundary: true,
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <bd.Toggle size="sm" color="primary" labelClassName="m-0" {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => <bd.Toggle size="sm" color="primary" labelClassName="m-0" {...row.getToggleRowSelectedProps()} />,
                        Filter: null,
                        _headerProps: null,
                        _cellProps: null,
                        _footerProps: null,
                    },
                    {
                        id: "_single_select_",
                        groupByBoundary: true,
                        Header: ({ getToggleAllRowsSelectedProps }) => <></>,
                        Cell: ({ row }) => (
                            <bd.Toggle
                                size="sm"
                                color="primary"
                                labelClassName="m-0"
                                {...row.getToggleRowSelectedProps()}
                                onChange={() => {
                                    toggleAllRowsSelected(false);
                                    toggleRowSelected(row.id);
                                }}
                                radio
                            />
                        ),
                        Filter: null,
                        _headerProps: null,
                        _cellProps: null,
                        _footerProps: null,
                    },
                    ...columns,
                ];
            });
        }
    );

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
        setGlobalFilter,
        state,
        toggleAllRowsSelected,
        toggleRowSelected,
    } = tableApi;

    const { globalFilter, pageIndex, pageSize, sortBy, groupBy, expanded, filters, selectedRowIds } = state;
    const [showSettings, setShowSettings] = useState(false);
    const [titlebarIsExplanded, setTitlebarIsExplanded] = useState(false);

    if (tableRef) tableRef.current = tableApi;

    let list = enablePaging ? page : rows;
    if (list.length > maxDisplayRow) list = list.slice(0, maxDisplayRow);

    const cn = classNames(className, {
        "bd-table-selectable": clickAction === "select" || clickAction === "toggle",
    });

    editable = editable && groupBy.length === 0;
    const enable_responsive = headerGroups.length === 1 && columns.some((x) => !!x._breakPoint);
    const css_popin_row = columns.some((x) => x._breakPoint === "xl")
        ? "popin-row-lg"
        : columns.some((x) => x._breakPoint === "lg")
        ? "popin-row-md"
        : columns.some((x) => x._breakPoint === "md")
        ? "popin-row-sm"
        : columns.some((x) => x._breakPoint === "sm")
        ? "popin-row-xs"
        : "";

    function getTableInfo() {
        var size = enablePaging ? page.length : rows.length;
        var a = rows.length < 1 ? 0 : enablePaging ? pageIndex * pageSize + 1 : 1;
        var b = rows.length < 1 ? 0 : a + size - 1;
        var s = state.globalFilter || state.filters.length > 0 ? messages.showingFiltered : messages.showing;
        return s.replace("{from}", a.toString()).replace("{to}", b.toString()).replace("{total}", rows.length).replace("{all}", data.length);
    }

    function getSummary(col) {
        var sum = col._summary;
        if (!sum || typeof sum !== "function") return sum;
        return sum(rows, col);
    }

    function getHeaderProps(column, idx) {
        const props = column.getHeaderProps();
        const style = column.id === "_multi_select_" || column.id === "_single_select_" ? { width: "36px", textAlign: "center" } : {};
        let userProps = column._headerProps;
        if (!userProps) userProps = {};
        else if (typeof userProps === "function") userProps = userProps(column);

        const { className, ...remUserProps } = userProps ? userProps : { className: "" };
        const cn = classNames(className, `bd-column-${column.id}`, {
            [`d-none d-${column._breakPoint}-table-cell`]: enable_responsive && column._breakPoint,
        });

        return { ...props, className: cn, style, ...remUserProps };
    }

    function getCellProps(row, cell) {
        if (!cell) cell = row.cells[0];
        var props = cell.getCellProps();
        var userProps = cell.column._cellProps;
        if (userProps) {
            if (typeof userProps === "function") userProps = userProps(row, cell);
            props = { ...props, ...userProps };
        }
        //----
        const { className, ...remUserProps } = props ? props : { className: "" };
        const cn = classNames(className, {
            [`d-none d-${cell.column._breakPoint}-table-cell`]: enable_responsive && cell.column._breakPoint,
        });

        return { ...props, ...remUserProps, className: cn, onClick: () => onTdClick(row, cell) };
    }

    function getFooterProps(column, idx) {
        const props = column.getFooterProps();
        const style = column.id === "_multi_select_" || column.id === "_single_select_" ? { width: "36px" } : {};
        let userProps = column._headerProps;
        if (!userProps) userProps = {};
        else if (typeof userProps === "function") userProps = userProps(column);

        const { className, ...remUserProps } = userProps ? userProps : { className: "" };
        const cn = classNames(className, `bd-column-${column.id}`, {
            [`d-none d-${column._breakPoint}-table-cell`]: enable_responsive && column._breakPoint,
        });

        return { ...props, className: cn, style, ...remUserProps };
    }

    const onTdClick = (row, cell) => {
        if (cell.column._ignoreToggleOnClick) return;
        if (selectionMode !== "single" && selectionMode !== "multiple") return;

        const is_selected = row.isSelected;
        switch (clickAction) {
            case "select":
                if (is_selected && selectionMode === "multiple") break;
                if (selectionMode === "single") toggleAllRowsSelected(false);
                row.toggleRowSelected();
                break;

            case "toggle":
                if (selectionMode === "single") toggleAllRowsSelected(false);
                if (!is_selected || selectionMode === "multiple") row.toggleRowSelected();
                break;
        }
    };

    function renderCheckboxHeader(column, idx) {
        if (hideCheckbox) return null;
        return (idx === 0 && selectionMode === "multiple") || (idx === 1 && selectionMode === "single") ? (
            <th {...getHeaderProps(column, idx)}>{column.render("Header")}</th>
        ) : null;
    }

    function renderCheckboxCell(row, cell, idx) {
        if (hideCheckbox) return null;
        return (idx === 0 && selectionMode === "multiple") || (idx === 1 && selectionMode === "single") ? (
            <td {...getCellProps(row, cell)}>{cell.render("Cell")}</td>
        ) : null;
    }

    function renderCheckboxPlaceholder(column, idx) {
        if (hideCheckbox) return null;
        return (idx === 0 && selectionMode === "multiple") || (idx === 1 && selectionMode === "single") ? (
            <th {...column.getFooterProps()}></th>
        ) : null;
    }

    function checkboxPlaceholder(idx) {
        if (hideCheckbox) return null;
        return (idx === 0 && selectionMode === "multiple") || (idx === 1 && selectionMode === "single");
    }

    function getSortByToggleProps(column) {
        return enableSorting ? column.getSortByToggleProps() : {};
    }

    // Render the UI for your table
    return (
        <>
            <div className="bd-titlebar"></div>
            <div
                className={classNames("bd-table", {
                    "bd-table-bordered": !border || border === "full",
                    "bd-table-border-row": border === "row" || border === "table-row",
                    "bd-table-border-table-row": border === "table-row",
                })}
            >
                <table {...getTableProps()} className={tableClassName}>
                    {!hideColumns && (
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column, idx) => {
                                        if (idx <= 1) return renderCheckboxHeader(column, idx);
                                        return (
                                            <th {...getHeaderProps(column, idx)}>
                                                {idx > 1 && (
                                                    <>
                                                        <div className="header-label">
                                                            <span {...getSortByToggleProps(column)} className="flex-grow-1">
                                                                {column.render("Header")}

                                                                {enableSorting && column.isSorted ? (
                                                                    column.isSortedDesc ? (
                                                                        <icons.ArrowDownward className="size-sm" />
                                                                    ) : (
                                                                        <icons.ArrowUpward className="size-sm" />
                                                                    )
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </span>

                                                            {enableGrouping && column.canGroupBy ? (
                                                                // If the column can be grouped, let's add a toggle
                                                                <span {...column.getGroupByToggleProps()}>
                                                                    {column.isGrouped ? (
                                                                        <icons.Close className="m-e-1 size-sm text-secondary" />
                                                                    ) : (
                                                                        <icons.Functions className="m-e-1 size-sm text-primary" />
                                                                    )}
                                                                </span>
                                                            ) : null}
                                                        </div>

                                                        {showColumnFilter && column.canFilter && (
                                                            <div className="header-filter">{column.render("Filter")}</div>
                                                        )}
                                                    </>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                    )}
                    <tbody {...getTableBodyProps()}>
                        {list.map((row, rowIndex) => {
                            prepareRow(row);
                            return (
                                <React.Fragment key={rowIndex}>
                                    <tr {...row.getRowProps()} className={row.isSelected ? "selected" : ""} key="ODD">
                                        {row.cells.map((cell, cellIndex) => {
                                            if (cellIndex <= 1) return renderCheckboxCell(row, cell, cellIndex);
                                            return (
                                                <td {...getCellProps(row, cell)}>
                                                    {cell.isGrouped ? (
                                                        // If it's a grouped cell, add an expander and row count
                                                        <>
                                                            <span {...row.getToggleRowExpandedProps()}>
                                                                <icons.ChevronRight
                                                                    className={classNames("transition-transform text-primary", {
                                                                        "rotate-90": row.isExpanded,
                                                                        "rtl-rotate-180": !row.isExpanded,
                                                                    })}
                                                                />
                                                            </span>{" "}
                                                            {cell.render("Cell", { editable: false })} ({row.subRows.length})
                                                        </>
                                                    ) : cell.isAggregated ? (
                                                        // If the cell is aggregated, use the Aggregated
                                                        // renderer for cell
                                                        cell.render("Aggregated")
                                                    ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                                        // Otherwise, just render the regular cell
                                                        cell.render("Cell", { editable })
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr {...row.getRowProps()} className={classNames(css_popin_row, { selected: row.isSelected })} key="EVEN">
                                        {checkboxPlaceholder(0) || checkboxPlaceholder(1) ? (
                                            <td {...getCellProps(row, row.cells[0])} key={"bd-table-chk"}></td>
                                        ) : (
                                            <></>
                                        )}
                                        {row.cells.map((cell, cellIndex) => {
                                            if (!cell.isGrouped && !cell.isPlaceholder) return null;
                                            return <td {...getCellProps(row, cell)}></td>;
                                        })}
                                        <td colSpan={100} {...getCellProps(row, row.cells[0])}>
                                            <div className="bd-table-popin row">
                                                {row.cells.map(
                                                    (cell, cellIndex) =>
                                                        cell.column._breakPoint && (
                                                            <div
                                                                key={cellIndex}
                                                                className={`${cell.column._popinCss} mb-1 d-${cell.column._breakPoint}-none`}
                                                            >
                                                                <span className="text-secondary-text">{cell.column.Header}: </span>
                                                                <span>{cell.render("Cell", { editable })}</span>
                                                            </div>
                                                        )
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>

                    {(showFooter || showSummary) && (
                        <tfoot>
                            {showSummary && (
                                <tr {...footerGroups[0].getFooterGroupProps()}>
                                    {footerGroups[0].headers.map((column, idx) => {
                                        if (idx <= 1) return renderCheckboxPlaceholder(column, idx);
                                        return (
                                            <th {...getFooterProps(column, idx)}>
                                                <div className="header-label">{getSummary(column)}</div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            )}
                            {showFooter &&
                                footerGroups.map((footerGroup) => (
                                    <tr {...footerGroup.getFooterGroupProps()}>
                                        {footerGroup.headers.map((column, idx) => {
                                            if (idx <= 1) return renderCheckboxPlaceholder(column, idx);
                                            return (
                                                <th {...getFooterProps(column, idx)}>
                                                    <div className="header-label">{column.render("Footer")}</div>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                ))}
                        </tfoot>
                    )}
                </table>
            </div>

            {/* PAGINATION */}

            <div className="bd-table-bottom">
                {showTableInfo && <div className="bd-table-info d-none d-md-block">{getTableInfo()}</div>}

                {enablePaging && showPageSize && (
                    <div className="bd-table-pagination flex-grow-1">
                        <bd.Button variant="icon" size="sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage} title={messages.firstPage}>
                            <icons.FirstPage className="rtl-rotate-180" />
                        </bd.Button>
                        <bd.Button variant="icon" size="sm" onClick={() => previousPage()} disabled={!canPreviousPage} title={messages.prevPage}>
                            <icons.ChevronLeft className="rtl-rotate-180" />
                        </bd.Button>
                        <span className="px-2">{messages.page.replace("{page}", pageIndex + 1).replace("{total}", pageOptions.length)}</span>
                        <bd.Button variant="icon" size="sm" onClick={() => nextPage()} disabled={!canNextPage} title={messages.nextPage}>
                            <icons.ChevronRight className="rtl-rotate-180 size-md" />
                        </bd.Button>
                        <bd.Button variant="icon" size="sm" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} title={messages.lastPage}>
                            <icons.LastPage className="rtl-rotate-180" />
                        </bd.Button>
                        {/* <span>
                            | {messages.gotoPage}
                            <input
                                className="form-control d-inline-block"
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    gotoPage(page);
                                }}
                                style={{ width: "70px" }}
                            />
                        </span> */}

                        {/* <select
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
                        </select> */}
                    </div>
                )}
            </div>
            {/* <pre>
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
            </pre> */}
        </>
    );
}
