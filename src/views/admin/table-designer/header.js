import React from "react";

import * as bs from "react-basic-design";
import * as icons from "../../../assets/icons";

//
export function TableDesignerHeader({ group, table, column, onGoBack, onAddGroupClicked }) {
    var editMode = group || table || column;
    let title = "Table Designer";
    if (column) {
        title = column.id ? `Edit Column '${column.name}'` : "New Column";
    } else if (table) {
        title = table.name ? (
            <>
                Edit Table: <span className="text-secondary">{table.name}</span>
            </>
        ) : (
            "New Table"
        );
    } else if (group) {
        title = group.id ? `Edit Group '${group.title}'` : "New Group";
    }

    return (
        <bs.AppBar shadow={0} className="border-bottom">
            <div className="container">
                <bs.Toolbar>
                    {editMode && (
                        <bs.Button variant="icon" onClick={onGoBack} size="md">
                            <icons.ArrowBackIos />
                        </bs.Button>
                    )}
                    <h5 className="appbar-title">{title}</h5>
                    {!editMode && (
                        <bs.Button variant="icon" onClick={onAddGroupClicked}>
                            <icons.Folder />
                        </bs.Button>
                    )}
                </bs.Toolbar>
            </div>
        </bs.AppBar>
    );
}
