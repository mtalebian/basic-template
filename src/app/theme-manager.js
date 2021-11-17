export const themeManager = {
    get: () => localStorage.getItem("theme"),

    set: (value) => {
        if (!value) value = "default";
        localStorage.setItem("theme", value);
        themeManager.css(value);
    },

    isDark: (theme) => theme && theme.indexOf("dark") >= 0,

    css: (value) => {
        var list = [];
        document.body.classList.forEach((x) => x.startsWith("theme-") && list.push(x));
        list.forEach((x) => document.body.classList.remove(x));

        if (!value) return;
        list.push("theme-" + value);
        if (value.startsWith("bs-")) list.push("theme-bs");
        if (value.startsWith("bd-")) list.push("theme-bd");
        if (value.endsWith("-default")) list.push("theme-light");
        if (value.endsWith("-light")) list.push("theme-light");
        if (value.endsWith("-dark")) list.push("theme-dark");

        list.forEach((x) => document.body.classList.add(x));
    },
};

var t = themeManager.get();
if (!t) t = "bd-light";
themeManager.css(t);
