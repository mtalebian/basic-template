import classNames from "classnames";
import { Field, useField } from "formik";
import React from "react";

export const BasicInput = ({ id, label, labelSize, type, className, children, style, readOnly, autoComplete, ...props }) => {
    const [field, meta] = useField({ ...props, type });
    const break_point = typeof labelSize !== "string" ? "md" : labelSize.startsWith("lg") ? "lg" : labelSize.startsWith("xl") ? "xl" : "md";
    labelSize = typeof labelSize !== "string" || labelSize.indexOf("-") === -1 ? labelSize * 1 : labelSize.split("-")[1] * 1;

    var cn = classNames("bd-input", { "row gx-3": labelSize });
    var cnLabel = classNames("form-label", {
        [`text-start text-${break_point}-end col-form-label col-12 col-${break_point}-${labelSize}`]: labelSize,
    });
    var cnControl = classNames("form-control", className, {
        "bd-border-error": meta.error,
        "bg-transparent": readOnly,
    });
    var cnErorr = "bd-error";

    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";
    if (label && id === undefined) id = props.name;

    let field_comp = (
        <>
            <Field id={id} type={type} className={cnControl} {...field} style={style} readOnly={readOnly} autoComplete={autoComplete} />
            {children}
            {meta.touched && meta.error ? <div className={cnErorr}>{meta.error}</div> : null}
        </>
    );

    if (labelSize > 0) field_comp = <div className={classNames(`col-12 col-${break_point}-${12 - labelSize}`)}>{field_comp}</div>;

    return (
        <>
            <div className={cn}>
                <label className={cnLabel} htmlFor={field.id || field.name}>
                    {label}
                </label>
                {field_comp}
            </div>
        </>
    );
};
