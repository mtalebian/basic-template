import React from "react";
import { useTranslation } from "react-i18next";
import settings from "../../app/settings";

export const Text = ({ children }) => {
    const { t } = useTranslation();

    return !settings.debugMode ? t(children) : <span data-code="children">{t(children)}</span>;
};
