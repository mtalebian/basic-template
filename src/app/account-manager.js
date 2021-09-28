import { accountApi } from "../api/account-api";
import { api } from "../api/api";
import { BasicSubject } from "../components/basic/event/basic-subject";

const authStatusTypes = {
    Connecting: "connecting",
    ConnectionFailed: "connection-failed",
    Connected: "connected",
    LoggedIn: "logged-in",
    LoggedOut: "logged-out",
};

const accountSubject = new BasicSubject({ pristine: true, application: {}, menuFolders: [], menus: [] }, "acc");
const statusSubject = new BasicSubject(authStatusTypes.Connecting, "connection");

window.addEventListener("storage", function (event) {
    if (event.key === "sync-logout") accountManager.logout();
});

function logout(sync) {
    if (!api.token) return;
    accountSubject.next({ menuFolders: [], menus: [] });
    if (sync) localStorage.setItem("sync-logout", Date.now());
    var res = accountApi.logout();
    accountManager.status.set(authStatusTypes.LoggedOut);
    return res;
}

export const accountManager = {
    status: {
        all: () => {
            var list = [];
            for (var propName in authStatusTypes) {
                list.push(authStatusTypes[propName]);
            }
            return list;
        },

        get: () => statusSubject.value,
        set: (value) => {
            if (statusSubject.value === value) return;
            statusSubject.next(value);
        },
        setAsLoggedOut: () => accountManager.status.set(authStatusTypes.LoggedOut),

        isConnecting: () => statusSubject.value === authStatusTypes.Connecting,
        isConnectionFailed: () => statusSubject.value === authStatusTypes.ConnectionFailed,
        isConnected: () => statusSubject.value === authStatusTypes.Connected || statusSubject.value === authStatusTypes.LoggedIn,
        isLoggedIn: () => statusSubject.value === authStatusTypes.LoggedIn,
        isLoggedOut: () => statusSubject.value === authStatusTypes.LoggedOut,
        onChange: (fn, ownerName) => statusSubject.asObservable().subscribe(fn, ownerName + ".bind"),
        onConnected: (fn, ownerName) =>
            statusSubject.asObservable().subscribe((x) => {
                if (accountManager.status.isConnected() || accountManager.status.isLoggedIn()) fn();
                return x;
            }, ownerName + ".onConnected"),
    },

    isLoggedin: () => !!api.token,

    current: () => accountSubject.value,

    bind: (fn, ownerName) => accountSubject.asObservable().subscribe(fn, ownerName + ".bind"),

    init: () => {
        accountManager.status.set(authStatusTypes.Connecting);
        return accountApi
            .userInfo()
            .then((result) => {
                api.token = result.token;
                api.expiry = result.expiry;
                //settings.title = result.projectTitle;
                var x = {
                    displayName: result.displayName,
                    menuFolders: result.menuFolders,
                    menus: result.menus,
                };
                accountSubject.next(x);
                accountManager.status.set(authStatusTypes.Connected);
                return x;
            })
            .catch((ex) => {
                if (ex.name === "401") accountManager.status.set(authStatusTypes.LoggedOut);
                else accountManager.status.set(authStatusTypes.ConnectionFailed);
                throw ex;
            });
    },

    login: ({ userName, password, captcha }) =>
        accountApi.login({ userName, password, captcha }).then((result) => {
            api.token = result.token;
            api.expiry = result.expiry;
            //settings.title = result.projectTitle;
            var x = {
                displayName: result.displayName,
                menuFolders: result.menuFolders,
                menus: result.menus,
            };
            accountSubject.next(x);
            accountManager.status.set(authStatusTypes.LoggedIn);
            return result;
        }),
    logout: () => logout(true),
};

export default accountManager;
