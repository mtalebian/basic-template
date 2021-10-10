import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import * as yup from "yup";
import { notify } from "../../../components/basic/notify";
import { Form, Formik } from "formik";
import { BasicInput } from "../../../components/basic-form/basic-field";
import { userManagmentApi } from "../../../api/user-managment-api";

export const AddUser = ({ onGoBack, ...props }) => {
    const { t } = useTranslation();
    const [busy, setBusy] = useState(false);
    const formRef = useRef();
    const [authType, setAuthType] = useState("windows");

    const onSaveClick = (e) => {
        if (!formRef.current) return false;
        if (!formRef.current.isValid) return false;
        var values = formRef.current.values;
        setBusy(true);
        userManagmentApi
            .insertUser(values)
            .then((x) => {
                setBusy(false);
                notify.info(t("changes-are-saved"));
                onGoBack();
            })
            .catch((ex) => {
                setBusy(false);
                notify.error(ex);
            });
    };

    return (
        <div>
            <div className="border-bottom">
                <bd.Toolbar className="container">
                    <bd.Button variant="icon" onClick={onGoBack} size="md" edge="start" className="m-e-2">
                        <icons.ArrowBackIos className="rtl-rotate-180" />
                    </bd.Button>
                    <h5>{t("new-user")}</h5>

                    <div className="flex-grow-1" />

                    <bd.Button color="primary" disabled={busy} onClick={() => formRef.current.submitForm()}>
                        {busy && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                        <span>{t("save-changes")}</span>
                    </bd.Button>
                </bd.Toolbar>
            </div>

            <div className="container pt-3">
                <Formik
                    initialValues={{
                        userName: "",
                        nationalCode: "",
                        password: "",
                        firstName: "",
                        lastName: "",
                        windowsAuthenticate: false,
                        description: "",
                    }}
                    validationSchema={yup.object({
                        userName: yup.string().required("Required"),
                        firstName: yup.string().required("Required"),
                        lastName: yup.string().required("Required"),
                    })}
                    onSubmit={onSaveClick}
                    innerRef={formRef}
                >
                    <Form>
                        <div className="row">
                            <div className="col-md-6 col-xl-4">
                                <BasicInput name="userName" label={t("user-name")} labelSize="4" autoComplete="off" autoFocus />
                                <BasicInput
                                    name="nationalCode"
                                    label={t("national-code")}
                                    labelSize="4"
                                    autoComplete="off"
                                    style={{ maxWidth: 150 }}
                                />
                                <div className="row mb-2">
                                    <label class="form-label text-start text-md-end col-form-label col-12 col-md-4">{t("auth-type")}</label>
                                    <div className="col-md-8 m-s-n2">
                                        <bd.Toggle
                                            color="primary"
                                            dense
                                            radio
                                            size="sm"
                                            name="auth-type"
                                            value="windows"
                                            label={t("windows")}
                                            labelClassName="m-e-2"
                                            model={authType}
                                            setModel={setAuthType}
                                        />
                                        <bd.Toggle
                                            color="primary"
                                            dense
                                            radio
                                            size="sm"
                                            name="auth-type"
                                            value="form"
                                            label={t("form")}
                                            model={authType}
                                            setModel={setAuthType}
                                        />
                                    </div>
                                </div>
                                <BasicInput name="password" label={t("password")} labelSize="4" autoComplete="off" />
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <BasicInput name="firstName" label={t("first-name")} labelSize="4" autoComplete="off" />
                                <BasicInput name="lastName" label={t("last-name")} labelSize="4" autoComplete="off" />
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <BasicInput name="description" label={t("description")} labelSize="4" autoComplete="off" />
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
