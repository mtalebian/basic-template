import { g_shell_set_app } from "./appbar-shell";

export const useShell = () => {
    return {
        setApp: (title, goBack, buttons) => {
            g_shell_set_app(title, goBack, buttons);
        },
    };
};
