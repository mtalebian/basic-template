import React, { useContext, useEffect, useState } from "react";

import { menuHelper, TileMenu } from "../../../components/tilemenu";
import { menuApi } from "../../../api/menu-api";
import { notify } from "../../../components/basic/notify";
import { AccountContext } from "../../../app/account-context";
import { Tile, Tiles } from "../../../components/tilemenu/tiles";

export function LunchpadApp({ shell }) {
    const account = useContext(AccountContext);
    const [menuFolders, setMenuFolders] = useState([]);
    const [menus, setMenus] = useState([]);
    const [user] = useState({});
    const [activeItem, setActiveItem] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);

    console.log("LunchpadApp");
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

    const onSelectMenu = (folder, menu) => {
        if (
            menuHelper.isOpen({
                folder,
                folders: user.menuFolders,
                menus: user.menus,
                selectedFolder,
                selectedMenu,
            })
        ) {
            folder = folder.parentId == null ? null : user.menuFolders.find((x) => x.id === folder.parentId);
        }
        setSelectedFolder(folder);
        setSelectedMenu(menu);
        if (menu) {
            setActiveItem(menu);
            window.location.href = menu.url;
        }
    };

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
