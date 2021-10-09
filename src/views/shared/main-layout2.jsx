import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import accountManager from "../../app/account-manager";
import settings from "../../app/settings";
import * as icons from "../../assets/icons";
import { useAccount } from "../../app/account-context";

export function MainLayout({ component: Comp, ...props }) {
    const { t } = useTranslation();
    const [, setUser] = useState({});
    const account = useAccount();

    useEffect(() => accountManager.bind(setUser).remove, []);

    function logout() {
        account.logout();
        window.location = "/login";
        return false;
    }

    const toggleDarkMode = () => bd.helper.setTheme(!bd.helper.isDarkMode() ? "bd-dark" : "bd-light");
    const toggleRTL = () => bd.helper.setRTL(!bd.helper.getRTL());

    const menuUser = (
        <bd.Menu className="mt-n4 shadow-5">
            <bd.MenuItem>{t("User Profile")}</bd.MenuItem>
            {settings.debugMode && <bd.MenuItem onClick={settings.logMissings}>{t("Missing Translations")}</bd.MenuItem>}
            <div className="dropdown-divider"></div>
            <bd.MenuItem href="/user/settings">{t("Settings")}</bd.MenuItem>
            <bd.MenuItem onClick={logout}>{t("Logout")}</bd.MenuItem>
        </bd.Menu>
    );

    let title = t(Comp?.Appbar?.title ?? settings.title);

    return (
        <div className="d-flex flex-column h-100">
            <bd.AppBar color="inherit" shadow={0} className="border-bottom bg-shade-5">
                <div className="container">
                    <bd.Toolbar>
                        {/* <bd.Button variant="icon" color="default" href="/home">
                            <icons.Home style={{ fontSize: "1.65rem" }} />
                        </bd.Button> */}

                        <a href="/home">
                            <img src={t("header-logo")} alt="logo" height={31} />
                        </a>

                        <h5 className="appbar-title">{title}</h5>

                        {Comp?.Appbar?.buttons}

                        {settings.debugMode && (
                            <>
                                <bd.Button variant="text" color="default" onClick={toggleRTL} className="d-none d-md-block">
                                    RTL
                                </bd.Button>

                                <bd.Button variant="icon" color="default" onClick={toggleDarkMode} className="d-none d-md-block">
                                    <icons.DarkMode />
                                </bd.Button>
                            </>
                        )}
                        <bd.Badge value={2} overlapCircle className="bg-warning text-dark d-none d-sm-flex">
                            <bd.Button variant="icon" color="default" className="d-none d-sm-block">
                                <icons.NotificationsActive />
                            </bd.Button>
                        </bd.Badge>

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
