import React, { useState, useEffect } from "react";
import * as bd from "react-basic-design";
import classNames from "classnames";
import { gridBuilderApi } from "../../../api/grid-builder-api";
import { GridBuilderEditGroup } from "./edit-group";
import { GridBuilderEditGrid } from "./edit-grid";
import { notify } from "../../../components/basic/notify";
import * as icons from "../../../assets/icons";
import { useAccount } from "../../../app/account-context";
import { T } from "../../../components/basic/text";
import { useShell } from "../../shared/use-shell";

//
export function GridBuilderApp() {
    const account = useAccount();
    const [groups, setGroups] = useState(null);
    const [grids, setGrids] = useState(null);
    const [editState, setEditState] = useState({ group: null, grid: null });
    const newGridObject = (groupId) => ({ groupId, dataColumns: [], flexLayout: false, hasFilterVariant: false, filterable: true });

    useShell().fullWidth(true);

    function goBack() {
        setEditState({ group: null, grid: null });
    }

    function onNewGroupClick(parentId) {
        setEditState({ group: { parentId }, grid: null });
        return false;
    }

    function onEditGroupClick(g) {
        setEditState({ group: g, grid: null });
        return false;
    }

    function onNewGridClick(group) {
        setEditState({ group: null, grid: newGridObject(group.id) });
        return false;
    }

    function onEditGridClick(event, grid) {
        event.preventDefault();
        if (grid.dataColumns) {
            setEditState({ group: null, grid });
            return;
        }
        gridBuilderApi
            .getGrid(grid.id)
            .then((x) => setEditState({ group: null, grid: x }))
            .catch(notify.error);
    }

    useEffect(() => {
        if (!groups && account.isConnected()) {
            gridBuilderApi.getGroups().then((x) => {
                setGroups(x.groups);
                setGrids(x.grids);
            });
        }
    }, [groups, account]);

    useShell().setApp(<T>data-grid-builder</T>, null);

    //
    function RenderGroups(parentId) {
        if (!groups || !grids) return null;
        return groups
            .filter((x) => x.parentId === parentId)
            .sort((a, b) => (a.title === b.title ? 0 : a.title > b.title ? 1 : -1))
            .map((g) => (
                <React.Fragment key={g.id}>
                    <bd.ListItem
                        key={g.id}
                        primary={
                            <div
                                className="text-link"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditGroupClick(g);
                                }}
                            >
                                {g.title}
                            </div>
                        }
                        icon={<icons.Folder />}
                        selected={g.id === editState.group?.id}
                        expanded
                    >
                        {RenderGroups(g.id)}

                        {grids
                            .filter((x) => x.groupId === g.id)
                            .map((t) => (
                                <bd.ListItem
                                    key={t.id}
                                    primary={t.title}
                                    onClick={(e) => onEditGridClick(e, t)}
                                    icon={<icons.TableView />}
                                    selected={t.id === editState.grid?.id}
                                />
                            ))}
                        <bd.ListItem
                            primary={<T>new-grid</T>}
                            icon={<icons.Add />}
                            className="bg-transparent text-secondary"
                            onClick={() => onNewGridClick(g)}
                        />
                        <bd.ListItem
                            primary={<T>new-folder</T>}
                            icon={<icons.Add />}
                            className="bg-transparent text-secondary"
                            onClick={() => onNewGroupClick(g.id)}
                        />
                    </bd.ListItem>

                    {!parentId && <bd.ListDivider />}
                </React.Fragment>
            ));
    }

    return (
        <>
            <div className="container-fluid h-100">
                <div className="row h-100 h-100">
                    <bd.List
                        variant="menu"
                        compact
                        className={classNames(
                            "border-start border-end rounded-0 nano-scroll mb-0 bg-default size-sm h-100 col-12 col-lg-3",
                            {
                                "d-none d-lg-block": editState.group || editState.grid,
                            }
                        )}
                        style={{ maxWidth: 350 }}
                        // header={
                        //     <div className="bg-default border-bottom px-3 py-2 mb-2">
                        //         <input
                        //             className="form-control bd-compact compact"
                        //             data-code="search..."
                        //             placeholder={translate("search...")}
                        //         />
                        //     </div>
                        // }
                    >
                        {RenderGroups(null)}

                        <bd.ListItem
                            primary={<T>new-section</T>}
                            icon={<icons.Add />}
                            className="text-secondary"
                            onClick={() => onNewGroupClick(null)}
                        />
                    </bd.List>

                    <div className="nano-scroll h-100 col overflow-auto p-0 border-end">
                        {!editState.group && !editState.grid && (
                            <div className="middle h-100 text-secondary-text" style={{ opacity: 0.5 }}>
                                <div>
                                    <div className="size-xl border-bottom mb-3">DATA GRID BUILDER</div>
                                    <ul>
                                        <li>Table personalization</li>
                                        <li>Variant management</li>
                                        <li>Export to Microsoft Excel</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {editState.group && (
                            <GridBuilderEditGroup
                                onGoBack={goBack}
                                group={editState.group}
                                onChanged={(item, original) => {
                                    let new_list;
                                    if (!item) new_list = groups.filter((x) => x.id !== original.id);
                                    else if (!original.id) new_list = [...groups, item];
                                    else new_list = groups.map((x) => (x.id !== original.id ? x : item));
                                    //goBack();
                                    setGroups(new_list);
                                }}
                            />
                        )}

                        {editState.grid && (
                            <GridBuilderEditGrid
                                onGoBack={goBack}
                                table={editState.grid}
                                onChanged={(item, original) => {
                                    let new_list;
                                    if (!item) new_list = grids.filter((x) => x.id !== original.id);
                                    else if (!original.id) new_list = [...grids, item];
                                    else new_list = grids.map((x) => (x.id !== original.id ? x : item));
                                    //goBack();
                                    setGrids(new_list);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

GridBuilderApp.Appbar = {
    title: "grid-builder",
    buttons: null,
};
