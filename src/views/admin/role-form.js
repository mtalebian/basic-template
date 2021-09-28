import React, { useState } from "react";
import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";

import { menuApi } from "../../api/menu-api";
import { myTableMessages } from "../../components/my-table-messages";
import * as bs from 'react-basic-design';
import * as tables from "../../data";


export default function RoleForm() {
    const [applications, setApplications] = useState([]);
    const [app, setApp] = useState(null);
    const [menuFolders, setMenuFolders] = useState([]);
    const [menus, setMenus] = useState([]);

    const onRefresh = () => menuApi.load(!app ? '0' : app.id)
        .then(x => {
            setApplications(x.applications);
            setMenuFolders(x.menuFolders);
            setMenus(x.menus);
        });
    const onInsertApp = entity => menuApi.insertApp(entity).then(x => { setApplications(x); return x; });
    const onUpdateApp = entity => menuApi.updateApp(entity).then(x => { setApplications(x); return x; });
    const onDeleteApp = selection => menuApi.deleteApp(selection).then(x => { setApplications(x); return x; });

    const onAdd = (entity, tb) => tb.is('menus')
        ? menuApi.insertMenu(app.id, entity).then(x => { menus.push(x); setMenus(menus); return x; })
        : menuApi.insertFolder(app.id, entity).then(x => { menuFolders.push(x); setMenuFolders(menuFolders); return x; });

    const onUpdate = (entity, tb) => tb.is('menus')
        ? menuApi.updateMenu(app.id, entity).then(x => { setMenus([x, ...menus.filter(x => x.id !== entity.id)]); return x; })
        : menuApi.updateFolder(app.id, entity).then(x => { setMenuFolders([x, ...menuFolders.filter(x => x.id !== entity.id)]); return x; });

    const onDelete = (entity, tb) => tb.is('menus')
        ? menuApi.deleteMenu(app.id, entity.id).then(x => setMenus(menus.filter(x => x.id !== entity.id)))
        : menuApi.deleteFolder(app.id, entity.id).then(x => setMenuFolders(menuFolders.filter(x => x.id !== entity.id)));


    useEffect(onRefresh, [app]);

    const indexOf_byId = (list, id) => menus.indexOf(list.find(x => x.id == id));




    return (
        <div className="container-fluid py-3">
            <Tabs defaultActiveKey="menus" >
                <Tab eventKey="menus" title="Define Menu">
                    
                </Tab>
                <Tab eventKey="apps" title="Define Applications">
                    <div className="card m-0">
                        <div className="card-body" style={{ maxWidth: 700 }}>
                            <DataTable
                                title="برنامه ها"
                                singularTitle="برنامه"
                                columns={tables.applications.getReactTableColumns()}
                                data={applications}
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
    );
}