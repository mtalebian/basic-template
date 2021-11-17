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

export function useReactTable({ defaultPageSize, columns, data, updateData, flexLayout }) {
  //TODO
  // if (!columns is useMEMO) columns = useMemo(() => columns, [columns])
  //TODO
  // if (!data is useMEMO) data = useMemo(() => data, [data])

  const skipReset = true;
  const layout = flexLayout ? useFlexLayout : useBlockLayout;
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
      data: useMemo(() => data, [data]),
      //filterTypes: useMemo(() => reactTable.filterTypes, []),
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
    layout
    //useResizeColumns
    //(hooks) => reactTable.addSelectionColumns(hooks)
  );
}
