import classNames from "classnames";
import { useField } from "formik";
import React from "react";
import { FormRow } from "./form-row";

export const FormikTextArea = ({
    label,
    labelSize,

    id,
    inputClassName,
    inputStyle,

    className,
    width,
    height,
    maxWidth,
    style,
    autoComplete,
    spellCheck,

    readOnly,
    ...props
}) => {
    let [field, meta] = useField({ ...props });

    if (label && id === undefined) id = props.name;

    const cnInput = classNames("form-control", inputClassName, {
        "form-readonly": readOnly,
        "bd-border-error": meta.error,
    });

    if (!autoComplete) autoComplete = "off";
    if (!spellCheck) spellCheck = "false";

    var inp = (
        <textarea
            id={id}
            className={cnInput}
            title={meta.error}
            {...field}
            {...props}
            readOnly={readOnly}
            style={{ ...inputStyle, height }}
            spellCheck={spellCheck}
            autoComplete={autoComplete}
        ></textarea>
    );

    if (label === null || label === undefined) return inp;
    return (
        <FormRow label={label} labelSize={labelSize} htmlFor={id} className={className} style={{ ...style, maxWidth, width }}>
            {inp}
        </FormRow>
    );
};
