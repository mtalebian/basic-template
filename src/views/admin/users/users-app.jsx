import React, { useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { TableTitlebar } from "../../../components/table";
import { EditUser } from "./edit-user";
import { useAccount } from "../../../app/account-context";
import { userManagmentApi } from "../../../api/user-managment-api";
import { notify } from "../../../components/basic/notify";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { DefaultEditor } from "../../../components/table/editors";
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

export const UsersApp = ({ ...props }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const account = useAccount();
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const defaultPageSize = 10;
  const skipReset = true;

  const addUserOnClick = () => {
    setSelectedUser(null);
    setEditMode(true);
  };

  useEffect(() => {
    if (!users && account.isConnected()) {
      userManagmentApi
        .getUsers()
        .then((x) => {
          setUsers(x);
        })
        .catch((ex) => {
          notify.error(ex);
        });
    }
  });

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
          { Header: t("id"), accessor: "id", width: 50 },
          { Header: t("user-name"), accessor: "userName", width: 100 },
          { Header: t("first-name"), accessor: "firstName" },
          { Header: t("last-name"), accessor: "lastName" },
          { Header: t("national-code"), accessor: "nationalCode" },
          { Header: t("authenticate"), accessor: "windowsAuthenticate", getDisplayValue: (value) => (value ? "ويندوز" : "فرم") },
          {
            Header: t("operation"),
            accessor: (row) => {
              setSelectedUser(row.id);
            },
            Cell: () => {
              return (
                <bd.Button
                  size="sm"
                  color="inherit"
                  size
                  onClick={() => {
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
      data: useMemo(() => (users ? users : []), [users]),
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
      {!editMode && !users && <div className="middle d-flex h-100">L O D I N G . . .</div>}
      {!editMode && users && (
        <>
          <div className="border-bottom">
            <bd.Toolbar className="container">
              <bd.Button variant="text" onClick={addUserOnClick}>
                <icons.PersonAddAlt className="size-lg" />
              </bd.Button>
            </bd.Toolbar>
          </div>
          <div className="container">
            <TableTitlebar tableApi={tableApi} hideSettings title="Columns" fixed />
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
              className="border0 nano-scroll"
              //style={{ minHeight: 400 }}
              hover
              striped
              hasWhitespace
              stickyFooter
            />
          </div>
        </>
      )}
      {editMode && <EditUser userId={selectedUser} onGoBack={() => setEditMode(false)} />}
    </>
  );
};

UsersApp.Appbar = {
  title: "users",
};
