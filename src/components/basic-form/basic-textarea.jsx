import classNames from "classnames";
import * as bd from "react-basic-design";
import { useField } from "formik";
import React from "react";

export const BasicTextArea = ({ id, label, labelSize, type, className, controlClassName, children, autoComplete, maxWidth, ...props }) => {
    const [field, meta] = useField({ ...props, type });
    if (!field.value) field.value = "";
    var cnControl = classNames("form-control", controlClassName, {
        "bd-border-error": meta.error,
    });
    var cnErorr = "bd-error";

    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";
    if (label && id === undefined) id = props.name;

    let style = props.style;
    if (maxWidth > 0) {
        style = { ...style, maxWidth };
    }

    let field_comp = (
        <>
            <textarea id={id} type={type} className={cnControl} {...field} autoComplete={autoComplete} {...props} style={style}></textarea>

            {meta.touched && meta.error ? <div className={cnErorr}>{meta.error}</div> : null}
        </>
    );

    return label === undefined ? (
        field_comp
    ) : (
        <bd.FormRow label={label} labelSize={labelSize} htmlFor={id} className={className}>
            {field_comp}
        </bd.FormRow>
    );
};
