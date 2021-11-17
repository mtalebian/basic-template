import { g_shell_set_app, shellFullWidthSubject } from "./appbar-shell";

export const useShell = () => {
    return {
        setApp: (title, goBack, buttons) => {
            g_shell_set_app && g_shell_set_app(title, goBack, buttons);
        },

        fullWidth: (value) => {
            shellFullWidthSubject.next(value);
        },

        setBusyMode: (value) => {},
    };
};
