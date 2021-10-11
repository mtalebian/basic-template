import React, { useRef, useState } from "react";
import * as bd from "react-basic-design";
import * as yup from "yup";

import * as icons from "../../../assets/icons";
import { menuApi } from "../../../api/menu-api";
import { Form, Formik } from "formik";
import { notify } from "../../../components/basic/notify";
import { useTranslation } from "react-i18next";
import { BasicInput } from "../../../components/basic-form/basic-input";
import classNames from "classnames";
import { BasicToggle } from "../../../components/basic-form/basic-toggle";
import { BasicSwitch } from "../../../components/basic-form/basic-switch";
import { BasicFormRow, BasicLabel } from "../../../components/basic-form/basic-form-row";

export const EditMenu = ({ projectId, menu, onGoBack }) => {
    const { t } = useTranslation();
    const title = !menu.id ? "New Menu" : "Edit Menu";
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const formRef = useRef();

    const onSaveClick = (e) => {
        var values = formRef.current.values;
        setLoading(true);
        var insertMode = !menu.id;
        menuApi
            .saveMenu(projectId, values, insertMode)
            .then((x) => {
                setLoading(false);
                notify.info(t("changes-are-saved"));
                onGoBack(x);
            })
            .catch((ex) => {
                setLoading(false);
                notify.error(ex);
            });
    };

    const onDeleteClick = (hide) => {
        setDeleting(true);
        menuApi
            .deleteMenu(projectId, menu.id)
            .then((x) => {
                setDeleting(false);
                hide();
                notify.info(t("row-is-deleted"));
                onGoBack(null);
            })
            .catch((ex) => {
                setDeleting(false);
                notify.error(ex);
            });
    };

    const deleteClickHandler = () => {
        bd.msgbox(t("the-menu-will-be-deleted"), null, (hide) => (
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

    return (
        <>
            <bd.AppBar color position="sticky" style={{ zIndex: 10 }} shadow={0} className="shadow-0 border-bottom">
                <bd.Toolbar className="container">
                    <bd.Button variant="icon" size="md" onClick={() => onGoBack()}>
                        <icons.ArrowBackIos className="rtl-rotate-180" />
                    </bd.Button>

                    <h5 className="appbar-title">{title}</h5>

                    <bd.Button color="primary" type="submit" disabled={loading || deleting} onClick={() => formRef.current.submitForm()}>
                        {loading && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                        <span>{t("save-changes")}</span>
                    </bd.Button>

                    <bd.Button
                        className={classNames("m-s-2 edge-end", {
                            "d-none": !menu.id,
                        })}
                        type="button"
                        variant="outline"
                        disabled={loading || deleting}
                        onClick={deleteClickHandler}
                    >
                        {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                        <span>{t("delete")}</span>
                    </bd.Button>
                </bd.Toolbar>
            </bd.AppBar>

            <div className="container pt-4">
                <Formik
                    initialValues={{ ...menu, openInNewTab: "1" }}
                    validationSchema={yup.object({
                        id: yup.string().required("Required"),
                        title: yup.string().required("Required"),
                    })}
                    onSubmit={onSaveClick}
                    innerRef={formRef}
                >
                    {({ values, ...props }) => {
                        return (
                            <Form style={{ maxWidth: 400 }}>
                                <BasicInput name="id" label={t("id")} labelSize="4" autoFocus readOnly={!!menu.id} />
                                <BasicInput name="title" label={t("title")} labelSize="4" />
                                <BasicInput name="url" label={t("url")} labelSize="4" className="ltr" />
                                <BasicInput name="applicationId" label={t("application-id")} labelSize="4" className="ltr" />

                                <BasicSwitch name="openInNewTab" label={t("open-in-new-tab")} labelSize="4" />
                                {/* <BasicSwitch name="openInNewTab" label={t("disabled")} labelSize="4" readOnly />

                                <BasicToggle name="openInNewTab" label={t("open-in-new-tab")} labelSize="4" />
                                <BasicFormRow label="Open IN" labelSize="4">
                                    <BasicToggle radio name="openInNewTab" value={true} label={t("new-tab")} />
                                    <BasicToggle radio name="openInNewTab" value={false} label={t("current-tab")} />
                                </BasicFormRow> */}
                                <BasicInput name="sortOrder" label={t("sort-order")} labelSize="4" type="number" />
                                <BasicInput name="createdAt" label={t("created-at")} labelSize="4" readOnly />
                                <input type="submit" className="d-none" />
                                <pre className="ltr">{JSON.stringify(values, null, 2)}</pre>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </>
    );
};
