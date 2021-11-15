import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import * as yup from "yup";
import { notify } from "../../../components/basic/notify";
import { Form, Formik } from "formik";
import { BasicInput } from "../../../components/basic-form/basic-input";
import { userApi } from "../../../api/user-api";
import { Tab } from "react-bootstrap";
import classNames from "classnames";

export const EditUser = ({ userId, onGoBack }) => {
  const { t } = useTranslation();
  const insertMode = !userId;
  const titlePage = insertMode ? "New-Uesr" : "Edit-User";
  const [busy, setBusy] = useState(false);
  const [user, setUser] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [defaultActiveTab, setDefaultActiveTab] = useState("all");
  const formRef = useRef();
  const [windowsAuth, setAuthType] = useState("true");
  const initialValue = insertMode
    ? {
        firstName: "",
        lastName: "",
        userName: "",
        nationalCode: "",
        email: "",
        password: "",
        repeatePassword: "",
        phoneNumber: "",
        windowsAuthenticate: true,
      }
    : user;

  useEffect(() => {
    if (userId != null && user == null) {
      userApi
        .getUser(userId)
        .then((x) => {
          if (!x.windowsAuthenticate) {
            setAuthType("false");
          }
          setUser(x);
        })
        .catch((ex) => {
          notify.error(ex);
        });
    }
  });

  const onSaveClick = (e) => {
    if (!formRef.current) return false;
    if (!formRef.current.isValid) return false;
    var values = formRef.current.values;
    values.windowsAuthenticate = windowsAuth == "true" ? true : false;
    setBusy(true);
    var insertMode = !userId;
    userApi
      .saveUser(insertMode, values)
      .then((x) => {
        setBusy(false);
        notify.info(t("changes-are-saved"));
        onGoBack(x);
      })
      .catch((ex) => {
        setBusy(false);
        notify.error(ex);
      });
  };

  const deleteClickHandler = () => {
    bd.msgbox(t("the-user-will-be-deleted"), null, (hide) => (
      <>
        <bd.Button variant="text" color="primary" onClick={hide} className="m-e-2">
          {t("cancel")}
        </bd.Button>

        <bd.Button variant="text" color="primary" disabled={deleting} onClick={() => onDeleteClick(hide)}>
          {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
          {t("delete")}
        </bd.Button>
      </>
    ));
  };

  const onDeleteClick = (hide) => {
    setDeleting(true);
    setBusy(true);
    userApi
      .deleteUser(userId)
      .then((x) => {
        setDeleting(false);
        hide();
        notify.info(t("row-is-deleted"));
        onGoBack(null);
        setBusy(false);
      })
      .catch((ex) => {
        setDeleting(false);
        notify.error(ex);
        setBusy(false);
      });
  };
  const UserForm = () => {
    return (
      <>
        <Formik
          initialValues={initialValue}
          validationSchema={yup.object({
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            userName: yup.string().required("required"),
            nationalCode: yup.string().required("required"),
            email: yup.string().email("email not valid"),
            password: yup.string().when("windowsAuthenticate", {
              is: (value) => value == "false",
              then: yup.string().required("required"),
            }),
            repeatePassword: yup.string().when("password", {
              is: (value) => value && value.length > 0,
              then: yup.string().required("required"),
            }),
            phoneNumber: yup.string().matches(/^[0-9]{11}$/, "Must be exactly 11 digits"),
          })}
          onSubmit={onSaveClick}
          innerRef={formRef}
        >
          <Form>
            <div className="row">
              <div className="col-md-12">
                <Tab.Container defaultActiveKey={defaultActiveTab}>
                  <bd.AppBar color="default" shadow="0" color="inherit">
                    <bd.TabStrip shade="primary" indicatorColor="primary">
                      <bd.TabStripItem data-toggle="tab" eventKey="general" onClick={() => setDefaultActiveTab("general")}>
                        {t("general-info-tab")}
                      </bd.TabStripItem>
                      {!user && (
                        <bd.TabStripItem data-toggle="tab" eventKey="authentication" onClick={() => setDefaultActiveTab("general")}>
                          {t("authentication-type-tab")}
                        </bd.TabStripItem>
                      )}
                      <bd.TabStripItem eventKey="third" data-toggle="tab">
                        {t("role-manage-tab")}
                      </bd.TabStripItem>
                    </bd.TabStrip>
                  </bd.AppBar>
                  <Tab.Content className="mt-4">
                    <Tab.Pane eventKey="general" className={defaultActiveTab === "all" ? " active show" : ""}>
                      <GeneralUserInfo />
                    </Tab.Pane>
                    <Tab.Pane eventKey="authentication" className={defaultActiveTab === "all" ? "active show" : ""}>
                      <AuthenticationType />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </Form>
        </Formik>
      </>
    );
  };
  const GeneralUserInfo = () => {
    const inputStyle = {
      maxWidth: 250,
    };
    return (
      <div className="row">
        <div className="col-md-6">
          <BasicInput name="id" labelSize="2" style={{ display: "none" }} />
          <BasicInput name="firstName" label={t("first-name")} labelSize="2" autoComplete="off" autoFocus style={inputStyle} />
          <BasicInput name="lastName" label={t("last-name")} labelSize="2" autoComplete="off" style={inputStyle} />
          <BasicInput name="userName" label={t("user-name")} labelSize="2" autoComplete="off" readOnly={!!userId} style={inputStyle} read />
          <BasicInput name="nationalCode" label={t("national-code")} labelSize="2" autoComplete="off" style={inputStyle} />
          <BasicInput name="email" label={t("email")} labelSize="2" autoComplete="off" style={inputStyle} />
          <BasicInput name="phoneNumber" label={t("phone-number")} labelSize="2" autoComplete="off" style={inputStyle} />
        </div>
      </div>
    );
  };
  const AuthenticationType = () => {
    const inputStyle = {
      maxWidth: 250,
    };
    return (
      <div className="row mb-2">
        <div className="col-md-6">
          <label class="form-label text-start text-md-end col-form-label col-12 col-md-2">{t("auth-type")}</label>
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
            onClick={() => setDefaultActiveTab("authentication")}
          />
          <bd.Toggle
            color="primary"
            dense
            radio
            size="sm"
            name="windowsAuthenticate"
            value="false"
            label={t("form")}
            model={windowsAuth}
            setModel={setAuthType}
            onClick={() => setDefaultActiveTab("authentication")}
          />
          {windowsAuth === "false" && (
            <div className="mt-4">
              <BasicInput name="password" type="password" label={t("password")} labelSize="3" autoComplete="off" style={inputStyle} />
              <BasicInput name="repeatePassword" type="password" label={t("repeate-password")} labelSize="3" autoComplete="off" style={inputStyle} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="border-bottom">
        <bd.Toolbar className="container">
          <bd.Button variant="icon" onClick={() => onGoBack()} size="md" edge="start" className="m-e-2">
            <icons.ArrowBackIos className="rtl-rotate-180" />
          </bd.Button>
          <h5>{t(titlePage)}</h5>
          <div className="flex-grow-1" />
          <bd.Button color="primary" disabled={busy} onClick={() => formRef.current.submitForm()}>
            {busy && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
            <span>{t("save-changes")}</span>
          </bd.Button>
          <bd.Button
            className={classNames("m-s-2 edge-end", {
              "d-none": !userId,
            })}
            type="button"
            variant="outline"
            disabled={busy || deleting}
            onClick={deleteClickHandler}
          >
            {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
            <span>{t("delete")}</span>
          </bd.Button>
        </bd.Toolbar>
      </div>
      <div className="container">
        <UserForm />
      </div>
    </div>
  );
};
