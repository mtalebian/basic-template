import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import * as bd from "react-basic-design";
import settings from "../../app/settings";

const defaultLanguageCode = "fa";
const languages = [
    {
        code: "fa",
        name: "فارسی",
        country_code: "ir",
        dir: "rtl",
    },
    {
        code: "en",
        name: "English",
        country_code: "gb",
    },
];

export const UserSettingsApp = () => {
    const { t } = useTranslation();
    const [darkMode, setDarkMode] = useState(bd.helper.isDarkMode());
    const currentLanguageCode = settings.getLanguageCode() || defaultLanguageCode;
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

    const changeDarkMode = (value) => {
        bd.helper.setTheme(value ? "bd-dark" : "bd-light");
        setDarkMode(value);
    };

    const changeLanguage = (lang) => {
        i18next.changeLanguage(lang.code);
    };

    useEffect(() => {
        bd.helper.setRTL(currentLanguage.dir === "rtl");
        document.title = t("app.title");
    }, [currentLanguage, t]);

    return (
        <div className="m-auto" style={{ maxWidth: 600 }}>
            <bd.List>
                <bd.ListItem
                    variant="text"
                    primary={t("dark_mode")}
                    className="border-bottom"
                    controls={<bd.Switch color="primary" className="edge-end" model={darkMode} setModel={changeDarkMode} />}
                />
                <bd.ListItem
                    primary={
                        <>
                            {t("language")}: <b>{currentLanguage.name}</b>
                        </>
                    }
                    className="border-bottom"
                >
                    {languages.map((x) => (
                        <bd.ListItem key={x.code} primary={x.name} radio checked={currentLanguage === x} onClick={(e) => changeLanguage(x)} />
                    ))}
                </bd.ListItem>
            </bd.List>
        </div>
    );
};

UserSettingsApp.Appbar = {
    title: "settings",
    buttons: null,
};
