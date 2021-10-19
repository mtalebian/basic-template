import React, { useMemo } from "react";
import {
    useTable,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useFilters,
    useGroupBy,
    useExpanded,
    useRowSelect,
    //useBlockLayout,
    useFlexLayout,
    //useRowState,
} from "react-table";
import { TableTitlebar } from ".";
import { DefaultEditor } from "./editors";
import { reactTable } from "./react-table-helper";
import { RenderTableDiv } from "./render-table-div";

export function TableDesignerEditTable({ columns, data, updateData, defaultPageSize, titleButtons }) {
    const skipReset = true;
    const tableApi = useTable(
        {
            initialState: { pageSize: defaultPageSize ?? 10 },
            defaultColumn: {
                Cell: DefaultEditor,
                minWidth: 30,
                disableGroupBy: true,
                //maxWidth: 200,
            },
            columns: useMemo(() => columns, [columns]),
            data: useMemo(() => data, [data]),
            filterTypes: useMemo(() => reactTable.filterTypes, []),
            updateMyData: updateData,
            autoResetPage: !skipReset,
            autoResetFilters: !skipReset,
            autoResetSortBy: !skipReset,
            autoResetSelectedRows: !skipReset,
            autoResetGlobalFilter: !skipReset,
            disableMultiSort: false,
        },
        useGlobalFilter,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        //useBlockLayout,
        useFlexLayout
        //(hooks) => reactTable.addSelectionColumns(hooks)
    );

    return (
        <>
            <TableTitlebar tableApi={tableApi} title="Columns" fixed buttons={titleButtons} />

            <RenderTableDiv
                tableApi={tableApi}
                //multiSelect
                singleSelect
                hideCheckbox
                //hasSummary
                showTableInfo
                //showPageSize
                enableGrouping
                enableSorting
                //enablePaging
                editable
                clickAction="select"
                className="border nano-scroll"
                //style={{ minHeight: 400 }}
                hover
                //striped
                //hasWhitespace
                //stickyFooter
            />
        </>
    );
}
