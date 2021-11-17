import React, { useEffect, useState } from "react";
import { useAccount } from "../../../app/account-context";
import { Tile, Tiles } from "../../../components/tilemenu/tiles";
import { gridsApi } from "../../../api/grids-api";
import { notify } from "../../../components/basic/notify";
import { BrowseTable } from "./browse-base-table";
import { Text } from "../../../components/basic/text";
import * as icons from "../../../assets/icons";
import { useShell } from "../../shared/use-shell";
import { useGrid } from "../../../components/grid/use-grid";
import { Grid } from "../../../components/grid/grid";

export function GridsApp() {
    const account = useAccount();
    const [groups, setGroups] = useState(null);
    const [loadingTable, setLoadingTable] = useState(null);
    const [table, setTable] = useState(null);
    const [selectedGridId, setSelectedGridId] = useState(null);
    const [grid, loadData] = useGrid({ id: selectedGridId });
    const shell = useShell();

    //useShell().fullWidth(true);

    const onTableClick = (grid) => {
        setSelectedGridId(grid.id);
        return false;
    };

    shell.setApp(!selectedGridId ? "maintain-base-tables" : "maintain-table", !selectedGridId ? null : () => setSelectedGridId(null));

    useEffect(() => {
        if (!groups && account.isConnected()) {
            gridsApi.getGroups().then((x) => setGroups(x));
        }
    }, [groups, account]);

    return (
        <>
            {!selectedGridId && (
                <div className="container">
                    <Tiles>
                        {groups &&
                            groups
                                .sort((a, b) => (a.title === b.title ? 0 : a.title > b.title ? 1 : -1))
                                .map((g) => (
                                    <Tile key={g.id} title={g.title}>
                                        {g.items.map((t) => (
                                            <Tile
                                                key={t.id}
                                                title={
                                                    <a href="#/" onClick={(e) => onTableClick(t)}>
                                                        {t.title}
                                                    </a>
                                                }
                                                icon={<icons.TableView />}
                                                isBusy={t === loadingTable}
                                            />
                                        ))}
                                    </Tile>
                                ))}
                    </Tiles>
                </div>
            )}

            {selectedGridId && grid.id && <Grid grid={grid} loadData={loadData} />}
        </>
    );
}
