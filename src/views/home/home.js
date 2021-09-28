import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../app/theme-context";
import accountManager from "../../app/account-manager";
import { TileMenu, menuHelper } from "../../components/tilemenu";
import * as bs from "react-basic-design";

import procurement from "../../assets/bg/procurement.png";
import { Tab, Tabs } from "react-bootstrap";
import { messages } from "../../components/messages";

export default function Home() {
    const [user, setUser] = useState({});
    const [activeItem, setActiveItem] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [theme] = useContext(ThemeContext);
    //const is_dark = true;
    const is_dark = theme !== "mui-light";

    useEffect(() => accountManager.bind(setUser).remove, []);

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
        <div>
            <div>
                <Tabs defaultActiveKey="home" className="mb-3 main-tab">
                    <Tab eventKey="home" title={messages.Home}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <bs.Card>
                                        <bs.CardBody>
                                            <div className="d-flex p-3">
                                                <img
                                                    alt=""
                                                    src={procurement}
                                                    style={{
                                                        maxWidth: 200,
                                                    }}
                                                />
                                                <div className="flex-grow-1 p-3">
                                                    <h2>{messages.Welcome}</h2>
                                                    <p>{messages.WelcomeText}</p>
                                                </div>
                                            </div>
                                        </bs.CardBody>
                                    </bs.Card>
                                    <div className="row my-3">
                                        <div className="col-4">
                                            <bs.Card>
                                                <bs.CardBody>INBOX</bs.CardBody>
                                            </bs.Card>
                                        </div>
                                        <div className="col-4">
                                            <bs.Card>
                                                <bs.CardBody>ORDEERS</bs.CardBody>
                                            </bs.Card>
                                        </div>
                                        <div className="col-4">
                                            <bs.Card>
                                                <bs.CardBody>ORDEERS</bs.CardBody>
                                            </bs.Card>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4"></div>
                            </div>
                        </div>
                    </Tab>

                    <Tab eventKey="inbox" title={messages.Inbox}>
                        INBOX
                    </Tab>

                    <Tab eventKey="sys-menu" title={messages.SysMenu} className="m-3">
                        <bs.Card>
                            <bs.CardBody>
                                <TileMenu
                                    folders={user.menuFolders}
                                    menus={user.menus}
                                    onSelect={onSelectMenu}
                                    selectedFolder={selectedFolder}
                                    selectedMenu={selectedMenu}
                                    activeItem={activeItem}
                                    light={!is_dark}
                                    dark={is_dark}
                                    style={{ maxWidth: 500 }}
                                />
                            </bs.CardBody>
                        </bs.Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
