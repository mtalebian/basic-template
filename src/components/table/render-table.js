import React from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../assets/icons";

//
export function RenderTable({ tableApi, resizable, showColumnFilter, enableGrouping, enableSorting, multiSelect, singleSelect }) {
    const { t } = useTranslation();

    function getSortByToggleProps(column) {
        return enableSorting ? column.getSortByToggleProps() : {};
    }

    console.log(">> RenderTable");

    return (
        <div className="bd-table-container">
            <div {...tableApi.getTableProps()} className="bd-table bd-table-border-row bd-table-border-table-row">
                <div className="bd-head">
                    {tableApi.headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className="bd-tr">
                            {multiSelect && (
                                <div className="bd-th selection-column">
                                    <bd.Toggle size="sm" color="primary" labelClassName="m-0" {...tableApi.getToggleAllRowsSelectedProps()} />
                                </div>
                            )}
                            {singleSelect && <div className="bd-th selection-column"></div>}
                            {headerGroup.headers.map((column) => (
                                <div {...column.getHeaderProps()} className="bd-th">
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

                                    {showColumnFilter && column.canFilter && <div className="header-filter">{column.render("Filter")}</div>}

                                    {/* Use column.getResizerProps to hook up the events correctly */}
                                    {resizable && (
                                        <div {...column.getResizerProps()} className={`bd-resizer ${column.isResizing ? "isResizing" : ""}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div {...tableApi.getTableBodyProps()}>
                    {tableApi.rows.map((row, i) => {
                        tableApi.prepareRow(row);
                        return (
                            <div {...row.getRowProps()} className="bd-tr">
                                {multiSelect && (
                                    <div className="bd-td selection-column">
                                        <bd.Toggle size="sm" color="primary" labelClassName="m-0" {...row.getToggleRowSelectedProps()} />
                                    </div>
                                )}
                                {singleSelect && (
                                    <div className="bd-td selection-column">
                                        <bd.Toggle
                                            radio
                                            size="sm"
                                            color="primary"
                                            labelClassName="m-0"
                                            {...row.getToggleRowSelectedProps()}
                                            onChange={() => {
                                                tableApi.toggleAllRowsSelected(false);
                                                tableApi.toggleRowSelected(row.id);
                                            }}
                                        />
                                    </div>
                                )}
                                {row.cells.map((cell) => {
                                    return (
                                        <div {...cell.getCellProps()} className="bd-td">
                                            {cell.render("Cell")}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
