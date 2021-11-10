import React, { useCallback, useEffect, useState } from "react";
import { gridsApi } from "../../api/grids-api";
import { notify } from "../basic/notify";
import { ReactGrid } from "./react-grid";

export const Grid = ({ id, data, grid, onExecuteFilter, ...props }) => {
    const [initialized, setInitialized] = useState(false);
    const [schema, setSchema] = useState(null);

    const initialize = useCallback(() => {
        if (initialized) return;
        setInitialized(true);
        if (grid.schema) {
            setSchema(grid.schema);
            return;
        }
        gridsApi
            .getSchema(id)
            .then((x) => {
                grid.schema = x;
                grid.columns = null;
                setSchema(grid.schema);
            })
            .catch((ex) => {
                notify.error(ex);
            });
    }, [grid, id, initialized]);

    useEffect(() => initialize(), [initialize]);

    const getColumns = () => {
        return schema.dataColumns
            .filter((x) => x.showInList)
            .map((x) => ({
                accessor: x.name,
                Header: x.title,
                isPK: x.isPK,
                isNull: x.isNull,
                dataType: x.dataType,
                maxLen: x.maxLen,
                defaultValue: x.defaultValue,
                filter: x.filter,
                readOnly: x.isReadOnly,
                direction: x.direction,
                display: x.display,
                validValues: x.validValues,
                width:
                    x.width > 10
                        ? x.width
                        : x.display === "number"
                        ? 120
                        : x.display === "amount"
                        ? 120
                        : x.display === "check"
                        ? 60
                        : x.display === "switch"
                        ? 80
                        : x.maxLen <= 30
                        ? 150
                        : 250,
            }));
    };

    return <>{schema && <ReactGrid title={schema.title} columns={getColumns()} rows={[]} onExecuteFilter={onExecuteFilter} />}</>;
};
