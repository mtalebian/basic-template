import { g_shell_set_app, shellFullWidthSubject } from "./appbar-shell";

console.log("useShell");

export const useShell = () => {
    return {
        setApp: (title, goBack, buttons) => {
            g_shell_set_app && g_shell_set_app(title, goBack, buttons);
        },

        fullWidth: () => {
            shellFullWidthSubject.next(true);
        },

        setBusyMode: (value) => {},
    };
};
