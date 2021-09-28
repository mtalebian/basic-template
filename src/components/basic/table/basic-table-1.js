import React from "react";
import { useGlobalFilter, useSortBy, useRowSelect, useTable } from "react-table";
import * as bs from "react-basic-design";
import { Checkbox } from "./checkbox";
import { GlobalFilter } from "./global-filter";
import { tableMessages } from "./table-messages";
import * as icons from "../../../assets/icons";

export function BasicTable1({ columns, data, title, filtrable, selectable, onAdd, onEdit, onDelete, onRefresh, messages, ...props }) {
    messages = {
        ...tableMessages,
        ...messages,
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        setGlobalFilter,
        //state: { pageIndex, pageSize, selectedRowIds, globalFilter },
        state: { globalFilter },
        prepareRow,
        selectedFlatRows,
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

    const onRefreshClick = () => {
        if (!!onRefresh) onRefresh();
        return false;
    };
    const onAddClick = () => {
        if (!!onAdd) onAdd();
    };
    const onEditClick = () => {
        if (!!onEdit && selectedFlatRows.length === 1) onEdit(selectedFlatRows[0].original);
    };
    const onDeleteClick = () => {
        if (!!onDelete) onDelete(selectedFlatRows);
    };

    const onTdClick = (row, cell) => {
        if (!cell.column._toggleOnClick) return;
        var is_selected = row.isSelected;
        toggleAllRowsSelected(false);
        if (!is_selected) row.toggleRowSelected();
    };
    /*
    const ToolButton = ({ title, icon, disabled, hide, ...props }) => {
        if (hide) return <></>;
        var args = disabled
            ? {
                  ...props,
                  disabled,
              }
            : {
                  ...props,
              };
        return (
            <bs.Button small icon={icon} {...args}>
                {title}
            </bs.Button>
        );
    };
*/
    function format(message, args) {
        if (!message) return message;
        if (typeof message === "string" && message.indexOf("{") === -1) return message;
        if (!args) args = {};
        args = {
            count: selectedFlatRows.length,
            plural: title,
            //singular: singularTitle,
            ...args,
        };
        if (typeof message === "function") {
            args = {
                //original: entity,
                //insertMode,
                selection: selectedFlatRows.map((x) => x.original),
                ...args,
            };
            return message(args);
        }
        return messages.format(message, args);
    }

    const menuMore = (
        <bs.Menu>
            {onRefresh && (
                <bs.MenuItem href="#/refrsh" onClick={onRefreshClick}>
                    {format(messages.Refresh)}
                </bs.MenuItem>
            )}
            <bs.MenuItem href="#/" onClick={onDeleteClick} disabled={selectedFlatRows.length < 1}>
                {format(messages.Delete)}
            </bs.MenuItem>
        </bs.Menu>
    );

    return (
        <>
            <bs.Toolbar size="sm" gap={1} className="px-2">
                {selectedFlatRows.length === 0 && (
                    <bs.Button size="md" variant="icon" color="primary" onClick={onAddClick} edge="start">
                        <icons.Add />
                    </bs.Button>
                )}
                {selectedFlatRows.length === 1 && (
                    <bs.Button size="md" variant="icon" color="secondary" onClick={onEditClick} title={format(messages.Edit)} edge="start">
                        <icons.Edit />
                    </bs.Button>
                )}

                <b className="flex-grow-1">{selectedFlatRows.length === 0 ? title : format(messages.RowsSelected)}</b>
                {filtrable && (
                    <div
                        style={{
                            maxWidth: 200,
                        }}
                    >
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} messages={messages} />
                    </div>
                )}

                <bs.Button size="md" variant="icon" color="inherit" menu={menuMore} edge="end">
                    <icons.MoreVert />
                </bs.Button>
            </bs.Toolbar>

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
        </>
    );
}
