import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import * as bd from "react-basic-design";

import { messages } from "../../../components/messages";
import classNames from "classnames";
import { tableDesignerApi } from "../../../api/table-designer-api";
import { notify } from "../../../components/basic/notify";
import * as icons from "../../../assets/icons";
import { Form, Formik } from "formik";
import { BasicInput } from "../../../components/basic-form/basic-field";
import * as yup from "yup";

//
export function TableDesignerEditGroup({ group, onChanged, onGoBack }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const formRef = useRef();

    const onSaveClick = (e) => {
        if (!formRef.current) return false;
        if (!formRef.current.isValid) {
            console.log(formRef.current);
            return false;
        }
        var values = formRef.current.values;

        setLoading(true);
        var insertMode = !group.id;
        tableDesignerApi
            .saveGroup(values, insertMode)
            .then((x) => {
                setLoading(false);
                notify.info(messages.ChangesAreSaved);
                x.items = group.items ? group.items : [];
                onChanged(x);
            })
            .catch((ex) => {
                setLoading(false);
                notify.error(ex);
            });
    };

    const onDeleteClick = (hide) => {
        setDeleting(true);
        tableDesignerApi
            .deleteGroup(group.id)
            .then((x) => {
                setLoading(false);
                hide();
                notify.info(messages.RowIsDeleted);
                onChanged(null);
            })
            .catch((ex) => {
                setLoading(false);
                notify.error(ex);
            });
    };

    const deleteClickHandler = () => {
        bd.msgbox(t("delete-group"), t("you-are-going-to-delete-group"), (hide) => (
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
            <div className="border-bottom bg-gray-5 mb-3">
                <bd.Toolbar className="container">
                    <bd.Button variant="icon" onClick={onGoBack} size="md" edge="start" className="m-e-2">
                        <icons.ArrowBackIos className="rtl-rotate-180" />
                    </bd.Button>

                    <h5>
                        {t("edit-group")}: <b className="text-primary-text">{group.title}</b>
                    </h5>

                    <div className="flex-grow-1" />

                    <bd.Button color="primary" type="submit" disabled={loading || deleting} onClick={() => formRef.current.submitForm()}>
                        {loading && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                        <span>{t("save-group")}</span>
                    </bd.Button>

                    <bd.Button
                        className={classNames("m-s-2 edge-end", {
                            "d-none": !group.id,
                        })}
                        type="button"
                        variant="outline"
                        disabled={loading || deleting || (group.items && group.items.length)}
                        onClick={deleteClickHandler}
                    >
                        {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                        <span>{t("delete")}</span>
                    </bd.Button>
                </bd.Toolbar>
            </div>

            <div className="container">
                <Formik
                    initialValues={group}
                    validationSchema={yup.object({ title: yup.string().min(3, t("msg-too-short")).max(100, t("msg-too-long")).required("Required") })}
                    onSubmit={onSaveClick}
                    innerRef={formRef}
                >
                    <Form style={{ maxWidth: 400 }}>
                        <BasicInput name="title" label={t("group-title")} labelSize="4" autoComplete="off" autoFocus />
                    </Form>
                </Formik>
            </div>
        </>
    );
}
