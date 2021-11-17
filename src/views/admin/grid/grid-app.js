import React from "react";
import { useShell } from "../../shared/use-shell";
import { Grid } from "../../../components/grid/grid";
import { useGrid } from "../../../components/grid/use-grid";
import { useQuery } from "../../../components/basic/use-query";

export function GridApp() {
    const query = useQuery();
    const shell = useShell();
    const [grid, loadData] = useGrid({ id: query.get("id") });

    shell.setApp("maintain-table", null);

    return <>{grid.id && <Grid grid={grid} loadData={loadData} />}</>;
}
