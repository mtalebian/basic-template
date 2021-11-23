import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../assets/icons";
import * as yup from "yup";
import { BasicInput } from "../../components/basic-form/basic-input";
import { Formik } from "formik";
import { accountApi } from "../../api/account-api";
import { notify } from "../../components/basic/notify";
import { useAccount } from "../../app/account-context";
import { useShell } from "../shared/use-shell";
export const UserProfile = () => {
    const { t } = useTranslation();
    const formRef = useRef();
    const [editMode, setEditMode] = useState(false);
    const [chPassMode, setChPassMode] = useState(false);
    const [user, setUser] = useState(null);
    const [WinAuth, setAuthType] = useState(true);
    const [busy, setBusy] = useState(false);
    const account = useAccount();
    const Atthenticate = WinAuth ? "WindowsAuthenticate" : "FormAuthenticate";
    const PageTitle = chPassMode ? "change-password" : "edit-profile";
    const shell = useShell();

    shell.setApp(t("user-profile"));
    useEffect(() => {
        if (user == null && account.isConnected()) {
            accountApi
                .profileInfo()
                .then((x) => {
                    if (!x.windowsAuthenticate) {
                        setAuthType(false);
                    }
                    setUser(x);
                })
                .catch((ex) => {
                    notify.error(ex);
                });
        }
    });

    const onGoBack = () => {
        setEditMode(false);
        setChPassMode(false);
    };

    const onSaveClick = (e) => {
        if (!formRef.current) return false;
        if (!formRef.current.isValid) return false;
        var model = formRef.current.values;
        setBusy(true);
        if (editMode) {
            accountApi
                .updateUserProfile(model)
                .then((x) => {
                    setBusy(false);
                    setUser(x);
                    notify.info(t("changes-are-saved"));
                    onGoBack(x);
                })
                .catch((ex) => {
                    setBusy(false);
                    notify.error(ex);
                });
        }
        if (chPassMode) {
            accountApi
                .changePassword(model)
                .then((x) => {
                    setBusy(false);
                    notify.info(t("changes-are-saved"));
                    onGoBack(x);
                })
                .catch((ex) => {
                    setBusy(false);
                    notify.error(ex);
                });
        }
    };

    const editProfileOnClick = () => {
        setEditMode(true);
        setChPassMode(false);
    };
    const changePasswordOnClick = () => {
        setChPassMode(true);
        setEditMode(false);
    };

    const ViewUserInfo = () => {
        const inputStyle = {
            maxWidth: 250,
        };

        return (
            <>
                <bd.Avatar alt="Image Profile" src="/../../images/avatar/user3.jpg" style={{ height: "150px", width: "150px" }} />
                {!editMode && !chPassMode && user && (
                    <>
                        <h3 className="pt-3">{user.userName}</h3>
                        <div className="row">
                            <span>{user.firstName + " " + user.lastName}</span>
                        </div>
                        <div className="row pt-2">
                            <span className="col-6 pt-2">{Atthenticate}</span>
                            {!WinAuth && (
                                <bd.Button className="col-6" color="default" onClick={changePasswordOnClick}>
                                    <span>{t("change-Password")}</span>
                                </bd.Button>
                            )}
                        </div>
                        <div className="row pt-3">
                            <bd.Button className="col-12" color="default" onClick={editProfileOnClick}>
                                <span>{t("edit-profile")}</span>
                            </bd.Button>
                        </div>
                        <div className="pt-3">
                            <ul style={{ listStyleType: "none", padding: 0 }}>
                                {user.nationalCode && (
                                    <li className="pt-2">
                                        <icons.Person className="size-md" />
                                        <label style={{ paddingLeft: 3 }}>{user.nationalCode}</label>
                                    </li>
                                )}
                                {user.email && (
                                    <li className="pt-2">
                                        <icons.Mail className="size-md" />
                                        <label style={{ paddingLeft: 3 }}>{user.email} </label>
                                    </li>
                                )}
                                {user.phoneNumber && (
                                    <li className="pt-2">
                                        <icons.PhoneIphone className="size-md" />
                                        <lable style={{ paddingLeft: 3 }}>{user.phoneNumber}</lable>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </>
                )}
                {editMode && !chPassMode && (
                    <Formik
                        initialValues={user}
                        validationSchema={yup.object({
                            email: yup.string().email("email not valid").nullable(true),
                            phoneNumber: yup
                                .string()
                                .matches(/^[0-9]{11}$/, "Must be exactly 11 digits")
                                .nullable(true),
                        })}
                        onSubmit={onSaveClick}
                        innerRef={formRef}
                    >
                        <form className="pt-3">
                            <BasicInput name="firstName" label={t("first-name")} labelSize="4" autoComplete="off" autoFocus style={inputStyle} />
                            <BasicInput name="lastName" label={t("last-name")} labelSize="4" autoComplete="off" style={inputStyle} />
                            <BasicInput name="userName" label={t("user-name")} readOnly labelSize="4" autoComplete="off" style={inputStyle} />
                            <BasicInput name="nationalCode" label={t("national-code")} labelSize="4" autoComplete="off" style={inputStyle} />
                            <BasicInput name="email" label={t("email")} labelSize="4" autoComplete="off" style={inputStyle} />
                            <BasicInput name="phoneNumber" label={t("phone-number")} labelSize="4" autoComplete="off" style={inputStyle} />
                            <input type="submit" className="d-none" />
                        </form>
                    </Formik>
                )}
                {user && chPassMode && !editMode && (
                    <Formik
                        initialValues={{
                            userName: user.userName,
                            oldPassword: "",
                            password: "",
                            repeatePassword: "",
                        }}
                        validationSchema={yup.object({
                            oldPassword: yup.string().required("required"),
                            password: yup.string().required("required"),
                            repeatePassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
                        })}
                        onSubmit={onSaveClick}
                        innerRef={formRef}
                    >
                        <form>
                            <BasicInput name="userName" style={{ display: "none" }} />
                            <BasicInput
                                name="oldPassword"
                                type="password"
                                label={t("old-password")}
                                labelSize="4"
                                autoComplete="off"
                                autoFocus
                                style={inputStyle}
                            />
                            <BasicInput name="password" type="password" label={t("password")} labelSize="4" autoComplete="off" style={inputStyle} />
                            <BasicInput
                                name="repeatePassword"
                                type="password"
                                label={t("repeate-password")}
                                labelSize="4"
                                autoComplete="off"
                                style={inputStyle}
                            />
                            <input type="submit" className="d-none" />
                        </form>
                    </Formik>
                )}
            </>
        );
    };
    const profileStyle = {
        maxWidth: 350,
        border: "1px groove #ddd2d263",
        boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px",
        borderRadius: 9,
        margin: "22px auto",
    };
    return (
        <>
            {(editMode || chPassMode) && (
                <div className="border-bottom">
                    <bd.Toolbar className="container">
                        <bd.Button variant="icon" onClick={() => onGoBack()} size="md" edge="start" className="m-e-2">
                            <icons.ArrowBackIos className="rtl-rotate-180" />
                        </bd.Button>
                        <h5>{t(PageTitle)}</h5>
                        <div className="flex-grow-1" />
                        <bd.Button color="primary" disabled={busy} onClick={() => formRef.current.submitForm()}>
                            {busy && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                            <span>{t("save-changes")}</span>
                        </bd.Button>
                    </bd.Toolbar>
                </div>
            )}
            <div className="p-4" style={profileStyle}>
                <ViewUserInfo />
            </div>
        </>
    );
};

UserProfile.Appbar = {
    title: "user-profile",
    buttons: null,
};
