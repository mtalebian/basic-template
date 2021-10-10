import React, { useEffect, useState } from "react";
import * as bs from "react-basic-design";
import { Tab, Tabs } from "react-bootstrap";

import InsertDriveFile from "../../../assets/icons/InsertDriveFile";
import Folder from "../../../assets/icons/Folder";
import ArrowBackIos from "../../../assets/icons/ArrowBackIos";
import { menuApi } from "../../../api/menu-api";
import { MenuDesigner } from "./menu-designer";
import * as tables from "../../../data";
import { DataTable } from "../../../components/basic/table/data-table";
import { myTableMessages } from "../../../components/my-table-messages";
import { useAccount } from "../../../app/account-context";

export function MenuApp() {
    const [projects, setProjects] = useState([]);
    const [app, setApp] = useState(null);
    const [menuFolders, setMenuFolders] = useState([]);
    const [menus, setMenus] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const account = useAccount();

    const onRefresh = (app) =>
        menuApi.load(!app ? "not-assigned-app" : app.id).then((x) => {
            setInitialized(true);
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
        <bs.Menu>
            {projects.map((x) => (
                <bs.MenuItem onClick={(e) => setApp(x)}>{x.title}</bs.MenuItem>
            ))}
        </bs.Menu>
    );

    useEffect(() => {
        if (!initialized && account.isConnected()) {
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
            {app && (
                <bs.AppBar color position="sticky" style={{ zIndex: 10 }} shadow={0} className="shadow-0 border-bottom">
                    <div className="container">
                        <bs.Toolbar>
                            <bs.Button variant="icon" size="md" onClick={() => setApp(null)}>
                                <ArrowBackIos />
                            </bs.Button>
                            <h5 className="m-s-2 appbar-title">
                                Menu Designer :<span className="m-s-3 text-secondary">{app.title}</span>
                            </h5>

                            <bs.Button variant="icon">
                                <Folder />
                            </bs.Button>

                            <bs.Button variant="icon">
                                <InsertDriveFile />
                            </bs.Button>
                        </bs.Toolbar>
                    </div>
                </bs.AppBar>
            )}

            {!app && (
                <div className="text-center py-4 border-bottom bg-default">
                    <h5>Menu Designer:</h5>
                    <bs.Button variant="" color="primary" menu={menuProjects} className="m-auto">
                        Select a project ...
                    </bs.Button>
                </div>
            )}

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
            </div>
        </>
    );
}
