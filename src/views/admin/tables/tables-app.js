import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { useTranslation } from "react-i18next";
import { useAccount } from "../../../app/account-context";
import { Tile, Tiles } from "../../../components/tilemenu/tiles";
import { tablesApi } from "../../../api/tables-api";
import { notify } from "../../../components/basic/notify";
import { BrowseTable } from "./browse-base-table";
import { Text } from "../../../components/basic/text";
import { msgbox } from "react-basic-design";
import { FilterRow } from "../../../components/table/filter-row";
import { FilterBox } from "../../../components/table/filter-box";
import * as bd2 from "../../../components/forms";

export function TablesApp() {
    const account = useAccount();
    const { t } = useTranslation();
    const [groups, setGroups] = useState(null);
    const [loadingTable, setLoadingTable] = useState(null);
    const [table, setTable] = useState(null);

    const onTableClick = (tb) => {
        if (loadingTable) {
            msgbox(<Text>system-is-busy-please-wait</Text>, null, t("close"));
            return;
        }
        if (tb.schema) {
            setTable(tb);
            return;
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
    };

    useEffect(() => {
        if (!groups && account.isConnected()) {
            tablesApi.getGroups().then((x) => setGroups(x));
        }
    }, [groups, account]);

    return (
        <>
            <bd2.Form className="mx-3 mt-2">
                <bd2.FormInput label="جستجو" icon={<icons.Edit />} btnIcon={<icons.Search />} />
                <bd2.FormInput label="سال مالی" model={2016} btnIcon={<icons.Add />} />
                <bd2.FormInput label="Currency" model={"Dollar"} btnIcon={<icons.Home />} />
                <bd2.FormInput label="Customer" model={"IKCO"} btnIcon={<icons.ArrowDownward />} />
                <bd2.FormInput label="Document Date" />
                <bd2.FormInput label="Count" />
                <div className="text-end">
                    <bd.Button size="md" color="primary" className="m-e-2">
                        Go
                    </bd.Button>
                    <bd.Button size="md" variant="outline" color="primary">
                        Reset
                    </bd.Button>
                </div>
            </bd2.Form>

            <hr />
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
                                                    title={t.title}
                                                    icon={
                                                        loadingTable === t && <div className="m-e-2 spinner-border spinner-border-sm"></div>
                                                    }
                                                    onClick={(e) => onTableClick(t)}
                                                />
                                            ))}
                                        </Tile>
                                    ))}
                        </Tiles>
                    </div>
                </>
            )}

            {table && <BrowseTable table={table} onGoBack={() => setTable(null)} />}
        </>
    );
}

TablesApp.Appbar = {
    title: "basic-tables",
    buttons: null,
};
