import { useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { TableTitlebar } from "../../../components/table";
import { useAccount } from "../../../app/account-context";
import { compositeRoleApi } from "../../../api/composite-role-api";
import { notify } from "../../../components/basic/notify";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { DefaultEditor } from "../../../components/table/editors";
import { menuApi } from "../../../api/menu-api";
import { EditCompositeRole } from "./edit-composite-role";
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

export const CompositeRoleApp = () => {
  const [initialized, setInitialized] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editState, setEditState] = useState({ edit: false, row: null });
  const [currentProject, setCurrentProject] = useState(null);
  const [compositeRoles, setCompositeRoles] = useState(null);
  const { t } = useTranslation();
  const account = useAccount();

  const defaultPageSize = 10;
  const skipReset = true;

  const tableApi = useTable(
    {
      initialState: { pageSize: defaultPageSize },
      defaultColumn: {
        Cell: DefaultEditor,
        minWidth: 30,
        disableGroupBy: true,
      },
      columns: useMemo(
        () => [
          { Header: t("id"), accessor: "id" },
          { Header: t("title"), accessor: "title" },
        ],
        []
      ),
      data: useMemo(() => (compositeRoles ? compositeRoles : []), [compositeRoles]),
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
    compositeRoleApi
      .getCompositeRoles(prj.id)
      .then((x) => {
        setCompositeRoles(x);
      })
      .catch((ex) => {
        notify.error(ex);
      });
  };

  const startEditRole = (compositeRole) => {
    if (!compositeRole || compositeRole.data) {
      setEditState({ edit: true, row: compositeRole });
      return;
    }
    compositeRoleApi
      .getCompositeRole(currentProject.id, compositeRole.id)
      .then((x) => {
        compositeRole.data = x;
        setEditState({ edit: true, row: compositeRole });
      })
      .catch((ex) => {
        notify.error(ex);
      });
  };
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
                hover
              />
            </div>
          )}
        </>
      )}
      {editState.edit && (
        <EditCompositeRole
          currentProjectId={currentProject.id}
          originalCompositeRole={editState.row?.data}
          onGoBack={(item) => {
            setEditState({ edit: false, row: null });
          }}
          onChange={(newValue, originalValue) => {
            setEditState({ edit: false });
            if (originalValue == null) {
              setCompositeRoles([...compositeRoles, { id: newValue.id, title: newValue.title, data: newValue }]);
            } else {
              var i = compositeRoles.findIndex((x) => x.id === originalValue.id);
              if (!newValue) {
                setCompositeRoles(compositeRoles.filter((x, xIndex) => xIndex !== i));
              } else {
                var newCompositeRole = {
                  ...compositeRoles[i],
                  title: newValue.title,
                  data: { ...newValue },
                };
                var newCompositeRoles = [...compositeRoles];
                newCompositeRoles[i] = newCompositeRole;
                setCompositeRoles(newCompositeRoles);
              }
            }
          }}
        />
      )}
    </>
  );
};
CompositeRoleApp.Appbar = {
  title: "Composite Roles",
};
