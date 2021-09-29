import React, { useContext, useEffect, useState } from "react";
import * as bs from "react-basic-design";
import accountManager from "../../app/account-manager";
import settings from "../../app/settings";
import { ThemeContext } from "../../app/theme-context";
import SvgHome from "../../assets/icons/Home";
import SvgNotificationsActive from "../../assets/icons/NotificationsActive";
import SvgDarkMode from "../../assets/icons/DarkMode";
import SvgAccountCircle from "../../assets/icons/AccountCircle";

export function MainLayout({ component: Comp, ...props }) {
    const [, setUser] = useState({});
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(() => accountManager.bind(setUser).remove, []);

    function logout() {
        accountManager.logout();
        window.location = "/login";
        return false;
    }

    function toggleDarkMode() {
        if (theme && theme.indexOf("dark") >= 0) setTheme("mui-light");
        else setTheme("mui-dark");
    }

    const menuUser = (
        <bs.Menu className="mt-n4 shadow-5">
            <bs.MenuItem>User Profige</bs.MenuItem>
            <div className="dropdown-divider"></div>
            <bs.MenuItem>Settings</bs.MenuItem>
            <bs.MenuItem onClick={logout}>Logout</bs.MenuItem>
        </bs.Menu>
    );

    return (
        <div className="d-flex flex-column h-100">
            <bs.AppBar color="inherit" shadow={0} className="border-bottom">
                <div className="container">
                    <bs.Toolbar>
                        <bs.Button variant="icon" color="default" href="/home">
                            <SvgHome style={{ fontSize: "1.65rem" }} />
                        </bs.Button>

                        <h5 className="appbar-title">{settings.title}</h5>

                        {Comp.Appbar}
                        <bs.Badge value={2} overlapCircle className="bg-warning text-dark d-none d-sm-flex">
                            <bs.Button variant="icon" color="default" className="d-none d-sm-block">
                                <SvgNotificationsActive />
                            </bs.Button>
                        </bs.Badge>

                        <bs.Button variant="icon" color="default" onClick={toggleDarkMode} className="d-none d-md-block">
                            <SvgDarkMode />
                        </bs.Button>

                        <bs.Button variant="icon" color="default" menu={menuUser} edge="end" className="d-none d-sm-block">
                            <SvgAccountCircle />
                        </bs.Button>
                    </bs.Toolbar>
                </div>
            </bs.AppBar>

            <main className="content flex-grow-1">
                <Comp {...props} />
            </main>
        </div>
    );
}
