import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import { useTranslation } from "react-i18next";
import { useAccount } from "../../../app/account-context";
import { Tile, Tiles } from "../../../components/tilemenu/tiles";
import { tablesApi } from "../../../api/tables-api";
import { notify } from "../../../components/basic/notify";
import { BrowseTable } from "./browse-base-table";
import { Text } from "../../../components/basic/text";
import * as icons from "../../../assets/icons";
import { msgbox } from "react-basic-design";

export function TablesApp({ shell }) {
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
        tablesApi
            .browseTable(tb.name)
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

    useEffect(() => shell.setApp("basic-tables"));

    useEffect(() => {
        if (!groups && account.isConnected()) {
            tablesApi.getGroups().then((x) => setGroups(x));
        }
    }, [groups, account]);

    return (
        <>
            {!table && (
                <>
                    <div className="border-bottom bg-gray-5 mb-3">
                        <bd.Toolbar className="container">
                            <h5 className="text-secondary-text">{t("select-a-table...")}</h5>
                        </bd.Toolbar>
                    </div>
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

            {table && <BrowseTable table={table} onGoBack={() => setTable(null)} shell={shell} />}
        </>
    );
}

TablesApp.Appbar = {
    title: "basic-tables",
    buttons: null,
};
