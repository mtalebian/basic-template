import React, { useContext, useEffect, useState } from "react";
import * as bs from "react-basic-design";

//import { messages } from "../../../components/messages";
import * as icons from "../../../assets/icons";
import accountManager from "../../../app/account-manager";
import { menuHelper, TileMenu } from "../../../components/tilemenu";
import { menuApi } from "../../../api/menu-api";
import { notify } from "../../../components/basic/notify";
import { AccountContext } from "../../../app/account-context";

export function LunchpadApp() {
    const account = useContext(AccountContext);
    const [menuFolders, setMenuFolders] = useState([]);
    const [menus, setMenus] = useState([]);
    const [user] = useState({});
    const [activeItem, setActiveItem] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);

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
            <TileMenu
                folders={menuFolders}
                menus={menus}
                onSelect={onSelectMenu}
                selectedFolder={selectedFolder}
                selectedMenu={selectedMenu}
                activeItem={activeItem}
            />
        </div>
    );
}

LunchpadApp.Appbar = {
    title: "",
    buttons: (
        <>
            <bs.Button variant="icon" color="default">
                <icons.Search />
            </bs.Button>
        </>
    ),
};
