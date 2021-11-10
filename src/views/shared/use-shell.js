import { g_shell_full_width, g_shell_set_app } from "./appbar-shell";

console.log("useShell");

export const useShell = () => {
    return {
        setApp: (title, goBack, buttons) => {
            g_shell_set_app && g_shell_set_app(title, goBack, buttons);
        },

        fullWidth: () => {
            g_shell_full_width();
            return;
            debugger;
            console.log("g_shell_full_width", g_shell_full_width);
            var t = typeof g_shell_full_width;

            console.log("g_shell_full_width: type = ", t);

            if (t === "function") {
                g_shell_full_width();
            } else {
                g_shell_full_width = true;
            }

            console.log("> g_shell_full_width", g_shell_full_width);
        },

        setBusyMode: (value) => {},
    };
};
