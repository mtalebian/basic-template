import { useMemo } from "react";
import {
    useBlockLayout,
    useExpanded,
    useFilters,
    useFlexLayout,
    useGlobalFilter,
    useGroupBy,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from "react-table";
import { DefaultEditor } from "./editors";

const emptyData = [];

export function useReactTable({ defaultPageSize, columns, data, updateData, flexLayout, onSelectionChanged }) {
    const skipReset = true;
    const layout = flexLayout ? useFlexLayout : useBlockLayout;

    const stateReducer = (newState, action, prevState) => {
        if (newState.selectedRowIds !== prevState.selectedRowIds) {
            if (onSelectionChanged) onSelectionChanged(newState.selectedRowIds);
        }
        return newState;
    };

    return useTable(
        {
            initialState: { pageSize: defaultPageSize ? defaultPageSize : 10 },
            defaultColumn: {
                Cell: DefaultEditor,
                minWidth: 30,
                disableGroupBy: true,
                //maxWidth: 200,
            },
            columns: useMemo(() => columns, [columns]),
            data: useMemo(() => data ?? emptyData, [data]),
            //filterTypes: useMemo(() => reactTable.filterTypes, []),
            updateMyData: updateData,
            autoResetPage: !skipReset,
            autoResetFilters: !skipReset,
            autoResetSortBy: !skipReset,
            autoResetSelectedRows: !skipReset,
            autoResetGlobalFilter: !skipReset,
            disableMultiSort: false,
            stateReducer,
        },
        useGlobalFilter,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        layout
        //useResizeColumns
        //(hooks) => reactTable.addSelectionColumns(hooks)
    );
}
