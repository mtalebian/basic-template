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

export const EditFolder = ({ projectId, folder, onGoBack }) => {
    const { t } = useTranslation();
    const title = !folder.id ? "New Folder" : "Edit Folder";
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const formRef = useRef();

    const onSaveClick = (e) => {
        var values = formRef.current.values;
        setLoading(true);
        var insertMode = !folder.id;
        menuApi
            .saveFolder(projectId, values, insertMode)
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
            .deleteFolder(projectId, folder.id)
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
        bd.msgbox(t("the-folder-will-be-deleted"), null, (hide) => (
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
                            "d-none": !folder.id,
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
                    initialValues={folder}
                    validationSchema={yup.object({
                        id: yup.string().required("Required"),
                        title: yup.string().required("Required"),
                    })}
                    onSubmit={onSaveClick}
                    innerRef={formRef}
                >
                    <Form style={{ maxWidth: 400 }}>
                        <BasicInput name="id" label={t("id")} labelSize="4" autoComplete="off" autoFocus readOnly={!!folder.id} />
                        <BasicInput name="title" label={t("title")} labelSize="4" autoComplete="off" autoFocus />
                        <input type="submit" className="d-none" />
                    </Form>
                </Formik>
            </div>
        </>
    );
};
