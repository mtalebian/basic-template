import React from "react";
import { useTranslation } from "react-i18next";
import settings from "../../app/settings";

export const Text = ({ children, ...props }) => {
    const { t } = useTranslation();
    const s = t(children);
    var pos = 0;
    var i = s.indexOf("@", pos);
    let text = i >= 0 ? "" : s;
    if (i > 0) {
        while (i >= 0 && i < s.length) {
            var i2 = findEndOfParameter(s, i + 1);
            var p_name = s.substr(i + 1, i2 - i - 1);
            var p_value = props[p_name];
            text += s.substr(pos, i - pos) + p_value;
            pos = i2;
            i = s.indexOf("@", pos);
        }
        if (pos < s.length) text += s.substr(pos, s.length - pos);
    }
    return !settings.debugMode ? t(children) : <span data-code={children}>{text}</span>;
};

function findEndOfParameter(s, pos) {
    for (let i = pos; i < s.length; i++) {
        const c = s[i];
        var is_valid = c === "_" || (c >= "0" && c <= "9") || (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
        if (!is_valid) return i;
    }
    return s.length;
}
