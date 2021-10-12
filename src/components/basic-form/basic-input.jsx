import classNames from "classnames";
import * as bd from "react-basic-design";
import { useField } from "formik";
import React from "react";

export const BasicInput = ({ id, label, labelSize, type, className, children, autoComplete, ...props }) => {
    const [field, meta] = useField({ ...props, type });

    if (props.name === "title") console.log(props.name, " = ", field.value);

    var cnControl = classNames("form-control", className, {
        "bd-border-error": meta.error,
    });
    var cnErorr = "bd-error";

    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";
    if (label && id === undefined) id = props.name;

    let field_comp = (
        <>
            <input id={id} type={type} className={cnControl} {...field} autoComplete={autoComplete} {...props} />
            {children}
            {meta.touched && meta.error ? <div className={cnErorr}>{meta.error}</div> : null}
        </>
    );

    return (
        <bd.FormRow label={label} labelSize={labelSize} htmlFor={id} className={className}>
            {field_comp}
        </bd.FormRow>
    );
};
