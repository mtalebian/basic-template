import { useEffect, useRef, useState } from "react";
import { gridsApi } from "../../api/grids-api";
import { notify } from "../basic/notify";

export const useGrid = (id, data) => {
    const cache = useRef({});
    const [grid, setGrid] = useState({ data, columns: [] });

    const getColumns = (schema) => {
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

    //----------
    useEffect(() => {
        if (!id) return;
        const g = cache.current[id];
        if (g) {
            if (data) g.data = data;
            else if (!g.data) g.data = [];
            setGrid(g);
            return;
        }
        let cancelRequest = false;

        gridsApi
            .getGrid(id)
            .then((x) => {
                x.data = data;
                x["columns"] = getColumns(x);
                x["getDefaultVariant"] = defaultVariantThunk(x);
                cache.current[id] = x;
                if (!cancelRequest) setGrid(x);
            })
            .catch(notify.error);

        return () => (cancelRequest = true);
    }, [id, data]);

    //----------
    const loadData = ({ filters, parameters }) => {
        gridsApi
            .getGridData(id, filters, parameters)
            .then((x) => {
                var g = cache.current[id];
                g.data = x;
                setGrid(g);
            })
            .catch(notify.error);
    };

    return [grid, loadData];
};

////////////////////
const defaultVariantThunk = (grid) => {
    return () => {
        if (!grid.variants) return null;
        for (let i = 0; i < grid.variants.length; i++) {
            const v = grid.variants[i];
            if (v.isDefault) return v;
        }
        return null;
    };
};
