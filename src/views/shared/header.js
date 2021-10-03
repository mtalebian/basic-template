import React, { useEffect, useState, useContext } from "react";
//import { Dropdown } from "react-bootstrap";

import settings from "../../app/settings";
import accountManager from "../../app/account-manager";
//import { messages } from "../../components/messages";
import * as bs from "react-basic-design";
import { ThemeContext } from "../../app/theme-context";
import { useTranslation } from "react-i18next";

export const Header = ({ onToggle, onCollapse, ...props }) => {
    const { t } = useTranslation();
    const [, setUser] = useState({});
    const [theme, setTheme] = useContext(ThemeContext);

    const onToggleClick = () => {
        onToggle();
        //onCollapse();
    };

    useEffect(() => accountManager.bind(setUser).remove, []);

    function logout() {
        accountManager.logout();
        window.location = "/login";
        return false;
    }

    function toggleDarkMode() {
        if (theme && theme.indexOf("dark") >= 0) setTheme("bd-light");
        else setTheme("bd-dark");
    }

    const menuUser = (
        <bs.Menu className="mt-n4 shadow-5">
            <bs.MenuItem>{t("User Profile")}</bs.MenuItem>
            <div className="dropdown-divider"></div>
            <bs.MenuItem>Settings</bs.MenuItem>
            <bs.MenuItem onClick={logout}>Logout</bs.MenuItem>
        </bs.Menu>
    );

    return (
        <>
            <bs.AppBar color="inherit" shadow={0}>
                <bs.Toolbar>
                    <bs.Button variant="icon" color="inherit" edge="start" onClick={onToggleClick} className="d-lg-none">
                        <SvgMenu />
                    </bs.Button>

                    <h5 className="appbar-title">{settings.title}</h5>

                    <bs.Button variant="icon" color="inherit">
                        <SvgSearch />
                    </bs.Button>

                    <bs.Badge value={2} overlapCircle className="bg-warning text-dark">
                        <bs.Button variant="icon" color="inherit">
                            <SvgNotificationsActive />
                        </bs.Button>
                    </bs.Badge>

                    <bs.Button variant="icon" color="inherit" onClick={toggleDarkMode}>
                        <SvgDarkMode />
                    </bs.Button>

                    <bs.Button variant="icon" color="inherit" menu={menuUser} edge="end">
                        <SvgAccountCircle />
                    </bs.Button>
                </bs.Toolbar>
            </bs.AppBar>
        </>
    );
};

export default Header;
