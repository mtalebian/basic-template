import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import { useAccount } from "../../../app/account-context";
import { gridsApi } from "../../../api/grids-api";
import * as icons from "../../../assets/icons";
import { useShell } from "../../shared/use-shell";
import { useGrid } from "../../../components/grid/use-grid";
import { Grid } from "../../../components/grid/grid";
import classNames from "classnames";

export function GridsApp() {
    const account = useAccount();
    const [groups, setGroups] = useState(null);
    const [grids, setGrids] = useState(null);
    const [selectedGridId, setSelectedGridId] = useState(null);
    const [grid, loadData] = useGrid({ id: selectedGridId });
    const shell = useShell();

    shell.setApp(!selectedGridId ? "maintain-base-tables" : "maintain-table", !selectedGridId ? null : () => setSelectedGridId(null));
    shell.fullWidth(true);

    const onSelectGridClick = (e, grid) => {
        setSelectedGridId(grid.id);
        return false;
    };

    useEffect(() => {
        if (!groups && account.isConnected()) {
            gridsApi.getGroups().then((x) => {
                setGroups(x.groups);
                setGrids(x.grids);
            });
        }
    }, [groups, account]);

    //
    function RenderGroups(parentId) {
        if (!groups || !grids) return null;
        return groups
            .filter((x) => x.parentId === parentId)
            .sort((a, b) => (a.title === b.title ? 0 : a.title > b.title ? 1 : -1))
            .map((g) => (
                <React.Fragment key={g.id}>
                    <bd.ListItem key={g.id} primary={g.title} icon={<icons.Folder />} expanded>
                        {RenderGroups(g.id)}

                        {grids
                            .filter((x) => x.groupId === g.id)
                            .map((t) => (
                                <bd.ListItem
                                    key={t.id}
                                    primary={t.title}
                                    onClick={(e) => onSelectGridClick(e, t)}
                                    icon={<icons.TableView />}
                                    selected={t.id === selectedGridId}
                                />
                            ))}
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
                                "d-none d-lg-block": selectedGridId,
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
                    </bd.List>

                    <div className="nano-scroll h-100 col overflow-auto p-0 border-end">
                        {!selectedGridId && (
                            <div className="middle h-100 text-secondary-text" style={{ opacity: 0.5 }}>
                                <div>
                                    <div className="size-xl border-bottom mb-3">DATA GRID</div>
                                    <ul>
                                        <li>Table personalization</li>
                                        <li>Variant management</li>
                                        <li>Export to Microsoft Excel</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {selectedGridId && grid.id && <Grid grid={grid} loadData={loadData} />}
                    </div>
                </div>
            </div>
        </>
    );
}
