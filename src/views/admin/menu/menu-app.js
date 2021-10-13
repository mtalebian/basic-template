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
                            {t("select-a-project")} ...
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
                                        setSelectedFolder(f);
                                        setSelectedMenu(null);
                                        setEditMode(true);
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
                                                    setSelectedMenu(m);
                                                    setEditMode(true);
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
                                            setSelectedMenu({ id: "", parentId: f.id, title: "" });
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
                        if (!!item && !selectedMenu.id) {
                            setMenus([...menus, item]);
                            setSelectedMenu(item);
                        } else if (!!item && !!selectedMenu.id) {
                            const list = [...menus];
                            const i = list.findIndex((x) => x.id === item.id);
                            list[i] = item;
                            setMenus(list);
                            setSelectedMenu(item);
                        } else if (item === null) {
                            const list = menus.filter((x) => x.id !== selectedMenu.id);
                            setMenus(list);
                        }
                    }}
                />
            )}
        </>
    );
}

MenuApp.Appbar = {
    title: "maintain-menu",
    buttons: null,
};
