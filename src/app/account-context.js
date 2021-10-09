import React, { useState, createContext, useEffect } from "react";
import { accountApi } from "../api/account-api";
import { api } from "../api/api";

const accountStatuses = {
    Connecting: "connecting",
    ConnectionFailed: "connection-failed",
    Connected: "connected",
    LoggedIn: "logged-in",
    LoggedOut: "logged-out",
};

export const AccountContext = createContext();

export const AccountProvider = (props) => {
    const initialData = { status: "", name: "" };
    const [data, setData] = useState(initialData);

    window.addEventListener("storage", function (event) {
        if (event.key === "sync-logout") logout();
    });

    function logout(sync) {
        if (!data.token) return;
        if (sync) localStorage.setItem("sync-logout", Date.now());
        var res = accountApi.logout();
        setData(initialData);
        return res;
    }

    const controller = {
        getToken: () => api.token,
        getStatus: () => data.status,
        getName: () => data.name,

        isConnecting: () => data.status === accountStatuses.Connecting,
        isConnectionFailed: () => data.status === accountStatuses.ConnectionFailed,
        isConnected: () => data.status === accountStatuses.Connected || data.status === accountStatuses.LoggedIn,
        isLoggedIn: () => data.status === accountStatuses.LoggedIn,
        isLoggedOut: () => data.status === accountStatuses.LoggedOut,

        setAsLoggedOut: () => setData({ ...data, status: accountStatuses.LoggedOut }),

        init: () => {
            setData({ ...data, status: accountStatuses.Connecting });
            return accountApi
                .userInfo()
                .then((result) => {
                    api.token = result.token;
                    api.expiry = result.expiry;
                    var x = {
                        status: accountStatuses.Connected,
                        name: result.displayName,
                    };
                    setData(x);
                    return x;
                })
                .catch((ex) => {
                    if (ex.name === "401") setData({ ...data, status: accountStatuses.LoggedOut });
                    else setData({ ...data, status: accountStatuses.ConnectionFailed });
                    throw ex;
                });
        },

        login: ({ userName, password, captcha }) =>
            accountApi.login({ userName, password, captcha }).then((result) => {
                api.token = result.token;
                api.expiry = result.expiry;
                var x = {
                    status: accountStatuses.LoggedIn,
                    name: result.displayName,
                };
                setData(x);
                return result;
            }),

        logout: () => logout(true),
    };

    useEffect(() => {
        if (!!data.status) return;
        controller.init();
    });

    return <AccountContext.Provider value={controller}>{props.children}</AccountContext.Provider>;
};
