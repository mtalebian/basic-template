import React, { useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { TableTitlebar } from "../../../components/table";
import { useAccount } from "../../../app/account-context";
import { roleApi } from "../../../api/role-api";
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
import { menuApi } from "../../../api/menu-api";

/******************** */
export const RoleApp = () => {
  const [initialized, setInitialized] = useState(false);
  const [projects, setProjects] = useState([]);
  const [azObjects, setAzObjects] = useState([]);
  const [editState, setEditState] = useState({ edit: false, row: null });

  const [currentProject, setCurrentProject] = useState(null);
  const [roles, setRoles] = useState(null);

  const { t } = useTranslation();
  const account = useAccount();

  const defaultPageSize = 10;
  const skipReset = true;

  const menuProjects = (
    <bd.Menu>
      {projects.map((x) => (
        <bd.MenuItem key={x.id} onClick={(e) => onChangeCurrentProject(x)}>
          {x.title}
        </bd.MenuItem>
      ))}
    </bd.Menu>
  );

  const onRefresh = () =>
    menuApi.load("not-assigned-app").then((x) => {
      setProjects(x.projects);
    });

  useEffect(() => {
    if (!initialized && account.isConnected()) {
      setInitialized(true);
      onRefresh();
    }
  });

  const onChangeCurrentProject = (prj) => {
    setCurrentProject(prj);
    roleApi
      .getRoles(prj.id)
      .then((x) => {
        setRoles(x.roles);
        setAzObjects(x.azObjects);
      })
      .catch((ex) => {
        notify.error(ex);
      });
  };

  const startEditRole = (role) => {
    if (!role || role.data) {
      setEditState({ edit: true, row: role });
      return;
    }
    roleApi
      .getRole(currentProject.id, role.id)
      .then((x) => {
        role.data = x;
        setEditState({ edit: true, row: role });
      })
      .catch((ex) => {
        notify.error(ex);
      });
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
          { Header: t("id"), accessor: "id", width: 100 },
          { Header: t("application-title"), accessor: "applicationTitle" },
          { Header: t("title"), accessor: "title" },
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
      {!initialized && <div className="middle d-flex h-100">L O D I N G . . .</div>}

      {initialized && !editState.edit && (
        <>
          <div className="border-bottom">
            <bd.Toolbar className="container">
              <bd.Button variant="" color="primary" menu={menuProjects} className="m-auto">
                {t("select-a-project")} ...
              </bd.Button>

              <div className="flex-grow-1"></div>
            </bd.Toolbar>
          </div>

          {currentProject && (
            <div className="container">
              <TableTitlebar
                tableApi={tableApi}
                hideSettings
                title="Roles"
                fixed
                buttons={
                  <>
                    <bd.Button
                      variant="text"
                      color="primary"
                      disabled={!tableApi.selectedFlatRows.length}
                      onClick={() => {
                        tableApi.selectedFlatRows.length && startEditRole(tableApi.selectedFlatRows[0].original);
                      }}
                    >
                      <icons.Edit />
                    </bd.Button>
                    <bd.Button
                      variant="text"
                      color="primary"
                      onClick={() => {
                        startEditRole(null);
                      }}
                    >
                      <icons.Add />
                    </bd.Button>
                  </>
                }
              />

              <RenderTableDiv
                tableApi={tableApi}
                singleSelect
                hideCheckbox
                showTableInfo
                showPageSize
                enablePaging
                enableSorting
                clickAction="select"
                className="nano-scroll border"
                //style={{ minHeight: 400 }}
                hover
              />
            </div>
          )}
        </>
      )}

      {editState.edit && (
        <EditRole
          currentProjectId={currentProject.id}
          originalRole={editState.row?.data}
          azObjects={azObjects}
          onGoBack={(item) => {
            setEditState({ edit: false, row: null });
          }}
          onChange={(newValue, originalValue) => {
            setEditState({ edit: false });
            if (originalValue == null) {
              setRoles([...roles, { id: newValue.id, applicationTitle: newValue.applicationTitle, title: newValue.title, data: newValue }]);
            } else {
              var i = roles.findIndex((x) => x.id === originalValue.id);
              if (!newValue) {
                setRoles(roles.filter((x, xIndex) => xIndex !== i));
              } else {
                var newRole = {
                  ...roles[i],
                  title: newValue.title,
                  applicationTitle: newValue.applicationTitle,
                  data: { ...newValue },
                };
                var newRoles = [...roles];
                newRoles[i] = newRole;
                setRoles(newRoles);
              }
            }
          }}
        />
      )}
    </>
  );
};
RoleApp.Appbar = {
  title: "roles",
};
