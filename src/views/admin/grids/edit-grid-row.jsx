import React, { useRef, useState } from "react";
import * as bd from "react-basic-design";
import { Text } from "../../../components/basic/text";
import * as icons from "../../../assets/icons";
import { useShell } from "../../shared/use-shell";
import { BasicInput } from "../../../components/basic-form/basic-input";
import { Formik } from "formik";
import { BasicToggle } from "../../../components/basic-form/basic-toggle";
import { BasicSwitch } from "../../../components/basic-form/basic-switch";
import { BasicSelect } from "../../../components/basic-form/basic-select";
import { BasicTextArea } from "../../../components/basic-form/basic-textarea";
import { gridsApi } from "../../../api/grids-api";
import { notify } from "../../../components/basic/notify";

export const EditTableRow = ({ table, row, onGoBack, onChanged }) => {
    const insertMode = row === null;
    const [saving, setSaving] = useState(false);
    const formRef = useRef();

    const onSaveClick = () => {
        var values = formRef.current.values;
        console.log(values);
        setSaving(true);
        gridsApi
            .save(table.id, values, insertMode)
            .then((x) => {
                setSaving(false);
                notify.info(<Text>changes-are-saved</Text>);
                onChanged(values, row);
            })
            .catch((ex) => {
                setSaving(false);
                notify.error(ex);
            });
    };

    useShell().setApp("edit-table-row", onGoBack);

    function getFieldProps(x) {
        var props = {
            key: x.id,
            name: x.name,
            label: x.title,
            labelSize: "3",
            readOnly: x.isReadOnly || (!insertMode && x.isPK),
            className: x.controlClassName,
        };
        if (x.display === "text") props["type"] = "text";
        else if (x.display === "number") props["type"] = "number";
        else if (x.display === "amount") props["type"] = "number";
        else if (x.display === "email") props["type"] = "email";
        else if (x.display === "url") props["type"] = "url";
        if (x.maxLen > 0) props["maxLength"] = x.maxLen;
        return props;
    }

    function getValidValues(column) {
        var values = column.validValues;
        if (!values) return [];
        if (typeof values === "function") values = values(row);
        if (typeof values === "string") {
            return values.split(",").map((x) => {
                var i = x.indexOf(":");
                var code = i === -1 ? x : x.substr(0, i);
                var title = i === -1 ? x : x.substr(0, i);
                return { code: code.trim(), title: title.trim() };
            });
        }
        return values;
    }
    return (
        <>
            <div className="">
                <div className="border-bottom py-2 bg-default">
                    <bd.Toolbar className="container">
                        <h4 className="d-flex align-items-center">
                            {table.title}
                            <span className="px-2 size-sm">
                                <icons.ArrowForward className="rtl-rotate-180" />
                            </span>
                            <Text>{insertMode ? "INSERT" : "EDIT"}</Text>
                        </h4>
                        <div className="flex-grow-1"></div>
                        <bd.Button color="primary" disabled={saving} onClick={onSaveClick}>
                            {saving && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
                            <Text>save</Text>
                        </bd.Button>
                        <bd.Button variant="text" color="primary" className="m-s-2" onClick={onGoBack}>
                            <Text>cancel</Text>
                        </bd.Button>
                    </bd.Toolbar>
                    <div className="container"></div>
                </div>

                <div className="container py-3">
                    <Formik
                        initialValues={row || {}}
                        // validationSchema={yup.object({
                        //     title: yup.string().min(3, t("msg-too-short")).max(100, t("msg-too-long")).required("Required"),
                        // })}
                        onSubmit={onSaveClick}
                        innerRef={formRef}
                    >
                        <form style={{ maxWidth: 700 }}>
                            {table.schema.dataColumns.map((x, index) =>
                                x.display === "textarea" ? (
                                    <BasicTextArea {...getFieldProps(x)} />
                                ) : x.display === "select" ? (
                                    <BasicSelect {...getFieldProps(x)}>
                                        {getValidValues(x).map((z) => (
                                            <option key={z.code} value={z.code}>
                                                {z.title}
                                            </option>
                                        ))}
                                    </BasicSelect>
                                ) : x.display === "check" ? (
                                    <BasicToggle {...getFieldProps(x)} />
                                ) : x.display === "switch" ? (
                                    <BasicSwitch {...getFieldProps(x)} />
                                ) : (
                                    <BasicInput {...getFieldProps(x)} autoFocus={index === 0} />
                                )
                            )}
                        </form>
                    </Formik>
                </div>
            </div>
        </>
    );
};
