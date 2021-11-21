/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import settings from "../../app/settings";
import * as icons from "../../assets/icons";
import { useAccount } from "../../app/account-context";
import classNames from "classnames";
import { Subject } from "react-basic-design";

export const shellFullWidthSubject = new Subject(false);

let g_timer_handler = null;
export let g_shell_set_app = null;

export function AppbarShell({ setAppRef }) {
  const [appData, setAppData] = useState({ title: "", goBack: null, buttons: null });
  const [fullWidth, setFullWidth] = useState(shellFullWidthSubject.value);
  const { t } = useTranslation();
  const account = useAccount();
  //const logo_url = settings.getLanguageCode() === "fa" ? "/images/logo/header-logo.png" : "/images/logo/header-logo-en.png";
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
      <bd.MenuItem href="/account/user-profile">{t("User Profile")}</bd.MenuItem>
      <bd.MenuItem href="/account/active-sessions">{t("Active Sessions")}</bd.MenuItem>
      {settings.debugMode && <bd.MenuItem onClick={settings.logMissings}>{t("Missing Translations")}</bd.MenuItem>}
      <div className="dropdown-divider"></div>
      <bd.MenuItem href="/user/settings">{t("Settings")}</bd.MenuItem>
      <bd.MenuItem onClick={logout}>{t("Logout")}</bd.MenuItem>
    </bd.Menu>
  );

  const changeFullWidth = (value) => value !== fullWidth && setFullWidth(value);

  let isMounted = true;
  useEffect(() => () => (isMounted = false), []);

  useEffect(() => {
    var binding = shellFullWidthSubject.subscribe(changeFullWidth);
    return binding.remove;
  }, [changeFullWidth]);

  g_shell_set_app = (title, goBack, buttons) => {
    if (g_timer_handler) {
      clearTimeout(g_timer_handler);
      g_timer_handler = null;
    }
    g_timer_handler = setTimeout(() => {
      if (isMounted) {
        setAppData({ title, goBack, buttons });
      }
    }, 100);
    //if (appData.title !== title) setAppData({ title, goBack, buttons });
  };

  setAppRef.current = g_shell_set_app;

  return (
    <bd.AppBar color="shell">
      <bd.Toolbar size="md" className={classNames({ container: !fullWidth, "container-fluid": fullWidth })}>
        {/* {useRef.current?.getAppTitle()} */}
        {appData.goBack && (
          <bd.Button variant="icon" color="default" onClick={() => appData.goBack()}>
            <icons.ArrowBackIos size="md" className="rtl-rotate-180" />
          </bd.Button>
        )}

        {!appData.goBack && (
          <bd.Button variant="icon" color="default" href="/home">
            <icons.Home />
          </bd.Button>
        )}

        {/* <a href="/home">
                        <img src={logo_url} alt="logo" height={26} />
                    </a> */}

        <h5 className="appbar-title">{appData.title}</h5>

        {appData.buttons}

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

        <bd.Button variant="icon" color="default" menu={menuUser} className="d-none d-sm-block">
          <icons.AccountCircle />
        </bd.Button>
      </bd.Toolbar>
    </bd.AppBar>
  );
}
