import React, { useState, useEffect } from "react";

import * as bd from "react-basic-design";
//import accountManager from "../../../app/account-manager";

import classNames from "classnames";
import { gridBuilderApi } from "../../../api/grid-builder-api";
import { GridBuilderEditGroup } from "./edit-group";
import { GridBuilderEditTable } from "./edit-grid";
import { notify } from "../../../components/basic/notify";
import { Tile, Tiles } from "../../../components/tilemenu/tiles";
import * as icons from "../../../assets/icons";
import { useAccount } from "../../../app/account-context";
import { Text } from "../../../components/basic/text";
import { useShell } from "../../shared/use-shell";

//
export function GridBuilderApp() {
    const account = useAccount();
    const [groups, setGroups] = useState(null);
    const [group, setGroup] = useState(null);
    const [table, setGrid] = useState(null);
    const newGridObject = { data: { dataColumns: [], flexLayout: false, hasFilterVariant: false, filterable: true } };

    function goBack() {
        if (group) setGroup(null);
        if (table) setGrid(null);
    }

    function onEditGroupClick(g) {
        setGroup(g);
        return false;
    }

    function onNewGridClick(g) {
        setGroup(g);
        setGrid(newGridObject);
        return false;
    }

    function onEditGridClick(event, g, grid) {
        event.preventDefault();
        if (grid.data) {
            setGroup(g);
            setGrid(grid);
            return;
        }
        gridBuilderApi
            .getGrid(grid.id)
            .then((x) => {
                grid.data = x;
                setGroup(g);
                setGrid(grid);
            })
            .catch((ex) => {
                notify.error(ex);
            });
    }

    function onAddGroupClicked() {
        setGroup({ title: "" });
    }

    useEffect(() => {
        if (!groups && account.isConnected()) {
            gridBuilderApi.getGroups().then((x) => setGroups(x));
        }
    }, [groups, account]);

    useShell().setApp(<Text>grid-builder</Text>, null);

    return (
        <>
            <div className="container h-100">
                <div className="row h-100 h-100">
                    <div className="col-3">
                        <bd.List
                            variant="menu"
                            compact={true}
                            className=" nano-scroll mt-20 pt-0 bg-default size-sm"
                            style={{ maxWidth: 400 }}
                            header={<div className="bg-gray-3 p-3">List Header</div>}
                        >
                            <bd.ListItem primary="Header" variant="text" />
                            <bd.ListDivider />
                            <bd.ListItem primary="Disabled" disabled />
                            <bd.ListItem
                                primary="SubMenu 1"
                                icon={<icons.Folder />}
                                expanded
                                controls={
                                    <bd.Button variant="icon" size="sm">
                                        <icons.Edit />
                                    </bd.Button>
                                }
                            >
                                <bd.ListItem primary="SubMenu 2" icon={<icons.Folder />} expanded>
                                    <bd.List>
                                        <bd.ListItem primary="Grid 1" icon={<icons.TableView />} selected />
                                        <bd.ListItem primary="Grid 2" icon={<icons.TableView />} />
                                        <bd.ListItem primary="Grid 2" icon={<icons.TableView />} />
                                        <bd.ListItem primary="Grid 2" icon={<icons.TableView />} />
                                        <bd.ListItem primary="Grid 2" icon={<icons.TableView />} />
                                        <bd.ListItem primary="Grid 2" icon={<icons.TableView />} />
                                        <bd.ListItem primary="Grid 2" icon={<icons.TableView />} />
                                        <bd.ListItem primary="Grid 2" icon={<icons.TableView />} />
                                        <bd.ListItem primary="Grid 2" icon={<icons.TableView />} />
                                    </bd.List>
                                </bd.ListItem>
                            </bd.ListItem>
                            <bd.ListItem
                                primary="New Folder"
                                icon={<icons.Add />}
                                className="text-secondary"
                                onClick={() => alert("add")}
                            />
                        </bd.List>
                    </div>

                    <div className="col-9">
                        <div className={classNames({ "d-none": group || table })}>
                            <div className="container">
                                <Tiles>
                                    {groups &&
                                        groups
                                            .sort((a, b) => (a.title === b.title ? 0 : a.title > b.title ? 1 : -1))
                                            .map((g) => (
                                                <Tile
                                                    key={g.id}
                                                    title={
                                                        <>
                                                            <bd.Button
                                                                variant="text"
                                                                color="primary"
                                                                className="m-s-n2"
                                                                onClick={() => onEditGroupClick(g)}
                                                                disableRipple
                                                            >
                                                                {g.title}
                                                            </bd.Button>
                                                        </>
                                                    }
                                                >
                                                    {g.items.map((t) => (
                                                        <Tile
                                                            key={t.id}
                                                            title={
                                                                <a href="#/" onClick={(e) => onEditGridClick(e, g, t)}>
                                                                    <Text>{t.title}</Text>
                                                                </a>
                                                            }
                                                        />
                                                    ))}
                                                    <Tile
                                                        title={
                                                            <bd.Button
                                                                variant="text"
                                                                size="sm"
                                                                color="secondary "
                                                                onClick={() => onNewGridClick(g)}
                                                                disableRipple
                                                            >
                                                                <icons.Add />
                                                                <Text>new-grid</Text>
                                                            </bd.Button>
                                                        }
                                                        className="bg-transparent"
                                                    />
                                                </Tile>
                                            ))}
                                    <Tile
                                        title={
                                            <bd.Button variant="text" color="secondary" size="sm" onClick={onAddGroupClicked} disableRipple>
                                                <icons.Add />
                                                <Text>add-new-group</Text>
                                            </bd.Button>
                                        }
                                    >
                                        <span></span>
                                    </Tile>
                                </Tiles>
                            </div>
                        </div>

                        {group && !table && (
                            <GridBuilderEditGroup
                                onGoBack={goBack}
                                group={group}
                                onChanged={(g) => {
                                    if (!g) {
                                        var i = groups.indexOf(group);
                                        groups.splice(i, 1);
                                        goBack();
                                        setGroups(groups);
                                        return;
                                    }
                                    for (let i = 0; i < groups.length; i++) {
                                        if (groups[i].id === g.id) {
                                            groups[i] = g;
                                            goBack();
                                            setGroups(groups);
                                            return;
                                        }
                                    }
                                    groups.push(g);
                                    goBack();
                                    setGroups(groups);
                                }}
                            />
                        )}

                        {group && table && (
                            <GridBuilderEditTable
                                onGoBack={goBack}
                                group={group}
                                table={table.data}
                                onChanged={(tb, original, originalGroup) => {
                                    const g = groups.find((x) => x.id === originalGroup.id);
                                    var t = !tb ? null : g.items.find((x) => x.id === tb.id);
                                    if (!tb) {
                                        // removed
                                        g.items = g.items.filter((_grd) => _grd.id !== original.id);
                                    } else if (!original.id) {
                                        // added
                                        g.items.push({
                                            id: tb.id,
                                            title: tb.title,
                                            data: tb,
                                        });
                                    } else {
                                        // modifed
                                        t.title = tb.title;
                                        t.data = tb;
                                    }
                                    goBack();
                                    setGroups(groups);
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
