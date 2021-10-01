import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";

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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export const UserSettingsApp = () => {
    const { t } = useTranslation();
    const [darkMode, setDarkMode] = useState(bd.helper.isDarkMode());
    const currentLanguageCode = getCookie("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

    const changeDarkMode = (value) => {
        bd.helper.setTheme(value ? "mui-dark" : "mui-light");
        setDarkMode(value);
    };
    //const toggleDarkMode = () => bd.helper.setTheme(!bd.helper.isDarkMode() ? "mui-dark" : "mui-light");
    //const toggleRTL = () => bd.helper.setRTL(!bd.helper.getRTL());

    useEffect(() => {
        document.body.dir = currentLanguage.dir || "ltr";
        document.title = t("app_title");
    }, [currentLanguage, t]);

    return (
        <div className="m-auto" style={{ maxWidth: 600 }}>
            <bd.Panel
                fixed
                title="Dark Mode"
                size="md"
                className="border-bottom"
                buttons={<bd.Switch color="primary" className="edge-end" model={darkMode} setModel={changeDarkMode} />}
            ></bd.Panel>
            <bd.Panel
                variant="button"
                caretPosition="middle"
                title="Language"
                size="md"
                className="border-bottom"
                buttons={<span className="">{currentLanguage.name}</span>}
            >
                <div className="m-s-5">
                    {languages.map((x) => (
                        <bd.Panel fixed variant="menu" title={x.name} size="md" />
                    ))}
                </div>
            </bd.Panel>
        </div>
    );
};

UserSettingsApp.Appbar = {
    title: "Settings",
    buttons: null,
};
