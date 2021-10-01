import React, { useContext, useEffect, useState } from "react";
import * as bs from "react-basic-design";

//import { messages } from "../../../components/messages";
import * as icons from "../../../assets/icons";
import accountManager from "../../../app/account-manager";
import { menuHelper, TileMenu } from "../../../components/tilemenu";
import { ThemeContext } from "../../../app/theme-context";
import { menuApi } from "../../../api/menu-api";
import { notify } from "../../../components/basic/notify";

export function LunchpadApp() {
    const [menuFolders, setMenuFolders] = useState([]);
    const [menus, setMenus] = useState([]);
    const [user] = useState({});
    const [activeItem, setActiveItem] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [theme] = useContext(ThemeContext);
    //const is_dark = true;
    const is_dark = theme !== "mui-light";

    //useEffect(() => accountManager.bind(setUser).remove, []);

    useEffect(
        () =>
            accountManager.status.onConnected(function () {
                menuApi
                    .myMenu()
                    .then((x) => {
                        setMenuFolders(x.menuFolders);
                        setMenus(x.menus);
                    })
                    .catch((ex) => notify(ex));
            }).remove,
        []
    );

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
                light={!is_dark}
                dark={is_dark}
            />
        </div>
    );
}

LunchpadApp.Appbar = {
    title: "Ikco Lunchpad",
    buttons: (
        <>
            <bs.Button variant="icon" color="default">
                <icons.Search />
            </bs.Button>
        </>
    ),
};
