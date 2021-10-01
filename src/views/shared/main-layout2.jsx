import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import accountManager from "../../app/account-manager";
import settings from "../../app/settings";
import * as icons from "../../assets/icons";

export function MainLayout({ component: Comp, ...props }) {
    const [, setUser] = useState({});

    useEffect(() => accountManager.bind(setUser).remove, []);

    function logout() {
        accountManager.logout();
        window.location = "/login";
        return false;
    }

    const menuUser = (
        <bd.Menu className="mt-n4 shadow-5">
            <bd.MenuItem>User Profige</bd.MenuItem>
            <div className="dropdown-divider"></div>
            <bd.MenuItem href="/user/settings">Settings</bd.MenuItem>
            <bd.MenuItem onClick={logout}>Logout</bd.MenuItem>
        </bd.Menu>
    );

    let title = Comp?.Appbar?.title ?? settings.title;

    return (
        <div className="d-flex flex-column h-100">
            <bd.AppBar color="inherit" shadow={0} className="border-bottom bg-shade-5">
                <div className="container">
                    <bd.Toolbar>
                        {/* <bd.Button variant="icon" color="default" href="/home">
                            <icons.Home style={{ fontSize: "1.65rem" }} />
                        </bd.Button> */}

                        <a href="/home">
                            <img src="/images/logo/header-logo-en.png" alt="logo" height={31} />
                        </a>
                        <h5 className="appbar-title">{title}</h5>

                        {Comp?.Appbar?.buttons}
                        <bd.Badge value={2} overlapCircle className="bg-warning text-dark d-none d-sm-flex">
                            <bd.Button variant="icon" color="default" className="d-none d-sm-block">
                                <icons.NotificationsActive />
                            </bd.Button>
                        </bd.Badge>

                        {/* <bd.Button variant="icon" color="default" onClick={toggleDarkMode} className="d-none d-md-block">
                            <icons.DarkMode />
                        </bd.Button> */}

                        <bd.Button variant="icon" color="default" menu={menuUser} edge="end" className="d-none d-sm-block">
                            <icons.AccountCircle />
                        </bd.Button>
                    </bd.Toolbar>
                </div>
            </bd.AppBar>

            <main className="content flex-grow-1">
                <Comp {...props} />
            </main>
        </div>
    );
}
