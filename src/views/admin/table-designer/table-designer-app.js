import React, { useState, useEffect } from "react";

import * as bs from "react-basic-design";
import accountManager from "../../../app/account-manager";

import classNames from "classnames";
import { tableDesignerApi } from "../../../api/table-designer-api";
import { TableDesignerEditGroup } from "./edit-group";
import { TableDesignerEditTable } from "./edit-table";
import { TableDesignerHeader } from "./header";
import { notify } from "../../../components/basic/notify";
import { Tile, Tiles } from "../../../components/tilemenu/tiles";
import * as icons from "../../../assets/icons";

//
export function TableDesignerApp() {
    const [groups, setGroups] = useState(null);
    const [group, setGroup0] = useState(null);
    const [table, setTable] = useState(null);
    const [column, setColumn] = useState(null);

    function setGroup(v) {
        setGroup0(v);
    }

    function goBack() {
        if (column) {
            setColumn(null);
            return;
        }
        if (group) setGroup(null);
        if (table) setTable(null);
    }

    function onEditGroupClick(g) {
        setGroup(g);
        return false;
    }

    function onAddFormClick(g) {
        setGroup(g);
        setTable({ columns: [] });
        return false;
    }

    function onEditTableClick(g, t) {
        if (t.data) {
            setGroup(g);
            setTable(t);
            return false;
        }
        tableDesignerApi
            .getTable(t.name)
            .then((x) => {
                t.data = x.table;
                t.columns = x.columns;
                setGroup(g);
                setTable(t);
            })
            .catch((ex) => {
                notify.error(ex);
            });
        return false;
    }

    function onAddGroupClicked() {
        setGroup({});
        return false;
    }

    useEffect(() => {
        return accountManager.status.onConnected(function () {
            if (!groups) tableDesignerApi.getGroups().then((x) => setGroups(x));
        }).remove;
    }, []);

    return (
        <>
            <TableDesignerHeader group={group} table={table} column={column} onGoBack={goBack} onAddGroupClicked={onAddGroupClicked} />

            <div
                className={classNames("container", {
                    "d-none": group || table,
                })}
            >
                <Tiles>
                    {groups &&
                        groups
                            .sort((a, b) => (a.title === b.title ? 0 : a.title > b.title ? 1 : -1))
                            .map((g) => (
                                <Tile
                                    key={g.id}
                                    title={
                                        <>
                                            <span className="size-md"> {g.title}</span>
                                            <bs.Button
                                                variant="text"
                                                size="sm"
                                                className="mx-2"
                                                color="secondary"
                                                onClick={() => onEditGroupClick(g)}
                                            >
                                                <icons.Edit />
                                                Edit Group
                                            </bs.Button>
                                            <bs.Button variant="text" size="sm" color="secondary" onClick={() => onAddFormClick(g)}>
                                                <icons.Add />
                                                New table
                                            </bs.Button>
                                        </>
                                    }
                                >
                                    {g.items.map((t) => (
                                        <Tile key={t} title={t.title} onClick={() => onEditTableClick(g, t)} />
                                    ))}
                                </Tile>
                            ))}
                </Tiles>
            </div>

            {group && !table && !column && (
                <TableDesignerEditGroup
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

            {group && table && !column && (
                <TableDesignerEditTable
                    group={group}
                    table={table}
                    onChanged={(tb) => {
                        var g = groups.find((x) => x.id === group.id);
                        var t = g.items.find((x) => x.name === table.name);
                        if (!tb) {
                            // removed
                            g.items = g.items.filter((x) => x !== t);
                        } else if (!t) {
                            // added
                            g.items.push({
                                name: tb.name,
                                title: tb.title,
                                table: tb,
                            });
                        } else {
                            // modifed
                            g.title = tb.title;
                        }
                        goBack();
                        setGroups(groups);
                    }}
                />
            )}
        </>
    );
}
