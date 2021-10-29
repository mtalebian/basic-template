import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import { useTranslation } from "react-i18next";
import { useAccount } from "../../../app/account-context";
import { Tile, Tiles } from "../../../components/tilemenu/tiles";
import { gridsApi } from "../../../api/grids-api";
import { notify } from "../../../components/basic/notify";
import { BrowseTable } from "./browse-base-table";
import { Text } from "../../../components/basic/text";
import * as icons from "../../../assets/icons";
import { useShell } from "../../shared/use-shell";

export function TablesApp() {
    const account = useAccount();
    const { t } = useTranslation();
    const [groups, setGroups] = useState(null);
    const [loadingTable, setLoadingTable] = useState(null);
    const [table, setTable] = useState(null);

    const onTableClick = (tb) => {
        if (loadingTable) {
            notify.warning(<Text>system-is-busy-please-wait</Text>);
            return false;
        }
        if (tb.schema) {
            setTable(tb);
            return false;
        }
        setLoadingTable(tb);
        gridsApi
            .browseGrid(tb.name)
            .then((x) => {
                tb.data = x.data;
                tb.schema = x.schema;
                setLoadingTable(null);
                setTable(tb);
            })
            .catch((ex) => {
                setLoadingTable(null);
                notify.error(ex);
            });
        return false;
    };

    useShell().setApp("basic-tables", null);

    useEffect(() => {
        if (!groups && account.isConnected()) {
            gridsApi.getGroups().then((x) => setGroups(x));
        }
    }, [groups, account]);

    return (
        <>
            {!table && (
                <>
                    <div className="container">
                        <Tiles>
                            {groups &&
                                groups
                                    .sort((a, b) => (a.title === b.title ? 0 : a.title > b.title ? 1 : -1))
                                    .map((g) => (
                                        <Tile key={g.id} title={g.title}>
                                            {g.items.map((t) => (
                                                <Tile
                                                    key={t.name}
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
                </>
            )}

            {table && (
                <BrowseTable
                    table={table}
                    onGoBack={() => {
                        setTable(null);
                    }}
                />
            )}
        </>
    );
}

TablesApp.Appbar = {
    title: "basic-tables",
    buttons: null,
};
