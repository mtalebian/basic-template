import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../assets/icons";
import * as yup from "yup";
import { BasicInput } from "../../components/basic-form/basic-input";
import { Form, Formik } from "formik";
import { notify } from "../../components/basic/notify";
import { useAccount } from "../../app/account-context";
import settings from "../../app/settings";
import { apiConfig } from "../../api/config";
import { messages } from "../../components/messages";
import { accountApi } from "../../api/account-api";

export const ForgotPassword = () => {
  const [captchaCounter, setCaptchaCounter] = useState(0);
  const [uid, setUID] = useState(Date.now());
  const account = useAccount();
  const formRef = useRef();
  const [busy, setBusy] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [verificatinKey, setVerificatinKey] = useState(null);
  const [resetDone, setResetDone] = useState(false);

  const Clock = (props) => {
    const [currentCount, setCount] = useState(props.count);
    const timer = () => setCount(currentCount - 1);

    useEffect(
        () => {
            if (currentCount <= 0) {
                return;
            }
            const id = setInterval(timer, 1000);
            return () => clearInterval(id);
        },
        [currentCount]
    );

    return <div className="text-center text-danger">مدت زمان اعتبار :{currentCount}</div>;
};


  function refreshCaptcha() {
    setUID(Date.now());
  }

  const onResetPasswordClick = (e) => {
    if (!formRef.current) return false;
    if (!formRef.current.isValid) return false;
    var model = formRef.current.values;
    setBusy(true);
    accountApi
      .forgotPassword(model)
      .then((result) => {
        console.log(`VerificationCode:${result.code}`);
        setVerificatinKey(result.key);
        setCurrentUser(model.userName);
        setBusy(false);
      })
      .catch((ex) => {
        setBusy(false);
        notify.error(ex);
      });
  };
  const onSendCodeClick = (e) => {
    if (!formRef.current) return false;
    if (!formRef.current.isValid) return false;
    var model = formRef.current.values;
    model.userName = currentUser;
    model.key = verificatinKey;
    setBusy(true);
    accountApi
      .resetPassword(model)
      .then((result) => {
        console.log(`NewPassword:${result.newPassword}`);
        setResetDone(true);
        setVerificatinKey(null);
        setCurrentUser(null);
        setBusy(false);
      })
      .catch((ex) => {
        setBusy(false);
        notify.error(ex);
      });
  };

  return (
    <>
      {!verificatinKey && !resetDone && (
        <bd.Card className="p-4">
          <Formik
            initialValues={{
              userName: "",
              captcha: "",
            }}
            validationSchema={yup.object({
              userName: yup.string().required("required"),
              captcha: yup.string().required("required"),
            })}
            onSubmit={onResetPasswordClick}
            innerRef={formRef}
          >
            <form style={{ width: "250px" }}>
              <h5 className="text-center text-primary pb-2">بازیابی رمز عبور</h5>
              <BasicInput placeholder="UserName" name="userName" autoComplete="off" autoFocus />
              <div className="middle gap-3">
                <BasicInput placeholder="Security Code" name="captcha" maxLength="5" autoComplete="off" />
                <div className="mb-3">
                  <img
                    className="cur-pointer border rounded"
                    alt="Captcha"
                    src={`${apiConfig.baseUrl}/captcha?${uid}_${captchaCounter}`}
                    onClick={refreshCaptcha}
                  />
                </div>
              </div>
              <bd.Button className="w-100" color="primary" disabled={busy} onClick={() => formRef.current.submitForm()}>
                {busy && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                <span>{messages.SendCode}</span>
              </bd.Button>
              <div className="pt-3 text-center">
                <a className="text-decoration-none text-primary" href="/login">
                  {messages.LoginTitle}
                </a>
              </div>
            </form>
          </Formik>
        </bd.Card>
      )}
      {verificatinKey && !resetDone && (
        <bd.Card className="p-4">
          <Formik
            initialValues={{
              code: "",
            }}
            validationSchema={yup.object({
              code: yup.string().required("required"),
            })}
            onSubmit={onSendCodeClick}
            innerRef={formRef}
          >
            <form style={{ width: "250px" }}>
              <h5 className="text-center text-primary pb-2">بازیابی رمز عبور</h5>
              <Clock count="120"/>
              <hr />
              <h6 className="text-center text-primary">{messages.SentVerificationCode}</h6>
              <BasicInput placeholder="Verification Code" name="code" autoComplete="off" autoFocus />
              <bd.Button className="w-100" color="primary" disabled={busy} onClick={() => formRef.current.submitForm()}>
                {busy && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                <span>{messages.ChangePassword}</span>
              </bd.Button>
              <div className="pt-3 text-center">
                <a className="text-decoration-none text-primary" href="#" onClick={() => setVerificatinKey(null)}>
                  {messages.Return}
                </a>
              </div>
            </form>
          </Formik>
        </bd.Card>
      )}
      {resetDone && (
        <>
          <bd.Card className="p-4">
            <h6>پسورد جديد براي شما ارسال شد</h6>
            <div className="pt-3 text-center">
              <a className="text-decoration-none text-primary" href="/login">
                {messages.LoginTitle}
              </a>
            </div>
          </bd.Card>
        </>
      )}
    </>
  );
};

ForgotPassword.Appbar = {
  title: "forgot-password",
  buttons: null,
};
