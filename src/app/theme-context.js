import React, { useState, createContext } from "react";
import { themeManager } from "./theme-manager";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themeManager.get());

    const changeTheme = (value) => {
        if (!value) value = "default";
        themeManager.set(value);
        setTheme(value);
    };

    return <ThemeContext.Provider value={[theme, changeTheme]}>{props.children}</ThemeContext.Provider>;
};
