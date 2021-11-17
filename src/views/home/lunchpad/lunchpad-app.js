import React, { useContext, useEffect, useState } from "react";

import { menuApi } from "../../../api/menu-api";
import { notify } from "../../../components/basic/notify";
import { AccountContext } from "../../../app/account-context";
import { Tile, Tiles } from "../../../components/tilemenu/tiles";

export function LunchpadApp({ shell }) {
    const account = useContext(AccountContext);
    const [menuFolders, setMenuFolders] = useState([]);
    const [menus, setMenus] = useState([]);

    useEffect(() => shell.setApp("home"));

    useEffect(() => {
        if (account.isConnected()) {
            menuApi
                .myMenu()
                .then((x) => {
                    setMenuFolders(x.menuFolders);
                    setMenus(x.menus);
                })
                .catch((ex) => notify(ex));
        }
    }, [account]);

    return (
        <div className="container p-3">
            <Tiles>
                {menuFolders
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((f) => (
                        <Tile key={f.id} title={f.title}>
                            {menus
                                .filter((m) => m.parentId === f.id)
                                .map((m) => (
                                    <Tile key={m.id} title={<a href={m.url}>{m.title}</a>} />
                                ))}
                        </Tile>
                    ))}
            </Tiles>
        </div>
    );
}
