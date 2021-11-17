import { useMemo } from "react";
import * as icons from "../../assets/icons";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import { DefaultEditor } from "../../components/table/editors";
import { RenderTableDiv } from "../../components/table/render-table-div";
import { TableTitlebar } from "../../components/table";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
  useFlexLayout,
  useResizeColumns,
} from "react-table";
export const RenderUserCompositeRole = ({ userCompositRoles, deleteUserCompositeRoleItem }) => {
  const { t } = useTranslation();
  const defaultPageSize = 10;
  const skipReset = true;

  const compositeRoleTableApi = useTable(
    {
      initialState: { pageSize: defaultPageSize, hiddenColumns: ["projectId"] },
      defaultColumn: {
        Cell: DefaultEditor,
        minWidth: 30,
        disableGroupBy: true,
      },
      columns: useMemo(
        () => [
          { Header: t("project-id"), accessor: "projectId" },
          { Header: t("user-id"), accessor: "userId", width: 80 },
          { Header: t("comp-role-id"), accessor: "compositeRoleId", width: 100 },
          { Header: t("comp-role-title"), accessor: "compositeRoleTitle" },
          { Header: t("user-name"), accessor: "userName" },
          { Header: t("create-by"), accessor: "createBy" },
          { Header: t("create-at"), accessor: "createAt" },
        ],
        []
      ),
      data: useMemo(() => (userCompositRoles ? userCompositRoles : []), [userCompositRoles]),
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
    useFlexLayout,
    useResizeColumns
  );
  return (
    <div className="row pt-5">
      <TableTitlebar
        tableApi={compositeRoleTableApi}
        hideSettings
        title="User Composite Roles"
        fixed
        buttons={
          <>
            <bd.Button
              type="button"
              variant="text"
              color="primary"
              disabled={!compositeRoleTableApi.selectedFlatRows.length}
              onClick={() => {
                compositeRoleTableApi.selectedFlatRows.length && deleteUserCompositeRoleItem(compositeRoleTableApi.selectedFlatRows[0].original);
              }}
            >
              <icons.Delete />
            </bd.Button>
          </>
        }
      />
      <RenderTableDiv
        tableApi={compositeRoleTableApi}
        singleSelect
        hideCheckbox
        showTableInfo
        showPageSize
        enablePaging
        enableSorting
        clickAction="select"
        className="nano-scroll border"
        hover
      />
    </div>
  );
};
