import i18next from "i18next";
import React from "react";

export const T = ({ children, ...props }) => {
    const text = translate(children, props);
    return <span data-code={children}>{text}</span>;
};

function findEndOfParameter(s, pos) {
    for (let i = pos; i < s.length; i++) {
        const c = s[i];
        var is_valid = c === "_" || (c >= "0" && c <= "9") || (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
        if (!is_valid) return i;
    }
    return s.length;
}

export function translate(value, props) {
    if (!props) props = {};
    const s = i18next.t(value);
    let pos = 0;
    let i = s.indexOf("@", pos);
    let text = i >= 0 ? "" : s;
    if (i >= 0) {
        while (i >= 0 && i < s.length) {
            const i2 = findEndOfParameter(s, i + 1);
            const p_name = s.substr(i + 1, i2 - i - 1);
            const p_value = props[p_name];
            text += s.substr(pos, i - pos) + p_value;
            pos = i2;
            i = s.indexOf("@", pos);
        }
        if (pos < s.length) text += s.substr(pos, s.length - pos);
    }
    return text;
}

export const TOptGroup = ({ labelCode, children, ...props }) => {
    if (labelCode) {
        props["label"] = translate(labelCode);
        props["data-code"] = labelCode;
    }
    return <optgroup {...props}>{children}</optgroup>;
};

export const TOption = ({ children, ...props }) => {
    if (typeof (children !== "string")) return <option {...props}>{children}</option>;
    return (
        <option {...props} data-code={children}>
            {translate(children)}
        </option>
    );
};

export const Text = T;
