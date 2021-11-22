import React, { useRef, useState } from "react";
import * as bd from "react-basic-design";
import { Text } from "../basic/text";
import * as bd2 from "../forms";
import * as icons from "../../assets/icons";
import { BasicSelect } from "../basic-form/basic-select";

import { notify } from "../basic/notify";
import { gridsApi } from "../../api/grids-api";
import { FormLookup } from "./form-lookup";

export const EditGridRow = ({ grid, row, onGoBack, onChanged }) => {
    const insertMode = row === null;
    const [saving, setSaving] = useState(false);
    const [openLookup, setOpenLookup] = useState(false);
    const formRef = useRef();

    const onSaveClick = () => {
        var values = formRef.current.values;
        setSaving(true);
        gridsApi
            .save(grid.id, values, insertMode)
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

    function getFieldProps(x, lookup) {
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
        if (lookup && x.checkGrid) {
            props.buttonTitle = <icons.OpenInNew style={{ fontSize: "1.125rem" }} />;
            props.buttonOnClick = (e) => setOpenLookup(true);
        }
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
            <div>
                <div className="border-bottom py-2 bg-default">
                    <bd.Toolbar size="sm" style={{ maxWidth: 800 }}>
                        <h4 className="d-flex align-items-center">
                            <bd.Button variant="icon" color="default" onClick={() => onGoBack()}>
                                <icons.ArrowBackIos size="md" className="rtl-rotate-180" />
                            </bd.Button>

                            {grid.title}

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
                </div>

                <div className="py-3" style={{ maxWidth: 800 }}>
                    <bd2.FormikForm
                        initialValues={row || {}}
                        // validationSchema={yup.object({
                        //     title: yup.string().min(3, t("msg-too-short")).max(100, t("msg-too-long")).required("Required"),
                        // })}
                        onSubmit={onSaveClick}
                        innerRef={formRef}
                        compact
                    >
                        {grid.dataColumns
                            .filter((x) => x.showInEditor)
                            .map((x, xIndex) => (
                                <>
                                    {x.display === "textarea" ? (
                                        <bd2.FormikTextArea {...getFieldProps(x)} />
                                    ) : x.display === "select" ? (
                                        <BasicSelect {...getFieldProps(x)}>
                                            {getValidValues(x).map((z) => (
                                                <option key={z.code} value={z.code}>
                                                    {z.title}
                                                </option>
                                            ))}
                                        </BasicSelect>
                                    ) : x.display === "check" ? (
                                        <bd2.FormikToggle {...getFieldProps(x)} />
                                    ) : x.display === "switch" ? (
                                        <bd2.FormikSwitch {...getFieldProps(x)} />
                                    ) : (
                                        <bd2.FormikInput {...getFieldProps(x, true)} autoFocus={xIndex === 0} />
                                    )}
                                    <FormLookup show={openLookup} setShow={setOpenLookup} checkTable={x.checkGrid} />
                                </>
                            ))}
                    </bd2.FormikForm>
                </div>
            </div>
        </>
    );
};
