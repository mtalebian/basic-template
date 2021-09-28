//import { createBrowserHistory } from 'history';
//export const history = createBrowserHistory();

export const delayedPromise = (delay, fn) =>
    new Promise((resolve, reject) => {
        setTimeout(() => fn(resolve, reject), delay);
    });

export const helper = {
    isNullOrUndefined: (x) => x == null || typeof x === "undefined",
    isUndefined: (x) => typeof x === "undefined",
    isString: (x) => typeof x === "string",
    isArray: (x) => Array.isArray(x),
    isFunction: (x) => typeof x === "function",

    isFunctionalComponent: (c) =>
        typeof c === "function" &&
        !(c.prototype && c.prototype.isReactComponent),
    isClassComponent: (c) =>
        typeof c === "function" &&
        !!(c.prototype && c.prototype.isReactComponent),

    addClassNames: (elem, list) => {
        if (typeof list === "string") list = list.split(" ");
        for (var i = 0; i < list.length; i++) {
            document.body.classList.add(list[i]);
        }
    },

    removeClassNames: (elem, list) => {
        if (typeof list === "string") list = list.split(" ");
        for (var i = 0; i < list.length; i++) {
            document.body.classList.remove(list[i]);
        }
    },

    hexColorToStyle: function (color, text, bg) {
        if (!color || !color.startsWith("#")) return {};
        var style = text ? { color: color } : {};
        return !bg ? style : { ...style, backgroundColor: color };
    },
};
