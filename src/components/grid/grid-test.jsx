import React from "react";
import { Grid } from "./grid";
import { useGrid } from "./use-grid";

export const GridTest = () => {
    const [grid, loadData] = useGrid({ id: "tmp.AzObjects" });

    //useShell().fullWidth(true);

    return <>{grid.id && <Grid grid={grid} loadData={loadData} />}</>;
};
