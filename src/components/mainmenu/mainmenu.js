import classNames from "classnames";
import React from "react";
import { SlideDown } from "react-slidedown";

import "./index.scss";
import * as icons from "../../assets/icons";

export default function MainMenu({ folders, menus, parent, onSelect, selectedFolder, selectedMenu, activeItem, light, dark, ...props }) {
    const parentId = !parent ? null : parent.id;

    if (!folders) folders = [];
    if (!menus) menus = [];
    if (folders.length === 0 && menus.length === 0) return <></>;

    var cn = null;
    if (!parentId) {
        cn = classNames("mainmenu", {
            "mainmenu-light": light,
            "mainmenu-dark": dark,
        });
    }

    return (
        <>
            <ul className={cn} {...props}>
                {folders
                    .filter((x) => x.parentId === parentId)
                    .map((f) => (
                        <MenuFolder
                            key={f.id}
                            folders={folders}
                            menus={menus}
                            folder={f}
                            onSelect={onSelect}
                            selectedFolder={selectedFolder}
                            selectedMenu={selectedMenu}
                            activeItem={activeItem}
                        />
                    ))}
                {menus
                    .filter((x) => x.parentId === parentId)
                    .map((mi) => (
                        <MenuItem
                            key={mi.id}
                            menu={mi}
                            onSelect={onSelect}
                            selectedFolder={selectedFolder}
                            selectedMenu={selectedMenu}
                            activeItem={activeItem}
                        />
                    ))}
            </ul>
        </>
    );
}

function MenuFolder({ folders, menus, folder, onSelect, selectedFolder, selectedMenu, activeItem }) {
    var is_open = menuHelper.isOpen({
        folder,
        folders,
        menus,
        selectedFolder,
        selectedMenu,
    });
    return (
        <li className="mi-folder">
            <div className="mi-item">
                <a
                    href="#/"
                    onClick={(e) => {
                        onSelect(folder, null);
                        return false;
                    }}
                    className={classNames({
                        "mi-selected": selectedFolder && selectedFolder.id === folder.id,
                        "mi-active": activeItem && activeItem.id === folder.id,
                        "mi-open": is_open,
                    })}
                >
                    {!!folder.parentId && (
                        <i>
                            <menuHelper.FolderIcon />
                        </i>
                    )}
                    <span className="mi-text">{folder.title}</span>
                    {!!folder.parentId && (
                        <b>
                            <menuHelper.CaretIcon />
                        </b>
                    )}
                </a>
            </div>
            <SlideDown closed={!is_open}>
                <MainMenu
                    folders={folders}
                    menus={menus}
                    parent={folder}
                    onSelect={onSelect}
                    selectedFolder={selectedFolder}
                    selectedMenu={selectedMenu}
                    activeItem={activeItem}
                />
            </SlideDown>
        </li>
    );
}

function MenuItem({ menu, onSelect, selectedMenu, activeItem }) {
    return (
        <li className="mi-menu">
            <div className="mi-item">
                <a
                    href="#/"
                    onClick={(e) => {
                        onSelect(null, menu);
                        return false;
                    }}
                    className={classNames({
                        "mi-selected": selectedMenu && selectedMenu.id === menu.id,
                        "mi-active": activeItem && activeItem.id === menu.id,
                    })}
                >
                    <i>
                        <menuHelper.MenuIcon />
                    </i>
                    <span className="mi-text">{menu.title}</span>
                    {!!menu.badgeText && <span className={classNames("mi-more", menu.badgeCss)}> {menu.badgeText}</span>}
                </a>
            </div>
        </li>
    );
}

export const menuHelper = {
    iconSize: 18,
    FolderIcon: () => <icons.Folder width={menuHelper.iconSize} height={menuHelper.iconSize} />,
    CaretIcon: () => <icons.ChevronLeft width={menuHelper.iconSize} height={menuHelper.iconSize} />,
    MenuIcon: () => <icons.Adjust width={menuHelper.iconSize * 0.6} height={menuHelper.iconSize * 0.6} />,

    isOpen: ({ folder, folders, menus, selectedFolder, selectedMenu }) => {
        if (!folder) return false;
        if (!folder.parentId || folder === selectedFolder || (!!selectedMenu && folder.id === selectedMenu.parentId)) return true;
        var subFolders = folders.filter((x) => x.parentId === folder.id);
        for (var i = 0; i < subFolders.length; i++) {
            var f = subFolders[i];
            if (
                menuHelper.isOpen({
                    folder: f,
                    folders,
                    menus,
                    selectedFolder,
                    selectedMenu,
                })
            )
                return true;
        }
        return false;
    },
};
