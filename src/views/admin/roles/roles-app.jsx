import React, { useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { TableTitlebar } from "../../../components/table";
import { useAccount } from "../../../app/account-context";
import { authorizationApi } from "../../../api/authorization-api";
import { notify } from "../../../components/basic/notify";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { DefaultEditor } from "../../../components/table/editors";
import { EditRole } from "./edit-role";
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
  useResizeColumns,
} from "react-table";

export const RolesApp = () => {
  const [roles, setRoles] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();
  const account = useAccount();

  const defaultPageSize = 10;
  const skipReset = true;

  useEffect(() => {
    if (!roles && account.isConnected()) {
      authorizationApi
        .getRoles()
        .then((x) => {
          setRoles(x);
          console.log(x);
        })
        .catch((ex) => {
          notify.error(ex);
        });
    }
  });

  const addRoleOnClick = () => {
    setSelectedRole(null);
    setEditMode(true);
  };

  const tableApi = useTable(
    {
      initialState: { pageSize: defaultPageSize },
      defaultColumn: {
        Cell: DefaultEditor,
        minWidth: 30,
        disableGroupBy: true,
        //maxWidth: 200,
      },
      columns: useMemo(
        () => [
          { Header: t("project-id"), accessor: "projectId", width: 50 },
          { Header: t("id"), accessor: "id", width: 100 },
          { Header: t("application-id"), accessor: "applicationId" },
          { Header: t("title"), accessor: "title" },
          {
            Header: t("operation"),
            accessor: "operation",
            Cell: ({ row }) => {
              const data = row.original;
              return (
                <bd.Button
                  size="sm"
                  color="inherit"
                  size
                  onClick={() => {
                    setSelectedRole(data.id);
                    setEditMode(true);
                  }}
                >
                  <icons.Edit className="size-md" />
                  {t("edit")}
                </bd.Button>
              );
            },
          },
        ],
        []
      ),
      data: useMemo(() => (roles ? roles : []), [roles]),
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
    useFlexLayout,
    useResizeColumns
    //(hooks) => reactTable.addSelectionColumns(hooks)
  );
  return (
    <>
      {!editMode && !roles && <div className="middle d-flex h-100">L O D I N G . . .</div>}
      {!editMode && roles && (
        <>
          <div className="border-bottom">
            <bd.Toolbar className="container">
              <bd.Button variant="text" onClick={addRoleOnClick}>
                <icons.AddModerator className="size-lg" />
              </bd.Button>
            </bd.Toolbar>
          </div>
          <div className="container">
            <TableTitlebar tableApi={tableApi} hideSettings title="Roles" fixed />
            <RenderTableDiv
              tableApi={tableApi}
              resizable
              //multiSelect
              singleSelect
              hideCheckbox
              hasSummary
              showTableInfo
              showPageSize
              enablePaging
              enableGrouping
              enableSorting
              //editable
              clickAction="select"
              className="border0 nano-scroll border"
              //style={{ minHeight: 400 }}
              hover
              // striped
              hasWhitespace
              stickyFooter
            />
          </div>
        </>
      )}
      {editMode && (
        <EditRole
          roleId={selectedRole}
          onGoBack={(item) => {
            setEditMode(false);
            if (!!item && selectedRole == null) {
              setRoles([...roles, item]);
              setSelectedRole(item.id);
            } else if (!!item && selectedRole != null) {
              const list = [...roles];
              const i = list.findIndex((x) => x.id === item.id);
              list[i] = item;
              setRoles(list);
              setSelectedRole(item.id);
            } else if (item === null) {
              const newRoles = roles.filter((x) => x.id !== selectedRole);
              setRoles(newRoles);
              setSelectedRole(null);
            }
          }}
        />
      )}
    </>
  );
};
RolesApp.Appbar = {
  title: "roles",
};
