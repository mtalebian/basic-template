import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import * as yup from "yup";
import { notify } from "../../../components/basic/notify";
import { Form, Formik } from "formik";
import { BasicInput } from "../../../components/basic-form/basic-field";
import { userManagmentApi } from "../../../api/user-managment-api";
import { TabContainer, TabContent, TabPane,Tab,Nav,Col,Row,NavItem} from "react-bootstrap";

export const AddUser = ({ onGoBack, ...props }) => {
    const { t } = useTranslation();
    const [busy, setBusy] = useState(false);
    const formRef = useRef();
    const [windowsAuth, setAuthType] = useState("true");
    const [selectedTab, setTab] = useState('first');
    

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
   const UserInfo=()=>{
        return(
            <div className="row">
            <div className="col-md-6">
            <BasicInput name="firstName" label={t("first-name")} labelSize="4" autoComplete="off" autoFocus />
            <BasicInput
                name="lastName"
                label={t("last-name")}
                labelSize="4"
                autoComplete="off"
                // style={{ maxWidth: 150 }}
            />
            <BasicInput name="userName" label={t("user-name")} labelSize="4" autoComplete="off" />
            <BasicInput name="nationalCode" label={t("national-code")} labelSize="4" autoComplete="off" />
            <BasicInput name="email" label={t("email")} labelSize="4" autoComplete="off" />
            <BasicInput name="phoneNumber" label={t("phone-number")} labelSize="4" autoComplete="off" />
            <div className="row mb-2">
                <label class="form-label text-start text-md-end col-form-label col-12 col-md-4">{t("auth-type")}</label>
                <div className="col-md-8 m-s-n2">
                    <bd.Toggle
                        color="primary"
                        dense
                        radio
                        size="sm"
                        name="windowsAuthenticate"
                        value="true"
                        label={t("windows")}
                        labelClassName="m-e-2"
                        model={windowsAuth}
                        setModel={setAuthType}
                    />
                    <bd.Toggle
                        color="primary"
                        dense
                        checked
                        radio
                        size="sm"
                        name="windowsAuthenticate"
                        value="false"
                        label={t("form")}
                        model={windowsAuth}
                        setModel={setAuthType}
                    />
                </div>
            </div>
            {windowsAuth}
            </div>
            <div className="col-md-6">
            {windowsAuth=="false" &&(
            <>
             <BasicInput name="password" type="password" label={t("password")} labelSize="4" autoComplete="off" />
             <BasicInput name="repeatePassword" type="password" label={t("repeate-password")} labelSize="4" autoComplete="off" />
            </>
           )}
            </div>
        </div>
        )};
        
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
                        firstName: "",
                        lastName: "",
                        userName: "",
                        nationalCode: "",
                        email:"",
                        password: "",
                        repeatePassword:"",
                        phoneNumber:"",
                        windowsAuthenticate: true,
                    }}
                    validationSchema={yup.object({
                        firstName: yup.string().required("required"),
                        lastName: yup.string().required("required"),
                        userName: yup.string().required("required"),
                        nationalCode:yup.string().required("required"),
                    })}
                    onSubmit={onSaveClick}
                    innerRef={formRef}
                >
                    <Form>
                        <div className="row">
                            <div className="col-md-12">
                             <Tab.Container defaultActiveKey="first">
                            <bd.AppBar color="default">
                                    <bd.TabStrip shade="primary" indicatorColor="primary" >
                                        <bd.TabStripItem eventKey="first" >{t("user-info-tab")}</bd.TabStripItem>
                                        <bd.TabStripItem eventKey="second">{t("user-role-tab")}</bd.TabStripItem>
                                        <bd.TabStripItem eventKey="third">{t("password-manage-tab")}</bd.TabStripItem>
                                    </bd.TabStrip>
                            </bd.AppBar>
                             <Tab.Content className="mt-4">
                              <Tab.Pane eventKey="first">
                                  <UserInfo/>
                              </Tab.Pane>
                              <Tab.Pane eventKey="second">
                                      12121
                               </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
