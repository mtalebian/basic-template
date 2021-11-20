import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import * as bd from "react-basic-design";
import * as bd2 from "../../../components/forms";

import { messages } from "../../../components/messages";
import classNames from "classnames";
import { gridBuilderApi } from "../../../api/grid-builder-api";
import { notify } from "../../../components/basic/notify";
import * as icons from "../../../assets/icons";
import * as yup from "yup";
import { T } from "../../../components/basic/text";

//
export function GridBuilderEditGroup({ group, onChanged, onGoBack }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const formRef = useRef();

    const onSaveClick = (e) => {
        var values = formRef.current.values;

        setLoading(true);
        var insertMode = !group.id;
        gridBuilderApi
            .saveGroup(values, insertMode)
            .then((x) => {
                setLoading(false);
                notify.info(messages.ChangesAreSaved);
                onChanged(x, group);
            })
            .catch((ex) => {
                setLoading(false);
                notify.error(ex);
            });
    };

    const onDeleteClick = (hide) => {
        setDeleting(true);
        gridBuilderApi
            .deleteGroup(group.id)
            .then((x) => {
                setDeleting(false);
                hide();
                notify.dark(messages.RowIsDeleted);
                onChanged(null, group);
            })
            .catch((ex) => {
                setDeleting(false);
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
                <bd.Toolbar>
                    <bd.Button variant="icon" onClick={onGoBack} edge="start" className="m-e-2">
                        <icons.ArrowBackIos className="rtl-rotate-180" />
                    </bd.Button>

                    <h5>
                        <T>{group.id ? "edit-group" : "insert-group"}</T>
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
                        disabled={loading || deleting}
                        onClick={deleteClickHandler}
                    >
                        {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                        <span>{t("delete")}</span>
                    </bd.Button>
                </bd.Toolbar>
            </div>

            <bd2.FormikForm
                initialValues={group}
                validationSchema={yup.object({
                    title: yup.string().min(3, t("msg-too-short")).max(100, t("msg-too-long")).required("Required"),
                })}
                onSubmit={onSaveClick}
                innerRef={formRef}
                className="px-3"
                enableReinitialize
                compact
                flex
            >
                <bd2.FormikInput name="id" label={t("group-id")} width="6rem" readOnly />
                <bd2.FormikInput name="parentId" label={t("parent-id")} width="6rem" />
                <bd2.FormikInput name="title" label={t("group-title")} width="12rem" autoFocus />
                <bd2.FormikInput name="azView" label={t("az-view")} width="100%" />
            </bd2.FormikForm>
        </>
    );
}
