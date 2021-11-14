import React from "react";
import { Grid } from "./grid";
import { useGrid } from "./use-grid";

export const GridTest = () => {
    const data = [
        { Id: 1, Title: "One" },
        { Id: 2, Title: "Tow" },
    ];

    const [grid, loadData] = useGrid("tmp.Projects", data);

    //useShell().fullWidth(true);

    return (
        <>
            {grid.id && (
                <Grid
                    //id={"tmp.Projects"}
                    //data={data}
                    grid={grid}
                    loadData={loadData}
                    onExecuteFilter={(filters, api) => {
                        return;
                        // gridsApi
                        //     .browseGrid(id, filters)
                        //     .then((x) => {
                        //         api.state.selectedRowIds = {};
                        //         setData(x.data);
                        //     })
                        //     .catch((ex) => {
                        //         notify.error(ex);
                        //     });
                    }}
                />
            )}
        </>
    );
};
