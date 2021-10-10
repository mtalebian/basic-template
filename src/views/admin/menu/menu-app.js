import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import { Tab, Tabs } from "react-bootstrap";

import * as icons from "../../../assets/icons";
import { menuApi } from "../../../api/menu-api";
import { MenuDesigner } from "./menu-designer";
import * as tables from "../../../data";
import { DataTable } from "../../../components/basic/table/data-table";
import { myTableMessages } from "../../../components/my-table-messages";
import { useAccount } from "../../../app/account-context";
import { Tile, Tiles } from "../../../components/tilemenu/tiles";
import { useTranslation } from "react-i18next";
import { msgbox } from "react-basic-design";

export function MenuApp() {
    const { t } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [app, setApp] = useState(null);
    const [menuFolders, setMenuFolders] = useState([]);
    const [menus, setMenus] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const account = useAccount();
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);

    const onRefresh = (app) =>
        menuApi.load(!app ? "not-assigned-app" : app.id).then((x) => {
            setProjects(x.projects);
            setMenuFolders(x.menuFolders);
            setMenus(x.menus);
        });
    const onInsertApp = (entity) =>
        menuApi.insertApp(entity).then((x) => {
            setProjects(x);
            return x;
        });
    const onUpdateApp = (entity) =>
        menuApi.updateApp(entity).then((x) => {
            setProjects(x);
            return x;
        });
    const onDeleteApp = (selection) =>
        menuApi.deleteApp(selection).then((x) => {
            setProjects(x);
            return x;
        });

    const onAdd = (entity, tb) =>
        tb.is("menus")
            ? menuApi.insertMenu(app.id, entity).then((x) => {
                  menus.push(x);
                  setMenus(menus);
                  return x;
              })
            : menuApi.insertFolder(app.id, entity).then((x) => {
                  menuFolders.push(x);
                  setMenuFolders(menuFolders);
                  return x;
              });

    const onUpdate = (entity, tb) =>
        tb.is("menus")
            ? menuApi.updateMenu(app.id, entity).then((x) => {
                  setMenus([x, ...menus.filter((x) => x.id !== entity.id)]);
                  return x;
              })
            : menuApi.updateFolder(app.id, entity).then((x) => {
                  setMenuFolders([x, ...menuFolders.filter((x) => x.id !== entity.id)]);
                  return x;
              });

    const onDelete = (entity, tb) =>
        tb.is("menus")
            ? menuApi.deleteMenu(app.id, entity.id).then((x) => setMenus(menus.filter((x) => x.id !== entity.id)))
            : menuApi.deleteFolder(app.id, entity.id).then((x) => setMenuFolders(menuFolders.filter((x) => x.id !== entity.id)));

    const menuProjects = (
        <bd.Menu>
            {projects.map((x) => (
                <bd.MenuItem onClick={(e) => changeApp(x)}>{x.title}</bd.MenuItem>
            ))}
        </bd.Menu>
    );

    useEffect(() => {
        if (!initialized && account.isConnected()) {
            setInitialized(true);
            onRefresh(app);
        }
    });

    function changeApp(newApp) {
        setApp(newApp);
        setMenuFolders([]);
        setMenus([]);
        onRefresh(newApp);
    }

    return (
        <>
            {!app && (
                <div className="border-bottom">
                    <bd.Toolbar className="container">
                        <bd.Button variant="" color="primary" menu={menuProjects} className="m-auto">
                            Select a project ...
                        </bd.Button>
                    </bd.Toolbar>
                </div>
            )}

            {app && (
                <bd.AppBar color position="sticky" style={{ zIndex: 10 }} shadow={0} className="shadow-0 border-bottom">
                    <div className="container">
                        <bd.Toolbar>
                            <bd.Button variant="icon" size="md" onClick={() => setApp(null)}>
                                <icons.ArrowBackIos className="rtl-rotate-180" />
                            </bd.Button>
                            <h5 className="appbar-title">
                                <span className="text-secondary">{app.title}</span>
                            </h5>

                            <bd.Button variant="text">
                                <icons.Edit />
                                {t("edit")}
                            </bd.Button>

                            <bd.Button
                                variant="text"
                                onClick={() =>
                                    msgbox(t("deleting"), t("are-you-sure"), (hide) => (
                                        <>
                                            <bd.Button color="primary" variant="text" className="m-e-3" onClick={hide}>
                                                {t("cancel")}
                                            </bd.Button>
                                            <bd.Button color="primary" variant="text">
                                                {t("delete")}
                                            </bd.Button>
                                        </>
                                    ))
                                }
                            >
                                <icons.Delete />
                                {t("delete")}
                            </bd.Button>

                            <div className="divider"></div>
                            <bd.Button variant="text">
                                <icons.Folder />
                                {t("new-folder")}
                            </bd.Button>

                            <bd.Button variant="text">
                                <icons.InsertDriveFile />
                                {t("new-menu")}
                            </bd.Button>
                        </bd.Toolbar>
                    </div>
                </bd.AppBar>
            )}

            {app && menuFolders && (
                <div className="container">
                    <Tiles className="">
                        {menuFolders
                            .filter((x) => !x.parentId)
                            .map((f) => (
                                <Tile
                                    title={f.title}
                                    selected={selectedFolder === f}
                                    onClick={() => {
                                        setSelectedFolder(f);
                                        setSelectedMenu(null);
                                    }}
                                >
                                    {menus
                                        .filter((x) => x.parentId === f.id)
                                        .map((m) => (
                                            <Tile
                                                title={m.title}
                                                selected={selectedMenu === m}
                                                onClick={() => {
                                                    setSelectedFolder(null);
                                                    setSelectedMenu(m);
                                                }}
                                            />
                                        ))}
                                </Tile>
                            ))}
                    </Tiles>
                </div>
            )}
            {/* 
            <div className="container-fluid py-3">
                <Tabs defaultActiveKey="menus">
                    <Tab eventKey="menus" title="Define Menu">
                        <div className="card card-accent-secondary m-0">
                            <div className="card-body">
                                <MenuDesigner
                                    applications={projects}
                                    currApp={app}
                                    setApp={changeApp}
                                    menus={menus}
                                    menuFolders={menuFolders}
                                    onAdd={onAdd}
                                    onUpdate={onUpdate}
                                    onDelete={onDelete}
                                />
                            </div>
                        </div>
                    </Tab>

                    <Tab eventKey="apps" title="Define Projects">
                        <div className="card m-0">
                            <div className="card-body" style={{ maxWidth: 700 }}>
                                <DataTable
                                    title="برنامه ها"
                                    singularTitle="برنامه"
                                    columns={tables.applications.getReactTableColumns()}
                                    data={projects}
                                    onRefresh={onRefresh}
                                    onInsert={onInsertApp}
                                    onUpdate={onUpdateApp}
                                    onDelete={onDeleteApp}
                                    messages={myTableMessages}
                                />
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div> */}
        </>
    );
}

MenuApp.Appbar = {
    title: "maintain-menu",
    buttons: null,
};
