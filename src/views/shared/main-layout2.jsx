import React from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import settings from "../../app/settings";
import * as icons from "../../assets/icons";
import { useAccount } from "../../app/account-context";

export function MainLayout({ component: Comp, ...props }) {
    const { t } = useTranslation();
    const account = useAccount();
    const logo_url = settings.getLanguageCode() === "fa" ? "/images/logo/header-logo.png" : "/images/logo/header-logo-en.png";
    //const logo_url = bd.helper.getRTL() ? "/images/logo/header-logo.png" : "/images/logo/header-logo-en.png";

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
            <bd.AppBar color="shell">
                <bd.Toolbar size="md" className="container">
                    {/* <bd.Button variant="icon" color="default" href="/home">
                            <icons.Home style={{ fontSize: "1.65rem" }} />
                        </bd.Button> */}

                    <a href="/home">
                        <img src={logo_url} alt="logo" height={26} />
                    </a>

                    <h5 className="appbar-title text-center">{title}</h5>

                    {Comp?.Appbar?.buttons}

                    <bd.Button variant="text" color="default" onClick={toggleRTL} className="d-none d-md-block">
                        RTL
                    </bd.Button>

                    <bd.Button variant="icon" color="default" onClick={toggleDarkMode} className="d-none d-md-block">
                        <icons.DarkMode />
                    </bd.Button>

                    <bd.Button variant="icon" color="default" className="d-none d-sm-block">
                        <bd.Badge value={2} className="bg-warning text-dark" position="top-end">
                            <icons.NotificationsActive />
                        </bd.Badge>
                    </bd.Button>

                    <bd.Button variant="icon" color="default" menu={menuUser} edge="end" className="d-none d-sm-block">
                        <icons.AccountCircle />
                    </bd.Button>
                </bd.Toolbar>
            </bd.AppBar>

            <main className="content flex-grow-1">
                <Comp {...props} />
            </main>
        </div>
    );
}
