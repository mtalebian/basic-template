import React, { useState } from "react";
import { Form } from "react-final-form";
import { useHistory } from "react-router-dom";

import * as bs from "react-basic-design";
import * as icons from "../../assets/icons";
import { Captcha } from "./captcha";
import accountManager from "../../app/account-manager";
import { messages } from "../../components/messages";
import settings from "../../app/settings";
import { FinalField } from "../../components/basic/final-form";
import { notify } from "../../components/basic/notify";

export const LoginForm = ({ inline, ...props }) => {
    const [captchaCounter, setCaptchaCounter] = useState(0);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onSubmit = (values) => {
        if (!values.userName || values.userName.trim().length < 3) {
            notify.error(messages.InvalidUserName);
            return;
        }
        if (!values.password || values.password.trim().length < 3) {
            notify.error(messages.InvalidPassword);
            return;
        }
        if (!values.captcha || values.captcha.trim().length !== 5) {
            notify.error(messages.InvalidCaptcha);
            return;
        }
        setLoading(true);
        accountManager
            .login(values)
            .then((result) => {
                setCaptchaCounter(captchaCounter + 1);
                setLoading(false);
                if (inline) notify.info(messages.Welcome);
                else history.push("/home");
            })
            .catch((ex) => {
                setCaptchaCounter(captchaCounter + 1);
                setLoading(false);
                notify.error(ex);
            });
    };
    /*
    const myValidator = BasicValidator((builder) =>
        builder.object({
            userName: builder.string().required().userName(),
            password: builder.string().required().password(),
            captcha: builder.string().required().length(5),
        })
    );*/

    return (
        <Form
            initialValues={{}}
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, invalid, values, errors, ...args }) => (
                <form onSubmit={handleSubmit} className="mx-auto ltr" style={{ width: 280 }}>
                    <div>
                        {!inline && <h3 className="text-center text-primary">{settings.title}</h3>}

                        <FinalField name="userName" placeholder="User name" type="text" autoComplete="off" autoFocus />
                        <FinalField name="password" placeholder="Password" type="password" />
                        <Captcha counter={captchaCounter} />

                        <bs.Button color="primary" type="submit" className="w-100" disabled={loading || submitting || invalid}>
                            {loading && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                            <span>{messages.LoginTitle}</span>
                        </bs.Button>

                        {!inline && (
                            <div className="text-center">
                                <p className="pt-3">
                                    <a className="text-decoration-none text-primary" href="/account/ForgotPassword">
                                        {messages.IForgotMyPassword}
                                    </a>
                                </p>
                                <p>
                                    <a className="text-decoration-none text-primary" href="/account/register">
                                        {messages.IDontHaveAccount}
                                    </a>
                                </p>
                                <footer className="small mt-4">
                                    {messages.SupportTel}: <span className="ltr d-inline-block">{settings.supportTel}</span>
                                </footer>
                            </div>
                        )}
                    </div>
                </form>
            )}
        />
    );
};
