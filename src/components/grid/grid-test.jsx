import React, { useState } from "react";
import { gridsApi } from "../../api/grids-api";
import { useShell } from "../../views/shared/use-shell";
import { notify } from "../basic/notify";
import { Grid } from "./grid";

export const GridTest = () => {
    const [data, setData] = useState([{ id: 101 }, { id: 102 }, { id: 103 }, { id: 104 }, { id: 105 }, { id: 106 }]);
    const id = "tmp.Projects";

    useShell().fullWidth(true);

    return (
        <>
            <Grid
                id="tmp.Projects"
                grid={{}}
                data={data}
                onExecuteFilter={(filters, api) => {
                    return;
                    gridsApi
                        .browseGrid(id, filters)
                        .then((x) => {
                            api.state.selectedRowIds = {};
                            setData(x.data);
                        })
                        .catch((ex) => {
                            notify.error(ex);
                        });
                }}
            />
        </>
    );
};
