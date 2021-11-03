import { useField } from "formik";
import React from "react";
import * as bd from "react-basic-design";
import { FormRow } from "./form-row";

export const FormikToggle = ({ label, labelSize, id, className, width, maxWidth, style, readOnly, ...props }) => {
    let [field, , helper] = useField({ ...props });

    if (label && id === undefined) id = props.name;

    var inp = <bd.Toggle id={id} model={field.value} setModel0={!readOnly && helper.setValue} {...props} color="primary" readOnly />;

    console.log(field.value);

    if (label === null || label === undefined) return inp;
    return (
        <FormRow label={label} labelSize={labelSize} htmlFor={id} className={className} style={{ ...style, maxWidth, width }}>
            <div style={{ marginTop: -3 }}>{inp}</div>
        </FormRow>
    );
};
