import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import * as bd from "react-basic-design";
import { BasicInput } from "../../components/basic-form/basic-input";
import { messages } from "../../components/messages";
import settings from "../../app/settings";
import { Form, Formik } from "formik";
import { notify } from "../../components/basic/notify";
import { useAccount } from "../../app/account-context";
import { apiConfig } from "../../api/config";

export const LoginForm = ({ inline, ...props }) => {
    const [captchaCounter, setCaptchaCounter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [uid, setUID] = useState(Date.now());
    const history = useHistory();
    const account = useAccount();
    const formRef = useRef();
    const initialValue = {
        userName: "",
        password: "",
        captcha: "",
    };
    function refreshCaptcha() {
        setUID(Date.now());
    }
    const onSubmit = (values) => {
        setLoading(true);
        account
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

    return (
        <div className="mx-auto ltr" style={{ width: 280 }}>
            <Formik
                initialValues={initialValue}
                validationSchema={yup.object({
                    userName: yup.string().required("required"),
                    password: yup.string().required("required"),
                    captcha: yup.string().required("required"),
                })}
                onSubmit={onSubmit}
                innerRef={formRef}
            >
                <Form>
                    {!inline && <h3 className="text-center text-primary">{settings.title}</h3>}
                    <BasicInput className="mb-2" name="userName" placeholder="User name" type="text" autoComplete="off" autoFocus />
                    <BasicInput className="mb-2" name="password" placeholder="Password" type="password" />
                    <div className="middle gap-3">
                        <BasicInput placeholder="Security Code" name="captcha" maxLength="5" autoComplete="off" />
                        <div className="mb-2">
                            <img
                                className="cur-pointer border rounded"
                                alt="Captcha"
                                src={`${apiConfig.baseUrl}/captcha?${uid}_${captchaCounter}`}
                                onClick={refreshCaptcha}
                            />
                        </div>
                    </div>
                    <bd.Button color="primary" type="submit" className="w-100" onClick={() => formRef.current.submitForm()} disabled={loading}>
                        {loading && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                        <span>{messages.LoginTitle}</span>{" "}
                    </bd.Button>
                </Form>
            </Formik>

            {!inline && (
                <div className="text-center">
                    <p className="pt-3">
                        <a className="text-decoration-none text-primary" href="/account/forgot-password">
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
    );
};
