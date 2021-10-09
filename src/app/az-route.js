import React, { useState } from "react";
import { Route } from "react-router";

import * as bd from "react-basic-design";
import * as icons from "../assets/icons";
import { messages } from "../components/messages";
import { LoginForm } from "../views/account/login-form";
import { notify } from "../components/basic/notify";
import { accountStatuses, useAccount } from "./account-context";

export const AzRoute = ({ component: Component, login: Login, render, ...rest }) => {
    const account = useAccount();

    const [loginHere, setLoginHere] = useState(false);

    function reconnect() {
        account.init().catch((ex) => !ex.handled && notify.error(ex));
    }

    const gotoLoginHere = () => setLoginHere(true);
    const returnFromLoginHere = () => setLoginHere(false);

    return (
        <Route
            {...rest}
            render={(props) => {
                switch (account.getStatus()) {
                    case "":
                        return <></>;

                    case accountStatuses.Connecting:
                        return (
                            <div className="middle h-100">
                                <div className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--0s"></div>
                                <div className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--1s"></div>
                                <div className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--2s"></div>
                            </div>
                        );

                    case accountStatuses.ConnectionFailed:
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

                    case accountStatuses.LoggedIn:
                    case accountStatuses.Connected:
                        return (
                            <div className="h-100">
                                {!!render && render(props)}
                                {!!Component && <Component {...props} />}
                            </div>
                        );

                    case accountStatuses.LoggedOut:
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

                    case accountStatuses.Forbidden:
                        return (
                            <div className="middle h-100">
                                <div className="text-center">
                                    <div className="text-danger p-3">
                                        به علت محدوديت دسترسي
                                        <br />
                                        شما مجاز به مشاهده اين صفحه نمي باشيد
                                    </div>
                                    <bd.Button variant="text" href="/">
                                        <icons.Home />
                                        <span className="p-s-2">انتقال به صفحه اصلي</span>
                                    </bd.Button>
                                </div>
                            </div>
                        );

                    default:
                        <h1>UNHANDLED STATUS: {account.getStatus()} </h1>;
                }
            }}
        />
    );
};
