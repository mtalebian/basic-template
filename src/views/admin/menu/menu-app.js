import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";

import * as icons from "../../../assets/icons";
import { menuApi } from "../../../api/menu-api";
import { useAccount } from "../../../app/account-context";
import { Tile, Tiles } from "../../../components/tilemenu/tiles";
import { useTranslation } from "react-i18next";
import { EditFolder } from "./edit-folder";
import { EditMenu } from "./edit-menu";

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
    const [editMode, setEditMode] = useState(false);

    const onRefresh = (app) =>
        menuApi.load(!app ? "not-assigned-app" : app.id).then((x) => {
            setProjects(x.projects);
            setMenuFolders(x.menuFolders);
            setMenus(x.menus);
        });

    /*
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
*/

    const menuProjects = (
        <bd.Menu>
            {projects.map((x) => (
                <bd.MenuItem key={x.id} onClick={(e) => changeApp(x)}>
                    {x.title}
                </bd.MenuItem>
            ))}
        </bd.Menu>
    );

    useEffect(() => {
        if (!initialized && account.isConnected()) {
            setInitialized(true);
            onRefresh(app);
        }
    }, [account, app, initialized]);

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

            {app && !editMode && (
                <bd.AppBar color position="sticky" style={{ zIndex: 10 }} shadow={0} className="shadow-0 border-bottom">
                    <div className="container">
                        <bd.Toolbar>
                            <bd.Button variant="icon" size="md" onClick={() => setApp(null)}>
                                <icons.ArrowBackIos className="rtl-rotate-180" />
                            </bd.Button>
                            <h5 className="appbar-title">{app.title}</h5>

                            {(selectedFolder?.id || selectedMenu?.id) && (
                                <>
                                    <bd.Button variant="text" onClick={() => setEditMode(true)} edge="end">
                                        <icons.Edit className="size-lg" />
                                        {t("edit")}
                                    </bd.Button>
                                </>
                            )}
                        </bd.Toolbar>
                    </div>
                </bd.AppBar>
            )}

            {app && !editMode && menuFolders && (
                <div className="container pt-4">
                    <Tiles className="">
                        {menuFolders
                            .filter((x) => !x.parentId)
                            .map((f) => (
                                <Tile
                                    key={f.id}
                                    title={f.title}
                                    selected={selectedFolder === f}
                                    onClick={() => {
                                        setSelectedFolder(f === selectedFolder ? null : f);
                                        setSelectedMenu(null);
                                    }}
                                >
                                    {menus
                                        .filter((x) => x.parentId === f.id)
                                        .map((m) => (
                                            <Tile
                                                key={m.id}
                                                title={m.title}
                                                selected={selectedMenu === m}
                                                onClick={() => {
                                                    setSelectedFolder(null);
                                                    setSelectedMenu(m === selectedMenu ? null : m);
                                                }}
                                            />
                                        ))}
                                    <Tile
                                        icon={<icons.Add />}
                                        title="New Menu"
                                        className="btn btn-secondary text-secondary bg-transparent  border border-secondary"
                                        onClick={() => {
                                            setEditMode(true);
                                            setSelectedFolder(null);
                                            setSelectedMenu({ id: "", title: "" });
                                        }}
                                    ></Tile>
                                </Tile>
                            ))}

                        <Tile
                            icon={<icons.Add />}
                            title="New Folder"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                setEditMode(true);
                                setSelectedFolder({ id: "", title: "" });
                                setSelectedMenu(null);
                            }}
                        >
                            <span></span>
                        </Tile>
                    </Tiles>
                </div>
            )}

            {app && editMode && selectedFolder && (
                <EditFolder
                    projectId={app.id}
                    folder={selectedFolder}
                    onGoBack={(item) => {
                        setEditMode(false);
                        if (!!item && !selectedFolder.id) {
                            setMenuFolders([...menuFolders, item]);
                            setSelectedFolder(item);
                        } else if (!!item && !!selectedFolder.id) {
                            const list = [...menuFolders];
                            const i = list.findIndex((x) => x.id === item.id);
                            list[i] = item;
                            setMenuFolders(list);
                            setSelectedFolder(item);
                        } else if (item === null) {
                            const list = menuFolders.filter((x) => x.id !== selectedFolder.id);
                            setMenuFolders(list);
                        }
                    }}
                />
            )}
            {app && editMode && selectedMenu && (
                <EditMenu
                    projectId={app.id}
                    menu={selectedMenu}
                    onGoBack={(item) => {
                        setEditMode(false);
                        if (!!item) {
                            const list = menus;
                            const i = list.findIndex((x) => x.id === item.id);
                            list[i] = item;
                            setMenus(list);
                        } else if (item === null) {
                            const list = menus.filter((x) => x.id !== selectedMenu.id);
                            setMenus(list);
                        }
                    }}
                />
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
