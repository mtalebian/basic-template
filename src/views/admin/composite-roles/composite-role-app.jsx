import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { TableTitlebar } from "../../../components/table";
import { useAccount } from "../../../app/account-context";
import { roleApi } from "../../../api/role-api";
import { notify } from "../../../components/basic/notify";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { menuApi } from "../../../api/menu-api";
import { EditCompositeRole } from "./edit-composite-role";
import { useShell } from "../../shared/use-shell";
import { T } from "../../../components/basic/text";
import { useReactTable } from "../../../components/table/use-react-table";

export const CompositeRoleApp = () => {
  const gridColumns = useRef([
    { Header: <T>id</T>, accessor: "id" },
    { Header: <T>title</T>, accessor: "title" },
  ]);
  const [initialized, setInitialized] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editState, setEditState] = useState({ edit: false, row: null });
  const [currentProject, setCurrentProject] = useState(null);
  const [compositeRoles, setCompositeRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const { t } = useTranslation();
  const account = useAccount();
  const shell = useShell();

  shell.setApp(<T count={5}>composite-role @count</T>);

  const tableApi = useReactTable({ columns: gridColumns.current, data: compositeRoles, flexLayout: false });

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
      .getCompositeRoles(prj.id)
      .then((x) => {
        setRoles(x.roles);
        setCompositeRoles(x.compositeRoles);
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
    roleApi
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
                title="Composite  Roles"
                fixed
                buttons={
                  <>
                    <bd.Button
                      variant="icon"
                      size="md"
                      color="primary"
                      onClick={() => {
                        startEditRole(null);
                      }}
                      className="mx-1"
                    >
                      <icons.Add />
                      <T>add</T>
                    </bd.Button>
                    <bd.Button
                      variant="icon"
                      size="md"
                      color="primary"
                      disabled={!tableApi.selectedFlatRows.length}
                      onClick={() => {
                        tableApi.selectedFlatRows.length && startEditRole(tableApi.selectedFlatRows[0].original);
                      }}
                    >
                      <icons.Edit />
                      <T>edit</T>
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
                hasWhitespace
                onShowMoreClick={(row) => startEditRole(row.original)}
              />
            </div>
          )}
        </>
      )}
      {editState.edit && (
        <EditCompositeRole
          roles={roles}
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
