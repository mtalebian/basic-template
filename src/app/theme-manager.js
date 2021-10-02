import { helper } from "../components/basic/helper";

export const themeManager = {
    get: () => localStorage.getItem("theme"),

    set: (value) => {
        if (!value) value = "default";
        localStorage.setItem("theme", value);
        themeManager.css(value);
    },

    isDark: (theme) => theme && theme.indexOf("dark") >= 0,
    isDarkSidebar: (theme) => themeManager.isDark(theme) || (theme && theme.indexOf("default") >= 0),

    css: (value) => {
        var lst = [];
        var cl = document.body.classList;
        for (var i = 0; i < cl.length; i++) {
            if (cl[i].startsWith("theme-")) lst.push(cl[i]);
        }
        helper.removeClassNames(document.body, lst);
        var css_list = themeManager.getCss(value);
        helper.addClassNames(document.body, css_list);
    },

    getCss: (value) => {
        var list = [];
        if (!value) return list;
        list.push("theme-" + value);
        if (value.startsWith("bs-")) list.push("theme-bs");
        if (value.startsWith("bd-")) list.push("theme-bd");
        if (value.endsWith("-default")) list.push("theme-light");
        if (value.endsWith("-light")) list.push("theme-light");
        if (value.endsWith("-dark")) list.push("theme-dark");
        return list;
    },
};
var t = themeManager.get();
if (!t) t = "bd-light";
themeManager.css(t);
