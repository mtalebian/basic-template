import React, { useContext, useEffect, useState } from "react";
import * as bd from "react-basic-design";
import accountManager from "../../app/account-manager";
import settings from "../../app/settings";
import { ThemeContext } from "../../app/theme-context";
import * as icons from "../../assets/icons";

export function MainLayout({ component: Comp, ...props }) {
    const [, setUser] = useState({});

    useEffect(() => accountManager.bind(setUser).remove, []);

    function logout() {
        accountManager.logout();
        window.location = "/login";
        return false;
    }

    const toggleDarkMode = () => bd.helper.setTheme(!bd.helper.isDarkMode() ? "mui-dark" : "mui-light");
    const toggleRTL = () => bd.helper.setRTL(!bd.helper.getRTL());

    const menuUser = (
        <bd.Menu className="mt-n4 shadow-5">
            <bd.MenuItem>User Profige</bd.MenuItem>
            <div className="dropdown-divider"></div>
            <bd.MenuItem onClick={toggleDarkMode}>Toggle Dark Mode</bd.MenuItem>
            <bd.MenuItem onClick={toggleRTL}>Toggle RTL Mode</bd.MenuItem>
            <div className="dropdown-divider"></div>
            <bd.MenuItem>Settings</bd.MenuItem>
            <bd.MenuItem onClick={logout}>Logout</bd.MenuItem>
        </bd.Menu>
    );

    return (
        <div className="d-flex flex-column h-100">
            <bd.AppBar color="inherit" shadow={0} className="border-bottom bg-shade-5">
                <div className="container">
                    <bd.Toolbar>
                        <bd.Button variant="icon" color="default" href="/home">
                            <icons.Home style={{ fontSize: "1.65rem" }} />
                        </bd.Button>

                        <div>
                            <img src="/images/logo/header-logo.png" alt="logo" height={31} />
                        </div>
                        <h5 className="appbar-title">{settings.title}</h5>

                        {Comp.Appbar}
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
