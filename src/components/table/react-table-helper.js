/*
column._breakPoint          :  "sm" | "md" | "lg" | "xl"
column._popinCss            :  sample: "col-12 col-md-6" 
column._headerProps         :  {}  |  (column) => {}
column._cellProps           :  {}  |  (row, cell) => {}
column._ignoreToggleOnClick :  boolean
column._summary             : {}  |  (rows, col) => {}


*/
import * as bd from "react-basic-design";

const multiSelectColumn = () => {
    return {
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
        width: 54,
    };
};

const singleSelectColumn = () => {
    return {
        id: "_single_select_",
        groupByBoundary: true,
        Cell: ({ row, toggleAllRowsSelected, toggleRowSelected, ...props }) => (
            <bd.Toggle
                radio
                size="sm"
                color="primary"
                labelClassName="m-0"
                {...row.getToggleRowSelectedProps()}
                onChange={() => {
                    toggleAllRowsSelected(false);
                    toggleRowSelected(row.id);
                }}
            />
        ),
        Filter: null,
        _headerProps: null,
        _cellProps: null,
        _footerProps: null,
        width: 54,
    };
};

export const reactTable = {
    addSingleSelectColumn: (hooks) => hooks.visibleColumns.push((columns) => [singleSelectColumn(), ...columns]),

    addMultiSelectColumn: (hooks) => hooks.visibleColumns.push((columns) => [multiSelectColumn(), ...columns]),

    addSelectionColumns: (hooks) => hooks.visibleColumns.push((columns) => [multiSelectColumn(), singleSelectColumn(), ...columns]),

    filterTypes: () => ({
        text: (rows, id, filterValue) => {
            return rows.filter((row) => {
                alert(1);
                const rowValue = row.values[id];
                return rowValue && String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase());
            });
        },
    }),
};
