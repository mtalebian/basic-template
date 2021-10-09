import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { api } from "../api/api";

import * as icons from "../assets/icons";
import { messages } from "../components/messages";
import { LoginForm } from "../views/account/login-form";
import { notify } from "../components/basic/notify";
import { useAccount } from "./account-context";

export const AzRoute = ({ component: Component, login: Login, render, ...rest }) => {
    const account = useAccount();

    const [loginHere, setLoginHere] = useState(false);

    useEffect(
        () =>
            api.onUnauthorized((x) => {
                account.setAsLoggedOut();
            }).remove,
        []
    );

    function reconnect() {
        account.init().catch((ex) => !ex.handled && notify.error(ex));
    }

    const gotoLoginHere = () => setLoginHere(true);
    const returnFromLoginHere = () => setLoginHere(false);

    function renderConnecting() {
        if (account.isConnecting()) {
            return (
                <div className="middle h-100">
                    <div className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--0s"></div>
                    <div className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--1s"></div>
                    <div className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--2s"></div>
                </div>
            );
        } else if (account.isConnectionFailed()) {
            return (
                <div className="middle h-100">
                    <div className="text-center">
                        <div className="text-danger p-3">{messages.ConnectionError}</div>
                        <button className="btn btn-link btn-icon text-dark" onClick={reconnect}>
                            <icons.Sync />
                            <span className="p-s-2">{messages.Retry}</span>
                        </button>
                    </div>
                </div>
            );
        } else if (account.isLoggedOut()) {
            if (loginHere) {
                return (
                    <main className="content middle h-100">
                        <div>
                            <button className="btn btn-link btn-icon" onClick={returnFromLoginHere}>
                                <icons.ArrowForward fill="#06c" /> {messages.Return}
                            </button>
                            <LoginForm inline />
                        </div>
                    </main>
                );
            } else {
                return (
                    <div className="middle h-100" style={{ maxHeight: 601 }}>
                        <div>
                            {messages.WeCannotAuthenticateYou}:
                            <dl className="pt-2">
                                <dd className="m-0">
                                    <button className="btn btn-link btn-icon" onClick={reconnect}>
                                        <icons.Sync fill="#06c" /> {messages.Retry}
                                    </button>
                                </dd>
                                <dd className="m-0">
                                    <button className="btn btn-link btn-icon" onClick={gotoLoginHere}>
                                        <icons.Login fill="#06c" /> {messages.LoginHere}
                                    </button>
                                </dd>
                                <dd className="m-0">
                                    <a className="btn btn-link btn-icon" href="/">
                                        <icons.Home fill="#06c" /> {messages.RedirectToHomePage}
                                    </a>
                                </dd>
                            </dl>
                        </div>
                    </div>
                );
            }
        }
        return <></>;
    }

    console.log(`render ac-route ${account.getStatus()}`);

    return (
        <Route
            {...rest}
            render={(props) => {
                return (
                    <>
                        {/*{state}*/}
                        <div className="h-100" style={{ display: account.isConnected() ? "block" : "none" }}>
                            {!!render && render(props)}
                            {!!Component && <Component {...props} />}
                        </div>
                        {!account.isConnected() && renderConnecting()}
                    </>
                );
            }}
        />
    );
};
