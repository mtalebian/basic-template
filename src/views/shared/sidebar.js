import React, { useState, useEffect } from "react";
import * as bs from "react-basic-design";
import accountManager from "../../app/account-manager";
import { messages } from "../../components/messages";

const Sidebar = ({ rtl, collapsed, onCollapse, darkSidebar }) => {
    const [user, setUser] = useState({});

    useEffect(() => accountManager.bind(setUser).remove, []);

    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-content pb-3">
                <div className="text-center">
                    <img src="/images/logo/logo192.png" className="w-100 p-2" style={{ maxWidth: 120 }} alt="logo" />
                    <div>{user.displayName}</div>
                </div>

                <div className="divider"></div>

                <ul className="mainmenu mainmenu-dark">
                    <li className="mi-menu">
                        <div className="mi-item">
                            <a href="/home">
                                <i>
                                    <icons.Adjust />
                                </i>
                                <span className="mi-text">{messages.SysMenu}</span>
                            </a>
                        </div>
                    </li>

                    <li className="mi-menu">
                        <div className="mi-item">
                            <a href="/dashboard">
                                <i>
                                    <icons.Adjust />
                                </i>
                                <span className="mi-text">{messages.Dashboard}</span>
                            </a>
                        </div>
                    </li>

                    <li className="mi-menu">
                        <div className="mi-item">
                            <a href="/inbox">
                                <i>
                                    <icons.Adjust />
                                </i>
                                <span className="mi-text">{messages.Inbox}</span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="sidebar-footer"></div>
        </div>
    );
};

export default Sidebar;
